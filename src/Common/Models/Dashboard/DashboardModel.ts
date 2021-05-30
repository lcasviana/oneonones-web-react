import { EmployeeModel } from '../Employee/EmployeeModel';
import { ComposeModel } from './ComposeModel';

export type DashboardModel = {
  employee: EmployeeModel;
  oneonones: ComposeModel[];
};