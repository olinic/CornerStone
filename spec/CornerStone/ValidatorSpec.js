// src file
const Validator = require("../../" + generatedJsPath + "cornerstone/Validator.js").default;
let validator;

describe("Validator", () => {
   beforeEach(() => {
      validator = new Validator();
   });

   describe("Boolean Validation", () => {
      it("should validate a boolean", () => {
         expect(validator.boolean({value: true}).isValid()).toBe(true);
         expect(validator.boolean({value: false}).isValid()).toBe(true);
         expect(validator.getErrorMessage()).toEqual("");
      });

      it("should validate an invalid boolean (undefined)", () => {
         expect(validator.boolean({value: undefined}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be undefined");
      });

      it("should validate an invalid boolean (null)", () => {
         expect(validator.boolean({value: null}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be null");
      });

      it("should validate an invalid boolean (number)", () => {
         expect(validator.boolean({value: 0}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is not a boolean");
      });

      it("should validate an invalid boolean (string)", () => {
         expect(validator.boolean({value: "hello"}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is not a boolean");
      });
   });

   describe("Number Validation", () => {
      it("should validate a number", () => {
         expect(validator.number({value: 0}).isValid()).toBe(true);
         expect(validator.getErrorMessage()).toEqual("");
      });

      it("should validate an invalid number (null)", () => {
         expect(validator.number({value: null}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be null");
      });

      it("should validate an invalid number (undefined)", () => {
         expect(validator.number({value: undefined}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be undefined");
      });

      it("should validate an invalid number (boolean)", () => {
         expect(validator.number({value: true}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is not a number");
      });

      it("should validate an invalid number (infinite)", () => {
         expect(validator.number({value: 5/0}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is not a finite number");
      });

      it("should validate an invalid number (string)", () => {
         expect(validator.number({value: "3.14"}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is not a number");
      });

      it("should validate a number range", () => {
         expect(validator.number({value: -1, min: -1, max: 100}).isValid()).toBe(true);
         expect(validator.getErrorMessage()).toEqual("");
      });

      it("should validate an invalid number in range (less than min)", () => {
         expect(validator.number({value: 0, min: 1, max: 6}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is less than");
      });

      it("should validate a number (greater than min)", () => {
         expect(validator.number({value: 100, min: -1}).isValid()).toBe(true);
         expect(validator.getErrorMessage()).toEqual("");
      });

      it("should validate an invalid number (less than min)", () => {
         expect(validator.number({value: 0, min: 1}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is less than");
      });

      it("should validate an invalid number in range (greater than max)", () => {
         expect(validator.number({value: 7, min: 1, max: 6}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is greater than");
      });
   });

   describe("String Validation", () => {
      it("should validate a string", () => {
         expect(validator.string({value: "taco"}).isValid()).toBe(true);
         expect(validator.getErrorMessage()).toEqual("");
      });

      it("should validate an invalid string (null)", () => {
         expect(validator.string({value: null}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be null");
      });

      it("should validate an invalid string (undefined)", () => {
         expect(validator.string({value: undefined}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be undefined");
      });

      it("should validate an invalid string (number)", () => {
         expect(validator.string({value: 0}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is not a string");
      });
   });

   describe("Object Validation", () => {
      it("should validate an object", () => {
         let data = { first: "Peter", last: "Brooks" };
         expect(validator.object({value: data}).isValid()).toBe(true);
         expect(validator.getErrorMessage()).toEqual("");
      });

      it("should validate an invalid object (number)", () => {
         expect(validator.object({value: 0}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is not an object");
      });

      it("should validate an invalid object (null)", () => {
         expect(validator.object({value: null}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be null");
      });

   });

   describe("Any Validation", () => {
      it("should validate anything", () => {
         expect(validator.any({value: 0}).isValid()).toBe(true);
         expect(validator.any({value: "hello"}).isValid()).toBe(true);
         expect(validator.any({value: true}).isValid()).toBe(true);
         expect(validator.getErrorMessage()).toEqual("");
      });

      it("should validate anything invalid (null)", () => {
         expect(validator.any({value: null}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be null");
      });

      it("should validate anything invalid (undefined)", () => {
         expect(validator.any({value: undefined}).isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("should not be undefined");
      });
   });

   describe("Multiple Validations", () => {
      it("should return valid for muliptle valid values", () => {
         expect(validator
            .number({value: 0})
            .string({value: "hello"})
            .boolean({value: true})
            .any({value: 0.1})
            .isValid()).toBe(true);
         expect(validator.getErrorMessage()).toEqual("");
      });

      it("should return invalid for one invalid value", () => {
         expect(validator
            .number({value: 0})
            .string({value: "hello"})
            .boolean({value: true})
            .any({value: undefined}) // invalid
            .isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain(" should not be undefined");
      });

      it("should return invalid for multiple invalid values", () => {
         let invalidVarName = "enable";
         expect(validator
            .number({name: invalidVarName, value: false}) // invalid
            .string({value: "hello"})
            .boolean({value: 5}) // invalid
            .any({value: "world"})
            .isValid()).toBe(false);
         expect(validator.getErrorMessage()).toContain("is not a number");
         expect(validator.getErrorMessage()).toContain("is not a boolean");
         expect(validator.getErrorMessage()).toContain(invalidVarName); // invalid variable name
      });
   });

   describe("Optional Validation", () => {
      it("should allow optional values", () => {
         expect(validator.optional().number({value: undefined}));
         expect(validator.isValid()).toBe(true);
      });
   });
});
