/**
 * Validator for "untrusted" input.
 */

export default class Validator
{
   private valid: boolean;
   private errorMessage: string;
   private delimiter: string;

   public constructor()
   {
      this.valid = true;
      this.errorMessage = "";
      this.delimiter = "\n";
   }

   public isValid(): boolean
   {
      return this.valid;
   }

   public getErrorMessage(): string
   {
      return this.errorMessage;
   }

   public bool(value: any): this
   {
      if (value !== true &&
          value !== false) {
         this.valid = false;
         this.appendError(value, " is not a boolean.");
      }
      return this;
   }

   public number(value: any, min?: number, max?: number): this
   {
      let error = "";
      if (value === true ||
          value === false ||
          isNaN(value) ||
          typeof value !== "number") {
         this.valid = false;
         error = " is not a number.";
      } else if (!isFinite(value)) {
         this.valid = false;
         error = " is not a finite number.";
      } else if (typeof min !== "undefined" && value < min) {
         this.valid = false;
         error = " is less than minimum value " + min + ".";
      } else if (typeof max !== "undefined" && value > max) {
         this.valid = false;
         error = " is greater than maximum value " + max + ".";
      }
      if (error !== "") {
         this.appendError(value, error);
      }

      return this;
   }

   public string(value: any): this
   {
      if (typeof value !== "string") {
         this.valid = false;
         this.appendError(value, " is not a string.");
      }
      return this;
   }

   public any(value: any, varName: string): this
   {
      let error = "";
      if (typeof value === "undefined") {
         this.valid = false;
         error = " " + varName + " should not be undefined.";
      } else if (value === null) {
         this.valid = false;
         error = " " + varName + " should not be null.";
      }
      if (error !== "") {
         this.appendError(value, error);
      }
      return this;
   }

   private appendError(value: any, msg: string): void
   {
      this.errorMessage += "Value: " + value + msg + this.delimiter;
   }
}
