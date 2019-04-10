import db from '../firebase/firebase';

let startDoc = null;

const getBlogs = docs => {
	const blogs = [];
	docs.forEach(doc => {
		blogs.push({
			id: doc.id,
			...doc.data(),
		});
	});
	startDoc = docs[docs.length - 1];
	return blogs;
};

export const firstFetchBlogs = async uid => {
	const data = await db.collection('users').doc(uid).collection('blogs').orderBy('createdAt', 'desc').limit(6).get();
	return getBlogs(data.docs);
};

export const fetchBlogs = async uid => {
	const data = await db
		.collection('users')
		.doc(uid)
		.collection('blogs')
		.orderBy('createdAt', 'desc')
		.startAfter(startDoc)
		.limit(6)
		.get();
	return getBlogs(data.docs);
};
