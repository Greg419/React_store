import React from 'react'
import ReactDOM from 'react-dom'
// import App from 'components/App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'Router'
import 'css/app.scss';
import 'css/style.scss';

import 'commons/auth';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <div>
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnVisibilityChange={false}
            draggable
            pauseOnHover={false}
        />
        <Router />
    </div>, 
    document.getElementById('root')
    );