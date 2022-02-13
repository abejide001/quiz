const { hashPassword } = require('../../utils/password');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
    timestamps: true
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await hashPassword(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
