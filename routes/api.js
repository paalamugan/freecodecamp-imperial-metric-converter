'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

const isInvalidNumberAndUnit = (input) => {
  let isInvalidNum = false;
  let isInvalidUnit = false;
  let convertHandler = new ConvertHandler();
  try {
    convertHandler.getNum(input);
  } catch (err) {
    isInvalidNum = true;
  }
  try {
    convertHandler.getUnit(input);
  } catch (err) {
    isInvalidUnit = true;
  }
  return isInvalidNum && isInvalidUnit;
}

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    if (isInvalidNumberAndUnit(input)) {
      return res.send("invalid number and unit");
    }

    try {
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum: initNum, 
        initUnit: initUnit, 
        returnNum: returnNum, 
        returnUnit: returnUnit, 
        string: string
      })
    } catch (err) {
      return res.send(err.message);
    }
  })
};
