const mongoose = require("mongoose")


const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
    .then( result => console.log("Connected to DB.") )
    .catch( error => console.log("Error connecting.", error.message) )

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set( 'toJSON', {
    transform: (document, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

module.exports = mongoose.model("Person", personSchema)