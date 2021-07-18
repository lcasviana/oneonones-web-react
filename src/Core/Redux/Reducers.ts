import { ActionType, ActionTypes, StateType } from './Types';

const localStorageUserKey = 'user';

const initialState: StateType = {
  user: localStorage.getItem(localStorageUserKey) ? JSON.parse(localStorage.getItem(localStorageUserKey)!) : undefined,
  dashboard: undefined,
  dashboards: undefined,
};

export const Reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {

    case ActionTypes.Login:
      const stringified = JSON.stringify(action.payload);
      localStorage.setItem(localStorageUserKey, stringified);
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.Logout:
      localStorage.removeItem(localStorageUserKey);
      return {
        ...state,
        user: undefined,
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