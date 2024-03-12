# Testcafe e2e testing

Docs available: https://devexpress.github.io/testcafe/

## Running the tests

See `package.json` script section:

- `testcafe:run` will run tests in chrome browser (default)

## Config Files

The `testcafe.json` in the `testcafe` folder contains configuration:

- `"baseUrl": "http://127.0.0.1:3000"`
  The url you want to run the e2e tests against

The `.testcaferc.json` in the root of the project contains the following testcafe configuration
(see https://devexpress.github.io/testcafe/documentation/reference/configuration-file.html):

- `"browsers": "chrome"`
  Specifies one or several browsers in which test should be run.
