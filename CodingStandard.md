# CornerStone TypeScript Style Guide

## Imports

* Use `import`. Avoid using `require`.

   > Reason: `import` is the standard for JavaScript (ES6/2015) and `require` lacks compilation checking.

* Put all `import`s above non-`import` statements.

* Avoid using wildcards `*` in import statements.

   > Reason: Avoids importing unnecessary modules and shows the exact functionality that is being imported.

   ```typescript
   // bad
   import * as http from "http";

   // good
   import { request } from "http";
   ```

* Sort `import` statements alphabetically by module. Sorting within groups is allowed.

   ```typescript
   import { request } as http from "http";
   import { format } from "url";
   import {
      isBrowser,
      isNode
   } from "./Platform";

   // or

   // internal
   import {
      isBrowser,
      isNode
   } from "./Platform";

   // external
   import { format } from "url";
   import { request } as http from "http";
   ```

## Naming
* Variable names are in `camelCase`.
* Class and Enum names are in `StudlyCase`.
* Interface names start with `I` and are in `StudlyCase`.
* Constant names are uppercase and in `SNAKE_CASE`.

   > Reason: Items can be quickly identified by their name.

* End class attributes with an underscore `_` when a getter/setter is defined for the attribute.

   ```typescript
   class HelloWorld
   {
      private foo_: string;
      public get foo(): string
      {
         return this.foo_;
      }
   }
   ```

## Indentation
* Do use 3 `space`s for indents. Do not use `tab`s.
   > Reason: 3 spaces provides enough to make the indents clear, but not too much where there are unnecessary characters.

## Braces
* Named functions, interfaces, enums, and classes have the opening brace on the next line.

   ```typescript
   function hello(): string
   {

   }

   class HelloWorld
   {

   }

   interface IOptions
   {

   }
   ```

* Control structures, objects, and arrow functions have the opening brace on the same line.

   ```typescript
   if (isTrue) {

   }

   let car = {
      "color": "black",
      "wheels": 4
   };

   (x) => {

   }
   ```
* Chain `if` `else` statements:

   ```typescript
   if (isTrue) {

   } else if (otherTruth) {

   } else {

   }
   ```

* For functions with long names or many parameters, place the parameters on the next line using 2 indents (6 spaces).

   ```typescript
   function sayHelloAndGoodBye(
         hello,
         goodbye) {
      // do something
   }
   ```

## Comments and Newlines
* Do use multi-line comments for TypeDoc documentation. Do not define parameters and return in comment. TypeDoc automatically retrieves this information. Use punctuation for these comments.

   ```typescript
   /**
    * Documentation on foo.
    */
   function foo(): number
   {

   }
   ```

* Do not use consecutive newlines.

   ```typescript
   // bad
   let counter: number = 0;


   let foo: string = "hello";
   ```

## Assignments
* Don't use `var`. Use `let`.

   > Reason: `var` declares a variable globally. `let` declares a variable within the block-scope.

   ```typescript
   // bad
   var foo: string = "hello";

   // good
   let foo: string = "world";
   ```

* Do use `const` for properties that are not reassigned.

   ```typescript
   const foo: string = "hello";
   ```

## Typing
* Do define the type of variables with the colon immediately following the variable.

   ```typescript
   // good
   let counter: number = 0;

   // bad
   let counter : number = 0
   ```

* Do define the type of parameters and function return.

   ```typescript
   function getFavoriteWord(word: string): string
   {

   }
   ```

* For multi-line parameter objects, use the following format:

   ```typescript
   function doSomethingWithObject(
         {field,
          field2 = "defaultValue"}
       : {field: boolean,
          field2: string}) {

   }
   ```

* Do define the accessibility (public, private, protected, readonly, etc) of class attributes and methods.

   ```typescript
   class Animals
   {
      public name: string;
      public constructor(theName: string): void
      {
         this.name = theName;
      }
   }
   ```

## Typescript/JavaScript specific usage.
* Use `extends` for inheritance.
