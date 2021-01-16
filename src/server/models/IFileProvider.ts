export interface IFileProvider {
  readJSON: (path: string) => any;
  writeJSON: (path: string, data: any) => boolean;
  deleteJSON: (path: string) => boolean;
}
