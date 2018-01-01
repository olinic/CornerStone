// src file
const Logger = require("../../" + generatedJsPath + "cornerstone/Logger.js").default;
const LoggingLevel = require("../../" + generatedJsPath + "cornerstone/CommonEnums.js").LoggingLevel;
// dependencies
const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const debugLogger = new Logger({
      loggingEnabled: true,
      loggingLevel: LoggingLevel.DEBUG});

const infoLogger = new Logger({
      loggingEnabled: true,
      loggingLevel: LoggingLevel.INFO});

const warnLogger = new Logger({
      loggingEnabled: true,
      loggingLevel: LoggingLevel.WARN});

const errorLogger = new Logger({
      loggingEnabled: true,
      loggingLevel: LoggingLevel.ERROR});

const disabledLogger = new Logger({
      loggingEnabled: true});

const identifiedLogger = new Logger({
      loggingEnabled: true,
      loggingLevel: LoggingLevel.WARN,
      who: "LoggerSpec"});

describe("Logger", () => {

   it("should not log a message when logging is disabled", sinonTest(function() {
      this.stub(console, "log");
      disabledLogger.debug("test");
      expect(console.log.notCalled).toBeTruthy();
   }));

   it("should log errors to console error", sinonTest(function() {
      this.stub(console, "error");
      errorLogger.error("bad error");
      expect(console.error.calledOnce).toBeTruthy();
   }));

   it("should log warings to console warn", sinonTest(function() {
      this.stub(console, "warn");
      warnLogger.warn("somewhat bad error");
      expect(console.warn.calledOnce).toBeTruthy();
   }));

   it("should log info to console info", sinonTest(function() {
      this.stub(console, "info");
      infoLogger.info("info logging");
      expect(console.info.calledOnce).toBeTruthy();
   }));

   it("should log debug to console log", sinonTest(function() {
      this.stub(console, "log");
      debugLogger.debug("debug logging");
      expect(console.log.calledOnce).toBeTruthy();
   }));

   it("should log and return the specified error", sinonTest(function() {
      this.stub(console, "error");
      let error = errorLogger.logAndGiveError("error logging");
      expect(console.error.calledOnce).toBeTruthy();
      expect(error instanceof Error).toBeTruthy();
   }));

   it("should log only errors when ERROR level is specified", sinonTest(function() {
      this.stub(console, "error");
      this.stub(console, "warn");
      this.stub(console, "info");
      this.stub(console, "log");

      errorLogger.debug("debug");
      errorLogger.info("info");
      errorLogger.warn("warn");
      errorLogger.error("error");

      expect(console.error.calledOnce).toBeTruthy();
      expect(console.warn.notCalled).toBeTruthy();
      expect(console.info.notCalled).toBeTruthy();
      expect(console.log.notCalled).toBeTruthy();
   }));

   it("should log only errors and warnings when WARNING level is specified", sinonTest(function() {
      this.stub(console, "error");
      this.stub(console, "warn");
      this.stub(console, "info");
      this.stub(console, "log");

      warnLogger.debug("debug");
      warnLogger.info("info");
      warnLogger.warn("warn");
      warnLogger.error("error");

      expect(console.error.calledOnce).toBeTruthy();
      expect(console.warn.calledOnce).toBeTruthy();
      expect(console.info.notCalled).toBeTruthy();
      expect(console.log.notCalled).toBeTruthy();
   }));

   it("should log only errors, warnings, and info when INFO level is specified", sinonTest(function() {
      this.stub(console, "error");
      this.stub(console, "warn");
      this.stub(console, "info");
      this.stub(console, "log");

      infoLogger.debug("debug");
      infoLogger.info("info");
      infoLogger.warn("warn");
      infoLogger.error("error");

      expect(console.error.calledOnce).toBeTruthy();
      expect(console.warn.calledOnce).toBeTruthy();
      expect(console.info.calledOnce).toBeTruthy();
      expect(console.log.notCalled).toBeTruthy();
   }));

   it("should log errors, warnings, info, and debug when DEBUG level is specified", sinonTest(function() {
      this.stub(console, "error");
      this.stub(console, "warn");
      this.stub(console, "info");
      this.stub(console, "log");

      debugLogger.debug("debug");
      debugLogger.info("info");
      debugLogger.warn("warn");
      debugLogger.error("error");

      expect(console.error.calledOnce).toBeTruthy();
      expect(console.warn.calledOnce).toBeTruthy();
      expect(console.info.calledOnce).toBeTruthy();
      expect(console.log.calledOnce).toBeTruthy();
   }));

   it("should log errors in the correct format", sinonTest(function() {
      this.stub(console, "log").callsFake((msg) => {
         //                   Jan   3   at 12 : 45  : 03  . 997 : msg
         expect(msg).toMatch(/\w{3} \d+ at \d+:\d{2}:\d{2}.\d{3}: .*/)
      });

      debugLogger.debug("a debug message that doesn't know who I am");
   }));
});
