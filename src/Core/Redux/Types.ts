import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { UserModel } from '../../Common/Models/UserModel';

export enum ActionTypes {
  Login,
  Logout,
  GetDashboards,
  GetDashboard,
}

export type LoginActionType = {
  type: ActionTypes.Login;
  payload: UserModel;
}

export type LogoutActionType = {
  type: ActionTypes.Logout;
}

export type GetDashboardsActionType = {
  type: ActionTypes.GetDashboards;
  payload: DashboardModel[];
};

export type GetDashboardActionType = {
  type: ActionTypes.GetDashboard;
  payload: DashboardModel;
};

export type ActionType = LoginActionType | LogoutActionType | GetDashboardsActionType | GetDashboardActionType;

export type StateType = {
  user: UserModel | undefined;
  dashboard: DashboardModel | undefined;
  dashboards: DashboardModel[] | undefined;
};