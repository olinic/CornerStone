## Developing

    cd <project directory>
    npm install

Be sure to look over the CodingStandard.md.

## Testing
To run the unit tests, execute

    npm test

To run the system tests, execute

    npm run systemtest

The browser HTTPS test will fail by default because it is a self signed
certificate. To allow HTTPS for localhost on Chrome, enter the following as a
URL:

    chrome://flags/#allow-insecure-localhost

## Capturing Lint
Before committing changes, be sure to run the linter:

    npm run lint
