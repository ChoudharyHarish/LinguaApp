import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT}> */}
        <App />
      {/* </GoogleOAuthProvider> */}
  </Provider>
  </React.StrictMode>

);

