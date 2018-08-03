import {
   INumValOptions,
   IShortValOptions,
   IValidator,
} from "../interfaces/IValidator";
/**
 * Validator for "untrusted" input.
 */

export class Validator implements IValidator
{
   private valid: boolean;
   private errorMessage: string;
   private delimiter: string;
   private optionalFlag: boolean;

   public constructor()
   {
      this.valid = true;
      this.errorMessage = "";
      this.delimiter = "\n";
      this.optionalFlag = false;
   }

   public isValid(): boolean
   {
      return this.valid;
   }

   public getErrorMessage(): string
   {
      return this.errorMessage;
   }

   public boolean(options: IShortValOptions): this
   {
      return this.validate(options, () => {
         if (options.value !== true &&
             options.value !== false) {
            this.setInvalid(options, " is not a boolean.");
         }
         return this;
      });
   }

   public number(options: INumValOptions): this
   {
      return this.validate(options, () => {
         let error = "";
         if (isNaN(options.value) ||
             typeof options.value !== "number") {
            error = " is not a number.";
         } else if (!isFinite(options.value)) {
            error = " is not a finite number.";
         } else if (typeof options.min !== "undefined" && options.value < options.min) {
            error = " is less than minimum value " + options.min + ".";
         } else if (typeof options.max !== "undefined" && options.value > options.max) {
            error = " is greater than maximum value " + options.max + ".";
         }
         if (error !== "") {
            this.setInvalid(options, error);
         }
         return this;
      });
   }

   public string(options: IShortValOptions): this
   {
      return this.validate(options, () => {
         if (typeof options.value !== "string") {
            this.setInvalid(options, " is not a string.");
         }
         return this;
      });
   }

   public object(options: IShortValOptions): this
   {
      return this.validate(options, () => {
         if (typeof options.value !== "object") {
            this.setInvalid(options, " is not an object.");
         }
         return this;
      });
   }

   public any(options: IShortValOptions): this
   {
      return this.validate(options, () => {
         return this;
      });
   }

   public optional(): this
   {
      this.optionalFlag = true;
      return this;
   }

   public reset(): this
   {
      this.optionalFlag = false;
      this.valid = true;
      this.errorMessage = "";
      return this;
   }

   private validate(options: IShortValOptions, check: () => this): this
   {
      if (this.optionalFlag && !this.defined(options.value)) {
         return this;
      } else if (!this.defined(options.value)) {
         // Should have been defined
         let error = "";
         if (typeof options.value === "undefined") {
            error = " should not be undefined.";
         } else if (options.value === null) {
            error = " should not be null.";
         }
         if (error !== "") {
            this.setInvalid(options, error);
         }
         return this;
      } else {
         // Perform check
         return check();
      }
   }

   private defined(value: any): boolean
   {
      return (value !== null && typeof value !== "undefined");
   }

   private setInvalid(options: IShortValOptions, msg: string): void
   {
      this.valid = false;
      this.appendError(options, msg);
   }

   private appendError(options: IShortValOptions, msg: string): void
   {
      this.errorMessage += (this.defined(options.name) ? options.name + " with " : "") +
                           "value " + options.value + " : " + msg + this.delimiter;
   }
}
