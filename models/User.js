const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
//Es6
const { Schema } = mongoose;

// googleId will be String Type
const userSchema = new Schema({
    googleId: String
});

//Creating Users collections in model class
mongoose.model('users', userSchema);