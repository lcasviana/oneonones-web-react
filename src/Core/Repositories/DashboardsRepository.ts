import axios, { AxiosError, AxiosResponse } from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';
import { ErrorModel } from '../../Common/Models/ErrorModel';

export class DashboardsRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/dashboards`;

  public static async obtainAll(): Promise<DashboardModel[]> {
    return axios.get<DashboardModel[]>(`${DashboardsRepository.baseUrl}`)
      .then(({ data }: AxiosResponse<DashboardModel[]>) => Promise.resolve(data))
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }

  public static async obtainById(id: string): Promise<DashboardModel> {
    return axios.get<DashboardModel>(`${DashboardsRepository.baseUrl}?id=${id}`)
      .then(({ data }: AxiosResponse<DashboardModel>) => Promise.resolve(data))
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }

  public static async obtainByEmail(email: string): Promise<DashboardModel> {
    return axios.get<DashboardModel>(`${DashboardsRepository.baseUrl}?email=${email}`)
      .then(({ data }: AxiosResponse<DashboardModel>) => Promise.resolve(data))
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }
}