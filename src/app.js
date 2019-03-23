import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routes/AppRouter';
import { firebase } from './firebase/firebase';
import configureStore from './store/configureStore';
import { logout, login } from './actions/auth';
import { startSetBlogs } from './actions/blogs';
import 'normalize.css/normalize.css';
import './styles/main.scss';

const store = configureStore();
const jsx = (
    <Provider store={store} >
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const render = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true
    }
};

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetBlogs()).then(() => {
            render();
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        })
        render();
    } else {
        store.dispatch(logout());
        render();
        history.push('/');
    }
});