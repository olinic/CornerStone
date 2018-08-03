import { ILogger } from "../interfaces/ILogger";
import {
   ITemplateConverter,
   ITemplateParam
} from "../interfaces/ITemplateConverter";

/**
 * Converts a provided JSON template into a function that
 * implements the template.
 */
export class TemplateConverter implements ITemplateConverter
{
   private logger: ILogger;
   private params: ITemplateParam[];
   private template: string;
   private converter: Function;

   public constructor(
         logger: ILogger,
         params: ITemplateParam[])
   {
      this.logger = logger;
      this.params = params;
      this.template = "";
   }

   public validate(template: string): boolean
   {
      let valid: boolean = true;
      try {
         JSON.parse(template);
         this.logger.debug("Parsed template (" + template + ")");
         valid = this.validateFields(template);
      } catch (e) {
         this.logger.error("Provided template (" + template + ") could not be parsed.");
         valid = false;
      }
      return valid;
   }

   public setTemplate(template: string): void
   {
      if (this.validate(template)) {
         this.template = template;
         this.logger.debug("Updated template to " + template);
      } else {
         throw this.logger.logAndGiveError("Cannot set a bad template.");
      }
   }

   public convert(args: object): object
   {
      // Assumes that template is valid if it is set
      if (this.template.length > 0) {
         const obj: object = JSON.parse(this.template);
         /*return {
            my: "world",
            multi: [{item: "some"}, {item: "other"}, {item: "values"}]
         };*/
         this.propagateChanges(obj, args);
         return obj;
      } else {
         throw this.logger.logAndGiveError("Cannot convert without a template.");
      }
   }

   private validateFields(template: string): boolean
   {
      let success: boolean = true;
      for (let i: number = 0; i < this.params.length && success; i++) {
         this.logger.debug("Checking " + this.params[i].name + "\n");
         const hasValue: boolean = this.containsValue(template, this.params[i].name);
         if (this.params[i].required && !hasValue) {
            success = false;
         }
         if (hasValue &&
               this.params[i].multiple &&
               !this.correctMultiFormat(template, this.params[i].name)) {
            success = false;
         }
      }
      return success;
   }

   private containsValue(template: string, value: string): boolean
   {
      // Check if the template contains the parameter
      //                                     :       "required"
      //                                     :      ["required"
      const valueExists: boolean = (template.search(new RegExp(':[\\s\[]*"' + value + '"')) !== -1);
      if (!valueExists) {
         this.logger.error("Template does not contain required field: " + value);
      }
      return valueExists;
   }

   /* tslint:disable */
   private correctMultiFormat(template: string, value: string): boolean
   {
      const s: string = '\\s*';          // spaces
      const svc: string = '[\\s\\w\\,\\"0-9]*';   // spaces, values, or commas
      const sfvc: string = '[\\s\\w\\,\\"0-9:]*' // spaces, fields, values, or commas
      const ob: string = s + '\\[' + s;  // open bracket
      const cb: string = s + '\\]' + s;  // closed bracket
      const ocb: string = s + '\\{' + s; // open curly bracket
      const ccb: string = s + '\\}' + s; // closed curly bracket
      const strVal: string = '"' + value + '"';

      const patterns: RegExp[] = [
         // length of 1 pattern
         //          :    [   "value"    ]
         new RegExp(':' + ob + strVal + cb),
         // array within an array(s) pattern
         //          :      [   [    ... ,            "value"      , ...  ] ]
         new RegExp(':' + ob + ob + '[\\s\\[]*' + svc + strVal + svc + cb + cb),
         // obj within an array pattern
         //         [  {   ... ,  "field": "value" , ...}    ]
         new RegExp(ob + ocb + sfvc + strVal + sfvc + ccb + cb)
      ];

      let match: boolean = false;

      for (let i in patterns) {
         match = match || patterns[i].test(template);
      }

      if (!match) {
         this.logger.error("Multi field " + value + " does not have correct format in " + template);
      }

      return match;
   }

   /**
    * Propagates changes in the changeable object.
    * Any values in changeable that match the index of params will
    * be replaced by the value in params.
    */
   public propagateChanges(changeable: Array<any> | object, args: object): void
   {
      for (let param in changeable) {
         const value: any = changeable[param];
         if (typeof value !== 'object') {
            console.log("Checking if " + value + " exists in input.");
            if (typeof args[value] !== 'undefined') {
               // Replace value
               changeable[param] = args[value];
            }
         } else {
            this.propagateChanges(changeable[param], args);
         }
      }
   }

   private createConverter(template: string, args: object): void
   {

      let functionBody: string = "";
      this.converter = new Function("myArgs", functionBody);
   }


}
