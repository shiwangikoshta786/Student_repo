
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
    makeStyles,
    Card,
    CardHeader,
    Grid,
    CardContent,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TableContainer,
    CircularProgress,
    Divider,
    Typography,
    TextField,
  
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    Table
  
  } from "@material-ui/core";
  import { styled } from '@mui/material/styles';
  import { green } from '@mui/material/colors';
  import axios  from 'axios';


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));


function Portal(){

    const[filename , setFileName]= useState("")
    const [data,setData]=useState([]);
 const history =useHistory()
 async function fetchData(){


  const fetchOptions = {
    method: "GET",
    headers: {
        "Access-Control-Allow-Origin":"*"
    },
   
  };
  // make request
  const request = await fetch(`http://localhost:3001/api/data`, fetchOptions);
 
  const response = await request.json();

 console.log(response.data)

 setData(response.data)

    

   
}



  async function handleDownload(fileName){

    console.log(fileName)


    const fetchOptions = {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin":"*"
        },
       
      };
     
    window.open(`http://localhost:3001/api/download/${fileName}`, '_blank');
    }



useEffect(()=>{
    fetchData()
},[])

return(

<>


<Grid container

xs={12}
sm={12}
md={12}
lg={12}

>
 <Grid item
 
 
xs={12}
sm={12}
md={12}
lg={12}

 >
<Button variant="outlined" color="primary" onClick={()=>history.push("/")}>Back to Login</Button>

 </Grid>
</Grid>

<Card>

      
            <CardContent >
              <Grid>


                <TableContainer >
                  <Table >
                    <TableHead style={{
                      background: '#fff',
                      padding: '5px 10px',
                      width: '70vw',
                      marginLeft: '8vw',
                    }}>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Contact Number
                        
                        </TableCell>
                        <TableCell align="center">Email ID</TableCell>
                        <TableCell align="center">Date & Time</TableCell>
                        <TableCell align="center">Download</TableCell>
               
                      </TableRow>
                     
                    </TableHead>
                   
                    <TableBody>
                    {data.map((elem)=>(
                      <TableRow>
               

              
                     <TableCell align="center">{elem.name}</TableCell>
                        <TableCell align="center">{elem.contact}</TableCell>
                        <TableCell align="center">{elem.email}</TableCell>
                        <TableCell align="center">{elem.timestamp}</TableCell>
                       
                        <TableCell align="center"><ColorButton variant="contained" size="small" onClick={()=>handleDownload(elem.filePath)}>Download</ColorButton></TableCell>
                 
                      </TableRow>
  ))
}
                    </TableBody>
                     
                  </Table>
                </TableContainer>
              </Grid>

            </CardContent>


          
        </Card>

</>

)

}

export default Portal;