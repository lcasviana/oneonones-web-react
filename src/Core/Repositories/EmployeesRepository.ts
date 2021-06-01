import axios, { AxiosError, AxiosResponse } from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { EmployeeModel } from '../../Common/Models/Employee/EmployeeModel';
import { ErrorModel } from '../../Common/Models/ErrorModel';

export class EmployeesRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/employees`;

  public static async obtainAll(): Promise<EmployeeModel[]> {
    return axios.get<EmployeeModel[]>(`${EmployeesRepository.baseUrl}`)
      .then(({ data }: AxiosResponse<EmployeeModel[]>) => Promise.resolve(data))
      .catch((err: Error | AxiosError<ErrorModel>) =>
        axios.isAxiosError(err)
          ? Promise.reject(err?.response?.data)
          : Promise.reject({ errors: [err.message] } as ErrorModel)
      );
  }
}