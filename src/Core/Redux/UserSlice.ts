import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../Common/Models/UserModel';

interface UserState {
  user: UserModel | undefined;
}

const localStorageUserKey = 'user';

const initialState: UserState = {
  user: localStorage.getItem(localStorageUserKey)
    ? JSON.parse(localStorage.getItem(localStorageUserKey)!)
    : undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state: UserState, action: PayloadAction<UserModel>) {
      const stringified = JSON.stringify(action.payload);
      localStorage.setItem(localStorageUserKey, stringified);
      state.user = action.payload;
    },
    logout(state: UserState) {
      localStorage.removeItem(localStorageUserKey);
      state.user = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;