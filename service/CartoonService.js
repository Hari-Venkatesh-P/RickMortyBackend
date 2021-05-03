const utils = require("../utils/ApiUtils");
const logger = require("../utils/LoggerUtils");
const Constants = require("../utils/Constants");
const Cartoons = require("../mongo/models/Cartooon");

const makeAPICall = utils.makeAPICall;

async function fetchCartoons(req, res) {
  try {
    const { pageNo } = req.params;
    if (typeof pageNo !== "undefined") {
      const response = await makeAPICall(
        "GET",
        `${Constants.RICKY_MORTY_API}/?page=${pageNo}`
      );
      if (response.status === 200) {
        logger.info(Constants.API_SUCCESS);

        res.status(200).send({
          success: true,
          message: response.data.results,
        });
      } else {
        logger.warn("Issue with Ricky Morty Site");
        res.status(500).send({
          success: false,
          message: "Issue with Ricky Morty Site",
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

async function addCartoon(req, res) {
  try {
    const {
      userId,
      cartoonId,
      name,
      status,
      species,
      origin,
      location,
      image,
    } = req.body;
    if (
      typeof cartoonId !== "undefined" ||
      typeof userId !== "undefined" ||
      typeof name !== "undefined" ||
      typeof status !== "undefined" ||
      typeof species !== "undefined" ||
      typeof origin !== "undefined" ||
      typeof location !== "undefined" ||
      typeof image !== "undefined"
    ) {
      const catoonExisting = await Cartoons.findOne({
        cartoonId: cartoonId,
        userId: userId,
      });
      if (catoonExisting == null) {
        const newCartoon = Cartoons({
          userId,
          cartoonId,
          name,
          status,
          species,
          origin,
          location,
          image : image,
        });
        await newCartoon.save();
        logger.info(Constants.API_SUCCESS);
        res.status(200).send({
          success: true,
          message: "Saved successfully",
        });
      } else {
        res.status(200).send({
          success: false,
          message: "Cartoon already added",
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

async function removeCartoon(req, res) {
  try {
    const { userId, cartoonId } = req.params;
    if (typeof cartoonId !== "undefined" || typeof userId !== "undefined") {
      const catoonExisting = await Cartoons.findOneAndRemove({
        cartoonId: cartoonId,
        userId: userId,
      });
      logger.info(Constants.API_SUCCESS);
      res.status(200).send({
        success: true,
        message: "Deleted SUccessfully",
      });
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


async function getCartoonByUserId(req, res) {
  try {
    const { userId } = req.params;
    if (typeof userId !== "undefined") {
      const cartoons = await Cartoons.find({
        userId: userId,
      });
      logger.info(Constants.API_SUCCESS);
      res.status(200).send({
        success: true,
        message: cartoons,
      });
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
  fetchCartoons,
  addCartoon,
  removeCartoon,
  getCartoonByUserId,
};
