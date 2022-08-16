const { PrismaClient } =require('@prisma/client')
const prisma = new PrismaClient()

async function getProducts(req,res,next){
    try{
        res.json(await prisma.products.findMany())
    }
    catch(err){
        console.log('error while getting all products',err.messsage)
        next(err)    
    }
}

async function getProductById(req,res,next){
    let product_id= parseInt(req.params.id)
    try{
        let product_details=await prisma.products.findUnique({
            where :{
                id : product_id
            },
        })
        if (product_details)
            res.json(product_details)
        else
            res.send("No Such ID found")
    }
    catch(err){
        console.log("error in getting product",err.messsage)
        next(err)
    }   
}

async function createProduct(req,res,next){
    let { name, description, quantity, category, image, price,  variants}= req.body
    try {
        let product =await prisma.products.create({
            data : {
                name,
                description,
                quantity,
                image,
                category,
                price,
                variants
            }
        })
        res.json(product);
    }
    catch(err){
        console.log("error in creating a product",err.messsage);
        next(err)
    }
}

async function getProductReviews(req,res,next){
    try{
        let product_ratings= await prisma.products.findUnique({
            where : {
                id : parseInt(req.params.id)
            },
            select :{
                ratings: true
            }
        })
        res.json(product_ratings)
    }
    catch(err){
        console.log("error in getting reviews by id",err.messsage)
        next(err)
    }
}

async function createReviewForProductId(req,res,next){
    try{
        var product_id=parseInt(req.params.id)
        const { name,review,rating } = req.body;

        let newReview= await prisma.ratings.create({
            data : {
                product_id,
                name,
                rating,
                review 
            }
        })

        let allReviews= await prisma.ratings.findMany({
            where : {
                product_id : product_id
            }
        })

        res.json(allReviews)
    }
    catch(err){
        console.log("error in creating review for product by ID",err.messsage)
        next(err)
    }
}
module.exports= {getProducts,getProductById,createProduct,getProductReviews,createReviewForProductId}