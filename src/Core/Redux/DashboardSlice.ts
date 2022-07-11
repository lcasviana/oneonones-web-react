import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardModel } from '../../Common/Models/Dashboard/DashboardModel';

interface DashboardState {
  dashboard: DashboardModel | undefined;
  dashboards: DashboardModel[] | undefined;
}

const initialState: DashboardState = {
  dashboard: undefined,
  dashboards: undefined,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getDashboard(state: DashboardState, action: PayloadAction<DashboardModel>) {
      state.dashboard = action.payload;
    },
    getDashboards(state: DashboardState, action: PayloadAction<DashboardModel[]>) {
      state.dashboards = action.payload;
    },
  },
});

export const { getDashboard, getDashboards } = dashboardSlice.actions;
export default dashboardSlice.reducer;