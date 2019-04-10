import React from 'react';
import { shallow } from 'enzyme';
import SmallBlogItem from '../../components/SmallBlogItem';

let title, id, createdAt;

beforeEach(() => {
	title = 'Title';
	id = 'abc123';
	createdAt = 120000;
});

test('should render component correctly', () => {
	const wrapper = shallow(<SmallBlogItem title={title} id={id} createdAt={createdAt} />);
	expect(wrapper).toMatchSnapshot();
});
