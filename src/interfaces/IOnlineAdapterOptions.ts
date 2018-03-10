import IAdapter, {
   IAdapterOptions,
   IBibleContent,
   IVerseDetails
} from "./IAdapter";
import IUrlOptions from "./IUrlOptions";

export default interface IOnlineAdapterOptions extends IAdapterOptions
{
   /**
    * Adapter books. Useful for the howToGet... to utilize correct
    * book names for that adapter.
    */
   books: string[];
   /**
    * Determine the URL to get verse.
    */
   howToGetVerse: IVerseAction;
   /**
    * Define how to process/interpret the verse data.
    */
   howToInterpretVerse: IPostVerseAction;
}

export type IVerseAction = (options: IVerseDetails) => IUrlOptions;
export type IPostVerseAction = (data: string) => IBibleContent;
