// Internal dependencies.
import IAdapter, { IAdapterOptions } from "../interfaces/IAdapter";
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

   public getVerse(verse, chapter, book)
   {
      return this.defaultResponse();
   }

   protected request(
         options: IUrlOptions,
         onSuccess?: ( data: string ) => string,
         onError?: ( err: Error ) => Error): Promise<any>
   {
      return new Promise((
            resolve: (response: string) => void,
            reject: (err: Error) => void) => {
         this.onlineAccessor
            .request(options)
            .then((response) => {
               if (typeof onSuccess === "undefined") {
                  // pass the error
                  resolve(response);
               } else {
                  // work with the data
                  resolve(onSuccess(response));
               }
            }).catch((err) => {
               if (typeof onerror === "undefined") {
                  // pass the error
                  reject(err);
               } else {
                  // execute the custom error handler
                  reject(onError(err));
               }
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
