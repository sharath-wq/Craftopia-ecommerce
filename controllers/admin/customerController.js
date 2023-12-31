const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const validateMongoDbId = require("../../utils/validateMongodbId");
const { roles } = require("../../utils/constants");

/**
 * Customers Page Route
 * Method GET
 */
exports.customerpage = asyncHandler(async (req, res) => {
    try {
        const messages = req.flash();
        const users = await User.find({ role: roles.user });
        res.render("admin/pages/customer/customers", { title: "Customer", users, messages });
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * View a Customer Page Route
 * Method GET
 */
exports.viewCustomer = asyncHandler(async (req, res) => {
    try {
        const messages = req.flash();
        const id = req.params.id;
        validateMongoDbId(id);
        const user = await User.findById(id);
        res.render("admin/pages/customer/customer", { title: "Customer", user, messages });
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * Block Customer
 * Method PUT
 */
exports.blockCustomer = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const blockedCustomer = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        if (blockedCustomer) {
            req.flash("success", `${blockedCustomer.email} Blocked Successfully`);
            res.redirect("/admin/customers");
        } else {
            req.flash("danger", `Can't block ${blockedCustomer}`);
            res.redirect("/admin/customers");
        }
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * Unblock Customer
 * Method PUT
 */
exports.unblockCustomer = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const unblockCustomer = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        if (unblockCustomer) {
            req.flash("success", `${unblockCustomer.email} Unblocked Successfully`);
            res.redirect("/admin/customers");
        } else {
            req.flash("danger", `Can't Unblock ${unblockCustomer}`);
            res.redirect("/admin/customers");
        }
    } catch (error) {
        throw new Error(error);
    }
});
