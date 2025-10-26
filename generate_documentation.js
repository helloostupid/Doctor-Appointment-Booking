import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const context = JSON.parse(fs.readFileSync("context.json", "utf8"));

function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJsFiles(filePath));
    } else if (file.endsWith(".js")) {
      results.push(filePath);
    }
  });
  return results;
}


function getRepoCode() {
  let allCode = "";
  for (const entry of context.modules) {
    const fullPath = path.resolve(entry);
    let files = [];

    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        files = getAllJsFiles(fullPath);
      } else if (fullPath.endsWith(".js")) {
        files.push(fullPath);
      }
    }

    for (const file of files) {
      const code = fs.readFileSync(file, "utf8");
      allCode += `\n// File: ${path.relative(process.cwd(), file)}\n${code}\n`;
    }
  }
  return allCode;
}


async function generateRepoSummary() {
  const allCode = getRepoCode();
  const prompt = `You are an expert developer. Write a concise README-style summary explaining what this project does and its main functionality based on the code below:\n\n${allCode}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: prompt }]
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating repo summary:", error.message);
    return "Could not generate summary.";
  }
}


async function generateDocs() {
  const repoSummary = await generateRepoSummary();
  const output = `# ${context.projectName}\n\n${context.description}\n\n## Overview\n\n${repoSummary}\n`;
  fs.writeFileSync("DOCS.md", output);
  console.log("DOCS.md generated successfully!");
}

generateDocs();
