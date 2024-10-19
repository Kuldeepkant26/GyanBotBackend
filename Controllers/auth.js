const Users = require('../models/users');
const ExpressError = require('../Utils/ExpressError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signupController = async (req, res) => {
    try {

        let { name, email, password, grade } = req.body;
        const user = await Users.findOne({ email: email });
        if (user) {
            return res.status(401).json({ success: false, message: "email already ragistered" });
        }
        let salt = await bcrypt.genSalt(10)
        let encrypt = await bcrypt.hash(password, salt)

        let newUser = new Users({
            name, email, password: encrypt, grade
        })
        await newUser.save();
        let token = jwt.sign({ U_id: newUser._id }, process.env.JWT_SECRET);
        return res.status(201).json({
            success: true,
            message: "Signup successfully",
            newUser,
            token

        })
    } catch (error) {

    }
}

exports.loginController = async (req, res) => {
    let { email, password } = req.body;
    let user = await Users.findOne({ email });
    if (!user) {
        return res.status(401).json({    // Always use return statement  to stop further execution after sending response
            success: false,
            message: "Email not ragistered"
        });
    }
    let compare = await bcrypt.compare(password, user.password);
    if (compare) {
        let token = jwt.sign({ U_id: user._id }, process.env.JWT_SECRET);
        return res.status(201).json({
            success: true,
            message: 'Logedin successfully',
            user,
            token
        })
    } else {
        res.status(401).json({
            success: false,
            message: "Incorrect Password"
        });
    }
}

exports.getuserController = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        const decode = jwt.decode(token);
        const user = await Users.findById({ _id: decode.U_id }).populate({ path: 'posts' })
        return res.status(201).json({
            success: true,
            message: "user data fetched successfully",
            user
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Some error while fetching user info in getuser",
        });
    }
}