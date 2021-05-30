import axios, { AxiosResponse } from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { OneononeInputModel } from '../../Common/Models/Oneonone/OneononeInputModel';

export class OneononesRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/oneonones`;

  public static async insert(oneononeInput: OneononeInputModel): Promise<void> {
    await axios.post<OneononeInputModel, AxiosResponse<void>>(`${OneononesRepository.baseUrl}`, oneononeInput);
  }

  public static async remove(id: string): Promise<void> {
    await axios.delete<void, AxiosResponse<void>>(`${OneononesRepository.baseUrl}/${id}`);
  }
}