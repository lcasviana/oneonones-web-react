import axios, { AxiosError, AxiosResponse } from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { ErrorModel } from '../../Common/Models/ErrorModel';
import { HistoricalInputModel } from '../../Common/Models/Historical/HistoricalInputModel';
import { HistoricalModel } from '../../Common/Models/Historical/HistoricalModel';

export class HistoricalsRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/historicals`;

  public static async insert(historicalInput: HistoricalInputModel): Promise<void> {
    return axios.post<HistoricalInputModel, AxiosResponse<void>>(`${HistoricalsRepository.baseUrl}`, historicalInput)
      .then(_ => Promise.resolve())
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }

  public static async update(historical: HistoricalModel): Promise<void> {
    return axios.put<HistoricalModel, AxiosResponse<void>>(`${HistoricalsRepository.baseUrl}`, historical)
      .then(_ => Promise.resolve())
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }

  public static async delete(id: string): Promise<void> {
    return axios.delete<void, AxiosResponse<void>>(`${HistoricalsRepository.baseUrl}/${id}`)
      .then(_ => Promise.resolve())
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }
}