const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001;
const mongoose = require("mongoose")
const moment = require("moment")

const cors = require('cors');


app.use(cors());

const { MongoClient } = require('mongodb');


var url = "mongodb://localhost:27017/mydb";

mongoose.connect('mongodb://127.0.0.1:27017/mydb').then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


const Resume = mongoose.model('Resume', {
    name: String,
    contact: Number,
    email: String,
    fileName: String,
    filePath: String,
    timestamp: String,
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });


app.post('/api/upload', upload.single('resume'), async (req, res) => {

   

    try {
        const { originalname, filename } = req.file;
        const { name, email, contact } = req.body;


    

        if (!(originalname && name && email && contact && filename)) {
            return res.status(404).send({ 'status': false, 'message': 'data not found! ', data: [] });


        }

        if (!originalname.match(/\.(pdf)$/)) {
            return res.status(404).send('Only pdf files are allowed!');
        }


        const originalDateString = new Date();

      
        const date = new Date(originalDateString);
        
      
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
        
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        });
     

        const created_at = moment(new Date().toISOString()).format() ;
        const resume = await Resume.create({ name: name, email: email, contact: contact, fileName: originalname, filePath: filename,timestamp: `${formattedDate} ${formattedTime}` })

        return res.status(200).send({ 'status': true, 'message': 'File uploaded successfully! ', data: resume });




    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
});



app.get('/api/data', async (req, res) => {
    try {
      const response = await Resume.find({});
      return res.status(200).send({ 'status': true, 'message': 'data found! ', data: response  });

    } catch (error) {
      console.error('something went wrong:', error);
      res.status(500).send('something went wrong');
    }
  });



  app.get('/api/download/:filename', (req, res) => {
    const { filename } = req.params;
    const directoryPath = './uploads';
  
    try {

        return res.download(directoryPath + `/${filename}`, (err) => {
			if (err) {
				return res.status(500).send({ message: "Could not download the file. " + err, });
			}
		})
        
    } catch (error) {
        console.log(error)
		return res.status(500).send({ "status": false, "data": [], "error": error })
    }
    
  });





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
