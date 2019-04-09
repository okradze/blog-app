import uuid from 'uuid';
import db, { storage } from '../firebase/firebase';

export const startRemoveBlog = async (uid, id) => {
	const snapshot = await db.collection('users').doc(uid).collection('blogs').doc(id).get();
	await db.collection('users').doc(uid).collection('blogs').doc(id).delete();
	await db.collection('blogs').doc(id).delete();
	await storage.ref(`${uid}/${id}/${snapshot.data().filename}`).delete();
};

export const startEditBlog = async (uid, id, updates) => {
	await db.collection('users').doc(uid).collection('blogs').doc(id).update(updates);
	await db.collection('blogs').doc(id).update(updates);
};

export const startCreateBlog = async (blogData, uid) => {
	const { title = '', body = '', createdAt = 0, author = 'Anonymous', photoURL = '', file } = blogData;
	const id = uuid();
	await storage.ref(`${uid}/${id}/${file.name}`).put(file);
	const url = await storage.ref(`${uid}/${id}`).child(file.name).getDownloadURL();
	const blog = { title, body, createdAt, author, photoURL, url };
	await db.collection('users').doc(uid).collection('blogs').doc(id).set({ ...blog, filename: file.name });
	await db.collection('blogs').doc(id).set(blog);
};
