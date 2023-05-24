import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attendees: [],
    isLoading: false,
    error: ""
}

const attendeeSlice = createSlice({
    name: "attendee",
    initialState,
    reducers: {
        setAttendees: (state, action) => {
            state.attendees = action.payload.attendees
            state.isLoading = false
            state.error = ""
        }
    }
})

export const attendeeActions = attendeeSlice.actions;

export default attendeeSlice