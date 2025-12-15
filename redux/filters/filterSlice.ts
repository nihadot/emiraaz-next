import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FiltersState = {
    cities: { label: string; value: string; slug:string } | null;
    propertyType?: string;
    completionType?: string;
    year?: number | "";
    qtr?: string;
    categoryType?: string;
    categoryStatus?: string;
    paymentPlan?: string;
    priceRange?: {
        min: number;
        max: number;
    };
    sqftRange?: {
        min: number;
        max: number;
    };
    beds?:string;
    bath?:string;
    furnishType?:string;
    discount?:string;
    search?:string;
    page?:number;
};

const initialState: FiltersState = {
    cities: null,
    propertyType: "",
    completionType: "",
    year: "",
    qtr: "",
    categoryType: "",
    categoryStatus: "",
    paymentPlan: "",
    priceRange: {
        min: 0,
        max: 10000000,
    },
    sqftRange: {
        min: 0,
        max: 2000,
    },
    beds:"",
    bath:"",
    furnishType:"",
    discount:"",
    search:"",
    page:1,
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCity(
            state,
            action: PayloadAction<{ label: string; value: string, slug:string }>
        ) {
            const city = action.payload;

            console.log(city,'City')

            // toggle single object (not array)
            if (state.cities?.value === city.value) {
                state.cities = null;
            } else {
                state.cities = city;
            }
        },
        handlePropertyCategoryStatus(state, action: PayloadAction<string>) {
            state.categoryStatus = action.payload;
        },
        handlePropertyCategoryType(state, action: PayloadAction<string>) {
            state.categoryType = action.payload;
        },
        setCompletion(state, action: PayloadAction<string>) {
            state.completionType = action.payload;
        },
        setPaymentPlan(state, action: PayloadAction<string>) {
            state.paymentPlan = action.payload;
        },
        setPropertyType(state, action: PayloadAction<string>) {
            state.propertyType = action.payload;
        },
        setPriceRange(state, action: PayloadAction<{
            min: number;
            max: number;
        }>) {
            state.priceRange = action.payload;
        },
        setSqftRange(state, action: PayloadAction<{
            min: number;
            max: number;
        }>) {
            state.sqftRange = action.payload;
          
        },
        setHandover(state, action: PayloadAction<{ year?: number; qtr?: string }>) {
            state.year = action.payload.year || "";
            state.qtr = action.payload.qtr || "";
        },
          setBeds(state, action: PayloadAction<string>) {
            state.beds = action.payload;
        },
            setBath(state, action: PayloadAction<string>) {
            state.bath = action.payload;
        },
        clearFilters() {
            return initialState;
        },
            setFurnishType(state, action: PayloadAction<string>) {
            state.furnishType = action.payload;
        },
        setDiscount(state, action: PayloadAction<string>) {
            state.discount = action.payload;
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        
    }
});

export const {
    setCity,
    setCompletion,
    setPropertyType,
    setHandover,
    clearFilters,
    handlePropertyCategoryStatus,
    handlePropertyCategoryType,
    setPaymentPlan,
    setSqftRange,
    setPriceRange,
    setBeds,
    setBath,
    setFurnishType,
    setDiscount,
    setSearchTerm,
    setPage,
} = filterSlice.actions;

export default filterSlice.reducer;
