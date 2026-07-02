import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },

  reducers: {
    fetchBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload; // ✅ Fixed typo
    },

    fetchBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    addBookRequest(state, action) {
      state.loading = true;
      state.error = action.payload;
      state.message = null;
    },

    addBookSuccess(state, action) {
      state.loading = false; // ✅ Should be false when done
      state.message = action.payload;
    },

    addBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetBookSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
  },
});

// ✅ Thunks

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  await axios
    .get("https://real-time-library-managment-1.onrender.com/api/v1/book/all", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    })
    .catch((err) => {
      dispatch(
        bookSlice.actions.fetchBooksFailed(
          err.response?.data?.message || "Failed to fetch books"
        )
      );
    });
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  await axios
    .post("https://real-time-library-managment-1.onrender.com/api/v1/book/admin/add", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(bookSlice.actions.addBookSuccess(res.data.message)); 
      toast.success(res.data.message);// ✅ Dispatch it
      dispatch(toggleAddBookPopup());
      dispatch(fetchAllBooks());
    })
    .catch((err) => {
      dispatch(
        bookSlice.actions.addBookFailed(
          err.response?.data?.message || "Failed to add book"
        )
      );
    });
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;
