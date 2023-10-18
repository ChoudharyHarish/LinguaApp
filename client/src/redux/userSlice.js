import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SignUp, LogIn,getDetails,updateDetails, submitAnswers, getQuestions} from "../api/api";



export const signUp = createAsyncThunk('signUp', async (formData) => {
    try {
        const { data } = await SignUp(formData);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }

})


export const signIn = createAsyncThunk('signIn', async (formData) => {
    try {
        const { data } = await LogIn(formData);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const getUserDetails = createAsyncThunk('getUserDetails',async() => {
    try {
        const { data } = await getDetails();
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const updateUserDetails = createAsyncThunk('updateUserDetails',async(formData) => {
    try {
        const { data } = await updateDetails(formData);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})


export const fetchQuestions = createAsyncThunk('fetchQuestions',async(lang) => {
    try {
        const { data } = await getQuestions(lang);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})

export const finishTest = createAsyncThunk('finishTest',async(formData) => {
    try {
        const { data } = await submitAnswers(formData);
        console.log(data);
        return data;
    }
    catch (error) {
        const message = error.response.data.msg;
        return { message };
    }
})




const initialState = {
    isAuthenticated: false,
    user: null,
    history: null,
    questions : null,
    anwers : null,
    leaderBoard : null,
    score : 0,
    correct : 0,
    inCorrect : 0,
    badge : null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            // state.user = null;
            // localStorage.clear();
        },
        logout: (state) => {
            localStorage.clear();
            state.isAuthenticated = false;
            state.user = null;
        },
        resetQuestions : (state) => {
            state.questions = null;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            const result = action.payload;
            if (result?.message) {
                return alert(result.message);
            }
            if (result?.token) {
                state.user = {
                    name: result.name,
                    userId: result.userId,
                }
                state.isAuthenticated = true;
                localStorage.setItem('profile', result.token);
                localStorage.setItem('user', JSON.stringify({ ...state.user }));
            }
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            const result = action.payload;
            if (result?.message) {
                return alert(result.message);
            }
            if (result?.token) {
                state.user = {
                    name: result.name,
                    userId: result.userId,
                }
                state.isAuthenticated = true;
                localStorage.setItem('profile', result.token);
                localStorage.setItem('user', JSON.stringify({ ...state.user }));
            }
        })
        builder.addCase(getUserDetails.fulfilled, (state,action) => {
            state.user = action.payload;
            localStorage.setItem('user',JSON.stringify({...action.payload}));
        })
        builder.addCase(updateUserDetails.fulfilled, (state,action) => {
            alert(action.payload.msg);
        })
        builder.addCase(fetchQuestions.fulfilled, (state,action) => {
            state.questions = action.payload;
        })
        builder.addCase(finishTest.fulfilled, (state,action) => {
                const {leaderBoard, score, total_correct , total_in_correct,badge} = action.payload;
                state.leaderBoard = leaderBoard;
                state.score = score;
                state.correct = total_correct;
                state.inCorrect = total_in_correct;
                state.badge = badge
                state.questions = null;

        })
    }
})

export const { logout, setUserAuthenticated, resetQuestions } = userSlice.actions;
export default userSlice.reducer;