import axios, { AxiosResponse } from 'axios';
import { Configuration } from '../../Common/Constants/Configuration';
import { HistoricalInputModel } from '../../Common/Models/Historical/HistoricalInputModel';
import { HistoricalModel } from '../../Common/Models/Historical/HistoricalModel';

export class HistoricalsRepository {
  private static readonly baseUrl = `${Configuration.oneononeApi}/oneonones`;

  public static async insert(historicalInput: HistoricalInputModel): Promise<void> {
    await axios.post<HistoricalInputModel, AxiosResponse<void>>(`${HistoricalsRepository.baseUrl}`, historicalInput);
  }

  public static async update(historical: HistoricalModel): Promise<void> {
    await axios.put<HistoricalModel, AxiosResponse<void>>(`${HistoricalsRepository.baseUrl}`, historical);
  }

  public static async delete(id: string): Promise<void> {
    await axios.delete<void, AxiosResponse<void>>(`${HistoricalsRepository.baseUrl}/${id}`);
  }
}