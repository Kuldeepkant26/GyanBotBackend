const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Trim whitespace from the name
    },
    grade: {
        type: String,
        required: true,
        trim: true // Trim whitespace from the grade
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email uniqueness
        lowercase: true, // Store email in lowercase
        trim: true // Remove leading/trailing whitespace
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Customer", // Fix typo from "Costumer"
        enum: ['Admin', 'Customer'] // Restrict role values
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts"
        }
    ]
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Users', userSchema);
