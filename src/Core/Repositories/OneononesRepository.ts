import axios, { AxiosError, AxiosResponse } from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { ErrorModel } from '../../Common/Models/ErrorModel';
import { OneononeInputModel } from '../../Common/Models/Oneonone/OneononeInputModel';
import { OneononeModel } from '../../Common/Models/Oneonone/OneononeModel';

export class OneononesRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/oneonones`;

  public static async insert(oneononeInput: OneononeInputModel): Promise<void> {
    return axios.post<OneononeInputModel, AxiosResponse<void>>(`${OneononesRepository.baseUrl}`, oneononeInput)
      .then(_ => Promise.resolve())
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }

  public static async update(oneonone: OneononeModel): Promise<void> {
    return axios.put<OneononeModel, AxiosResponse<void>>(`${OneononesRepository.baseUrl}`, oneonone)
      .then(_ => Promise.resolve())
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }

  public static async delete(id: string): Promise<void> {
    return axios.delete<void, AxiosResponse<void>>(`${OneononesRepository.baseUrl}/${id}`)
      .then(_ => Promise.resolve())
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }
}