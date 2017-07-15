# CornerStone Style Guide

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

* Sort `import` statements alphabetically by function. Sorting within groups is allowed.

   ```typescript
   import { format } from "url";
   import { isBrowser } from "./Platform";
   import { isNode } from "./Platform";
   import { request } as http from "http";

   // or

   // internal
   import { isBrowser } from "./Platform";
   import { isNode } from "./Platform";
   // external
   import { format } from "url";
   import { request } as http from "http";
   ```

## Naming
* Variable names are in `camelCase`.
* Class names are in `StudlyCase`.
* Interface names start with `I` and are in `StudlyCase`.
* Constant names are uppercase and in `SNAKE_CASE`.

   > Reason: Items can be quickly identified by their name.

* Prefix class attributes with an underscore `_` when a getter/setter is defined for the attribute.

   ```typescript
   class HelloWorld
   {
      private _foo: string;
      public get foo(): string
      {
         return this._foo;
      }
   }
   ```

## Indentation
* Do use 3 `space`s for indents. Do not use `tab`s.
   > Reason: 3 spaces provides enough to make the indents clear, but not too much where there are unnecessary characters.

## Braces
* Named functions, interfaces, and classes have the opening brace on the next line.

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

## Comments and Newlines
* Do use multi-line comments for TypeDoc documentation. Do not define parameters and return in comment. TypeDoc automatically retrieves this information.

   ```typescript
   /**
    * Documentation on foo
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
* Do define the type of variables.

   ```typescript
   let counter: number = 0;
   ```

* Do define the type of parameters and function return.

   ```typescript
   function getFavoriteWord(word: string): string
   {

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
