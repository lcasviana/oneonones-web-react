import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { EmployeeModel } from '../../Common/Models/Employee/EmployeeModel';

export enum ActionTypes {
  GetDashboards,
  GetDashboard,
}

export type GetDashboardsActionType = {
  type: ActionTypes.GetDashboards;
  payload: DashboardModel[];
};

export type GetDashboardActionType = {
  type: ActionTypes.GetDashboard;
  payload: DashboardModel;
};

export type ActionType = GetDashboardsActionType | GetDashboardActionType;

export type StateType = {
  user: EmployeeModel | undefined;
  dashboard: DashboardModel | undefined;
  dashboards: DashboardModel[] | undefined;
};