import {
  After,
  AfterAll,
  AfterStep,
  Before,
  BeforeAll,
  BeforeStep,
  defineParameterType,
  defineStep,
  Given,
  setDefaultTimeout,
  setDefinitionFunctionWrapper,
  setWorldConstructor,
  Then,
  When,
} from "@cucumber/cucumber/lib/types"

// This represents the JavaScript class which would be available at runtime
export default class PluginFactory {
  constructor(options: PluginFactory.Options);

  /**
   * Plugin name, could be use as default tag
   */
  name: string;

  /**
   * add a Given step
   */
  addGivenStep: PluginFactory.AddStepFunction;

  /**
   * add a When step
   */
  addWhenStep: PluginFactory.AddStepFunction;

  /**
   * add a Then step
   */
  addThenStep: PluginFactory.AddStepFunction;

  /**
   * add a state property
   */
  addState: <T>(key: string, value: T) => void;

  /**
   * add a state property
   */
  addBeforeHook: AddHookFunc;

  /**
   * add a state property
   */
  addAfterHook: AddHookFunc;

  /**
   * Will make all steps available in RestQA
   * And return an Export Object
   */
  private _apply(
    cucumberInstance: PluginFactory.Cucumber,
    config: Record<string, any>
  ): PluginFactory.ExportObject;
}

declare namespace PluginFactory {
  export interface Options {
    name: string;
  }

  export type AddHookFunc = (...args: any) => void;

  export type Definition = string;
  export type HandlerFunc = (...args: any) => void;
  export type Description = string;
  export type Tags = string | string [];

  export type AddStepFunction = (
    stepDefinition: Definition, 
    handler: HandlerFunc,
    description: Description,
    tags?: Tag
  ) => void

  export interface Step {
    step: Definition;
    fn: HandlerFunc;
    description: Description;
    tags?: Tags;
  }

  export type States = Record<string, any>;

  export type Hook = (...args: any[]) => void

  export interface ExportObject {
    states: States;
    steps: {
      given: Step[];
      when: Step[];
      then: Step[];
    };
    hooks: {
      before: Hook[];
      after: Hook[];
    };
  }

  export interface Cucumber {
    After: After;
    AfterAll: AfterAll;
    AfterStep: AfterStep;
    Before: Before;
    BeforeAll: BeforeAll;
    BeforeStep: BeforeStep;
    defineParameterType: defineParameterType;
    defineStep: defineStep;
    Given: Given;
    setDefaultTimeout: setDefaultTimeout;
    setDefinitionFunctionWrapper: setDefinitionFunctionWrapper;
    setWorldConstructor: setWorldConstructor;
    Then: Then;
    When: When;
  }
}