// Import plugin factory
const PF = require("../../index");

/**
 * AS A USER
 */
const pf = new PF("full-test")
  /**
   *
   * STEPS
   *
   */
  // Given step
  .addGivenStep(
    "Log this {string}",
    function logger(stringToLog) {
      console.log(stringToLog);
      console.log(`by ${pf.getConfig()}`);
    },
    "Log something",
    ["log"]
  )
  // When step
  .addWhenStep("I put my hands up", function handsUp() {})
  // Then step
  .addThenStep("I am happy", function happy() {})
  /**
   *
   * HOOKS
   *
   */
  // Before Hook
  .addBeforeHook(function beforeHook() {
    console.log("before hook");
  })
  .addBeforeHook(
    "@beforeHookWithStringTag",
    function beforeHookWithStringTag() {
      console.log("before hook with string tag");
    }
  )
  .addBeforeHook(
    {tags: "@beforeHookWithObjectTag"},
    function beforeHookWithObjectTag() {
      console.log("before hook with object tag");
    }
  )
  // After Hook
  .addAfterHook(function afterHook() {
    console.log("after hook");
  })
  .addAfterHook("@afterHookWithStringTag", function afterHookWithStringTag() {
    console.log("after hook with string tag");
  })
  .addAfterHook(
    {tags: "@afterHookWithObjectTag"},
    function afterHookWithObjectTag() {
      console.log("after hook with object tag");
    }
  )
  // BeforeAll Hook
  .addBeforeAllHook(function beforeAllHook() {
    console.log("before all hook");
  })
  // AfterAll Hook
  .addAfterAllHook(function afterAllHook() {
    console.log("after all hook");
  })
  /**
   *
   * STATE (World)
   *
   */
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
