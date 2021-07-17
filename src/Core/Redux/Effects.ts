import { Dispatch } from 'react';
import { DashboardsRepository } from '../Repositories/DashboardsRepository';
import { getDashboardAction } from './Actions';
import { ActionType } from './Types';

export const getDashboard = (id: string) =>
  (dispatch: Dispatch<ActionType>) => {
    DashboardsRepository.obtainById(id)
      .then((dashboard) => dispatch(getDashboardAction(dashboard)));
  };