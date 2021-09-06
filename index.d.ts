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
   * Will make all steps available int RestQA
   */
  ready(): void
}

declare namespace PluginFactory {
  export type Definition = string;
  export type HandlerFunc = (...args: any) => void;
  export type Description = string;
  export type Tags = string | string [];

  export type AddStepFunction = (
    stepDefinition: Definition, 
    handler: HandlerFunc,
    description: Description,
    tags?: Tags
  ) => void

  export type Step = [Definition, HandlerFunc, Description] | [Definition, HandlerFunc, Description, Tags]
  export interface Options {
    name: string
  }
}