import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

export default class ServiceSocket {
  public static connection: Nullable<HubConnection> = null;
  public static isConnected: boolean = false;

  public static async connect(url: string, token: string) {
    const connectionBuilder = new HubConnectionBuilder();

    this.connection = connectionBuilder
      .withUrl(url, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    await this.startConnect();
  }

  public static async disconnect() {
    this.isConnected = false;
    // this.connection?.off(METHOD_NAME)
    return null;
  }

  public static async startConnect() {
    if (this.connection) {
      try {
        await this.connection.start();
        this.isConnected = true;

        if (this.connection && this.isConnected) {
          try {
            // if (notificationCommandCallback) {
            //   this.connection.on("onNotification", notificationCommandCallback);
            // }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`Can't connection, error: ${error}`);
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`process failed, error: ${error}`);
      } finally {
        // eslint-disable-next-line no-console
        console.log("end connecting proccess");
      }
    }
  }
}
