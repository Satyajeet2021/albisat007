const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/full-auth');
const {
    showCurrentUser,
    updateUser,
    updateUserPassword,
    bookDemo,
    getDemoList,
    getSingleUser
} = require("../controllers");

router.route("/bookDemo").post(bookDemo);

router.route('/showMe').get(
    authenticateUser,
    showCurrentUser);
router.route('/updateUser').patch(
    authenticateUser,
    updateUser);
router.route('/updateUserPassword').patch(
    authenticateUser,
    updateUserPassword);
router.route('/singleUser').get(
    authenticateUser,
    getSingleUser);

router
    .route("/demoList")
    .get(
        [authenticateUser, authorizePermissions('admin')],
        getDemoList);

module.exports = router;