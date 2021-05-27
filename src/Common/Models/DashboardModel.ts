import { ComposeModel } from './ComposeModel';
import { EmployeeModel } from './EmployeeModel';

export type DashboardModel = {
  employee: EmployeeModel;
  oneonones: ComposeModel[];
};