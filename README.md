# ![CornerStone][cornerstone] CornerStone Bible
**Bringing the Bible to developers.**

## A Work in Progress
CornerStone has not come out with its first official release yet, but you can read more about it below!

## Free JavaScript Bible API
CornerStone is a standalone JavaScript library that provides the Bible to developers by combining multiple free online API's.

## Architecture
One of the key features of CornerStone is Adapters. Each Adapter is created for a Bible API and is integrated into CornerStone. CornerStone's single API can be used to access all of the content available from each Bible API adapter. As additional adapters are added, no change is required from your code.

![CornerStone Architecture][architecture]

## Features

### No dependencies
Load CornerStone into your Node project or browser; create an instance; and you are ready to go!

### Multi Platform Support
CornerStone is provided via JavaScript, which means that it works across **all platforms**. CornerStone can be used in **Node** projects, **Web apps**, and the browser!  

### Smart Caching
CornerStone intelligently caches calls to online Bible resources resulting in fewer calls; improving efficiency and data usage of users.

### Promises
CornerStone utilizes one of the newer features of JavaScript called Promises, a way to asynchronously retrieve content. Promises provide elegant error handling and chaining of calls.

### Adaptive to Your Project's Needs
Every project is different. Configure CornerStone to suit your project needs.

### Growing
Every adapter that is added increases the number of languages and versions that are accessible to developers using CornerStone.

By default all of the freely accessible adapters will by provided. You can choose to exclude an adapter if the API terms do not coincide with your usage. Some APIs may require an API key before they can be included and used.

### Easy to Debug
For any issues, logging can be enabled to CornerStone to output to the console. You can define how verbose you want to be: every detail or only errors.

## Installation
Greatness awaits!

## Usage
More to come!

By using CornerStone, you agree to the usage terms dictated by each Bible API. While CornerStone provides mechanisms to help comply with API usage terms, CornerStone is liable for misuse.

Be sure to
* provide the copyright text each time you display verses
* if your app charges money, check with each API's terms first. CornerStone allows you to choose which APIs you want to use if your application does not meet the terms.

## More About CornerStone
### Developed in TypeScript
CornerStone was developed in TypeScript so that the latest features of JavaScript and be utilized while providing compatibility for browsers. The TypeScript code is transpiled and nicely packaged into browser-supported JavaScript.

### Tested
CornerStone is rigorously tested through automation. Currently CornerStone has over 40 tests.

[cornerstone]: ./images/cornerstone-green192x192.png
[architecture]: ./images/architecture.png
