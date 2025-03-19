import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Course {
  id: number;
  name: string;
  duration: string;
  price: string;
  shortDesc: string;
}

interface CourseState {
  courses: Course[];
  loading: boolean;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
};

export const fetchCourses = createAsyncThunk("course/fetchCourses", async () => {
  const response = await fetch("https://ybdigitalx.com/vivi_front/list_courses.php");
  return response.json();
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default courseSlice.reducer;