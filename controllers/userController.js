const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const User = require("../models/User");
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} = require('../utils/index');
const Demo = require("../models/Demo");

const showCurrentUser = async (req, res) => {
    console.log("showCurrentUser", req.user)
    res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
    const { email, name, phone } = req.body;
    console.log("updateUser", req.body);
    if (!email || !name || !phone) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId });

    user.email = email;
    user.name = name;
    user.phone = phone

    await user.save();
    console.log("updatedUser", user);
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({
        user: tokenUser
    });
};

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({ _id: req.user.userId });
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

const bookDemo = async (req, res) => {
    const {
        fName,
        lName,
        email,
        jobTile,
        companyName,
        phoneNumber,
        industry,
        country,
        areaOfInterest,
        comments
    } = req.body;
    if (!email) {
        throw new CustomError.BadRequestError('Please provide both values');
    }

    const demo = await Demo.create({
        fName,
        lName,
        email,
        jobTile,
        companyName,
        phoneNumber,
        industry,
        country,
        areaOfInterest,
        comments
    });
    res.status(StatusCodes.CREATED).json({ msg: "Success! Demo Request Placed" });
}

const getDemoList = async (req, res) => {
    const demoList = await Demo.find({});
    res.status(StatusCodes.OK).json({ msg: "Success! Demo List Fetched", body: demoList });
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId }).select('-password');
    console.log("user", user);
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({ msg: "Success!", body: user });
};

module.exports = {
    showCurrentUser,
    updateUser,
    updateUserPassword,
    bookDemo,
    getDemoList,
    getSingleUser
}