// src file
const logger = require("../../" + generatedJsPath + "cornerstone/Logger.js");
const Logger = logger.default;
const LoggingLevel = logger.LoggingLevel;
// dependencies
const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

console.log(JSON.stringify(logger));
const debugLogger = new Logger(
      {loggingEnabled: true,
      loggingLevel: LoggingLevel.DEBUG});

const infoLogger = new Logger(
      {loggingEnabled: true,
      loggingLevel: LoggingLevel.INFO});

const warnLogger = new Logger(
      {loggingEnabled: true,
      loggingLevel: LoggingLevel.WARN});

const errorLogger = new Logger(
      {loggingEnabled: true,
      loggingLevel: LoggingLevel.ERROR});

const disabledLogger = new Logger(
      {loggingEnabled: true});

const identifiedLogger = new Logger(
      {loggingEnabled: true,
      loggingLevel: LoggingLevel.WARN});

identifiedLogger.identify("LoggerSpec");

describe("Logger", () => {

   it("should not log a message when logging is disabled", sinonTest(function() {
      this.stub(console, "log");
      disabledLogger.logDebug("test");
      expect(console.log.notCalled).toBeTruthy();
   }));

   it("should log errors to console error", sinonTest(function() {
      this.stub(console, "error");
      errorLogger.logError("bad error");
      expect(console.error.calledOnce).toBeTruthy();
   }));

   it("should log warings to console warn", sinonTest(function() {
      this.stub(console, "warn");
      warnLogger.logWarn("somewhat bad error");
      expect(console.warn.calledOnce).toBeTruthy();
   }));

   it("should log info to console info", sinonTest(function() {
      this.stub(console, "info");
      infoLogger.logInfo("info logging");
      expect(console.info.calledOnce).toBeTruthy();
   }));

   it("should log debug to console log", sinonTest(function() {
      this.stub(console, "log");
      debugLogger.logDebug("debug logging");
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

      errorLogger.logDebug("debug");
      errorLogger.logInfo("info");
      errorLogger.logWarn("warn");
      errorLogger.logError("error");

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

      warnLogger.logDebug("debug");
      warnLogger.logInfo("info");
      warnLogger.logWarn("warn");
      warnLogger.logError("error");

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

      infoLogger.logDebug("debug");
      infoLogger.logInfo("info");
      infoLogger.logWarn("warn");
      infoLogger.logError("error");

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

      debugLogger.logDebug("debug");
      debugLogger.logInfo("info");
      debugLogger.logWarn("warn");
      debugLogger.logError("error");

      expect(console.error.calledOnce).toBeTruthy();
      expect(console.warn.calledOnce).toBeTruthy();
      expect(console.info.calledOnce).toBeTruthy();
      expect(console.log.calledOnce).toBeTruthy();
   }));

   it("should log errors in the correct format", sinonTest(function() {
      // Identified logger
      this.stub(console, "error", (msg) => {
         //                   Jan   3   at 12 : 45  : 03  . 997 [LoggerSpec]: msg
         expect(msg).toMatch(/\w{3} \d+ at \d+:\d{2}:\d{2}.\d{3} \[.*\]: .*/)
      });

      // Unidentified logger
      this.stub(console, "log", (msg) => {
         //                   Jan   3   at 12 : 45  : 03  . 997 : msg
         expect(msg).toMatch(/\w{3} \d+ at \d+:\d{2}:\d{2}.\d{3}: .*/)
      });

      identifiedLogger.logError("an error message that knows who I am");
      debugLogger.logDebug("a debug message that doesn't know who I am");
   }));
});
