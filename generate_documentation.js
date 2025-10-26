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

function extractCodeSnippets(filePath) {
  const code = fs.readFileSync(filePath, "utf8");

  const funcRegex = /function\s+(\w+)\s*\(([^)]*)\)\s*{([\s\S]*?)}/g;
  const arrowFuncRegex = /const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{([\s\S]*?)}/g;
  const classRegex = /class\s+(\w+)\s*{([\s\S]*?)}/g;

  const snippets = [];

  for (const [_, name, params, body] of code.matchAll(funcRegex))
    snippets.push({ type: "Function", name, params, body });

  for (const [_, name, params, body] of code.matchAll(arrowFuncRegex))
    snippets.push({ type: "Arrow Function", name, params, body });

  for (const [_, name, body] of code.matchAll(classRegex))
    snippets.push({ type: "Class", name, params: "", body });

  return snippets;
}

async function summarizeWithOpenAI(name, code) {
  try {
    const prompt = `Write documentation for this ${name}:\n\n${code} \n I need to generate documentation for this code.`;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 80
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error(`Error summarizing ${name}:`, error.message);
    return "Could not generate summary.";
  }
}

async function generateDocs() {
  let output = `# ${context.projectName}\n\n${context.description}\n\n`;

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
      output += `## ${path.relative(process.cwd(), file)}\n\n`;

      const snippets = extractCodeSnippets(file);
      if (snippets.length === 0) {
        output += "_No functions or classes found._\n\n";
      } else {
        for (const snippet of snippets) {
          const summary = await summarizeWithOpenAI(snippet.name, snippet.body);
          output += `- **${snippet.type}:** \`${snippet.name}\`\n  ${summary}\n\n`;
        }
      }
    }
  }

  fs.writeFileSync("DOCS.md", output);
  console.log("DOCS.md generated successfully!");
}

generateDocs();
