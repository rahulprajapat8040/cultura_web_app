import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    isLoggedIn: boolean
}

const initialState: AuthState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        }
    }
})

export const { setLoggedIn } = authSlice.actions
export default authSlice.reducer