module.exports = class PluginFactory {
  /**
   *
   * @param {PluginFactory.Options} options
   */
  constructor(options) {
    if (typeof options?.name === "string") {
      this._name = options.name;
    } else {
      throw new Error("A name property should be pass to the constructor");
    }

    // steps
    this._givenSteps = [];
    this._whenSteps = [];
    this._thenSteps = [];

    // hooks
    this._beforeHooks = [];
    this._afterHooks = [];
    this._beforeAllHooks = [];
    this._afterAllHooks = [];

    // state
    this._state = {};
  }

  get name() {
    return this._name;
  }

  addGivenStep(stepDefinition, handler, description, tags) {
    const formattedTags = this._formatTagsAndAddName(tags);

    this._givenSteps.push([
      stepDefinition,
      handler,
      description,
      formattedTags
    ]);

    return this;
  }

  addWhenStep(stepDefinition, handler, description, tags) {
    const formattedTags = this._formatTagsAndAddName(tags);

    this._whenSteps.push([stepDefinition, handler, description, formattedTags]);

    return this;
  }

  addThenStep(stepDefinition, handler, description, tags) {
    const formattedTags = this._formatTagsAndAddName(tags);

    this._thenSteps.push([stepDefinition, handler, description, formattedTags]);

    return this;
  }

  addBeforeHook(hookFunction) {
    this._checkHookFunction(hookFunction, "addBeforeHook");

    this._beforeHooks.push(hookFunction);

    return this;
  }

  addAfterHook(hookFunction) {
    this._checkHookFunction(hookFunction, "addAfterHook");

    this._afterHooks.push(hookFunction);

    return this;
  }

  addBeforeAllHook(hookFunction) {
    this._checkHookFunction(hookFunction, "addBeforeAllHook");

    this._beforeAllHooks.push(hookFunction);

    return this;
  }

  addAfterAllHook(hookFunction) {
    this._checkHookFunction(hookFunction, "addAfterAllHook");

    this._afterAllHooks.push(hookFunction);

    return this;
  }

  addState(key, value) {
    if (typeof key !== "string") {
      throw new TypeError(
        `addState key parameter should be string, instead got ${typeof key}`
      );
    } else if (key.length < 1) {
      throw new Error("addState key parameter should not be an empty string");
    }

    this._state[key] = value;

    return this;
  }

  // getConfig() {
  //   return this._config;
  // }

  /**
   *
   * FOR RESTQA CORE ONLY
   */
  // _apply(cucumber, config) {
  //   this._config = config;

  // }

  /**
   * UTILS
   */
  _checkHookFunction(hookFunction, functionContextName = "hook") {
    if (typeof hookFunction !== "function") {
      throw new TypeError(
        `${functionContextName} parameter should be a function but got ${typeof hookFunction}`
      );
    }
  }

  _formatTagsAndAddName(tags) {
    if (tags !== undefined) {
      return Array.isArray(tags) ? [this.name, ...tags] : [this.name, tags];
    } else {
      return [this.name];
    }
  }
};
