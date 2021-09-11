const PluginFactory = require("../index");

describe("core usage", () => {
  describe("validation & global", () => {
    it("should throw an error if no cucumber instance is provided, or if it's not an object", () => {
      const pf = new PluginFactory({name: "plugin"});

      expect(() => pf._apply()).toThrow(
        new TypeError("Cucumber instance should be an object but got undefined")
      );

      const nullishCucumber = null;
      expect(() => pf._apply(nullishCucumber)).toThrow(
        new TypeError(
          `Cucumber instance should be an object but got ${nullishCucumber}`
        )
      );

      const numberCucumber = 3;
      expect(() => pf._apply(numberCucumber)).toThrow(
        new TypeError(
          `Cucumber instance should be an object but got ${numberCucumber}`
        )
      );

      const arrayCucumber = [];
      expect(() => pf._apply(arrayCucumber)).toThrow(
        new TypeError(
          `Cucumber instance should be an object but got ${arrayCucumber}`
        )
      );

      const stringCucumber = "str";
      expect(() => pf._apply(stringCucumber)).toThrow(
        new TypeError(
          `Cucumber instance should be an object but got ${stringCucumber}`
        )
      );
    });

    it("should not apply cucumber instance if there are steps, hooks or state", () => {
      const pf = new PluginFactory({name: "plugin"});

      const After = jest.fn();
      const AfterAll = jest.fn();
      const AfterStep = jest.fn();
      const Before = jest.fn();
      const BeforeAll = jest.fn();
      const BeforeStep = jest.fn();
      const Given = jest.fn();
      const Then = jest.fn();
      const When = jest.fn();
      const setWorldConstructor = jest.fn();
      const cucumberInstance = {
        After,
        AfterAll,
        AfterStep,
        Before,
        BeforeAll,
        BeforeStep,
        Given,
        Then,
        When,
        setWorldConstructor
      };

      pf._apply(cucumberInstance);

      expect(Given).not.toHaveBeenCalled();
      expect(When).not.toHaveBeenCalled();
      expect(Then).not.toHaveBeenCalled();

      expect(After).not.toHaveBeenCalled();
      expect(AfterAll).not.toHaveBeenCalled();
      expect(Before).not.toHaveBeenCalled();
      expect(BeforeAll).not.toHaveBeenCalled();
    });
  });

  describe("apply steps", () => {
    it("should apply Given from cucumber instance if there are Given steps", () => {
      const pf = new PluginFactory({name: "plugin"});
      const Given = jest.fn();

      pf.addGivenStep("yo", () => {}, "yo step");
      pf.addGivenStep("yo", () => {}, "yo step");

      pf._apply({Given});

      expect(Given).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if there Given steps but no Given instance", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are Given steps to bind, cucumber instance should contains Given function"
      );

      pf.addGivenStep("yo", () => {}, "yo step");
      pf.addGivenStep("yo", () => {}, "yo step");

      expect(() => pf._apply({})).toThrow(expectedError);
    });

    it("should apply When from cucumber instance if there are When steps", () => {
      const pf = new PluginFactory({name: "plugin"});
      const When = jest.fn();

      pf.addWhenStep("yo", () => {}, "yo step");
      pf.addWhenStep("yo", () => {}, "yo step");

      pf._apply({When});

      expect(When).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if there When steps but no When instance", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are When steps to bind, cucumber instance should contains When function"
      );

      pf.addWhenStep("yo", () => {}, "yo step");
      pf.addWhenStep("yo", () => {}, "yo step");

      expect(() => pf._apply({})).toThrow(expectedError);
    });

    it("should apply Then from cucumber instance if there are Then steps", () => {
      const pf = new PluginFactory({name: "plugin"});
      const Then = jest.fn();

      pf.addThenStep("yo", () => {}, "yo step");
      pf.addThenStep("yo", () => {}, "yo step");

      pf._apply({Then});

      expect(Then).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if there Then steps but no Then instances", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are Then steps to bind, cucumber instance should contains Then function"
      );

      pf.addThenStep("yo", () => {}, "yo step");
      pf.addThenStep("yo", () => {}, "yo step");

      expect(() => pf._apply({})).toThrow(expectedError);
    });
  });

  describe("apply hooks", () => {
    it("should apply After from cucumber instance if there are After hooks", () => {
      const pf = new PluginFactory({name: "plug"});
      const After = jest.fn();

      pf.addAfterHook(() => {});
      pf.addAfterHook(() => {});
      pf.addAfterHook(() => {});

      pf._apply({After});

      expect(After).toHaveBeenCalledTimes(3);
    });

    it("should throw an error if there a After hooks but no After instance", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are After hooks to bind, cucumber instance should contains After function"
      );

      pf.addAfterHook(() => {});

      expect(() => pf._apply({})).toThrow(expectedError);
    });

    it("should apply AfterAll from cucumber instance if there are AfterAll hooks", () => {
      const pf = new PluginFactory({name: "plug"});
      const AfterAll = jest.fn();

      pf.addAfterAllHook(() => {});
      pf.addAfterAllHook(() => {});
      pf.addAfterAllHook(() => {});

      pf._apply({AfterAll});

      expect(AfterAll).toHaveBeenCalledTimes(3);
    });

    it("should throw an error if there a AfterAll hooks but no AfterAll instance", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are AfterAll hooks to bind, cucumber instance should contains AfterAll function"
      );

      pf.addAfterAllHook(() => {});

      expect(() => pf._apply({})).toThrow(expectedError);
    });

    it("should apply Before from cucumber instance if there are Before hooks", () => {
      const pf = new PluginFactory({name: "plug"});
      const Before = jest.fn();

      pf.addBeforeHook(() => {});
      pf.addBeforeHook(() => {});
      pf.addBeforeHook(() => {});

      pf._apply({Before});

      expect(Before).toHaveBeenCalledTimes(3);
    });

    it("should throw an error if there a Before hooks but no Before instance", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are Before hooks to bind, cucumber instance should contains Before function"
      );

      pf.addBeforeHook(() => {});

      expect(() => pf._apply({})).toThrow(expectedError);
    });

    it("should apply BeforeAll from cucumber instance if there are BeforeAll hooks", () => {
      const pf = new PluginFactory({name: "plug"});
      const BeforeAll = jest.fn();

      pf.addBeforeAllHook(() => {});
      pf.addBeforeAllHook(() => {});
      pf.addBeforeAllHook(() => {});

      pf._apply({BeforeAll});

      expect(BeforeAll).toHaveBeenCalledTimes(3);
    });

    it("should throw an error if there a BeforeAll hooks but no BeforeAll instance", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are BeforeAll hooks to bind, cucumber instance should contains BeforeAll function"
      );

      pf.addBeforeAllHook(() => {});

      expect(() => pf._apply({})).toThrow(expectedError);
    });
  });

  describe("set config", () => {
    it("config could be set with _apply function", () => {
      const pf = new PluginFactory({name: "tony"});
      const config = {foo: "bar"};

      pf._apply({}, config);

      expect(pf.getConfig()).toEqual(config);
    });

    it("should throw an error if config is not an object", () => {
      const pf = new PluginFactory({name: "tony"});

      const stringConfig = "pool";
      expect(() => pf._apply({}, stringConfig)).toThrow(
        `Config should be an object instead got ${typeof stringConfig}`
      );

      const arrayConfig = [];
      expect(() => pf._apply({}, arrayConfig)).toThrow(
        `Config should be an object instead got array`
      );

      const numberConfig = 3;
      expect(() => pf._apply({}, numberConfig)).toThrow(
        `Config should be an object instead got ${typeof numberConfig}`
      );
    });
  });

  describe("outputs", () => {
    it("_apply should return an PluginFactory instance", () => {
      const pf = new PluginFactory({name: "instance"});

      const applyReturn = pf._apply({});

      expect(applyReturn instanceof PluginFactory).toBeTruthy();
    });

    it("_getState should return the current state", () => {
      const pf = new PluginFactory({name: "instance"});

      const stateProperty = "foo";
      const stateValue = "bar";
      pf.addState(stateProperty, stateValue);

      const state = pf._getState();

      expect(state).toEqual({[stateProperty]: stateValue});
    });

    it("_getState should be called chained to _apply", () => {
      const pf = new PluginFactory({name: "instance"});

      const stateProperty = "foo";
      const stateValue = "bar";
      pf.addState(stateProperty, stateValue);

      const state = pf._apply({})._getState();

      expect(state).toEqual({[stateProperty]: stateValue});
    });
  });
});
