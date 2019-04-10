import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routes/AppRouter';
import { firebase } from './firebase/firebase';
import configureStore from './store/configureStore';
import { logout, login } from './actions/auth';
import loader from './images/loader.gif';
import 'normalize.css';
import 'react-quill/dist/quill.snow.css';
import './styles/main.scss';

const store = configureStore();
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(<img className="small-loader center" src={loader} alt="Loader" />, document.getElementById('app'));

let hasRendered = false;
const render = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		store.dispatch(login({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }));
		render();
		if (history.location.pathname === '/') {
			history.push('/dashboard');
		}
	} else {
		store.dispatch(logout());
		render();
		if (!history.location.pathname.match(/^\/read\/.{1,}$/)) {
			history.push('/');
		}
	}
});
