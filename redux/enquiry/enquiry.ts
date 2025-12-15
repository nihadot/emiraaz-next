import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FiltersState = {
    number: string;
    name: string;
    projectId: string;
    userId: string;
    isOpen: boolean;
    successIsOpen: boolean;
    existingIsOpen: boolean;
};

const initialState: FiltersState = {
    name: "",
    number: "",
    projectId: "",
    userId: "",
    isOpen: false,
    successIsOpen: false,
    existingIsOpen: false,
};

const enquiry = createSlice({
    name: "enquiry",
    initialState,
    reducers: {
        setEnquiry(
            state,
            action: PayloadAction<{
                name: string;
                number: string;
                projectId: string;
                userId?: string;
            }>
        ) {
            state.name = action.payload.name;
            state.number = action.payload.number;
            state.projectId = action.payload.projectId;
            state.userId = action.payload.userId ?? "";
        },
        toggleEnquiry(state) {
            state.isOpen = !state.isOpen;
        },
        setProjectId(state, action: PayloadAction<string>) {
            state.projectId = action.payload;
        },
        openEnquiry(state) {
            state.isOpen = true;
        },
        closeEnquiry(state) {
            state.isOpen = false;
        },
        openSuccessEnquiry(state) {
            state.successIsOpen = true;
        },
        closeSuccessEnquiry(state) {
            state.successIsOpen = false;
        },
        openExistingEnquiry(state) {
            state.existingIsOpen = true;
        },
        closeExistingEnquiry(state) {
            state.existingIsOpen = false;
        },
    },
});

export const { setEnquiry, setProjectId, toggleEnquiry, openEnquiry, closeEnquiry,
    closeExistingEnquiry,
    openExistingEnquiry,
    closeSuccessEnquiry,
    openSuccessEnquiry
} =
    enquiry.actions;

export default enquiry.reducer;
