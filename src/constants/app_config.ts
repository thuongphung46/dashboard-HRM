export interface AppConfig {
  API_URL: string;
  DEFAULT_API_INTERVAL: number;
}

export const APP_CONFIG: AppConfig = {
  API_URL: "http://45.252.249.243:9669/api",
  DEFAULT_API_INTERVAL: 60000,
};

export const GatewayRoute = {
  production_planning: "productionplanning",
  production: "production",
};
