import { ActionType, ActionTypes, StateType } from './Types';

const initialState: StateType = {
  user: undefined,
  dashboard: undefined,
};

export const Reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case ActionTypes.GetDashboard:
      return {
        ...state,
        dashboard: action.payload,
      };
    default:
      return state;
  }
};