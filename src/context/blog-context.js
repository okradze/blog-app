import React from 'react';

export default React.createContext({
	blogs: [],
	filters: {
		title: '',
		searchBy: 'title'
	},
	auth: {},
	readBlogs: []
});