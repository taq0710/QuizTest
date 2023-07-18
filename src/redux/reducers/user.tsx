import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { IUserDetail } from '../interface/user';

const initialState: any = {
  isLoading: false,
  error: '',
  info: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getProposal: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    getProposalSuccess: (state, action: PayloadAction<IUserDetail>) => {
      state.isLoading = false;
      state.error = '';
      state.detail = action.payload;
    },
    getProposalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
  },
});

export const {
  getProposal,
  getProposalSuccess,
  getProposalFailure,
} = userSlice.actions;

// Other code such as selectors can use the imported `AppState` type
export const selectIsLoading = (state: AppState) => state.user.isLoading;
export const selectError = (state: AppState) => state.user.error;
export const selectInfo = (state: AppState) => state.user.info;

export default userSlice.reducer;
