const { checkIsValidAuth } = require("../utils/AuthUtils");
const logger = require("../utils/LoggerUtils");

function isTokenPresent(req, res, next) {
  const jwttoken = req.headers["authorization"];
  if (checkIsValidAuth(jwttoken)) {
    req.token = jwttoken;
    next();
  } else {
    res.status(403).send({
      success: false,
      message: "Forbidden Access",
    });
  }
}

module.exports = { isTokenPresent };
