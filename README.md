# CornerStone

## A Unified JavaScript Bible API
CornerStone is a standalone JavaScript library that provides the Bible by combining multiple online API's.

### The Problem
For a website, web app, or node project to get access to Bible content, the developer must research available Bible APIs online and carefully choose which API to use. Choosing an API might depend on how many languages and versions are provided, or by how easy it is to use the API. In the end, the developer needs to choose one Bible API. If the developer wishes to add more content, additional code must be written to support addition APIs.

### The Solution
CornerStone was created to solve this problem. The goal is to provide multiple Bible APIs through one simple, "unified" API while providing features to enhance the developing and user experience.

## Architecture
One of the key features of CornerStone is Adapters. Each Adapter is created for a Bible API and is integrated into CornerStone. CornerStone's single API can be used to access all of the content available from each Bible API adapter. As additional adapters are added, no change is required from your code.
![CornerStone Architecture][architecture]

## Features

### Multi Platform Support
CornerStone is provided in a JavaScript bundle, which means that it works across *all platforms* and **browsers**. **Node** projects or **Web apps** for phones can use CornerStone!  

### Smart Caching
CornerStone intelligently caches calls to online Bible resources resulting in fewer calls, thus improving efficiency and data usage of users.

### Growing
Every adapter that is added increases the number of languages and versions that are accessible to those using CornerStone.

## Installation

## Usage

## More About CornerStone
### Developed in TypeScript
CornerStone was developed in TypeScript so that the latest features of JavaScript and be utilized while providing compatibility for browsers. The TypeScript code is transpiled and nicely packaged into browser-supported JavaScript.

### Unit testing
This project was developed using Test Driven Development (TDD) to improve quality of code. Techniques such as Behavior Driven Development (BDD) were also used.

Currently CornerStone has over 20 unit tests.

[architecture]: ./images/architecture.png
