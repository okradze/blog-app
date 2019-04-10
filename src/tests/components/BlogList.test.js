import React from 'react';
import 'babel-polyfill';
import { shallow } from 'enzyme';
import { BlogList } from '../../components/BlogList';

jest.mock('../../services/fetch');

let uid, filters;

beforeEach(() => {
	uid = 'abc123';
	filters = {
		title: '',
		searchBy: 'title',
	};
});

test('should render component when loading', () => {
	const wrapper = shallow(<BlogList uid={uid} filters={filters} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render component when loading', done => {
	const wrapper = shallow(<BlogList uid={uid} filters={filters} />);
	setTimeout(() => {
		wrapper.update();
		expect(wrapper).toMatchSnapshot();
		done();
	}, 0);
});
