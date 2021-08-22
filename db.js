import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true
		});

		console.log(`MongoDB Connected to: ${conn.connection.host}`.magenta);
	} catch (error) {
		console.error(`Failed to Connect to MongoDB: ${error.message}`.red);
		// Error -> we exit     1 means we gonna exit with failure
		process.exit(1);
	}
};

export default connectDB;  