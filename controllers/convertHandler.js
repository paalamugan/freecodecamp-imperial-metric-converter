
const imperialMetric = {
  'gal' : {
    returnUnit: 'L',
    unitString: 'gallons'
  },
  'L' : {
    returnUnit: 'gal',
    unitString: 'liters'
  },
  'km' : {
    returnUnit: 'mi',
    unitString: 'kilometers'
  },
  'mi' : {
    returnUnit: 'km',
    unitString: 'miles'
  },
  'lbs' : {
    returnUnit: 'kg',
    unitString: 'pounds'
  },
  'kg' : {
    returnUnit: 'lbs',
    unitString: 'kilograms'
  }
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.replace(/[a-zA-Z]/g, '') || '1';
    try {
      if (!(/^((\d+)(.\d+)?\/)?(\d+)(.\d+)?$/.test(result))) {
        throw null;
      }
      result = eval(result);
      return result;
    } catch (err) {
      throw new Error("invalid number");
    } 
  };
  
  this.getUnit = function(input) {
    let result = input.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (!result || !(/^(gal|l|mi|km|kg|lbs)$/.test(result))) {
      throw new Error("invalid unit");
    }
    
    return result === "l" ? "L" : result;
  };

  this.getReturnUnit = function(initUnit) {    
    return imperialMetric[initUnit].returnUnit;
  };

  this.spellOutUnit = function(unit) {
    return imperialMetric[unit].unitString;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    if (initUnit === 'gal') {
      result = initNum * galToL;
    } else if (initUnit === 'L') {
      result = initNum / galToL;
    } else if (initUnit === 'lbs') {
      result = initNum * lbsToKg;
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg;
    } else if (initUnit === 'mi') {
      result = initNum * miToKm;
    } else if (initUnit === 'km') {
      result = initNum / miToKm;
    }
    
    return +result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {    
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
