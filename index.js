const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const persons = [
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

app.use(express.json())

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const personsCount = persons.length -1
    const currentDate = new Date().toString()
    res.send(`<p>Phonebook has info for ${personsCount} people</p>
              <p>${currentDate}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (!person) {
        return res.status(400).json({
            error: "content missing"
        })
    }
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const personExists = persons.find(p => p.id === id)
    if (!personExists) {
        return res.status(400).json({
            error: "content doesn't exist"
        })
    }
    persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    const newPerson = req.body
    const personName = req.body.name
    const personNumber = req.body.number
    const personExists = persons.find(p => p.name === personName)

    if (!personName || !personNumber){
        return res.status(400).json({
            error: "name or number is missing"
        })
    }
    if (personExists) {
        return res.status(400).json({
            error: "person already exists"
        })
    }
    
    console.log(newPerson)
    const id = Math.floor(Math.random() * 10001)
    console.log(id)
    res.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})