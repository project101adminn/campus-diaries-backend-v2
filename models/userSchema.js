const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const userSchema = new mongoose.Schema(
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
      validate: [validator.isEmail, 'Provide valid Email Address'],
    },
    contact: {
      type: Number,
      maxLength: 12,
      trim: true,
      validate: [validator.isInt, 'Provide Numbers Only'],
      callingCode: {
        type: mongoose.ObjectId,
        ref: 'CallingCode',
      },
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['STUDENT', 'TEACHER'],
      required: true,
    },
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    // TODO -  WE HAVE TO DECIDE SHOULD WE WANT TO SAVE PASSWORD IN DB OR NOT?
    // * DONE
    password: {
      type: String,
      required: true,
      validate: [validator.isAscii, 'Provide Valid Password'],
    },
    confirmPassword: {
      type: String,
      validate: [validator.isAscii, 'Provide Valid Password'],
    },
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  if (!this.isModified(this.password)) {
    return next();
  }
  this.password = bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
