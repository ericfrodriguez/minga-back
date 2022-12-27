import mongoose from 'mongoose';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(process.env.MONGO_URI, options)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))

