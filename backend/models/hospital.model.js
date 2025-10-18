import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator, { trim } from "validator";
/* Schema level validations 
1)Must check for maximum and minimum such that no one can missuse the space of database my enter any length of data 
2)Mongoose recognizes validate as a built-in option of a schema path. validate is a keyword whose parameter contain the value and is always executed before entring the value in the database
3)Used the timestamps:true for denoting the time it is made 
4)Remember the model name : model name is used to create a reference in another schema 
5)Select : false -> which is used to stop displaying the field when try to find it using mongoose query
6)validator.isHash() for checking the correct password
 */
//Creating hospital schema
const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [3, "hospitalName must be atleast 3 character long"],
      maxLength: [35, "hospitalName must be not be greater than 35 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid Email!");
        }
      },
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
      lowercase: true,
      trim: true,
      enum: ["private", "government"],
    },
    icuBeds: {
      type: Number,
      required: true,
      min: 5,
      max: 250,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, `Address must be atleast 6 character long!`],
      maxLength: [50, `Address must not be longer than 50 character!`],
    },
    state: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: [3, `state must be atleast 3 character long!`],
      maxLength: [30, `state must not be longer than 30 character!`],
    },
    city: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minLength: [3, `city must be atleast 3 character long!`],
      maxLength: [30, `city must not be longer than 30 character!`],
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, `pincode must be atleast 6 character long!`],
      maxLength: [6, `pincode must not be longer than 6 character!`],
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [6, `registrationno must be atleast 6 character long!`],
      maxLength: [30, `registrationno must not be longer than 30 character!`],
    },
    registrationFile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Not a valid file!");
        }
      },
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [6, `lno must be atleast 6 character long!`],
      maxLength: [30, `lno must not be longer than 30 character!`],
    },
    licenseFile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Not a valid file!");
        }
      },
    },
    adminName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: [3, `Admin name must be atleast 3 character long!`],
      maxLength: [50, `Admin name must not be longer than 50 character!`],
    },
    adminID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Not a valid ID!");
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 500,
      trim: true,
      required: true,
      select: false,
      validate(value) {
        if (!validator.isHash(value)) {
          throw new Error("Not a valid password!");
        }
      },
    },
    isVerified: { type: Boolean, default: false },
    bedManagementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BedManagement",
    },
  },
  { timestamps: true }
);

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
    {
      _id: this._id,
      email: this.email,
      role: "hospital",
    }, //This function creates (signs) a new JWT token.The data you embed inside the token.(payload)
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

//creating a model from the schema
const hospital = mongoose.model("hospital", hospitalSchema);

export default hospital;
