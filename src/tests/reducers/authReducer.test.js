import authReducer from '../../reducers/authReducer';

test('should set uid, photo url and display name', () => {
	const action = {
		type: 'LOGIN',
		userInfo: {
			uid: 'abc123',
			displayName: 'Miriani',
			photoURL: 'url',
		},
	};
	const state = authReducer(undefined, action);
	expect(state).toEqual(action.userInfo);
});

test('should clear info after logout', () => {
	const action = {
		type: 'LOGOUT',
	};
	const state = authReducer(undefined, action);
	expect(state).toEqual({});
});
