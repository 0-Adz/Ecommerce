const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minLength: [3, "Name should be greater than 3 characters"],
    maxLength: [30, "Name should be lesser than 30 characters"],
  },

  email: {
    type: String,
    unique: true,
    validator: [validator.isEmail, "Please enter a valid email"],
    required: [true, "Please enter your email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [7, "Password should be greater than or equal to 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role:{
    type:String,
    default:"user"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next){

  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password,10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare Password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
};

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
 
  // Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now()+ 15 * 60 * 1000;

  return resetToken;
};


module.exports = mongoose.model("User",userSchema);