import * as LanguageTags from "language-tags";

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

export function getName(code: string): string {
   let target = null;
   const myTags = LanguageTags.subtags(code);
   if (myTags.length > 0) {
      const langNames = myTags[0].descriptions();
      target = langNames[0];
   }
   return target;
}
