import React from 'react';
import { shallow } from 'enzyme';
import { BlogListItem } from '../../components/BlogListItem';

let title, author, id, createdAt, url, photoURL;

beforeEach(() => {
	title = 'title';
	author = 'Mirian';
	id = 'abc123';
	createdAt = 100000;
	url = '123';
	photoURL = 'abc';
});

test('should render component correctly when on dashboard page', () => {
	const wrapper = shallow(
		<BlogListItem
			title={title}
			author={author}
			id={id}
			createdAt={createdAt}
			url={url}
			photoURL={photoURL}
			to="edit"
		/>,
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render component correctly', () => {
	const wrapper = shallow(
		<BlogListItem title={title} author={author} id={id} createdAt={createdAt} url={url} photoURL={photoURL} />,
	);
	expect(wrapper).toMatchSnapshot();
});
