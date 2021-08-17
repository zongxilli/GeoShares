import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import colors from 'colors';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import connectDB from './db.js';

dotenv.config();

connectDB();

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const PORT = process.env.PORT || 4000;

server.listen(
	PORT,
	console.log(`Server Running On Port: ${PORT || 4000}`.magenta)
);
