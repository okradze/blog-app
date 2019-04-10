import React from 'react';
import { shallow } from 'enzyme';
import { CreateBlogForm } from '../../components/CreateBlogForm';

let onSubmit, title, body, createdAt, submitDisabled, submitLoading, removeDisabled, removeLoading, onRemove, auth;

beforeEach(() => {
	onSubmit = jest.fn();
	title = 'title';
	body = 'body';
	createdAt = 100000;
	submitDisabled = false;
	submitLoading = false;
	removeDisabled = false;
	removeLoading = false;
	onRemove = jest.fn();
	auth = {
		uid: 'abc123',
		displayName: 'Mirina',
		photoURL: 'abc',
	};
});

test('should render component correctly', () => {
	const wrapper = shallow(
		<CreateBlogForm
			onSubmit={onSubmit}
			title={title}
			body={body}
			createdAt={createdAt}
			submitDisabled={submitDisabled}
			submitLoading={submitLoading}
			removeDisabled={removeDisabled}
			removeLoading={removeLoading}
			onRemove={onRemove}
			auth={auth}
		/>,
	);
	expect(wrapper).toMatchSnapshot();
});

test('should render component correctly when edit page', () => {
	const wrapper = shallow(
		<CreateBlogForm
			onSubmit={onSubmit}
			title={title}
			body={body}
			createdAt={createdAt}
			submitDisabled={submitDisabled}
			submitLoading={submitLoading}
			removeDisabled={removeDisabled}
			removeLoading={removeLoading}
			onRemove={onRemove}
			auth={auth}
			isEdit={true}
		/>,
	);
	expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit on form submit', () => {
	const wrapper = shallow(
		<CreateBlogForm
			onSubmit={onSubmit}
			title={title}
			body={body}
			createdAt={createdAt}
			submitDisabled={submitDisabled}
			submitLoading={submitLoading}
			removeDisabled={removeDisabled}
			removeLoading={removeLoading}
			onRemove={onRemove}
			auth={auth}
		/>,
	);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {},
	});
	expect(onSubmit).toHaveBeenCalled();
});
