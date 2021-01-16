import { IFileProvider } from '../models/IFileProvider';
import { readFileSync, writeFileSync } from 'fs';
import { unlinkSync } from 'fs';

const BASE_PATH = __dirname + '/../data/';

class FileProvider implements IFileProvider {
  readJSON = (path: string) => {
    try {
      let data = readFileSync(BASE_PATH + path);
      if (data) {
        let content = data.toString();
        return JSON.parse(content);
      }
    } catch (e) {
      return null;
    }
  };
  writeJSON = (path: string, data: any) => {
    let stringifiedData = JSON.stringify(data);
    writeFileSync(BASE_PATH + path, stringifiedData);
    return true;
  };

  deleteJSON = (path: string) => {
    try {
      unlinkSync(BASE_PATH + path);
      return true;
    } catch (e) {
      return false;
    }
  };
}

export const fileProvider = new FileProvider();
