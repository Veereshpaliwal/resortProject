const express=require("express")
const {check,validationResult}=require("express-validator")
const router=express.Router()

const { signout,signup,signin,isSignedIn}=require("../controllers/auth")



router.post("/signup",
[
    check("name","name must have 3 char").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","min length is 3 char").isLength({min:3,max:9})
]
,signup)



router.post("/signin",
[
    check("email","Email is required").isEmail(),
    check("password","min length is 3 char").isLength({min:3,max:9})
]
,signin)

router.get("/signout",signout)

router.get("/testroute",isSignedIn,(req,res)=>{
res.json(req.auth);
})

module.exports=router;