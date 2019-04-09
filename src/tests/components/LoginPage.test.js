import React from 'react';
import { shallow } from 'enzyme';
import 'babel-polyfill';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
	const wrapper = shallow(<LoginPage />);
	expect(wrapper).toMatchSnapshot();
});
