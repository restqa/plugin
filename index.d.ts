// This represents the JavaScript class which would be available at runtime
export default class PluginFactory {
  constructor(options: PluginFactory.Options);
}
// This namespace is merged with the API class and allows for consumers, and this file
// to have types which are nested away in their own sections.
declare namespace PluginFactory {
  export interface Options {
    name: string
  }
}