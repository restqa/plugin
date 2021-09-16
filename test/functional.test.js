const PF = require("../index");

describe("Functional", () => {
  test("high level test", () => {
    /**
     * USER CONSTANTS
     */
    const pluginName = "super-plugin";
    const state = {name: "tony"};
    const GivenStepArgs = ["a yo", () => {}, "yo given step"];
    const WhenStepArgs = ["a yo is coming", () => {}, "yo when step"];
    const ThenStepArgs = ["a yo is leaving", () => {}, "yo then step"];
    const beforeAllHook = () => {};
    const beforeHook = () => {};
    const afterAllHook = () => {};
    const afterHook = () => {};

    /**
     * CORE CONSTANTS
     */
    const config = {foo: "bar"};
    const cucumberInstance = {
      After: jest.fn(),
      AfterAll: jest.fn(),
      Before: jest.fn(),
      BeforeAll: jest.fn(),
      BeforeStep: jest.fn(),
      Given: jest.fn(),
      Then: jest.fn(),
      When: jest.fn()
    };

    /**
     * AS A USER - PLUGIN MAKER
     */
    const pf = new PF(pluginName)
      // add steps
      .addGivenStep(...GivenStepArgs)
      .addWhenStep(...WhenStepArgs)
      .addThenStep(...ThenStepArgs)
      // add hooks
      .addBeforeHook(beforeHook)
      .addBeforeAllHook(beforeAllHook)
      .addAfterHook(afterHook)
      .addAfterAllHook(afterAllHook)
      // add state
      .addState("name", state.name);

    /**
     * AS A CORE MEMBER
     */
    pf._commit(cucumberInstance, config);

    // Expected user apis
    expect(pf.getConfig()).toEqual(config);
    expect(pf.name).toEqual(pluginName);

    // Expected core apis
    expect(pf._getState()).toEqual(state);

    // Expected flows
    expect(cucumberInstance.After).toHaveBeenCalled();
    expect(cucumberInstance.AfterAll).toHaveBeenCalled();
    expect(cucumberInstance.Before).toHaveBeenCalled();
    expect(cucumberInstance.BeforeAll).toHaveBeenCalled();
    expect(cucumberInstance.Given).toHaveBeenCalled();
    expect(cucumberInstance.When).toHaveBeenCalled();
    expect(cucumberInstance.Then).toHaveBeenCalled();
  });
});
