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
  }

  get name() {
    return this._name;
  }
};
