/**
 * Replaces multiple "needles" within a haystack.
 */
export function multiReplace(haystack: string, needles: string[], replaceWith: string): string
{
   for (const needle of needles) {
      haystack = haystack.replace(needle, replaceWith);
   }
   return haystack;
}
