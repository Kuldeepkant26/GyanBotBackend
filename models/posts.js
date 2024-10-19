const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,

        default: "https://i.pinimg.com/736x/3d/e8/47/3de84746f8f146a18edbf4149f46fb87.jpg"
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    likes: {
        type: Number,
        default: 0,
        required: false
    }
})

module.exports = mongoose.model('Posts', postSchema);