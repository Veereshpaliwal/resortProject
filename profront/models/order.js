const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;
const ProductcartSchema=new mongoose.Schema(
    {
      product:
      {
          type:ObjectId,
          ref:"Product"
      },
      name:String,
      count:Number,
      price:Number,

    }
)
const ProductCart=mongoose.model("ProductcartSchema",ProductcartSchema)
const orderSchema=new mongoose.Schema(
    {
        product:
        {
          type:[ProductcartSchema],
        
        },
        transaction_id:
        {},
        amount: {type:Number},
        address: String,
        status: {
            type:String,
            default:"Received",
            enum:["Cancelled","Processing","Received","Delivered","Shipped"]
        },
        updated: Date,
         user: {
             type:ObjectId,
             ref: "User"
         },
         

    },
    {
        timestamps:true
    }
) 
const Order=mongoose.model("orderSchema",orderSchema)
module.exports={Order,ProductCart};