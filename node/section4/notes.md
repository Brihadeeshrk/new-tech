while installing packages, if they are only suited for development work, you can have the normal package name and then use
--save-dev
and this would put it in the devDependency obj
--save would make it a normal dependency

Global features: Keywords like const or function but also some global objects like process
Core Node.js Modules: Examples would be the file-system module `("fs")`, the path module `("path")` or the Http module `("http")`
Third-party Modules: Installed via `npm install` - you can add any kind of feature to your app via this way

Core Node.js Modules don't need to be installed but you need to import them when you want to use features exposed by them.

Example:

```js
const fs = require("fs");
```

You can now use the fs object exported by the "fs" module.

Third-party Modules need to be installed (via npm install in the project folder) AND imported.

TYPES OF ERRORS

syntax;
grammatical errors and mistakes in the syntax

runtime:
errors that prevent you from running the server

logical:
you're getting the o/p but its not right and somethings wrong with the logic
