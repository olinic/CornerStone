
/**
 * A template converter converts templates into an object.
 */
export default interface ITemplateConverter
{
   // Validate a template.
   validate(template: string): boolean;
   setTemplate(template: string): void;
   // Convert the template using passed arguments. Will change.
   convert(args: object);
}

/**
 * Parameter for TemplateConverter
 */
export interface ITemplateParam
{
   // Name of the input parameter (value from CornerStone)
   name: string;
   // Is this required in the template
   required: boolean;
   // Will this parameter be expanded (multiple values)
   multiple: boolean;
}
