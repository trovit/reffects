# Contributing

:tada: Thank you for being interested in contributing to this `reffects`. Don't hesitate to [open an issue] if something is wrong or you have any questions about how to contribute.

* [Bug issue template]
* [Feature issue template]

After cloning `reffects`, run `npm install` to fetch all the dependencies. After that you'll have to do `npm run bootstrap` to link the internal dependencies between the submodules. Once done, you're good to go. Try running the tests with `npm test` to check everything's ok. You can even use `npm run test:watch` to run them in the background every time your code changes :wink:

If you want to contribute to the project, follow these steps:

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
 

Once you're finished just push your changes and open a pull request. Get the [pull request template].

[open an issue]: https://github.com/trovit/reffects/issues/new
[Bug issue template]: ./bug_report.md
[Feature issue template]: ./feature_request.md
[pull request template]: ./pull_request_template.md