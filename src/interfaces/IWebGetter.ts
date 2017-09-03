import { IUrlOptions } from "./IUrlOptions";

export interface IWebGetter
{
   /**
    * Retrieve the online resource according to the provided
    * options.
    */
   request(options: IUrlOptions): Promise<any>;
}
