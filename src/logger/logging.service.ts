import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'node:process';
import { stat, appendFile } from 'node:fs/promises';
import { PathOrFileDescriptor } from 'fs';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logLevel: number;
  private readonly maxLogFileSize: number;
  private readonly logsFolderPath: string;
  private logFilePostfix: number;
  private errLogFilePostfix: number;
  private fileTimeStamp: number;

  constructor() {
    super();

    this.maxLogFileSize = parseInt(process.env.LOG_FILE_SIZE, 10) || 1024;
    this.logsFolderPath = path.join(cwd(), process.env.LOGS_FOLDER_PATH);

    this.fileTimeStamp = Date.now();
    this.logFilePostfix = 0;
    this.errLogFilePostfix = 0;

    this.logLevel = parseInt(process.env.LOG_LEVEL, 10);
  }

  override async log(message: any, context?: string) {
    if (this.logLevel >= 0) {
      const optionalMsg = context ? `\x1b[33m[${context}]\x1b[0m: ` : '';
      const readyMsg = `${optionalMsg}${message}`;

      super.log(readyMsg);

      await this.writeLogFile(readyMsg, false);
    }
  }

  override async warn(message: any, context?: string) {
    if (this.logLevel >= 1) {
      const readyMsg = `\x1b[35m[Warn]\x1b[0m: Context: ${context}\x1b[0m ${message}`;
      super.warn(readyMsg);

      await this.writeLogFile(readyMsg, false);
    }
  }

  override async error(message: any, trace?: string, context?: string) {
    if (this.logLevel >= 2) {
      const readyMsg = `\x1b[31m[Error]: \x1b[33m[${trace}] Context: ${context}\x1b[0m, ${message}\x1b[0m`;
      super.error(readyMsg);

      await this.writeLogFile(readyMsg, true);
    }
  }

  private get currentLogFolder() {
    return path.join(this.logsFolderPath, `${this.fileTimeStamp}`);
  }

  private timeStamp() {
    return Date.now();
  }

  private getFileName(isError: boolean) {
    return isError
      ? `${this.fileTimeStamp}_log_err_${this.errLogFilePostfix}.txt`
      : `${this.fileTimeStamp}_log_${this.logFilePostfix}.txt`;
  }

  private createNewLogFile(fileName: PathOrFileDescriptor) {
    fs.writeFile(fileName, '', this.error);
  }

  private async appendFile(filePath: fs.PathLike, logMsg: string) {
    await appendFile(filePath, logMsg, {
      encoding: 'utf-8',
    }).catch(this.error);
  }

  private async writeLogFile(message: string, isError: boolean) {
    const logMsg = `${this.timeStamp()}: ${message}\n`;

    const filePath = path.join(
      this.currentLogFolder,
      this.getFileName(isError),
    );

    const fileStats = await stat(filePath).catch((err) => {
      this.error(err);
      return null;
    });
    const isFileTooLarge = fileStats?.size > this.maxLogFileSize;

    if (isFileTooLarge) {
      await this.switchLogFile(logMsg, isError);
    } else {
      await this.appendFile(filePath, logMsg);
    }
  }

  private async switchLogFile(logMsg: string, isError: boolean) {
    this.errLogFilePostfix += 1;

    const filePath = path.join(
      this.currentLogFolder,
      this.getFileName(isError),
    );

    await this.appendFile(filePath, logMsg);
  }

  public async initLogFiles() {
    if (!fs.existsSync(this.logsFolderPath)) {
      fs.mkdirSync(this.logsFolderPath);
    }
    if (!fs.existsSync(this.currentLogFolder)) {
      fs.mkdirSync(this.currentLogFolder);
    }

    const logFileName = path.join(
      this.currentLogFolder,
      `${this.fileTimeStamp}_log_err_${this.logFilePostfix}.txt`,
    );
    const errLogFileName = path.join(
      this.currentLogFolder,
      `${this.fileTimeStamp}_log_${this.logFilePostfix}.txt`,
    );

    this.createNewLogFile(logFileName);
    this.createNewLogFile(errLogFileName);
  }
}
