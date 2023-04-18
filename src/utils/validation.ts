export function validateEnv(): boolean {
  if (!process.env.DISCORD_TOKEN) {
    console.error("DISCORD_TOKEN is not defined");
    return false;
  }
  if (!process.env.LUA_OBFUSCATOR_API_KEY) {
    console.error("LUA_OBFUSCATOR_API_KEY is not defined");
    return false;
  }
  return true;
}
