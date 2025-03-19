import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await fetch("http://localhost:5000/categories");
    return response.json();
});

interface CategoryState {
    categories: string[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

const category = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch categories";
            });
    },
});

export const { setCategories } = category.actions;
export default category.reducer;
