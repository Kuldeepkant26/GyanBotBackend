const Posts = require('../models/posts.js')
const Users = require('../models/users.js')


module.exports.addPostController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        console.log(user);

        const { title, description } = req.body;

        const fileUrl = req.file.path;  // URL of the uploaded file
        const newpost = new Posts({
            title, description,
            image: fileUrl,
            owner: user._id
        });

        user.posts.push(newpost._id);
        await newpost.save();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Post uploaded"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to upload"
        });
    }
}

module.exports.getPostsController = async (req, res) => {
    try {
        const posts = await Posts.find().populate({path:'owner'});
        res.status(200).json({
            success: true,
            message: "Fetched all posts",
            posts
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch"
        });
    }
}