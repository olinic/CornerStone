import IUrlOptions from "./IUrlOptions";

export default interface IWebGetter
{
   /**
    * Retrieve the online resource according to the provided
    * options.
    */
   request(options: IUrlOptions): Promise<any>;
}
