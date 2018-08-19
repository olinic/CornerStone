// Internal dependencies.
import {
   IAdapter,
   IBibleContent,
   IChapterParams,
   ILanguages,
   IVerseParams
} from "../interfaces/IAdapter";
import { ICache } from "../interfaces/ICache";
import {
   ILanguageCode,
   IVersions
} from "../interfaces/ICornerStone";
import { ILogger } from "../interfaces/ILogger";
import {
   IChapterAction,
   ILanguageAction,
   IOnlineAdapterOptions,
   IPostChapterAction,
   IPostLanguageAction,
   IPostVerseAction,
   IVerseAction
} from "../interfaces/IOnlineAdapterOptions";
import { IUrlOptions } from "../interfaces/IUrlOptions";
import { IWebGetter } from "../interfaces/IWebGetter";
import { request } from "../utilities/AdapterUtils";
import { Adapter } from "./Adapter";

export class OnlineAdapter extends Adapter implements IAdapter
{
   /**
    * Online Accessor. Retrieves online resources.
    */
   private onlineAccessor: IWebGetter;

   /**
    * Book names used by the adapter.
    */
   private myBooks: string[];

   constructor(
         private logger: ILogger,
         private webGetter: IWebGetter,
         private adapterOptions: IOnlineAdapterOptions
      )
   {
      super(logger, {
         adapterName: adapterOptions.adapterName,
         maxNumberOfQueries: adapterOptions.maxNumberOfQueries,
         maxVersesInCache: adapterOptions.maxVersesInCache,
         queryPeriod: adapterOptions.queryPeriod,
         termsUrl: adapterOptions.termsUrl,
         textFormat: adapterOptions.textFormat
      });
      this.logger = logger;
      this.onlineAccessor = webGetter;
      this.myBooks = adapterOptions.books;
   }

   public getVerse(options: IVerseParams): Promise<IBibleContent>
   {
      return request(
         this.adapterOptions.howToGetVerse({
            book: this.myBooks[options.book],
            chapter: options.chapter,
            verse: options.verse
         }),
         this.webGetter,
         this.adapterOptions.howToInterpretVerse
      );
   }

   public getChapter(options: IChapterParams): Promise<IBibleContent>
   {
      return request(
         this.adapterOptions.howToGetChapter({
            book: this.myBooks[options.book],
            chapter: options.chapter
         }),
         this.webGetter,
         this.adapterOptions.howToInterpretChapter
      );
   }

   public getLanguages(): Promise<ILanguages>
   {
      return request(
         this.adapterOptions.howToGetLanguages(),
         this.webGetter,
         this.adapterOptions.howToInterpretLanguages
      );
   }

   public getVersions(languageCode: ILanguageCode): Promise<IVersions>
   {
      return request(
         this.adapterOptions.howToGetVersions(languageCode),
         this.webGetter,
         this.adapterOptions.howToInterpretVersions
      );
   }
}
