import config from "config";
import addRole from "../utils/addRole";
import {runEvent} from "../index";

export function run(e:runEvent) {
    e.message.reply(`Pong! Current ping is ${e.client.ws.ping}`);
    addRole(e.message,config.get("app.roleId"))
}

export const names = ["ping"];