// src file
const Validator = require("../../" + generatedJsPath + "cornerstone/Validator.js").default;
let validator;

describe("Validator", () => {
   beforeEach(() => {
      validator = new Validator();
   });

   /**
    * Bool Validation
    */
   it("should validate a boolean", () => {
      expect(validator.bool(true).isValid()).toBe(true);
      expect(validator.bool(false).isValid()).toBe(true);
      expect(validator.getErrorMessage()).toEqual("");
   });

   it("should validate an invalid boolean (undefined)", () => {
      expect(validator.bool(undefined).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a boolean");
   });

   it("should validate an invalid boolean (null)", () => {
      expect(validator.bool(null).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a boolean");
   });

   it("should validate an invalid boolean (number)", () => {
      expect(validator.bool(0).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a boolean");
   });

   it("should validate an invalid boolean (string)", () => {
      expect(validator.bool("hello").isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a boolean");
   });

   /**
    * Number Validation
    */
   it("should validate a number", () => {
      expect(validator.number(0).isValid()).toBe(true);
      expect(validator.getErrorMessage()).toEqual("");
   });

   it("should validate an invalid number (null)", () => {
      expect(validator.number(null).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a number");
   });

   it("should validate an invalid number (undefined)", () => {
      expect(validator.number(undefined).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a number");
   });

   it("should validate an invalid number (boolean)", () => {
      expect(validator.number(true).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a number");
   });

   it("should validate an invalid number (infinite)", () => {
      expect(validator.number(5/0).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a finite number");
   });

   it("should validate an invalid number (string)", () => {
      expect(validator.number("3.14").isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a number");
   });

   it("should validate a number range", () => {
      expect(validator.number(-1, -1, 100).isValid()).toBe(true);
      expect(validator.getErrorMessage()).toEqual("");
   });

   it("should validate an invalid number in range (less than min)", () => {
      expect(validator.number(0, 1, 6).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is less than");
   });

   it("should validate a number (greater than min)", () => {
      expect(validator.number(100, -1).isValid()).toBe(true);
      expect(validator.getErrorMessage()).toEqual("");
   });

   it("should validate an invalid number (less than min)", () => {
      expect(validator.number(0, 1).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is less than");
   });

   it("should validate an invalid number in range (greater than max)", () => {
      expect(validator.number(7, 1, 6).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is greater than");
   });

   /**
    * String Validation
    */
   it("should validate a string", () => {
      expect(validator.string("taco").isValid()).toBe(true);
      expect(validator.getErrorMessage()).toEqual("");
   });

   it("should validate an invalid string (undefined)", () => {
      expect(validator.string(undefined).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a string");
   });

   it("should validate an invalid string (null)", () => {
      expect(validator.string(null).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a string");
   });

   it("should validate an invalid string (number)", () => {
      expect(validator.string(0).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain("is not a string");
   });

   /**
    * Validate Anything
    */
   it("should validate anything", () => {
      expect(validator.any(0).isValid()).toBe(true);
      expect(validator.any("hello").isValid()).toBe(true);
      expect(validator.any(true).isValid()).toBe(true);
      expect(validator.getErrorMessage()).toEqual("");
   });

   it("should validate anything invalid (null)", () => {
      let varName = "var";
      expect(validator.any(null, varName).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain(varName + " should not be null");
   });

   it("should validate anything invalid (undefined)", () => {
      let varName = "options";
      expect(validator.any(undefined, varName).isValid()).toBe(false);
      expect(validator.getErrorMessage()).toContain(varName + " should not be undefined");
   });

});
