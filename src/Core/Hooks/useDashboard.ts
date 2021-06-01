import { useEffect, useState } from 'react';
import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { DashboardsRepository } from '../Repositories/DashboardsRepository';

export const useDashboard = (id: string): DashboardModel | undefined => {
  const [dashboard, setDashboard] = useState<DashboardModel | undefined>(undefined);

  useEffect(() => {
    DashboardsRepository.obtainById(id)
      .then((dashboard) => setDashboard(dashboard));
  }, [id])

  return dashboard;
}