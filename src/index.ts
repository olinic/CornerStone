// Adapters
import adapters from "./adapters/AdapterList";

// Core Components
import AdapterManager from "./cornerstone/AdapterManager";
import CornerStoneBible from "./cornerstone/CornerStone";
import Logger from "./cornerstone/Logger";
import Settings from "./cornerstone/Settings";
import SmartGetter from "./cornerstone/SmartGetter";

// Interfaces
import { ICornerStoneSettings } from "./interfaces/ICornerStone";

/**
 * Creates and returns the CornerStone object using
 * the provided settings.
 * Don't export via "default" here.
 */
export function New(settings: ICornerStoneSettings)
{
   const logger = new Logger({});

   return new CornerStoneBible(
      logger
   );
}
