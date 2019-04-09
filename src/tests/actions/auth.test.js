import { login, logout } from '../../actions/auth';

test('should setup login action', () => {
	const userInfo = {
		uid: 'abc123',
		photoURL: 'url',
		displayName: 'Mirian',
	};
	const action = login(userInfo);
	expect(action).toEqual({
		type: 'LOGIN',
		userInfo,
	});
});

test('should setup logout action', () => {
	const action = logout();
	expect(action).toEqual({
		type: 'LOGOUT',
	});
});
