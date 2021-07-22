import path from "path";

export default (config, env, helpers) => {
  config.resolve.alias["@entities"] = path.resolve(
    __dirname,
    "src/domains/entities"
  );
  config.resolve.alias["@adapters"] = path.resolve(
    __dirname,
    "src/domains/adapters"
  );
  config.resolve.alias["@services"] = path.resolve(
    __dirname,
    "src/domains/services"
  );
  config.resolve.alias["@components"] = path.resolve(__dirname, "src/components");
  config.resolve.alias["@routes"] = path.resolve(__dirname, "src/routes");
  config.resolve.alias["@store"] = path.resolve(__dirname, "src/store");

  return config;
};
