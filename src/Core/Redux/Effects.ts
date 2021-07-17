import { Dispatch } from 'react';
import { DashboardsRepository } from '../Repositories/DashboardsRepository';
import { getDashboardAction, getDashboardsAction } from './Actions';
import { ActionType } from './Types';

export const getDashboards = () =>
  (dispatch: Dispatch<ActionType>) => {
    DashboardsRepository.obtainAll()
      .then((dashboards) => dispatch(getDashboardsAction(dashboards)));
  };

export const getDashboard = (id: string) =>
  (dispatch: Dispatch<ActionType>) => {
    DashboardsRepository.obtainById(id)
      .then((dashboard) => dispatch(getDashboardAction(dashboard)));
  };