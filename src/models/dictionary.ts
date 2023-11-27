import mongoose from "mongoose";

const dictionarySchema = new mongoose.Schema({
    wordEn: String,
    wordRu: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

dictionarySchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const Dictionary = mongoose.model('Dictionary', dictionarySchema)

export default Dictionary