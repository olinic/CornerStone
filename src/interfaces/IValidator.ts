
export default interface IValidator
{
   isValid(): boolean;
   getErrorMessage(): string;
   boolean(obj: IShortValOptions): this;
   number(obj: INumValOptions): this;
   string(obj: IShortValOptions): this;
   object(obj: IShortValOptions): this;
   any(obj: IShortValOptions): this;
   optional(): this;
   reset(): this;
}

export interface IShortValOptions
{
   name?: string;
   value: any;
}

export interface INumValOptions extends IShortValOptions
{
   min?: number;
   max?: number;
}
