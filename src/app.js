import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routes/AppRouter';
import { firebase } from './firebase/firebase';
import configureStore from './store/configureStore';
import { logout, login } from './actions/auth';
import { startSetBlogs } from './actions/blogs';
import { startFetchBlogs } from './actions/readBlogs';
import Loader from './components/Loader';
import 'react-quill/dist/quill.snow.css';
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

ReactDOM.render(<Loader />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch(login({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
        store.dispatch(startSetBlogs()).then(() => {
            render();
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        render();
        if (!history.location.pathname.match(/^\/read\/.{1,}$/)) {
            history.push('/');
        }
    }
});