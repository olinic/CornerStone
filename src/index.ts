// Adapters
import { onlineAdapters } from "./adapters/AdapterList";
import OnlineAdapter from "./cornerstone/OnlineAdapter";

// Core Components
import AdapterManager from "./cornerstone/AdapterManager";
import BrowserWebGetter from "./cornerstone/BrowserWebGetter";
import Cache from "./cornerstone/Cache";
import { LoggingLevel } from "./cornerstone/CommonEnums";
import CornerStoneBible from "./cornerstone/CornerStone";
import Logger from "./cornerstone/Logger";
import NodeWebGetter from "./cornerstone/NodeWebGetter";
import { isBrowser, isNode } from "./cornerstone/Platform";
import Settings from "./cornerstone/Settings";
import SmartGetter from "./cornerstone/SmartGetter";

// Interfaces
import IAdapter from "./interfaces/IAdapter";
import { ICornerStoneSettings } from "./interfaces/ICornerStone";

/**
 * Creates and returns the CornerStone object using
 * the provided settings.
 * Don't export via "default" here.
 */
export function New({
   cacheSize = 13,
   outputFormat = "standard",
   newlineCharacter = "\n",
   verseFormat = "raw"
}: ICornerStoneSettings = {})
{
   const logger = new Logger({loggingEnabled: false, loggingLevel: LoggingLevel.DEBUG});
   const cache = new Cache(logger);

   // Set the web getter based on the platform.
   // This could possibly be removed due to webpack.
   let webGetter;
   if (isBrowser()) {
      logger.info("Detected Browser environment.");
      webGetter = new BrowserWebGetter(logger);
   } else if (isNode()) {
      logger.info("Detected Node environment.");
      webGetter = new NodeWebGetter(logger);
   } else {
      throw logger.logAndGiveError("Platform/environment not recognized or supported. " +
                                   "Expected to run in Node or Browser.");
   }

   // Create smart caching.
   const smartGetter = new SmartGetter(logger, cache, webGetter);

   // Compile the adapters.
   let adapters: IAdapter[];
   for (let onlineAdapterOptions of onlineAdapters) {
      adapters.push(new OnlineAdapter(logger, smartGetter, onlineAdapterOptions));
   }

   // Start putting everything together.
   const adapterManager = new AdapterManager(logger, adapters);
   return new CornerStoneBible(
      logger,
      adapterManager,
      outputFormat
   );
}
