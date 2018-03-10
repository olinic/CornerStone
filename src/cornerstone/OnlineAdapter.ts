// Internal dependencies.
import Adapter from "./Adapter";
import IAdapter, {
   IBibleContent,
   IVerseParams
} from "../interfaces/IAdapter";
import IOnlineAdapterOptions, {
   IPostVerseAction,
   IVerseAction
} from "../interfaces/IOnlineAdapterOptions";
import ICache from "../interfaces/ICache";
import ILogger from "../interfaces/ILogger";
import IUrlOptions from "../interfaces/IUrlOptions";
import IWebGetter from "../interfaces/IWebGetter";
import { request } from "./AdapterUtils";

// External dependencies.
import { Promise } from "es6-promise";

export default class OnlineAdapter
      extends Adapter implements IAdapter
{
   /**
    * Online Accessor. Retrieves online resources.
    */
   private onlineAccessor: IWebGetter;

   /**
    * Book names used by the adapter.
    */
   private myBooks: string[];

   /**
    * Get the URL for the verse.
    */
   private howToGetVerse: IVerseAction;

   /**
    * Verse post-processing.
    */
   private howToInterpretVerse: IPostVerseAction;

   constructor(
         private logger: ILogger,
         private webGetter: IWebGetter,
         adapterOptions: IOnlineAdapterOptions
      )
   {
      super(logger, {
         adapterName: adapterOptions.adapterName,
         maxNumberOfQueries: adapterOptions.maxNumberOfQueries,
         queryPeriod: adapterOptions.queryPeriod,
         maxVersesInCache: adapterOptions.maxVersesInCache,
         termsUrl: adapterOptions.termsUrl,
         textFormat: adapterOptions.textFormat
      });
      this.logger = logger;
      this.onlineAccessor = webGetter;

      this.myBooks = adapterOptions.books;
      this.howToGetVerse = adapterOptions.howToGetVerse;
      this.howToInterpretVerse = adapterOptions.howToInterpretVerse;
   }

   public getVerse(options: IVerseParams): Promise<IBibleContent>
   {
      return request(
         this.howToGetVerse({
            book: this.myBooks[options.book],
            chapter: options.chapter,
            verse: options.verse
         }),
         this.webGetter,
         this.howToInterpretVerse
      );
   }
}
