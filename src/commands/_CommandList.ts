import { Command } from "../interfaces/Command";
import { obfuscate } from "./obfuscate";
import { ping } from "./ping";

export const CommandList: Command[] = [ping, obfuscate];
