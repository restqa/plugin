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
});
