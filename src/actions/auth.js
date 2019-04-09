import { firebase, googleAuthProvider } from '../firebase/firebase';

export const logout = () => ({
	type: 'LOGOUT',
});

export const startLogout = () => () => firebase.auth().signOut();

export const login = userInfo => ({
	type: 'LOGIN',
	userInfo,
});

export const startLogin = () => () => firebase.auth().signInWithPopup(googleAuthProvider);
