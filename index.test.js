const PluginFactory = require("./index");

describe("PluginFactory", () => {
  describe("init", () => {
    it("should throw an error if options is not defined", () => {
      expect(() => new PluginFactory()).toThrow();
    });

    it("should throw if name is null or undefined", () => {
      expect(() => new PluginFactory({name: undefined})).toThrow();
      expect(() => new PluginFactory({name: null})).toThrow();
    });

    it("should throw if name is not a string", () => {
      expect(() => new PluginFactory({name: 32})).toThrow();
      expect(() => new PluginFactory({name: {}})).toThrow();
      expect(() => new PluginFactory({name: []})).toThrow();
    });

    it("should expose plugin name on a property name", () => {
      const fakeName = "test";

      const pf = new PluginFactory({name: "test"});

      expect(pf.name).toBe(fakeName);
    });
  });

  describe("adding custom step definition", () => {
    it("should expose and addGivenStep method to add Given steps", () => {
      const pluginName = "test";
      const stepDefinition = "Eat {int} burgers";
      const functionHandler = (burgerCount) =>
        console.log(`I'll eat ${burgerCount} burger!`);
      const description = "Eat burger step";

      const pf = new PluginFactory({name: pluginName});
      pf.addGivenStep(stepDefinition, functionHandler, description);

      expect(pf._givenSteps).toEqual([
        [stepDefinition, functionHandler, description, [pluginName]]
      ]);
    });

    it("should expose and addWhenStep method to add When steps", () => {
      const pluginName = "test";
      const stepDefinition = "Eat {int} burgers";
      const functionHandler = (burgerCount) =>
        console.log(`I'll eat ${burgerCount} burger!`);
      const description = "Eat burger step";

      const pf = new PluginFactory({name: pluginName});
      pf.addWhenStep(stepDefinition, functionHandler, description);

      expect(pf._whenSteps).toEqual([
        [stepDefinition, functionHandler, description, [pluginName]]
      ]);
    });

    it("should expose and addThenStep method to add Then steps", () => {
      const pluginName = "test";
      const stepDefinition = "Eat {int} burgers";
      const functionHandler = (burgerCount) =>
        console.log(`I'll eat ${burgerCount} burger!`);
      const description = "Eat burger step";

      const pf = new PluginFactory({name: pluginName});
      pf.addThenStep(stepDefinition, functionHandler, description);

      expect(pf._thenSteps).toEqual([
        [stepDefinition, functionHandler, description, [pluginName]]
      ]);
    });
  });

  describe("adding hooks", () => {
    it("should expose an addBeforeHook method", () => {
      const pf = new PluginFactory({name: "test"});
      const validHook = () => {
        console.log("Hooked !");
      };

      pf.addBeforeHook(validHook);

      expect(pf._beforeHooks).toEqual([validHook]);
    });

    it("addBeforeHook should throw if the argument is not function", () => {
      const pf = new PluginFactory({name: "test"});
      const wrongTypedHook = 3;

      expect(() => pf.addBeforeHook(wrongTypedHook)).toThrow(
        `addBeforeHook parameter should be a function but got ${typeof wrongTypedHook}`
      );
    });

    it("should expose an addAfterHook method", () => {
      const pf = new PluginFactory({name: "test"});
      const validHook = () => {
        console.log("Hooked !");
      };

      pf.addAfterHook(validHook);

      expect(pf._afterHooks).toEqual([validHook]);
    });

    it("addAfterHook should throw if the argument is not function", () => {
      const pf = new PluginFactory({name: "test"});
      const wrongTypedHook = 3;

      expect(() => pf.addAfterHook(wrongTypedHook)).toThrow(
        `addAfterHook parameter should be a function but got ${typeof wrongTypedHook}`
      );
    });

    it("should expose an addBeforeAllHook method", () => {
      const pf = new PluginFactory({name: "test"});
      const validHook = () => {
        console.log("Hooked !");
      };

      pf.addBeforeAllHook(validHook);

      expect(pf._beforeAllHooks).toEqual([validHook]);
    });

    it("addBeforeAll should throw if the argument is not function", () => {
      const pf = new PluginFactory({name: "test"});
      const wrongTypedHook = 3;

      expect(() => pf.addBeforeAllHook(wrongTypedHook)).toThrow(
        `addBeforeAllHook parameter should be a function but got ${typeof wrongTypedHook}`
      );
    });

    it("should expose an addAfterAllHook method", () => {
      const pf = new PluginFactory({name: "test"});
      const validHook = () => {
        console.log("Hooked !");
      };

      pf.addAfterAllHook(validHook);

      expect(pf._afterAllHooks).toEqual([validHook]);
    });

    it("addAfterAllHook should throw if the argument is not function", () => {
      const pf = new PluginFactory({name: "test"});
      const wrongTypedHook = 3;

      expect(() => pf.addAfterAllHook(wrongTypedHook)).toThrow(
        `addAfterAllHook parameter should be a function but got ${typeof wrongTypedHook}`
      );
    });
  });

  describe("adding state", () => {
    it("should expose an addState method to add a state property", () => {
      const pf = new PluginFactory({name: "state-plugin"});
      const property = "restqa";
      const value = {foo: "bar"};

      pf.addState(property, value);

      expect(pf._state).toEqual({[property]: value});
    });

    it("addState should throw if key is not a string", () => {
      const pf = new PluginFactory({name: "plugin"});

      const numberKey = 3;
      expect(() => pf.addState(numberKey)).toThrow(
        `addState key parameter should be string, instead got ${typeof numberKey}`
      );

      const objectKey = {};
      expect(() => pf.addState(objectKey)).toThrow(
        `addState key parameter should be string, instead got ${typeof objectKey}`
      );

      const arrayKey = [];
      expect(() => pf.addState(arrayKey)).toThrow(
        `addState key parameter should be string, instead got ${typeof arrayKey}`
      );

      const undefinedKey = undefined;
      expect(() => pf.addState(undefinedKey)).toThrow(
        `addState key parameter should be string, instead got ${typeof undefinedKey}`
      );

      const nullKey = undefined;
      expect(() => pf.addState(nullKey)).toThrow(
        `addState key parameter should be string, instead got ${typeof nullKey}`
      );
    });

    it("addState should throw if key an empty string", () => {
      const pf = new PluginFactory({name: "plugin"});
      const emptyString = "";

      expect(() => pf.addState(emptyString)).toThrow(
        "addState key parameter should not be an empty string"
      );
    });
  });

  describe("apply cucumber instance and set config", () => {
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
    });

    it("should apply Given from cucumber instance if there are Given steps", () => {
      const pf = new PluginFactory({name: "plugin"});
      const Given = jest.fn();

      pf.addGivenStep("yo", () => {}, "yo step");
      pf.addGivenStep("yo", () => {}, "yo step");

      pf._apply({Given});

      expect(Given).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if there a Given step but no Given instance", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are Given steps to bind, cucumber instance should contains a Given function"
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

    it("should throw an error if there a When step but no When instance", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are When steps to bind, cucumber instance should contains a When function"
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

    it("should throw an error if there a Then step but no Then instances", () => {
      const pf = new PluginFactory({name: "plugin"});
      const expectedError = new Error(
        "There are Then steps to bind, cucumber instance should contains a Then function"
      );

      pf.addThenStep("yo", () => {}, "yo step");
      pf.addThenStep("yo", () => {}, "yo step");

      expect(() => pf._apply({})).toThrow(expectedError);
    });
  });

  describe("global", () => {
    it("add hooks methods should be chained", () => {
      const pf = new PluginFactory({name: "my-plugin"});

      pf.addAfterHook(() => {}).addAfterAllHook(() => {});

      expect(pf._afterAllHooks).toHaveLength(1);
      expect(pf._afterHooks).toHaveLength(1);

      pf.addBeforeHook(() => {}).addBeforeAllHook(() => {});

      expect(pf._beforeAllHooks).toHaveLength(1);
      expect(pf._beforeHooks).toHaveLength(1);
    });

    it("add steps methods should be chained", () => {
      const pf = new PluginFactory({name: "my-plugin"});
      const fakeStep = ["yo", () => {}, "the description"];

      pf.addGivenStep(fakeStep).addGivenStep(fakeStep);

      expect(pf._givenSteps).toHaveLength(2);

      pf.addThenStep(fakeStep).addThenStep(fakeStep);

      expect(pf._thenSteps).toHaveLength(2);

      pf.addWhenStep(fakeStep).addWhenStep(fakeStep);

      expect(pf._whenSteps).toHaveLength(2);
    });

    it("addState method should be chained", () => {
      const pf = new PluginFactory({name: "my-plugin"});
      const state = {
        foo: "bar",
        bim: {}
      };

      pf.addState("foo", state.foo).addState("bim", state.bim);

      expect(pf._state).toEqual(state);
    });
  });
});
