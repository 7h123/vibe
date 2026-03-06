const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    sparse: true
  },
  username: {
    type: String,
    sparse: true
  },
  password: { type: String, required: true },
  role:     { type: String, default: 'admin' },
  name:     { type: String, default: 'Nova Admin' }
}, { timestamps: true });


AdminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  if (this.password.startsWith('$2a$') ||
      this.password.startsWith('$2b$')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

AdminSchema.methods.comparePassword = async function (plaintext) {
  return bcrypt.compare(plaintext, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);