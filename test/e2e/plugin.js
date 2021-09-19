// Import plugin factory
const PF = require("../../index");

function beforeHook() {
  console.log("before hook");
}

function beforeAllHook() {
  console.log("before all hook");
}

function afterHook() {
  console.log("after hook");
}

function afterAllHook() {
  console.log("after all hook");
}

/**
 * AS A USER
 */
const pf = new PF("full-test")
  // add steps
  .addGivenStep(
    "Log this {string}",
    function logger(stringToLog) {
      console.log(stringToLog);
      console.log(`by ${pf.getConfig()}`);
    },
    "Log something",
    ["log"]
  )
  .addWhenStep("I put my hands up", function handsUp() {})
  .addThenStep("I am happy", function happy() {})
  // add hooks
  .addBeforeHook(beforeHook)
  .addBeforeHook("tags", beforeHook)
  .addBeforeHook({tags: "tags"}, beforeHook)
  .addBeforeAllHook(beforeAllHook)
  .addBeforeAllHook({tags: "tags"}, beforeAllHook)
  .addAfterHook(afterHook)
  .addAfterHook("tags", afterHook)
  .addAfterHook({tags: "tags"}, afterHook)
  .addAfterAllHook(afterAllHook)
  .addAfterAllHook({tags: "tags"}, afterAllHook)
  // add state
  .addState("property", {foo: "bar"});

/**
 * AS A CORE CONTRIBUTOR
 */
function bootstrap() {
  const cucumberInstance = require("@cucumber/cucumber");
  const config = {name: "tony"};
  pf._commit(cucumberInstance, config);

  // TODO: mimic the bootstrap and test it
  class RestQA extends cucumberInstance.World {}

  cucumberInstance.setWorldConstructor(RestQA);
}

module.exports = bootstrap();
