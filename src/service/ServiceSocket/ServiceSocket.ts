import { onStreamOrders } from "@/stores/arbitrage.effector";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Spread } from "./ServiceSocket.dto";

export default class ServiceSocket {
  public static connection: Nullable<HubConnection> = null;
  public static isConnected: boolean = false;

  public static async connect(url: string, token?: string) {
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

    await this.startConnect();
  }

  public static async disconnect() {
    this.isConnected = false;
    return null;
  }

  public static async startConnect() {
    if (this.connection) {
      try {
        await this.connection.start();
        this.isConnected = true;

        if (this.connection && this.isConnected) {
          try {
            this.connection.on("onstreamorders", (data) => {
              if (data.spreadArray) {
                onStreamOrders(
                  data.spreadArray.sort((a: Spread, b: Spread) =>
                    a.key > b.key ? 1 : b.key > a.key ? -1 : 0,
                  ),
                );
              }
            });
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
