import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookUrl: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

bookSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const Book = mongoose.model('Book', bookSchema)

export default Book