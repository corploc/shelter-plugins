// Configuration constants
// Set IS_DEV to true for local development (localhost:3000)
// Set IS_DEV to false for production (pgcordweb.bash62.workers.dev)
export const IS_DEV = false;

export const WEB_BASE_URL = IS_DEV
    ? "http://localhost:3000"
    : "https://pgcordweb.bash62.workers.dev";
