import LanguageTags from "language-tags";

export function getCode(name: string): string {
   let target = null;
   const tags = LanguageTags.search(name);
   if (tags.length > 0) {
      let tag = tags[0].data;
      const preferredValueExists = (typeof tag["Preferred-Value"] !== 'undefined');
      if (preferredValueExists) {
         target = tag["Preferred-Value"];
      } else {
         target = tag["subtag"];
      }
   }
   return target;
}

export function getName(code: string): string {
   let target = null;
   let tags = LanguageTags.subtags(code);
   if (tags.length > 0) {
      let langNames = tags[0].descriptions();
      target = langNames[0];
   }
   return target;
}
