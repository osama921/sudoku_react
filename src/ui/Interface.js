import React from "react";
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import SchoolSharpIcon from '@mui/icons-material/SchoolSharp';


function Interface({ handleInterface, status, difficultyStatus }) {
  return (
    <div>
      <div className="interface-row">
  <Grid container spacing={5}>
  <Grid item xs="auto" className="footer-text">
    <h3>Generate:</h3>
  </Grid>
  <Grid item xs="auto">
  
  <Button onClick={() => {handleInterface("create-easy");}} className="interface-buttons" variant="text">Easy</Button>
  <Button onClick={() => {handleInterface("create-medium");}} className="interface-buttons" variant="text">Medium</Button>
  <Button onClick={() => {handleInterface("create-hard");}} className="interface-buttons" variant="text">Hard</Button>
  <Button onClick={() => {handleInterface("create-random");}} className="interface-buttons" variant="text">Random</Button>
  <Button  onClick={() => {handleInterface("clear");}} className="interface-buttons clear-button" variant="outlined">Clear</Button>

  </Grid>
</Grid>

<Grid className="margin-top" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
  <ButtonGroup variant="outlined" aria-label="outlined button group">
  <Button onClick={() => {handleInterface("validate");}}  className="interface-buttons validate-button" startIcon={<CheckSharpIcon />}>Validate</Button>
  <Button className="interface-buttons validate-button bold-text" disabled>{status}</Button>
</ButtonGroup>
  </Grid>
  <Grid item xs={6} className="left-aligned ">
  <ButtonGroup variant="outlined" aria-label="outlined button group">
  <Button className="interface-buttons validate-button bold-text" disabled>{difficultyStatus}</Button>
  <Button onClick={() => {handleInterface("validate");}} disabled className="interface-buttons validate-button" endIcon={<SchoolSharpIcon />}>Difficulty</Button>
  
</ButtonGroup>
  </Grid>
</Grid>


<Grid className="margin-top" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={12}>
  <Button size="large" onClick={() => {handleInterface("solve");}} variant="outlined" className="interface-buttons validate-button solve-button">Solve</Button>
  </Grid>
</Grid>
      
      </div>
    </div>

  );
}

export default Interface;
