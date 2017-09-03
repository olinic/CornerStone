export function isBrowser()
{
   return (typeof document !== "undefined" && typeof window !== "undefined");
}

export function isNode()
{
   return (typeof global !== "undefined");
}
