interface ITodoBase {
  label: string;
  description: string;
  category: string;
  endDate?: string;
  status: string;
}
export interface ITodo extends ITodoBase {
  id: number;
}

export interface ITodoRequest extends ITodoBase {}