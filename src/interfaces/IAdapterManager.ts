import { IAdapter } from "./IAdapter";

export interface IAdapterManager
{
   getAdapter(): IAdapter;
}
