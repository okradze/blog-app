import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

test('should render component correctly', () => {
	const wrapper = shallow(<Footer />);
	expect(wrapper).toMatchSnapshot();
});
