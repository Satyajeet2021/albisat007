const {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
} = require("./authController");

const {
    homeController
} = require("./homeController");

const {
    showCurrentUser,
    updateUser,
    updateUserPassword,
    bookDemo,
    getDemoList,
    getSingleUser
} = require("./userController");

const {
    addBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinessList,
    getSingleBusiness
 } = require("./adminController");

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,

    homeController,

    showCurrentUser,
    updateUser,
    updateUserPassword,
    bookDemo,
    getDemoList,
    getSingleUser,

    addBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinessList,
    getSingleBusiness
}
