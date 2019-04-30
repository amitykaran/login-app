const mongoose = require('mongoose');
const schema = mongoose.Schema;

const signupSchema = new schema({
    name: String,
    email: String,
    phone: String,
    password: String
});

module.exports = mongoose.model('Signup', signupSchema);