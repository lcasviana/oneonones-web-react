import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { DashboardModel } from '../../Common/Models/DashboardModel';

export const useDashboard = (email: string): DashboardModel | undefined => {
  const [dashboard, setDashboard] = useState<DashboardModel | undefined>(undefined);

  useEffect(() => {
    const url = `https://oneonones-api.herokuapp.com/api/v1/dashboards?email=${email}`;
    axios
      .get<DashboardModel>(url)
      .then(({ data }: AxiosResponse<DashboardModel>) => setDashboard(data));
  }, [email])

  return dashboard;
}