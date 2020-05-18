import { StringLiteral } from "@babel/types";

export interface Transaction {
  id?: number;
  amount?: number | string;
  transaction_time?: any;
  category_name?: string;
  description?: string;
  category_id?: string;
  split?: boolean;
  ignore?: boolean;
  iconName?: string;
  transaction_type?: string
}