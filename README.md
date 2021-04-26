# batr
Bundle and test CommonJS + ESM in NodeJS and the browser. And repeat with Travis-CI.

![batr-logo](https://user-images.githubusercontent.com/236656/115827172-3757dd00-a40c-11eb-9687-70bb6e623d2b.png)


## Background and goal
* Use less time on updating the same bundle and test framework code in different libraries.
* Quicker bundling and test setup when creating new libraries.
* As few dependencies as possible, or a good balance between dependencies and function, to not have minor updates all the time.
* Less noise from Dependabot.

### Easy setup of
* Ava tests in Node.js
* Possibly duplicat Ava tests in browser
* User-like interaction tests in browser, supported by Ava
* Bundling & building for the browser, CommonJS and ESM
