import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import { type } from "os";


const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

// MongoDb connection
// mongoose.connect("mongodb+srv://sammuaks:_N5_4YNdxTCaCH5@e-shop-app-0.dp5zh.mongodb.net/e-shopApp")
mongoose.connect("mongodb+srv://sammuaks:_N5_4YNdxTCaCH5@e-shop-app-0.dp5zh.mongodb.net/")

// API endpoints
app.get("/", (req, res) => {
    res.send("Express App is running")
})

// Multer engine for image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
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

// Product creation Schema
const Products = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    new_price: {
        type: Number,
        required: true,
    },

    old_price: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    available: {
        type: Boolean,
        default: true,
    },
})

app.post("/addproduct", async (req, res) => {
    let products = await Products.find({});

    let id;

    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id= 1;
    }

    const product = new Products ({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })

    console.log(product);

    await product.save();
    console.log("Product saved successfully");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// API for deleting products
app.post("/removeproduct", async (req, res) => {
    await Products.findOneAndDelete({id: req.body.id});

    console.log("Removed successfully");

    res.json ({
        success: true,
        name: req.body.name,
    })
})

// API that gets all products
app.get("/allproducts", async (req, res) => {
    let products = await Products.find({});
    console.log("Fetched all products");

    res.send(products);
})

// User model schema
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})


// User registration endpoint
app.post('/signup', async (req, res) => {

    let check = await Users.findOne({email: req.body.email});

    if (check) {
        return res.status(400).json({success: false, errors: "Existing user found with same email address"})
    }

    let cart = {};

    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    }

    const token =jwt.sign(data, 'secret_ecom');

    res.json({success: true, token})
})

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    }
    else {
        console.log("Error : " +error);
    }
  });