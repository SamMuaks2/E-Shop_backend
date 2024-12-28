import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";


const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

// MongoDb connection
mongoose.connect("mongodb+srv://sammuaks:broski2024@e-shop-app-0.dp5zh.mongodb.net/e-shopApp")

// API endpoints
app.get("/", (req, res) => {
    res.send("Express App is running")
})

// Multer engine for image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// Image upload endpoint
app.use("/images", express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    }
    else {
        console.log("Error : " +error);
    }
  });