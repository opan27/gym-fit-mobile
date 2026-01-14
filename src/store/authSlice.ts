// src/store/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setAuthToken } from '../services/api';
import {
    authService,
    LoginPayload,
    RegisterPayload,
    VerifyOtpPayload,
} from '../services/authService';
import { meService } from '../services/meService';

type AuthState = {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  registerMessage: string | null;
  verifyMessage: string | null;
  tempEmail: string | null;
  profile: any | null;
  isProfileComplete: boolean;
  profileLoaded: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  registerMessage: null,
  verifyMessage: null,
  tempEmail: null,
  profile: null,
  isProfileComplete: false,
  profileLoaded: false,
};

// LOGIN
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await authService.login(payload);
      return res.data; // { status, user, token }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Login failed';
      return rejectWithValue(msg);
    }
  }
);

// REGISTER
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await authService.register(payload);
      // backend: { status, message }
      return { ...res.data, email: payload.email };
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Register failed';
      return rejectWithValue(msg);
    }
  }
);

// VERIFY OTP
export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (payload: VerifyOtpPayload, { rejectWithValue }) => {
    try {
      const res = await authService.verifyOtp(payload);
      return res.data; // { status, message }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Verifikasi OTP gagal';
      return rejectWithValue(msg);
    }
  }
);

// GET ME (PROFILE)
export const fetchMeThunk = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await meService.getMe(); // GET /me
      return res.data;                    // { ..., isProfileComplete }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Gagal mengambil profil';
      return rejectWithValue(msg);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.profile = null;
      state.isProfileComplete = false;
      setAuthToken(null);
    },
    clearAuthError(state) {
      state.error = null;
    },
    clearRegisterMessage(state) {
      state.registerMessage = null;
    },
    clearVerifyMessage(state) {
      state.verifyMessage = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        const data: any = action.payload;
        state.user = data.user;
        state.token = data.token;
        setAuthToken(data.token);
      })
      .addCase(loginThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    // REGISTER
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerMessage = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        const data: any = action.payload;
        state.registerMessage = data.message;
        state.tempEmail = data.email; // email untuk OTP
      })
      .addCase(registerThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    // VERIFY OTP
    builder
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verifyMessage = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        const data: any = action.payload;
        state.verifyMessage = data.message; // "Email berhasil diverifikasi"
      })
      .addCase(verifyOtpThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    // FETCH ME (PROFILE)
    builder
      .addCase(fetchMeThunk.pending, (state) => {
        // boleh kosong atau set loading ringan
      })
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.profile = data;
        state.isProfileComplete = !!data.isProfileComplete;
        state.profileLoaded = true;
      })
      .addCase(fetchMeThunk.rejected, (state, action: any) => {
        state.error = action.payload;
        state.profileLoaded = true;
      });
  },
});

export const {
  logout,
  clearAuthError,
  clearRegisterMessage,
  clearVerifyMessage,
} = authSlice.actions;

export default authSlice.reducer;
