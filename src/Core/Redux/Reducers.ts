import { ActionType, ActionTypes, StateType } from './Types';

const initialState: StateType = {
  user: undefined,
  dashboard: undefined,
  dashboards: undefined,
};

export const Reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case ActionTypes.GetUser:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.GetDashboards:
      return {
        ...state,
        dashboards: action.payload,
      };
    case ActionTypes.GetDashboard:
      return {
        ...state,
        dashboard: action.payload,
      };
    default:
      return state;
  }
};