import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { ActionTypes, GetDashboardActionType, GetDashboardsActionType } from './Types';

export const getDashboardsAction = (dashboards: DashboardModel[]): GetDashboardsActionType => ({
  type: ActionTypes.GetDashboards,
  payload: dashboards,
});

export const getDashboardAction = (dashboard: DashboardModel): GetDashboardActionType => ({
  type: ActionTypes.GetDashboard,
  payload: dashboard,
});