import IUrlOptions from "./IUrlOptions";
export default interface IAdapter
{
   getVerse(options: IUrlOptions): Promise<any>;
   getChapter(options: IUrlOptions): Promise<any>;
   /*getNextChapter(): object;
   getPrevChapter(): object;
   getCatalog(): object;

   getLanguages(): object;
   getVersions(): object;

   getAdapterName(): string;
   getCapabilities(): object;*/

}
