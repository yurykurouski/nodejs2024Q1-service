import { LoggingService } from 'src/logger/logging.service';

export const exceptionHandler = (loggingService: LoggingService) => {
  process.on('uncaughtException', (err, origin) => {
    loggingService.error(
      `Caught exception: ${err}\n Exception origin: ${origin}`,
    );
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled promise rejection', reason as string);
  });
};
