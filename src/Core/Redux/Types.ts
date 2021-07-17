import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { EmployeeModel } from '../../Common/Models/Employee/EmployeeModel';

export enum ActionTypes {
  GetDashboard = 1,
}

export type GetDashboardActionType = {
  type: ActionTypes.GetDashboard;
  payload: DashboardModel;
};

export type ActionType = GetDashboardActionType;

export type StateType = {
  user: EmployeeModel | undefined;
  dashboard: DashboardModel | undefined;
};