const blogs = [
	{
		title: 'blog1',
		body: 'hello',
		createdAt: 0,
		author: 'Gio',
		photoURL: 'test',
		file: new File([ 'foo' ], 'foo.jpg', {
			type: 'image/jpg',
		}),
	},
	{
		title: 'Rent',
		body: 'hello',
		createdAt: 0,
		author: 'Mirian',
		photoURL: 'test',
		file: {
			name: 'file1.jpg',
			type: 'image/png',
			size: 200,
		},
	},
];

export default blogs;
