// Internal dependencies.
import IAdapter, { IAdapterOptions, IVerseParams } from "../interfaces/IAdapter";
import ICache from "../interfaces/ICache";
import ILogger from "../interfaces/ILogger";
import IUrlOptions from "../interfaces/IUrlOptions";
import IWebGetter from "../interfaces/IWebGetter";
import SmartGetter from "./SmartGetter";

// External dependencies.
import { Promise } from "es6-promise";

import Logger from "./Logger";

export default class Adapter implements IAdapter
{
   /**
    * Online Accessor. Retrieves online resources.
    */
   protected onlineAccessor: IWebGetter;

   /**
    * Logger to log any events.
    */
   protected logger: ILogger;

   /**
    * Adapter name.
    */
   protected readonly ADAPTER_NAME: string;

   /**
    * Maximum number of queries to be made.
    */
   protected readonly MAX_QUERIES: number;

   /**
    * Time period for maximum number of queries.
    */
   protected readonly QUERY_PERIOD: Date;

   /**
    * Maximum number of consecutive verses to be stored in cache.
    */
   protected readonly MAX_CACHE_CONSECUTIVE_VERSES: number;

   /**
    * URL that contains the terms of usage for the developer
    * (for documentation).
    */
   protected readonly API_TERMS_URL: string;

   constructor(
         logger: ILogger,
         webGetter: IWebGetter,
         adapterOptions: IAdapterOptions
      )
   {
      this.logger = logger;
      this.onlineAccessor = webGetter;
      this.ADAPTER_NAME = adapterOptions.adapterName;
      this.API_TERMS_URL = adapterOptions.termsUrl;
   }

   public getName(): string
   {
      return this.ADAPTER_NAME;
   }

   public getTermsUrl(): string
   {
      return this.API_TERMS_URL;
   }

   public getVerse(options: IVerseParams)
   {
      return this.defaultResponse();
   }

   protected request(
         options: IUrlOptions,
         postProcessing:
            ( data: any ) => any
            =
            ( data ) => data, // default to return the same data.
         onSuccess?: ( data: string ) => void,
         onError?: ( err: Error ) => void): Promise<any>
   {
      return new Promise((
            resolve: (response: string) => void,
            reject: (err: Error) => void) => {
         this.onlineAccessor
            .request(options)
            .then((response) => {
               const processedData = postProcessing(response);
               if (typeof onSuccess !== "undefined") {
                  // work with the data
                  onSuccess(processedData);
               }
               resolve(processedData);
            }).catch((err) => {
               if (typeof onerror !== "undefined") {
                  // execute the custom error handler
                  onError(err);
               }
               reject(err);
            });
      });
   }

   private defaultResponse(): Promise<any>
   {
      return new Promise((
            resolve: (response: string) => void,
            reject: (err: Error) => void) => {
         reject(new Error("This functionality is not fully implemented."));
      });
   }
}
