/**
 * Full list of supported/current adapters.
 */
import Adapter from "../cornerstone/Adapter";
import GetBibleNetAdapter from "./GetBibleNetAdapter";

const adapters: Array<typeof Adapter> = [ GetBibleNetAdapter ];

export default function getAdapters(): object[]
{
   return adapters;
}
