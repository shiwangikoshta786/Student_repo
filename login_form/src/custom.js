import React, { useEffect, useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardContent, Typography, makeStyles, Grid, TextField, Box, } from '@material-ui/core';
import UploadIcon from '@mui/icons-material/Upload';
import  { useRef } from 'react'; 
// import Logo from './assets/images/download.png';
// import { auth_user } from '../utils/helper';

// import mark from './assets/images/MicrosoftTeams-image.png'
import Modal from "@mui/material/Modal";

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

const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    color: "#4285F4",
    p: 4,
    borderRadius: "5px",
  };
  



const Custom = () => {
    let history = useHistory();
    const classes = useStyles();
    const [msg, setMsg] = useState("")
    const [empno, setEmpno] = useState("")
    const [email, setEmail] = useState("")
    const [file,setFile]= useState("")
    const[contact,setContact]=useState("")
    const[check, setCheck]=useState()
    const [open, setOpen] = React.useState(false);
    const[selectedFileName,setSelectedFileName]=useState(null)
   const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 

        }
    }


  function handleChange(event) {
const check =event.target.files.length

const filename = event.target.files[0];
        setFile(event.target.files[0])
        setCheck(check);
        if (filename) {
            setSelectedFileName(file.name); 
        }
    
      
      }
    

      
    
    const submitSignIn = async (e) => {
        let ErrorMsg=" ";

        if (empno === ''  && email === ''  &&  contact=='') {
            ErrorMsg="Please Enter all details !! "
            setMsg(ErrorMsg)
             return false;
          }

          if(check==undefined){
            ErrorMsg="Please select resume ! !"
            setMsg(ErrorMsg)
             return false;
          }
          
      const checkfile = file.name
      if(!checkfile.match(/\.(pdf)$/)){
        ErrorMsg="Please select pdf file ! !"
        setMsg(ErrorMsg)
        return false;
      }


          var formdata = new FormData();
          formdata.append("resume", file);
          formdata.append("name", empno);
          formdata.append("email", email);
          formdata.append("contact", contact);
          
          var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            mode: 'no-cors',
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Request-Headers": 'Content-Type, Authorization'
    
            }
          };
          
          fetch("http://localhost:3001/api/upload", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("successfully uploaded!!")
                setOpen(true)
                setTimeout(()=>{
                    setOpen(false)
                    history.push("/")
                    window.location.reload()
                },2000)

                
            }).catch(error => console.log('error', error));
      
    }
    return (
        <>

<Modal
        sx={{
          backdropFilter: "blur(3px)",
       
        }}
        open={open}
   
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Button
            size="small"
            style={{
              float: "right",

              fontWeight: "bold",

              color: "black",
              borderRadius: "8px",
            }}
           
          ></Button>
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              fontWeight: "bold",
              marginLeft: "160px",
              fontFamily: "monospace",
            }}
          >
            Success!
          </Typography>

          <Typography
            id="modal-modal-description"
            style={{
              fontWeight: "bold",
              marginLeft: "98px",
              fontFamily: "monospace",
              marginBottom: "30px",
            }}
            sx={{ mt: 2 }}
          >
            Data Uploaded Successfully!
          </Typography>
        </Box>
      </Modal>


        <Grid container justify="center" alignItems="center" className={classes.root+" loginBgImage"}>
            <Grid item xs={11} sm={7} md={6} lg={4}>
    


                <Card className={classes.card +" blurcard"}>
                    <CardContent className={classes.content}>     
                        <Grid container direction="column" spacing={4} justify="center">
                            <Grid item xs={12} className={"p-bt"}>
                                <Grid container justifyContent="center"  direction="column">

                                <Grid item>          
                                <Typography color="primary" gutterBottom variant="h4" >
                                Welcome User
                                </Typography> 
                                        
                                    </Grid>
                                    <Grid item>          
                                  <Typography color="primary" gutterBottom variant="h5" >
                         Fill up the details
                                  
                                 </Typography>
                                       
                                        
                                    </Grid>
                                    
                                    {/* <img  style={{"paddingLeft":"180px", height:"60px", weight:"60px"}}  src={mark} alt="Logo"></img> */}
                                    <Grid item>
                                        <RouterLink to="/" className={classes.icon}>
                                            {/* <img alt="Auth method" className={classes.logo} src={Logo} /> */}

                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={"p-tp"}>

                            <form>
                            <TextField
                                 
                                 fullWidth
                                 autoFocus
                                 label="Name"
                                 margin="normal"
                                 name="Name"
                                 type="text"
                                 defaultValue={empno}
                                 variant="outlined"
                                 onChange={(e) => setEmpno(e.target.value)}
                                 
                            />
                         

<TextField
                                 fullWidth
                                 label="Conatct no."
                                 margin="normal"
                                 name="Conatct no."
                                 type="Conatct no."
                                 defaultValue={contact}
                                 variant="outlined"
                                 onChange={(e) => setContact(e.target.value)}
                                required = "true"/>

<TextField
                                 fullWidth
                                 label="Email"
                                 margin="normal"
                                 name="Email"
                                 type="Email"
                                 defaultValue={email}
                                 variant="outlined"
                                 onChange={(e) => setEmail(e.target.value)}
                             required = "true"/>

<Button variant="outlined" fullWidth    onClick={handleButtonClick}  startIcon={<UploadIcon />}>

       {selectedFileName || "Upload Resume"} 

<input type="file" onChange={handleChange}

ref={fileInputRef} 

style={{ display: 'none' }} 
/>
            </Button>


                             {(msg)?
                                 <Typography variant="body2" color="Error">{msg}</Typography>
                             :
                                 ""
                             }
                             <Button 
                                 margin="normal" 
                                 fullWidth 
                                 variant="contained" 
                                 color="primary" 
                                 className={classes.loginbtn} 
                                 onClick={(e) => submitSignIn(e)}
                                 >Submit</Button>
                            </form>
                                
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </>
    );
};

export default Custom;
