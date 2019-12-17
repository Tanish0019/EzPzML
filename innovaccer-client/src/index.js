import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

toast.configure({
	autoClose: 3000,
	position: toast.POSITION.BOTTOM_RIGHT
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
