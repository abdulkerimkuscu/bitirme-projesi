const Products = require('../models/product.js');
const ProductFilter = require('../utils/productFilter.js');
const cloudinary = require('cloudinary').v2
const qs = require('qs');

const allProducts = async(req,res) => {
    
     try {
        const resultPerPage = 10;
        const parsedQuery = qs.parse(req.query);

        const productFilter = new ProductFilter(Products.find(), parsedQuery)
            .search()
            .filter()
            .pagination(resultPerPage);
        const products = await productFilter.query;
        
        res.status(200).json({
            products
        });
    } catch (err) {
        console.error("HATA /products:", err);
        res.status(500).json({ message: err.message });
    }
}

const adminProduct = async(req,res,next) => {

    const products = await Products.find();
    
    res.status(200).json({
        products
    })
} 


const detailProducts = async(req,res) => {
    const product = await Products.findById(req.params.id);

    res.status(200).json({
        product
    })
}

//admin

const createProducts = async(req,res,next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }

    let allImage = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products"
        });

        allImage.push({
            public_id: result.public_id,
            url: result.secure_url
        })
        
    }

    req.body.images = allImage; 
    req.body.user = req.user.id;

    const product = await Products.create(req.body);

    res.status(201).json({
        product
    })
}

const deleteProducts = async(req,res,next) => {
    const product = await Products.findById(req.params.id);
    console.log(product);
    for (let i = 0; i < product.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
        
    }

    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Ürün başarıyla silindi..."
    })
}

const updateProducts = async(req,res,next) => {
    const product = await Products.findById(req.params.id);

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        for (let i = 0; i < product.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
            
        }
    }

    let allImage = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products"
        });

        allImage.push({
            public_id: result.public_id,
            url: result.secure_url
        })
        
    }

    req.body.images = allImage; 


    product = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true},)
    
    res.status(200).json({
        product
    })
}

const createReview = async(req,res,next) => {
    const {productId, comment, rating} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        comment,
        rating: Number(rating)
    }
    const product = await Products.findById(productId);

    product.reviews.push(review);

    let avg = 0;

    product.reviews.forEach(rev => {
        avg += rev.rating;
    });

    product.rating = avg / product.reviews.length;

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        message: "Yorumun Eklendi..."
    }
    )
}

module.exports = {allProducts, detailProducts, createProducts, deleteProducts, updateProducts, createReview, adminProduct }