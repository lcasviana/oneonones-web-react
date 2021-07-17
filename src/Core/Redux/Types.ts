import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { UserModel } from '../../Common/Models/UserModel';

export enum ActionTypes {
  GetUser,
  GetDashboards,
  GetDashboard,
}

export type GetUserActionType = {
  type: ActionTypes.GetUser;
  payload: UserModel;
}

export type GetDashboardsActionType = {
  type: ActionTypes.GetDashboards;
  payload: DashboardModel[];
};

export type GetDashboardActionType = {
  type: ActionTypes.GetDashboard;
  payload: DashboardModel;
};

export type ActionType = GetUserActionType | GetDashboardsActionType | GetDashboardActionType;

export type StateType = {
  user: UserModel | undefined;
  dashboard: DashboardModel | undefined;
  dashboards: DashboardModel[] | undefined;
};