import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

export default class ServiceSocket {
  public static connection: Nullable<HubConnection> = null;
  public static isConnected: boolean = false;

  public static async connect({
    url,
    token,
    events,
  }: {
    url: string;
    token?: string;
    events: Record<string, any>;
  }) {
    const connectionBuilder = new HubConnectionBuilder();

    this.connection = connectionBuilder
      .withUrl(url, {
        ...(token && {
          accessTokenFactory: () => token,
        }),
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    await this.startConnect({ events });
  }

  public static async disconnect() {
    this.isConnected = false;
    return null;
  }

  public static async startConnect({
    events,
  }: {
    events: Record<string, any>;
  }) {
    if (this.connection) {
      try {
        await this.connection.start();
        this.isConnected = true;

        if (this.connection && this.isConnected) {
          try {
            if (events.onStreamOrders) {
              this.connection.on("onstreamorders", (data) => {
                events.onStreamOrders(data.spreadArray);
              });
            }
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
