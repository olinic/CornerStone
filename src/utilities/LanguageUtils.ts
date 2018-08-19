import * as LanguageTags from "language-tags";

/**
 * Get the code of the language based on the provided language name.
 */
export function getCode(name: string): string {
   let target = null;
   const myTags = LanguageTags.search(name);
   if (myTags.length > 0) {
      const tag = myTags[0].data;
      const preferredValueExists = (typeof tag["Preferred-Value"] !== "undefined");
      if (preferredValueExists) {
         target = tag["Preferred-Value"];
      } else {
         target = tag.subtag;
      }
   }
   return target;
}

/**
 * Get the name of the language based on the provided language code.
 */
export function getName(code: string): string {
   let target = null;
   const myTags = LanguageTags.subtags(code);
   if (myTags.length > 0) {
      const langNames = myTags[0].descriptions();
      target = langNames[0];
   }
   return target;
}

/**
 * Generate a hash that maps codes to names. Useful for mapping back to the
 * language name.
 */
export function generateCodeToNameHash(names: string[]): Object
{
   const hash = {};
   for (const name of names) {
      hash[getCode(name)] = name;
   }
   return hash;
}
