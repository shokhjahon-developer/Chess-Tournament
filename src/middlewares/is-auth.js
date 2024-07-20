const { checkToken } = require("../utils/jwt");
const isAuthedMiddleware = (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).json({
      message: "Permission denied, you have to register first!",
    });
  }

  checkToken(req.cookies.token, (err, data) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Permission denied, you have to register first!" });
    }

    req.user = data;

    next();
  });
};

module.exports = isAuthedMiddleware;
