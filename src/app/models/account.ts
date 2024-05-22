export interface Account {
    accountId: number;
    username: string;
    password: string;
    email: string;
    fullname: string;
    gender: boolean;
    balance: number;
    membership:boolean;
    path?: string;
    role: string;
    createdDate: Date;
  }
  