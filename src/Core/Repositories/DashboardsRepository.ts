import axios from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';

export class DashboardsRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/dashboards`;

  public static async obtainByEmail(email: string): Promise<DashboardModel> {
    const { data } = await axios.get<DashboardModel>(`${DashboardsRepository.baseUrl}?email=${email}`);
    return data;
  }
}