const { checkSchema } = require('express-validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  checkSchema(
    {
      name: {
        type: String,
        required: true,
        maxLength: 22,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 20,
        isEmail: {
          bail: true,
          errorMessage: 'Invalid Email',
        },
      },
      phone: {
        type: Number,
        maxLength: 12,
        trim: true,
        isInt: {
          errorMessage: 'Invalid Phone Number',
          bail: true,
        },
      },
      department: {
        type: String,
        enum: ['CH', 'CE', 'IT', 'MH', 'CL', 'EC', 'EE'],
        required: true,
      },
      role: {
        type: String,
        enum: ['STUDENT', 'TEACHER'],
        required: true,
      },
      uniqueId: {
        type: Number,
        unique: true,
        required: true,
      },
      // TODO -  WE HAVE TO DECIDE SHOULD WE WANT TO SAVE PASSWORD IN DB OR NOT?
      password: {
        type: String,
        required: true,
        maxLength: 16,
        isAscii: {
          errorMessage: 'Enter valid Password',
        },
      },
      confirmPassword: {
        type: String,
        required: true,
        maxLength: 16,
        isAscii: {
          errorMessage: 'Enter valid Password',
        },
      },
    },
    { timestamps: true },
  ),
);

module.exports = mongoose.model('User', userSchema);
