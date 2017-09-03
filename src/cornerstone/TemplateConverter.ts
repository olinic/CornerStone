// Internal
import { ILogger } from "../interfaces/ILogger";

/**
 * Converts a provided JSON template into a function that
 * implements the template.
 */
export default class TemplateConverter
{
   public constructor(
         private logger: ILogger) {
   }

   public defineParameters(): void {

   }

   public validateTemplate(template: string): boolean {
      let valid = true;
      try {
         JSON.parse(template);
         this.logger.debug("Parsed template (" + template + ")");
      } catch (e) {
         this.logger.error("Provided template (" + template + ") could not be parsed.");
         valid = false;
      }
      return valid;
   }

   // tslint:disable-next-line ban-types
   public createTemplateFunction(): Function {
      return new Function("a", "return a;");
   }
}
