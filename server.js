import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import colors from 'colors';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import connectDB from './db.js';
import { findOrCreateUser } from './controllers/userController.js';

dotenv.config();

connectDB();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		let authToken = null;
		let currentUser = null;

		try {
			authToken = req.headers.authorization;

			if (authToken) {
				currentUser = await findOrCreateUser(authToken);
			}
		} catch (err) {
			console.error(`Unable to authenticate user with token ${authToken}`);
		}

		return { currentUser };
	},
});

const PORT = process.env.PORT || 4000;

server.listen(
	PORT,
	console.log(`Server Running On Port: ${PORT || 4000}`.magenta)
);
