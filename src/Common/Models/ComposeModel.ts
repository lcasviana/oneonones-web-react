import { HistoricalModel } from './HistoricalModel';
import { OneononeModel } from './OneononeModel';
import { StatusModel } from './StatusModel';

export type ComposeModel = {
  oneonone: OneononeModel;
  historical: HistoricalModel[];
  status: StatusModel;
};