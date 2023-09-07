import React, { useState ,useEffect} from 'react';
import './App.css';
import { Container, Paper, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import {  Card, CardContent, Typography, makeStyles, Grid, TextField } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AccountCircle, School, Work } from '@mui/icons-material';
import {useHistory,Link as RouterLink } from "react-router-dom"
import Custom from './custom';
// import Logo from './assets/images/download.png';
const useStyles = makeStyles((theme) => ({
  root: {
      height: '100vh',
      minHeight: '100%'
  },
  backButton: {
      marginLeft: theme.spacing(2),
  },
  card: {
      overflow: 'visible',
      display: 'flex',
      position: 'relative',
      '& > *': {
          flexGrow: 1,
          flexBasis: '50%',
          width: '50%',
      },
      maxWidth: '475px',
      margin: '24px auto'
  },
  content: {
      padding: theme.spacing(4, 3, 5, 3) +"!important",
  },
  forgot: {
      textDecoration: 'none',
      paddingLeft: '16px',
  },
  margin: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
  },
  logo: {
      width: '150px'
  },
  loginbtn: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(1.5),
  }
}));



function Login() {
  const [userType, setUserType] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("")
  const history = useHistory();
const[check, setCheck]= useState(false)

const classes = useStyles();


  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };


  const handleSubmit = (e) => {
  
    e.preventDefault();  
    console.log(`User Type: ${userType}`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    let ErrorMsg=" ";
   
    if (username === ''  && password === '') {
      ErrorMsg="Please Enter username ID and Password !!"
      setMsg(ErrorMsg)
       return false
    }

    let hours = 1; 
    let now = new Date().getTime();
    if(userType=="student" && username && password){
    
      localStorage.setItem("AUTH_DATA", JSON.stringify({token: "123456", username: username}));
           history.push("/detail");
      
    }else if(userType=="teacher" && username && password){
      localStorage.setItem("AUTH_DATA", JSON.stringify({token: "123456", username: username}));
      history.push("/table");
    }

    setTimeout(()=>{

      localStorage.clear()
      history.push("/")
    },300000)

  }



  return (


    <>


<Grid container justifyContent="center" alignItems="center" className={classes.root+" loginBgImage"}>
            <Grid item xs={11} sm={7} md={6} lg={4}>
            {/* <img  style={{display: "block",
    margin: "auto",paddingBotom:"2rem"}}  src={Logo}   alt="Logo"></img> */}

                   
                <Card className={classes.card +" blurcard"}>
                    <CardContent className={classes.content}>     
                  
                  <Grid
                  container
                  direction="column"
                  justifyContent='center'
                  alignItems="center"
                  marginBottom="2rem"
                  xs={12}
                  md={12}
                  lg={12}
                  sm={12}
                  >

                    <Grid item
                 xs={12}
                 md={12}
                 lg={12}
                 sm={12}
                    
                    >
                        <AccountCircleIcon fontSize="large" color="primary" />

                    </Grid>

                    <Grid item
                    xs={12}
                    md={12}
                    lg={12}
                    sm={12}
                    >
                      <Typography variant="h5" component="div" color="primary">
                Login 
              </Typography>


                    </Grid>

                  </Grid>
 

            
         
         
             
            



          <form onSubmit={handleSubmit}>

            <FormControl component="fieldset">
              <RadioGroup
                aria-label="userType"
                name="userType"
                value={userType}
                onChange={handleUserTypeChange}
              >

                <Grid
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                 marginTop="2rem"
                    spacing={2}
                  justifyContent={"center"}
                  alignItems={"center"}

                >

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                  >

                    <Button endIcon={<School />}>
                      <FormControlLabel value="student" control={<Radio />} label="Student" />
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                  >
                    <Button endIcon={<Work />}>
                      <FormControlLabel value="teacher" control={<Radio />} label="Teacher" /></Button>

                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>

           

                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
            


                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

            

              {(msg)?
                 <Typography variant="body1" color="error">{msg}</Typography>
                             :
                                 ""
                             }
             
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Login
                </Button>
          </form>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </>
  );
}

export default Login;
