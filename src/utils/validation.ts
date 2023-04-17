export function validateEnv(): boolean {
  if (!process.env.DISCORD_TOKEN) {
    console.error("DISCORD_TOKEN is not defined");
    return false;
  }
  return true;
}
