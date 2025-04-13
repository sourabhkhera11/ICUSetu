import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Creating hospital schema
const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, `Email must be atleast 6 character long!`],
    maxLength: [50, `Email must not be longer than 50 character!`],
  },
  contact: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [10, `contact must be atleast 10 character long!`],
    maxLength: [10, `contact must not be longer than 10 character!`],
  },
  hospitalType: {
    type: String,
    required: true,
    enum: ["private", "government"],
  },
  icuBeds: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
    minLength: [6, `Address must be atleast 6 character long!`],
    maxLength: [50, `Address must not be longer than 50 character!`],
  },
  state: {
    type: String,
    required: true,
    lowercase: true,
    minLength: [3, `state must be atleast 3 character long!`],
    maxLength: [50, `state must not be longer than 50 character!`],
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: [3, `city must be atleast 6 character long!`],
    maxLength: [50, `city must not be longer than 50 character!`],
  },
  pincode: {
    type: String,
    required: true,
    minLength: [6, `pincode must be atleast 6 character long!`],
    maxLength: [6, `pincode must not be longer than 6 character!`],
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,

    minLength: [6, `registrationno must be atleast 6 character long!`],
    maxLength: [50, `registrationno must not be longer than 50 character!`],
  },
  registrationFile: {
    type: String,
    required: true,
    unique: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    minLength: [6, `lno must be atleast 6 character long!`],
    maxLength: [50, `lno must not be longer than 50 character!`],
  },
  licenseFile: {
    type: String,
    required: true,
    unique: true,
  },
  adminName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [3, `Admin name must be atleast 3 character long!`],
    maxLength: [50, `Admin name must not be longer than 50 character!`],
  },
  adminID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  isVerified: { type: Boolean, default: false },
});

//hashing password before saving it to the database
//statics here refer to the model itself, not an instance of the model
hospitalSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

//validating password before saving it to the database
//methods here refer to an instance of the model
hospitalSchema.methods.isValidPassword = async function (password) {
  console.log(password, "Stored password:", this.password); // 🔍 Debugging line
  return await bcrypt.compare(password, this.password);
};

//generating JWT token for authentication
//jwt works by signing a payload with a secret key
hospitalSchema.methods.generateJWT = function () {
  return jwt.sign(
    { email: this.email }, //This function creates (signs) a new JWT token.The data you embed inside the token.(payload)
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

//creating a model from the schema
const hospital = mongoose.model("hospital", hospitalSchema);

export default hospital;
