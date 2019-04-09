import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let startLogin, startLogout, photoURL, uid, loggedInWrapper, loggedOutWrapper;

beforeEach(() => {
	startLogin = jest.fn();
	startLogout = jest.fn();
	photoURL = 'url';
	uid = 'abc123';
	loggedInWrapper = shallow(
		<Header startLogin={startLogin} startLogout={startLogout} photoURL={photoURL} uid={uid} />,
	);
	loggedOutWrapper = shallow(<Header startLogin={startLogin} />);
});

test('should render Header correctly when logged in', () => {
	expect(loggedInWrapper).toMatchSnapshot();
});

test('should render Header correctly when logged out', () => {
	expect(loggedOutWrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
	loggedInWrapper.find('button').simulate('click');
	expect(startLogout).toHaveBeenCalled();
});

test('should call startLogin on button click', () => {
	loggedOutWrapper.find('button').at(0).simulate('click');
	loggedOutWrapper.find('button').at(1).simulate('click');
	expect(startLogin).toHaveBeenCalledTimes(2);
});
