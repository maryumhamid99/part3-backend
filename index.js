const express = require('express')

require('dotenv').config()

console.log(`Server running on port ${PORT}`)

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

app.get('/api/persons', (request, response)=>{
    Person.find({}).then( result => response.json(result) )})

app.get('/info', (req, res) => {
    Person.count({}, function( err, count){
        res.json(`<p>Phonebook ${count} no of persons</p><p>${new Date()}</p>`)
    })
})

app.get('/api/persons/:id', (req, res, next)=>{
        Person.findById(req.params.id).then( person => {
        if (person){
            res.json(person)
        } 
        else {
            res.status(404).send(`Person with id ${id} not found.`)
        }
    }).catch( error => next(error))
})

app.delete('/api/persons/:id', (request, response, next)=> {
        const id = Number(request.params.id)
  
    Person.findByIdAndRemove(id).then( result => {
        response.status(204).end()
    }).catch( error => next(error))
})

app.post('/api/persons', (request, response,next)=>{
    const person = request.body
    if (!person.name) 
    {
        return response.status(400).json({error:'name missing '})
    }

    if ( notes.find(entry => entry.name === person.name) )
    {
            return response.status(400).json({error:'name must be unique'})

    }
    const entry = new Person( {
        name: person.name,
        number: person.number
    } )
    entry.save()
    .then( savedPerson => response.json(savedPerson) )
    .catch( error => next(error) )
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') 
    {
        return response.status(400)
    }
    next(error)
}

app.put('/api/persons/:id', (req, res, next) => {
    const updateRequest = {
        name: req.body.name,
        number: res.body.number
    }
    Person.findByIdAndUpdate( res.params.id, updateRequest, {new: true} )
        .then( addPerson => res.json(addPerson) )
        .catch( error => next(error) )
})
app.use( errorHandler )  