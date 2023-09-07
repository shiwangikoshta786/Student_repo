import React from 'react'
import img from '../Images/MicrosoftTeams-image.png'
import {
  Divider,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Input,
} from "@material-ui/core";

export default function Error() {
  return (
   <>
<Box>
 <Paper  style={{ margin: "2rem" }} >
<Grid container

xs={12}
sm={12}
md={12}
lg={12}
justifyContent='center'

alignItems='center'
>

  <Grid  item
  xs={12}
  sm={12}
  md={5}
  lg={5}
  
  >
 <img src={img} alt="error message"  style={{
             
             margin: "2rem",
             marginBottom: "1rem",
           }}
           padding="1rem"
           width="80%"

/>
  </Grid>


   
  </Grid>
  </Paper>
  </Box>
  </>
  
  )
}
