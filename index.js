const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.static('build'))
app.use( express.json() ) 
morgan.token('reqbody', req => JSON.stringify(req.body) ) 
app.use( morgan(':method :url :status :res[content-length] - :response-time ms :reqbody') ) 

let entries = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response)=>{
    response.json(notes)`1`
})

app.get('/info', (req, res) => {
    let date = new Date()
    let msg = `<p>Phonebook has info for ${notes.length} people<\p> <p> ${date} <\p>`
    res.send(msg)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const entry = notes.find( entry => entry.id === id)

    if(entry){
        res.json(entry)
    }
    else{
        response.status(404).send(`Person with id ${id} not found.`)
    }
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
    person.id = Math.floor( Math.random() * 100000 )
    notes.concat(person)
    response.json(person)
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})