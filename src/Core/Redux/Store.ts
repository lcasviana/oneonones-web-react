import { configureStore } from '@reduxjs/toolkit';
import DashboardSlice from './DashboardSlice';
import UserSlice from './UserSlice';

const store = configureStore({
  reducer: {
    dashboard: DashboardSlice,
    user: UserSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;