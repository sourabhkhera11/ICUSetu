import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//creating admin schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, `Email must be atleast 6 character long!`],
    maxLength: [50, `Email must not be longer than 50 character!`],
  },
  password: {
    type: String,
    select: false,
  },
});

//hashing password before saving it to the database
//statics here refer to the model itself, not an instance of the model
adminSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

//validating password before saving it to the database
//methods here refer to an instance of the model
adminSchema.methods.isValidPassword = async function (password) {
  console.log(password, "Stored password:", this.password); // 🔍 Debugging line
  return await bcrypt.compare(password, this.password);
};

//generating JWT token for authentication
//jwt works by signing a payload with a secret key
adminSchema.methods.generateJWT = function () {
  return jwt.sign(
    { email: this.email }, //This function creates (signs) a new JWT token.The data you embed inside the token.(payload)
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

//creating a model from the schema
const Admin = mongoose.model("admin", adminSchema);

export default Admin;
