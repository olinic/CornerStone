// src file
const TemplateConverter = require("../../" + generatedJsPath + "cornerstone/TemplateConverter.js").default;

// dependencies
const Logger = require("../../" + generatedJsPath + "cornerstone/Logger.js").default;

const logger = new Logger({ loggingEnabled: false });
const converter = new TemplateConverter(logger);

describe("Template Converter", () => {

   it("should validate a good template", () => {
      converter.defineParameters([], ["optional"]);
      expect(converter.validateTemplate("{}")).toBeTruthy();
   });

   it("should validate a bad JSON template", () => {
      expect(converter.validateTemplate("}")).toBeFalsy();
   });

   it("should validate a bad template with required fields missing", () => {
      converter.defineParameters(["required"], ["optional"]);
      expect(converter.validateTemplate("{}")).toBeFalsy();
   });

   it("should convert a template to a function", () => {
      expect(typeof converter.createTemplateFunction()).toEqual("function");
   });
});
