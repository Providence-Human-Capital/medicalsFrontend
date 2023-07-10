import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendees: [],
  isLoading: false,
  error: "",
};

const attendeeSlice = createSlice({
  name: "attendee",
  initialState,
  reducers: {
    clearAttendeesOnLogout: () => initialState,
    setAttendees: (state, action) => {
      state.attendees = action.payload.attendees;
      state.isLoading = false;
      state.error = "";
    },

    deleteAttendee: (state, action) => {
      const index = state.attendees.findIndex(
        (attendee) => attendee.id === action.payload.id
      );
      if (index !== -1) {
        state.attendees.splice(index, 1);
      }
    },
  },
});

export const attendeeActions = attendeeSlice.actions;

export default attendeeSlice;
