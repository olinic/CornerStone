// Internal dependencies.
import Adapter from "../cornerstone/Adapter";
import { IVerseParams } from "../interfaces/IAdapter";
import ILogger from "../interfaces/ILogger";
import IWebGetter from "../interfaces/IWebGetter";

export default class AdapterStub extends Adapter
{
   constructor(
         logger: ILogger,
         webGetter: IWebGetter,
         private id: string = "",
         private timeout: number = 100)
   {
      super(logger, webGetter, { adapterName: "Stub", termsUrl: "N/A" });
   }

   public getVerse(options: IVerseParams): Promise<any>
   {
      return this.stubPromise("verse" + this.id);
   }

   private stubPromise(data: any): Promise<any>
   {
      return new Promise((
         resolve: (response: string) => void,
         reject: (err: Error) => void) => {

         setTimeout(resolve(data), this.timeout);
      });
   }
}
