const apiPath = "/api/v0.0/";
const isDevelopmentHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const backendURL = isDevelopmentHost
  ? `${window.location.protocol}//${window.location.hostname}:3000${apiPath}`
  : apiPath;