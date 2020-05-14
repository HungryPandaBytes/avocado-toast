import { StringLiteral } from "@babel/types";

export interface Transaction {
  id: number;
  amount: string;
  transaction_time: Date;
  category_name: string;
  description: string;
  category_id: string;
  split: boolean;
  ignore: boolean;
  transaction_type: string
}