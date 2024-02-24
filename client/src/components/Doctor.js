import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from "@mui/material";

function Doctor({doctor}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={doctor.firstName + " " + doctor.lastName} />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {doctor.specialization}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Address: {doctor.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Experience: {doctor.experience} years
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fee per visit: {doctor.feePerConsultation} Rs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Timings: {doctor.timings}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Book appointment</Button>
      </CardActions>
    </Card>
  )
}

export default Doctor