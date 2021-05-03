const Users = require("../mongo/models/User");
const logger = require("../utils/LoggerUtils");
const Constants = require("../utils/Constants");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants = require("../utils/Constants");

async function createNewUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (
      typeof name !== "undefined" ||
      typeof email !== "undefined" ||
      typeof password !== "undefined"
    ) {
      const userExisting = await Users.findOne({
        email: email,
      });
      console.log(req.body)
      if (userExisting == null) {
        const newUser = Users({
          name,
          email,
          password,
        });
        await newUser.save();
        console.log(newUser)
        logger.info(Constants.API_SUCCESS);
        res.status(200).send({
          success: true,
          message: "Account created successfully",
        });
      } else {
        res.status(200).send({
          success: false,
          message: "Account already exits",
        });
      }
    } else {
      logger.error(Constants.BAD_REQUEST);
      res.status(400).send({
        success: false,
        message: Constants.BAD_REQUEST,
      });
    }
  } catch (error) {
    logger.error(Constants.INTERNAL_SERVER_ERROR + error);
    res.status(500).send({
      success: false,
      message: error,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (typeof email !== "undefined" || typeof password !== "undefined") {
      const userExisting = await Users.findOne({
        email: email,
      });
      if (userExisting !== null) {
        const result = await bcrypt.compare(
            password,
          userExisting.password
        );
        if (result) {
          await jwt.sign({ ...userExisting,secret :constants.API_SECRET }, "secretkey", (err, token) => {
            if (err) {
                logger.error(Constants.INTERNAL_SERVER_ERROR + err);
                res.status(201).send({
                success: false,
                message: "Error during Token  Genration",
              });
            } else {
              logger.info(Constants.API_SUCCESS);
              res.status(200).json({
                success: true,
                message: userExisting,
                token: token,
              });
            }
          });
        } else {
          logger.error(Constants.API_FAILED);
          res.status(200).send({
            success: false,
            message: "Invalid credentials",
          });
        }
      } else {
        logger.error(Constants.API_FAILED);
        res.status(200).send({
          success: false,
          message: "No such user",
        });
      }
    } else {
      logger.error(Constants.BAD_REQUEST);
      res.status(400).send({
        success: false,
        message: Constants.BAD_REQUEST,
      });
    }
  } catch (error) {
    logger.error(Constants.INTERNAL_SERVER_ERROR + error);
    res.status(500).send({
      success: false,
      message: error,
    });
  }
}

module.exports = {
  createNewUser,
  loginUser,
};
