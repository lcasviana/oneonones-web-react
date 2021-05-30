import { useEffect, useState } from 'react';
import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { DashboardsRepository } from '../Repositories/DashboardsRepository';

export const useDashboard = (email: string): DashboardModel | undefined => {
  const [dashboard, setDashboard] = useState<DashboardModel | undefined>(undefined);

  useEffect(() => {
    DashboardsRepository.obtainByEmail(email)
      .then((dashboard) => setDashboard(dashboard));
  }, [email])

  return dashboard;
}