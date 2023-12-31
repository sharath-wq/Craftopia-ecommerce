const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const { roles } = require("../../utils/constants");
const validateMongoDbId = require("../../utils/validateMongodbId");

/**
 * Home Page Route
 * Method GET
 */
exports.homepage = asyncHandler(async (req, res) => {
    try {
        /**
         * TODO: check the token and redirect to admin page or login page according to token
         */
        res.redirect("/admin/dashboard");
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * Dashborad Page Route
 * Method GET
 */
exports.dashboardpage = asyncHandler(async (req, res) => {
    try {
        const messages = req.flash();
        const user = req?.user;
        res.render("admin/pages/admin/dashboard", { title: "Dashboard", user, messages });
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * Settings Page Route
 * Method GET
 */
exports.settingspage = asyncHandler(async (req, res) => {
    try {
        res.render("admin/pages/admin/settings", { title: "Settings", user: req.user });
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * Admins Page Route
 * Method GET
 */
exports.adminpage = asyncHandler(async (req, res) => {
    try {
        const messages = req.flash();
        const admins = await User.find({ role: { $in: [roles.admin, roles.superAdmin] } });
        res.render("admin/pages/customer/admins", { title: "Admins", admins, messages });
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * Block Customer
 * Method PUT
 */
exports.blockAdmin = asyncHandler(async (req, res) => {
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
            res.redirect("/admin/admins");
        } else {
            req.flash("danger", `Can't block ${blockedCustomer}`);
            res.redirect("/admin/admins");
        }
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * Unblock Customer
 * Method PUT
 */
exports.unblockAdmin = asyncHandler(async (req, res) => {
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
            res.redirect("/admin/admins");
        } else {
            req.flash("danger", `Can't Unblock ${unblockCustomer}`);
            res.redirect("/admin/admins");
        }
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * View a Admin Page Route
 * Method GET
 */
exports.viewAdmin = asyncHandler(async (req, res) => {
    try {
        const messages = req.flash();
        const id = req.params.id;
        validateMongoDbId(id);
        const user = await User.findById(id);
        res.render("admin/pages/customer/customer", { title: "Admins", user, messages });
    } catch (error) {
        throw new Error(error);
    }
});

/**
 * Sales Report Page Route
 * Method GET
 */
exports.salesReportpage = asyncHandler(async (req, res) => {
    try {
        res.render("admin/pages/admin/sales-report", { title: "Sales Report" });
    } catch (error) {
        throw new Error(error);
    }
});
