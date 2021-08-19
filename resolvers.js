import { AuthenticationError } from 'apollo-server';
import Pin from './models/Pin.js';

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

	Mutation: {
		createPin: authenticated(async (root, args, ctx) => {
			const newPin = await Pin.create({
				...args.input,
				author: ctx.currentUser._id,
			});

			const pinAdded = await Pin.populate(newPin, 'author');
			return pinAdded;
		}),
	},
};
