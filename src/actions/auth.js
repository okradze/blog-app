import { firebase, googleAuthProvider } from '../firebase/firebase';

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}

export const login = (userInfo) => ({
    type: 'LOGIN',
    userInfo
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
};