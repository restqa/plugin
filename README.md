# @restqa/plugin

The plugin factory enhance developer experience regarding the creation of custom step definition (with state and hooks).

If you're not familiar with these notions you should take a look into the [Cucumber documentation](https://cucumber.io/docs/cucumber/step-definitions/).

## Install

With npm:

```bash
$ npm i @restqa/plugin
```

With yarn:

```bash
$ yarn add @restqa/plugin
```

## Usage

### Create an instance,

```js
const PluginFactory = require("@restqa/plugin");

const pf = new PluginFactory("plugin-name");
```

### Then add steps definition:

```js
  const db = require("../my-db");

  const stepDefinition = "Then the db should contains {int} users";
  const handlerFunc = (expectedUserCount) => {
    const users = db.find({});
    const currentUserCount = users.length;

    return expectedUserCount === currentUserCount
  }
  const description = "Check the number of users in the db";
  const tags = ["db"] // optional, the name of the plugin is added by default

  pf
    .addThenStep(
      stepDefinition,
      handlerFunc,
      descriptions,
      tags
    )
    // Similar api for the following methods
    .addWhenStep(...)
    .addGivenStep(...);

```

### Or add hooks:

```js
  const beforeHook = () => {
    console.log("Before hook");
  }

  pf
    .addBeforeHook(beforeHook)
    .addBeforeHook("@foo", beforeHook)
    .addBeforeHook({ tags: "@foo" }, beforeHook)
    // Similar api for the following method
    .addAfterHook(...)
```

Interface is a bit different for `addBeforeAllHook` and `addAfterAllHook`:

```js
  const beforeAllHook = () => {
    console.log("Before all hook");
  }

  pf
    .addBeforeAllHook(beforeAllHook)
    // Similar api for the following method
    .addAfterAllHook(...)
```

### You can add state too:

To access state you have to use the name of your plugin
```js
// in function handler for steps or hooks

const state = this["plugin-name"];

// or

const state = this[pf.name];
```

Real world case:
```js
  pf
    .addState("user", { name: "tony", age: Infinity })
    // then use it elsewhere
    .addThenStep(
      "then user age should be {int}",
      (expectedUserAge) => this[pf.name].user.age === expectedUserAge
    )
```

### Use a config

When you declare your plugin in RestQA you can add a config: 

```yml
- name: "<your-super-plugin-path>"
  config:
    foo: 'bar'
```
Then, you can use it in your code:

```js
  const config = pf.getConfig();
```

## Declare your plugin in RestQA

```js
// in your plugin code

// cjs export
module.exports = pf;

// or esm export
export default pf;
```

Then, in the restqa.yml:

```yml
- name: "<your-super-plugin-path>"
  config:
    locale: 'fr'
```

## API (todo)