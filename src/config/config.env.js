import DevelopmentConfig from "./development.env";
import ProductionConfig from "./production.env";

const envConfigs = {
  development: DevelopmentConfig,
  production: ProductionConfig
};

const Config = process.env.NODE_ENV === "production" ? envConfigs.production : envConfigs.development;

export default Config;