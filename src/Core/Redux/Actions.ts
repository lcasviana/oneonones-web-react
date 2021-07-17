import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { UserModel } from '../../Common/Models/UserModel';
import { ActionTypes, GetDashboardActionType, GetDashboardsActionType, GetUserActionType } from './Types';

export const getUser = (user: UserModel): GetUserActionType => ({
  type: ActionTypes.GetUser,
  payload: user,
});

export const getDashboardsAction = (dashboards: DashboardModel[]): GetDashboardsActionType => ({
  type: ActionTypes.GetDashboards,
  payload: dashboards,
});

export const getDashboardAction = (dashboard: DashboardModel): GetDashboardActionType => ({
  type: ActionTypes.GetDashboard,
  payload: dashboard,
});