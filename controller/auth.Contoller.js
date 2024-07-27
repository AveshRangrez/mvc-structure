const express = require("express");
const authController = express.Router();
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const multer = require("multer");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(session({
//     secret: "webslesson",

//     saveUninitialized: false,

//     resave: false
// })
// );
// app.use(flash());

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "Images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    console.log('file/upload/', file.originalname);
    // cb(null, "one.jpg")
    console.log("Images/Images", file);
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Images')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage: storage });

app.set("view engine", "ejs");

authController.get("/upload", (req, res) => {
  res.render("uploadimg.ejs");
  console.log("Get Successfully");
});

authController.post("/upload", imageUpload.single("image"), (req, res) => {
  res.send("Image Uploaded");
});

authController.get("/photos/upload", (req, res) => {
  res.render("multipleupload.ejs");
  console.log("Get Successfully");
});

authController.post(
  "/photos/upload",
  imageUpload.array("imgUploader", 10),
  (req, res, next) => {
    let err;
    if (err) {
      throw err;
    } else {
      res.send("File upload successfully");
      console.log("File upload ");
    }
  }
);

module.exports = authController;

// const { login } = require('../services/auth.service');
// const { sign } = require('../utils/auth.utils');

// authController.post('/userlogin', async (req, res, next) => {
//     const logindetails = await login(req.body);
//     console.log(logindetails);

//     let errors = [];

//     if (!logindetails) {
//         errors.push({ message: "Please enter the correct details" });
//         console.log("Please enter the correct details");

//     } else {
//         const token = await sign(req.body);
//         res.status(200).send({
//             res: token,
//             status: 200,
//             message: 'succesfully added'
//         })
//         console.log(token);
//     }
// })
