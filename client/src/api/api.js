import axios from 'axios';

const url = "http://localhost:5000/api/v1";
const Api = axios.create({ baseURL: url })

Api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('profile')}`
    }
    return req;
})


const SignUp = (formData) => Api.post(`/user/signup`, formData);
const LogIn = (formData) => Api.post(`/user/signin`, formData);


const getDetails = () => Api.get("/user/getDetails");
const updateDetails = (formData) => Api.post("/user/updateDetails",formData);


const getQuestions = (lang) => Api.get(`/user/getQuestions?lang=${lang}`);
const submitAnswers = (answers) => Api.post('/user/submitAnswers',answers);
const getLeaderBoard  = (lang) => Api.get(`/user/leaderBoard?lang=${lang}`);


const getHistory = () => Api.get("/user/history");
const getTest = (id) => Api.get(`/user/history/${id}`);


export { SignUp, LogIn, getDetails,updateDetails,getQuestions,submitAnswers,getLeaderBoard,getHistory,getTest};