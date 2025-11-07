import * as AppSettings from "./app-settings.json";
import * as Users from "./users.json";

export class Configuration {
  appSettings: typeof AppSettings;
  users: typeof Users;

  constructor() {
    this.appSettings = AppSettings;
    this.users = Users;
  }
}
