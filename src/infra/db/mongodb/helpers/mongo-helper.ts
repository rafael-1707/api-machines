import { MongoClient } from 'mongodb';

export class MongoHelper {
  static client: MongoClient;

  public static async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  }

  public static async disconnect(): Promise<void> {
    await this.client.close();
  }

  public static async getCollection(name: string): Promise<any> {
    return this.client.db().collection(name);
  }
}
