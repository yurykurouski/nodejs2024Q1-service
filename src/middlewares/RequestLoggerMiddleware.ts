import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/logger/logging.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, body, query, baseUrl } = req;

    res.on('close', async () => {
      const message = `\x1b[36mRequest\x1b[0m ${method}:[${baseUrl}]. \x1b[36mQuery\x1b[0m: ${JSON.stringify(
        query,
      )}, \x1b[36mBody\x1b[0m: ${JSON.stringify(
        body,
      )}. \x1b[36mResponse\x1b[0m: [${res.statusCode}]`;

      await this.loggingService.log(message);
    });

    res.on('error', async () => {
      console.log('ERR');
    });

    next();
  }
}
