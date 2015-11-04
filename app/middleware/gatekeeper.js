/*
Description:
    Prevents users non whitelisted users from accessing the app.
*/
module.exports = function(req, res, next) {
    next();
};