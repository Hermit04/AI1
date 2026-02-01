import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [convexClient({})],
  baseURL: "https://super-yodel-jr5xwj497wrcjjvw-3001.app.github.dev",
  
});
