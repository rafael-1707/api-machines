import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';

export const gracefulShutdown = (event: string) => {
  return (code: number) => {
    console.log(`${event} Shutting down gracefully`, code);
    void dbDisconnect();
    process.exit(code);
  };
};

const dbDisconnect = async (): Promise<void> => {
  await MongoHelper.disconnect();
};

process
  .on('uncaughtException', (err: Error, origin) => {
    console.log(origin, err);
  })
  .on('unhandledRejection', (err: Error) => {
    console.log(err);
  })
  .on('SIGTERM', gracefulShutdown('SIGTERM'))
  .on('SIGINT', gracefulShutdown('SIGINT'));
