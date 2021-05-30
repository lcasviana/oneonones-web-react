import { HistoricalModel } from '../Historical/HistoricalModel';
import { OneononeModel } from '../Oneonone/OneononeModel';
import { StatusModel } from './StatusModel';

export type ComposeModel = {
  oneonone: OneononeModel;
  historical: HistoricalModel[];
  status: StatusModel | undefined;
};