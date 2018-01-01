// Adapters
import adapters from "./adapters/AdapterList";

// Core Components
import AdapterManager from "./cornerstone/AdapterManager";
import Cache from "./cornerstone/Cache";
import { LoggingLevel } from "./cornerstone/CommonEnums";
import CornerStoneBible from "./cornerstone/CornerStone";
import Logger from "./cornerstone/Logger";
import Settings from "./cornerstone/Settings";
import SmartGetter from "./cornerstone/SmartGetter";
import WebAccessor from "./cornerstone/WebAccessor";

// Interfaces
import { ICornerStoneSettings } from "./interfaces/ICornerStone";

/**
 * Creates and returns the CornerStone object using
 * the provided settings.
 * Don't export via "default" here.
 */
export function New(settings: ICornerStoneSettings = {})
{
   const logger = new Logger({loggingEnabled: true, loggingLevel: LoggingLevel.DEBUG});
   const cache = new Cache(logger);
   const webGetter = new WebAccessor(logger);
   const smartGetter = new SmartGetter(logger, cache, webGetter);
   const adapterManager = new AdapterManager(logger, adapters(), smartGetter);
   return new CornerStoneBible(
      logger,
      adapterManager
   );
}
