# ![CornerStone][cornerstone] CornerStone
**Bringing the Bible to developers.**

## A Unified JavaScript Bible API
CornerStone is a standalone JavaScript library that provides the Bible to developers by combining multiple online API's.

### The Problem
For a website, web app, or node project to get access to Bible content, the developer must research available Bible APIs online and carefully choose which API to use. Choosing an API might depend on how many languages and versions are provided, or by how easy it is to use the API. In the end, the developer needs to choose one Bible API. If the developer wishes to add more content, additional code must be written to support addition APIs.

### The Solution
CornerStone was created to solve this problem. The goal is to provide multiple Bible APIs through one simple, "unified" API while providing features to enhance the developing and user experience.

## Architecture
One of the key features of CornerStone is Adapters. Each Adapter is created for a Bible API and is integrated into CornerStone. CornerStone's single API can be used to access all of the content available from each Bible API adapter. As additional adapters are added, no change is required from your code.

![CornerStone Architecture][architecture]

## Features

### No dependencies
Load CornerStone into your Node project or Browser, create an instance; and you are ready to go!

### Multi Platform Support
CornerStone is provided in a JavaScript bundle, which means that it works across **all platforms**. CornerStone can be used in **Node** projects and **Web apps**!  

### Smart Caching
CornerStone intelligently caches calls to online Bible resources resulting in fewer calls; improving efficiency and data usage of users.

### Promises
CornerStone utilizes one of the newer features of JavaScript called Promises, a way to asynchronously retrieve content. Opposed to callbacks, promises provide error handling and are easy to use.

### Adaptive to Your Project's Needs
Every project is different. Configure CornerStone to suit your project needs. For example, You can define how you want your data to look when it comes out of CornerStone.

### Growing
Every adapter that is added increases the number of languages and versions that are accessible to those using CornerStone.

By default all of the freely accessible adapters will by provided. You can choose to exclude an adapter if the API terms do not coincide with your usage. Some APIs may require an API key before they can be included and used.

### Easy to Debug
For any issues, logging can be enabled to CornerStone to output to the console. You can define how verbose you want to be: every detail or only errors.

## Installation

## Usage

By using CornerStone, you agree to the usage terms dictated by each Bible API. While CornerStone provides mechanisms to help comply with API usage terms, CornerStone is not held liable for misuse.

Be sure to
* provide the copyright text each time you display verses
* if your app charges money, check with each API's terms first

## More About CornerStone
### Developed in TypeScript
CornerStone was developed in TypeScript so that the latest features of JavaScript and be utilized while providing compatibility for browsers. The TypeScript code is transpiled and nicely packaged into browser-supported JavaScript.

### Unit Tested
This project was developed using Test Driven Development (TDD) to improve quality of code. Techniques such as Behavior Driven Development (BDD) were also used.

Currently CornerStone has over 40 unit tests.

[cornerstone]: ./images/cornerstone-green192x192.png
[architecture]: ./images/architecture491x350.png
