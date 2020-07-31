const mongooes=require("mongoose")
const crypto=require("crypto")
const uuidv1=require("uuid/v1")
var userSchema=new mongooes.Schema({
    name:
    {
        type:String,
        maxlength:32,
        required: true,
        trim:true,
    },
    lastname:
    {
        type:String,
        trim:true,
        maxlength:30,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    //TODO come back
    userinfo:
    {
         type:String,
         trim:true,
    },
    encry_password:
    {
        type:String,

    },
    salt:String,
    role:
    {
        type:'Number',
        trim:true,
        default:0
    },
    purchases:
    {
        type:Array,
        default:[],
    }

    
},{
    timestamps:true,
});

userSchema.virtual("password")
.set(function(password)
{
      this._password=password
      this.salt=uuidv1()
     this.encry_password=this.securedPassword(password)

    }
)
.get(function(){
 return this._password

})
userSchema.methods ={
    authenticate:
    function(plainpassword)
    {
        return this.securedPassword(plainpassword)===this.encry_password
    },
    securedPassword: function(plainpassword)
    {
        if(!plainpassword) return "";
        try
        {
        
         return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex");    
        
        
        }
        catch(err)
        {
            return "";
        }
    }
}



module.exports=mongooes.model("User",userSchema);