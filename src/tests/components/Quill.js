import React from 'react';
import { shallow } from 'enzyme';
import Quill from '../../components/Quill';

test('should render component correctly', () => {
	const wrapper = shallow(<Quill />);
	expect(wrapper).toMatchSnapshot();
});
