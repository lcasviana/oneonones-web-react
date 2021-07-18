import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { UserModel } from '../../Common/Models/UserModel';
import { ActionTypes, GetDashboardActionType, GetDashboardsActionType, LoginActionType, LogoutActionType } from './Types';

export const loginAction = (user: UserModel): LoginActionType => ({
  type: ActionTypes.Login,
  payload: user,
});

export const logoutAction = (): LogoutActionType => ({
  type: ActionTypes.Logout,
});

export const getDashboardsAction = (dashboards: DashboardModel[]): GetDashboardsActionType => ({
  type: ActionTypes.GetDashboards,
  payload: dashboards,
});

export const getDashboardAction = (dashboard: DashboardModel): GetDashboardActionType => ({
  type: ActionTypes.GetDashboard,
  payload: dashboard,
});