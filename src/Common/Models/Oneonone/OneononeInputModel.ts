import { FrequencyEnum } from '../../Enumerations/FrequencyEnum';

export type OneononeInputModel = {
  leaderId: string;
  ledId: string;
  frequency: FrequencyEnum;
};