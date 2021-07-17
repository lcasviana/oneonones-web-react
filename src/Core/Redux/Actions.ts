import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { ActionTypes, GetDashboardActionType } from './Types';

export const getDashboardAction = (dashboard: DashboardModel): GetDashboardActionType => ({
  type: ActionTypes.GetDashboard,
  payload: dashboard,
});