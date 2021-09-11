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
export default class PluginFactory<Config> {
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
  addState: <T>(key: string, value: T) => PluginFactory;

  /**
   * add a Before hook
   */
  addBeforeHook: AddHookFunc;

  /**
   * add a BeforeAll hook
   */
   addBeforeAllHook: AddHookFunc;

  /**
   * add a After hook
   */
  addAfterHook: AddHookFunc;

  /**
   * add a AfterAll hook
   */
   addAfterAllHook: AddHookFunc;

  /**
   * Will make all steps available in RestQA
   * And return an Export Object
   */
  private _apply(
    cucumberInstance: PluginFactory.Cucumber,
    config: Record<string, any>
  ): PluginFactory;

  /**
   * Return the config
   */
  getConfig(): Config
}

declare namespace PluginFactory {
  export interface Options {
    name: string;
  }

  export type AddHookFunc = (...args: any) => PluginFactory;

  export type Definition = string;
  export type HandlerFunc = (...args: any) => void;
  export type Description = string;
  export type Tags = string | string [];

  export type AddStepFunction = (
    stepDefinition: Definition, 
    handler: HandlerFunc,
    description: Description,
    tags?: Tag
  ) => PluginFactory;

  export interface Step {
    step: Definition;
    fn: HandlerFunc;
    description: Description;
    tags?: Tags;
  }

  export type States = Record<string, any>;

  export type Hook = (...args: any[]) => void;
}