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




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });