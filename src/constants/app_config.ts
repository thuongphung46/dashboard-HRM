export interface AppConfig {
  API_URL: string;
  DEFAULT_API_INTERVAL: number;
}

export const APP_CONFIG: AppConfig = {
  API_URL: "https://hrmactvn.id.vn/api",
  // API_URL: "http://localhost:9669/api",
  DEFAULT_API_INTERVAL: 60000,
};

export const GatewayRoute = {
  production_planning: "productionplanning",
  production: "production",
};
