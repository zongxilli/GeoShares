import { AuthenticationError } from 'apollo-server';

const user = {
	_id: '1',
	name: 'Kenny',
	email: 'zongxi2014@gmail.com',
	picture: 'http://cloudinary.com/asdf',
};

const authenticated = (next) => (root, args, ctx, info) => {
	if (!ctx.currentUser) {
		throw new AuthenticationError('You must be logged in');
	}

	return next(root, args, ctx, info);
};

export default {
	Query: {
		me: authenticated((root, args, ctx) => ctx.currentUser),
	},
};
