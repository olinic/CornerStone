// Adapters
import adapters from "./adapters/AdapterList";

// Core Components
import AdapterManager from "./cornerstone/AdapterManager";
import BrowserWebGetter from "./cornerstone/BrowserWebGetter";
import Cache from "./cornerstone/Cache";
import { LoggingLevel } from "./cornerstone/CommonEnums";
import CornerStoneBible from "./cornerstone/CornerStone";
import Logger from "./cornerstone/Logger";
import {
   isBrowser,
   isNode
} from "./cornerstone/Platform";
import NodeWebGetter from "./cornerstone/NodeWebGetter";
import Settings from "./cornerstone/Settings";
import SmartGetter from "./cornerstone/SmartGetter";

// Interfaces
import { ICornerStoneSettings } from "./interfaces/ICornerStone";

/**
 * Creates and returns the CornerStone object using
 * the provided settings.
 * Don't export via "default" here.
 */
export function New(settings: ICornerStoneSettings = {})
{
   const logger = new Logger({loggingEnabled: false, loggingLevel: LoggingLevel.DEBUG});
   const cache = new Cache(logger);
   let webGetter;
   if (isBrowser()) {
      logger.info("Detected Browser environment.");
      webGetter = new BrowserWebGetter(logger);
   } else if (isNode()) {
      logger.info("Detected Node environment.");
      webGetter = new NodeWebGetter(logger);
   } else {
      throw logger.logAndGiveError("Platform/environment not recognized or supported. Expected to run in Node or Browser.");
   }
   const smartGetter = new SmartGetter(logger, cache, webGetter);
   const adapterManager = new AdapterManager(logger, adapters(), smartGetter);
   return new CornerStoneBible(
      logger,
      adapterManager
   );
}
