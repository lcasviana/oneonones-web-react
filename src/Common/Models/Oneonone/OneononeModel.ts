import { FrequencyEnum } from '../../Enumerations/FrequencyEnum';
import { EmployeeModel } from '../Employee/EmployeeModel';

export type OneononeModel = {
  id: string;
  leader: EmployeeModel;
  led: EmployeeModel;
  frequency: FrequencyEnum;
};