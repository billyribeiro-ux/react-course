// eslint-config-next 16 ships a native flat config array — use it directly.
import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", "node_modules/**"] }];

export default config;
