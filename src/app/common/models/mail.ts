export interface IMailResponse {
  from: string;
  read: boolean;
  content: string;
  date: string;
  star: boolean;
  id: string;
}

export interface IMail extends IMailResponse {
  color: string;
}
