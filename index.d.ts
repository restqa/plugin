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
} from "@cucumber/cucumber"

// This represents the JavaScript class which would be available at runtime
export default class PluginFactory<Config = {}> {
  constructor(name: PluginFactory.Name);

  /**
   * Plugin name, could be use as default tag
   */
  name: string;

  /**
   * add a Given step
   */
  addGivenStep: PluginFactory.AddStepFunction<Config>;

  /**
   * add a When step
   */
  addWhenStep: PluginFactory.AddStepFunction<Config>;

  /**
   * add a Then step
   */
  addThenStep: PluginFactory.AddStepFunction<Config>;

  /**
   * add a state property
   */
  addState: <T>(key: string, value: T) => PluginFactory<Config>;

  /**
   * add a Before hook
   */
  addBeforeHook: PluginFactory.AddHookFunc<Config>;

  /**
   * add a BeforeAll hook
   */
   addBeforeAllHook: PluginFactory.AddHookFunc<Config>;

  /**
   * add a After hook
   */
  addAfterHook: PluginFactory.AddHookFunc<Config>;

  /**
   * add a A hook
   */
   addAfterAllHook: PluginFactory.AddHookFunc<Config>;

  /**
   * Return the config
   */
  getConfig(): Config

  /**
   * Will make all steps available in RestQA
   * And return an Export Object
   */
  private _apply(
    cucumberInstance: PluginFactory.Cucumber,
    config: Record<string, any>
  ): PluginFactory<Config>;

  /**
   * Will return the private _state property
   */
  private _getState(): PluginFactory.State;
}

declare namespace PluginFactory {
  export type Name = string;

  export type AddHookFunc<C> = (...args: any) => PluginFactory<C>;

  export type Definition = string;
  export type HandlerFunc = (...args: any) => void;
  export type Description = string;
  export type Tags = string | string [];

  export type AddStepFunction<C> = (
    stepDefinition: Definition, 
    handler: HandlerFunc,
    description: Description,
    tags?: Tags
  ) => PluginFactory<C>;

  export interface Step {
    step: Definition;
    fn: HandlerFunc;
    description: Description;
    tags?: Tags;
  }

  export type State = Record<string, any>;

  export type Hook = (...args: any[]) => void;

  export interface Cucumber {
    After: typeof After;
    AfterAll: typeof AfterAll;
    AfterStep: typeof AfterStep;
    Before: typeof Before;
    BeforeAll: typeof BeforeAll;
    BeforeStep?: typeof BeforeStep;
    defineParameterType?: typeof defineParameterType;
    defineStep?: typeof defineStep;
    Given: typeof Given;
    Then: typeof Then;
    When: typeof When;
    setDefaultTimeout?: typeof setDefaultTimeout;
    setDefinitionFunctionWrapper?: typeof setDefinitionFunctionWrapper;
    setWorldConstructor: typeof setWorldConstructor;
  }
}