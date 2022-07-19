require("dotenv").config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001
const Person = require('./src/models/person')
app.use(cors())
app.use(express.static('build'))
app.use( express.json() ) 

morgan.token('reqbody', req => JSON.stringify(req.body) ) 
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :reqbody')

app.use( requestLogger )

app.get("/api/persons", (request, response)=>{
    Person.find({}).then( result => response.json(result) )})

app.get('/info', (req, res) => {
    let date = new Date()
    let msg = `<p>Phonebook has info for ${notes.length} people<\p> <p> ${date} <\p>`
    res.send(msg)
})

app.get("/api/persons/:id", (request, response, next)=>{
        Person.findById(req.params.id).then( person => {
        if (person){
            res.json(person)
        } 
        else {
            res.status(404).send(`Person with id ${id} not found.`)
        }
    }).catch( error => next(error))
})

app.delete("/api/persons/:id", (request, response, next)=> {
        const id = Number(request.params.id)
  
    Person.findByIdAndRemove(id).then( result => {
        response.status(204).end()
    }).catch( error => next(error))
})

app.post("/api/persons", (request, response)=>{
    const person = request.body
    if (!person.name) 
    {
        return response.status(400).json({error:"name missing "})
    }

    if ( notes.find(entry => entry.name === person.name) )
    {
            return response.status(400).json({error:"name must be unique"})

    }
    const entry = new Person( {
        name: person.name,
        number: person.number
    } )
    entry.save().then( saved => response.json(saved) )
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use( errorHandler ) // handle errors