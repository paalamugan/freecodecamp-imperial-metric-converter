const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    test('convertHandler should correctly read a whole number input', () => {
        assert.strictEqual(convertHandler.getNum('10L'), 10);
    });

    test('convertHandler should correctly read a decimal number input', () => {
        assert.strictEqual(convertHandler.getNum('5.4lbs'), 5.4);
    });
    
    test('convertHandler should correctly read a fractional input', () => {
        assert.strictEqual(convertHandler.getNum('1/2km'), 0.5);
    });

    test('convertHandler should correctly read a fractional input with a decimal', () => {
        assert.strictEqual(convertHandler.getNum('5.4/3lbs'), 1.8);
    });

    test('convertHandler should correctly return an error on a double-fraction', () => {
        let errorMessage = '';
        try {
            convertHandler.getNum('3/2/3')
        } catch(err) {
            errorMessage = err.message;
        }
        assert.strictEqual(errorMessage, "invalid number");
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
        assert.strictEqual(convertHandler.getNum('kg'), 1);
    });

    test('convertHandler should correctly read each valid input unit', () => {
        assert.strictEqual(convertHandler.getUnit('kg'), 'kg');
        assert.strictEqual(convertHandler.getUnit('lbs'), 'lbs');
        assert.strictEqual(convertHandler.getUnit('mi'), 'mi');
        assert.strictEqual(convertHandler.getUnit('km'), 'km');
    });
    
    test('convertHandler should correctly return an error for an invalid input unit', () => {
        let errorMessage = '';
        try {
            convertHandler.getUnit('12kl')
        } catch(err) {
            errorMessage = err.message;
        }
        assert.strictEqual(errorMessage, "invalid unit");
    });

    test('convertHandler should return the correct return unit for each valid input unit', () => {
        assert.strictEqual(convertHandler.getUnit('12kg'), 'kg');
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', () => {
        assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    });

    test('convertHandler should correctly convert gal to L', () => {
        assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    });

    test('convertHandler should correctly convert L to gal', () => {
        assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    });

    test('convertHandler should correctly convert mi to km', () => {
        assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    });

    test('convertHandler should correctly convert km to mi', () => {
        assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    });

    test('convertHandler should correctly convert lbs to kg', () => {
        assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    });

    test('convertHandler should correctly convert kg to lbs', () => {
        assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    });
});