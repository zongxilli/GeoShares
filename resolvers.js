const user = {
	_id: '1',
	name: 'Kenny',
	email: 'zongxi2014@gmail.com',
	picture: 'http://cloudinary.com/asdf',
};

export default {
	Query: {
		me: () => user,
	},
};
