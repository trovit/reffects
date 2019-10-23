# Contributing

:tada: Thank you for being interested in contributing to this `reffects`. Don't hesitate to [open an issue] if something is wrong or you have any questions about how to contribute.

* [Bug issue template]
* [Feature issue template]

### 1. Setup

* Fork this repository and clone the fork. 
* Create a branch.
* Do your changes (if it's a feature, add the corresponding tests)
* Commit changes. Preferably use this nomenclature:
  * `fix`: when fixing a bug
  * `feat`: when adding an enhancement to the code 
  * `refactor`: when improving the code eithout adding a feature or fixing something
  * `chore`: for tooling changes
  * `docs`: for documentation improves
  
Add any "context" `(server/client/...)` to the commit message if you want. I'll give you some examples:

> * fix: checks undefined effect handler arguments
> * feat: adds new coeffect handler param
> * docs: clarifies contributing file about testing 
 

### 2. Testing

To run the tests once: `npm run test`

To run the tests everytime the code changes: `npm run test:watch`


### 3. Release

Once you're finished just push your changes and open a pull request. Get the [pull request template].

[open an issue]: https://github.com/trovit/reffects/issues/new
[Bug issue template]: ./bug_report.md
[Feature issue template]: ./feature_request.md
[pull request template]: ./pull_request_template.md