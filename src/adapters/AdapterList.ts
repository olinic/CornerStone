/**
 * Full list of supported/current adapters.
 */
import { IOnlineAdapterOptions } from "../interfaces/IOnlineAdapterOptions";
import { GetBibleNetAdapter } from "./GetBibleNetAdapter";

export const onlineAdapters: IOnlineAdapterOptions[] = [ GetBibleNetAdapter ];
