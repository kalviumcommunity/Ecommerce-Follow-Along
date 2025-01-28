import express, { json } from 'express';
const mongoose = require('mongoose');
import multer, { diskStorage } from 'multer';
import useModel from './model/user.model.js';
import { hash as _hash } from 'bcrypt';
import cors from 'cors';
import usemodel from './model/user.model.js';

let connection = () => {
  mongoose.connect(
    "mongodb+srv://sreedhilpavishanker:Sreedhil@2005@cluster0.ecofr.mongodb.net/EcomDB"
  );
};

const app = express();

app.use(json())
app.use(cors())

app.get("/ping", (req, res) => {
  res.send("pong");
});

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("myFile"), (req, res) => {
  try {
    console.log(req.file);
    res.send({ message: "file uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send({ error: "error" });
  }
});

app.post("/Signup", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const userPresent = await useModel.findOne({email});

  if (userPresent) {

  }

  const new_password = await bcrypt.hash(password, 8)


  // User.findOne({ email: 'example@example.com' }, function(err, user) { if (err) { console.error(err); } else { console.log(user); } });

  // if (!userPresent?.email) {
  //   res.send("Try logging in, already exist");
  // } else {
    // try {
    //   // bcrypt.hash(password, 4, async function (err, hash) {
    //   //   const user = new useModel({ name, email, password: hash });
    //   //   await user.save();
    //   //   res.send("Sign-up successfully");
    //   });
    // } catch (err) {
    //   console.log(err);
    //   res.send("Something went wrong, please try again later");
    // }
  // }
});

app.post("/Login", async(req,res)=>{
  const {email,password}=req.body;
  try{
    let user = await usemodel.find({email});

    if (user.length>0){
      let hashedpassword = user [0].password;
      bcrypt.compare(password,hashedpassword, function(err,result){
        if(result){
          const token = jwt.sign({"userID":user[0],_id},process.env.SECRET_KEY);
          res.send({"mesg":"Login Successful","token":token})
        }else{
          res.send("Login failed! Enter the correct password")
        }
      })
    }else{
      res.send("Login failed! Enter the correct Password")
    }
  }catch(error){
    res.json({"Message":"Something went wrong!",error})
  }
})

const port = 8080;

app.listen(port, async () => {
  try {
    await connection;
    console.log("Hurray! Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running on port ${port}`);
});
