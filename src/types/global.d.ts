// Allow importing plain JavaScript modules without type declarations
declare module "*.js" {
  const value: unknown;
  export default value;
}

// Allow importing JSON-like data modules (named exports)
declare module "*.json" {
  const value: unknown;
  export default value;
}

// Allow importing image assets used in the project
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";

// General catch-all for unknown modules
declare module "*";
