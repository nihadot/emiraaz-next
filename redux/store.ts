import { configureStore } from '@reduxjs/toolkit';
import { emirateApi } from '@/redux/emirates/emiratesApi';
import { currencyApi } from '@/redux/currency/currencyApi';
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
import { newsApi } from './news/newsApi';
import { blogApi } from './blogs/blogsApi';
import { carriersApi } from './carriers/carriersApi';
import { openHouseApi } from './openhouse/openhouseApi';
import { videosApi } from './talks/talksApi';
import { campaignApi } from './campaign/campaignApi';
import { quickEnquiryApi } from './quickEnquiry/quickEnquiryApi';
import { forSaleApi } from './forSale/forSaleApi';


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
    [newsApi.reducerPath]: newsApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [carriersApi.reducerPath]: carriersApi.reducer,
    [openHouseApi.reducerPath]: openHouseApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
    [campaignApi.reducerPath]: campaignApi.reducer,
    [quickEnquiryApi.reducerPath]: quickEnquiryApi.reducer,
    [forSaleApi.reducerPath]: forSaleApi.reducer,
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
      newsApi.middleware,
      blogApi.middleware,
      carriersApi.middleware,
      openHouseApi.middleware,
      videosApi.middleware,
      currencyApi.middleware,
      campaignApi.middleware,
      quickEnquiryApi.middleware,
      forSaleApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
