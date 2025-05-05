import { configureStore } from '@reduxjs/toolkit';
import { emirateApi } from '@/redux/emirates/emiratesApi';
import { citiesApi } from './cities/citiesApi';
import { projectApi } from './project/projectApi';
import { portraitBannerAdApi } from './portraitBannerAd/portraitBannerAdApi';
import { projectAdsCardApi } from './projectAdsCard/projectAdsCardApi';
import { rentalIncomeApi } from './rentalIncome/rentalIncomeApi';
import { developersApi } from './developers/developersApi';
import { authApi } from './auth/authApi';
import userSlice from "./userSlice/userSlice"
import { wishlistApi } from './wishlist/wishlistApi';
import wishlistSlice from './wishlistSlice/wishlistSlice';
import { smallVideoAdsApi } from './smallVideo/smallViewApi';


export const store = configureStore({
  reducer: {
    [emirateApi.reducerPath]: emirateApi.reducer,
    [citiesApi.reducerPath]: citiesApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [portraitBannerAdApi.reducerPath]: portraitBannerAdApi.reducer,
    [projectAdsCardApi.reducerPath]: projectAdsCardApi.reducer,
    [rentalIncomeApi.reducerPath]: rentalIncomeApi.reducer,
    [developersApi.reducerPath]: developersApi.reducer,
    [smallVideoAdsApi.reducerPath]: smallVideoAdsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    user: userSlice,
    wishlist: wishlistSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      emirateApi.middleware,
      citiesApi.middleware,
      projectApi.middleware,
      portraitBannerAdApi.middleware,
      projectAdsCardApi.middleware,
      rentalIncomeApi.middleware,
      developersApi.middleware,
      authApi.middleware,
      wishlistApi.middleware,
      smallVideoAdsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
