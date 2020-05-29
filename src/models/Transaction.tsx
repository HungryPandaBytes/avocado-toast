import { CategoryName } from "./CategoryName";

export interface Transaction {
  id: string;
  amount: number;
  transaction_time: any;
  category_name: CategoryName;
  description?: string;
  category_id?: string;
  split?: boolean;
  ignore?: boolean;
  iconName?: string;
  transaction_type?: string
}

