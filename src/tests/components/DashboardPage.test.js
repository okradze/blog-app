import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../components/DashboardPage';

test('should render component correctly', () => {
	const wrapper = shallow(<DashboardPage />);
	expect(wrapper).toMatchSnapshot();
});
