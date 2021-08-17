import { OAuth2Client } from 'google-auth-library';

import User from '../models/User.js';

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

export const findOrCreateUser = async (token) => {
	const googleUser = await verifyAuthToken(token);

	const user = await checkIfUserExists(googleUser.email);

	return user ? user : await createNewUser(googleUser);
};

const verifyAuthToken = async (token) => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.OAUTH_CLIENT_ID,
		});

		// .getPayload() will return Google user
		return ticket.getPayload();
	} catch (err) {
		console.error('Error verifying auth token', err);
	}
};

const checkIfUserExists = async (email) => await User.findOne({ email }).exec();

const createNewUser = async (googleUser) => {
	const { name, email, picture } = googleUser;

	const user = await User.create({
		name,
		email,
		picture,
	});

	return user;
};
