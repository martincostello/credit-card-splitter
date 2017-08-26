# Contributing

## Feature requests and bugs

Please submit any feature requests or bugs as an [issue](https://github.com/martincostello/credit-card-splitter/issues) in GitHub.

## Pull requests

If you wish to contribute code, please follow the guidelines below:

  1. Create an issue detailing the motivation for the change. Any changes that require adding new dependencies from npm should be discussed in an issue with project maintainers.
  1. Fork the repository to your GitHub account.
  1. Create a branch to work on your changes.
  1. Try to commit changes in a logical manner. Messy histories will be squashed if merged.
  1. Please follow the existing code style and [EditorConfig](http://editorconfig.org/) formatting settings.
  1. If fixing a bug or adding new functionality, add any tests you deem appropriate.
  1. Ensure ```npm test``` is run with no errors or warnings.
  1. Open a pull request against the ```master``` branch, referencing your issue if appropriate.

Once your pull request is opened, the project maintainers will assess it for validity and an appropriate level of quality. For example, the [Travis CI build](https://travis-ci.org/martincostello/credit-card-splitter) should pass.

If the project maintainers are satisfied that your contribution is appropriate it will be merged into the master branch when appropriate and it will then be deployed when the site is next updated in AWS.
