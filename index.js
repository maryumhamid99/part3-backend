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
app.use( morgan(':method :url :status :res[content-length] - :response-time ms :reqbody') ) 


app.get("/api/persons", (request, response)=>{
    Person.find({}).then( result => response.json(result) )})

app.get('/info', (req, res) => {
    let date = new Date()
    let msg = `<p>Phonebook has info for ${notes.length} people<\p> <p> ${date} <\p>`
    res.send(msg)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(request.params.id).then( person => {
        response.json(person)
    }).catch( error => response.status(404).send(`Person not found.`) )
})

app.delete("/api/persons/:id", (request, response)=> {
    const id = Number(request.params.id)
    notes = notes.filter( entry => entry.id !== id)
    response.status(204).end()
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



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})