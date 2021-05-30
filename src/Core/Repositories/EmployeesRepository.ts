import axios from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { EmployeeModel } from '../../Common/Models/Employee/EmployeeModel';

export class EmployeesRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/employees`;

  public static async obtainAll(): Promise<EmployeeModel[]> {
    const { data } = await axios.get<EmployeeModel[]>(`${EmployeesRepository.baseUrl}`);
    return data;
  }
}