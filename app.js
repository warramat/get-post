const express = require('express')
const mongoose = require('./db')
const Person = require('./db/person')
const Location = require('./db/location')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
    res.send('hello world')
})

/* -------- GET WITH PHP -------- <Not sure pls recheck> ถ้าอันล่างไม่ได้สำหรับเว็บ (xmlhttp get request)
$xml = file_get_contents("http://10.10.10.152:3000/get-person-list");



/* -------- GET WITH REACT-NATIVE --------

 const [persons, setPerson] = useState([]) // อยู่ใน component function

 useEffect(() => {
    fetch('http://10.10.10.152:3000/get-person-list', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         setPerson(responseJson)
      })
      .catch((error) => {
         console.error(error);
      });
 }, [])

    return (
        <View>
            {persons.map(({ id, name, age }) => (
                <Text>{id} : My name is {name}, {age} years old</Text>
            ))}
        </View>
    )

*/
app.get('/get-person-list', function(req, res) {
    Person.find({}, function(err, success) {
        if (err) {
            res.send([])
        } else {
            res.send(success)
        }
    })
})

app.get('/get-person-id/:id', function(req, res) {
    const id = req.params.id
    Person.findOne({ id }, function(err, success) {
        if (err) {
            res.send({})
        } else {
            res.send(success)
        }
    })
})

app.post('/add-person', function(req, res) {
    // const id = req.body.id
    // const name = req.body.name
    // const age = req.body.age
    const { id, name, age } = req.body // json data always come from req.body
    const newPerson = new Person({
        id, // id: id,
        name, // name: name,
       
        age, // age: age,
    })

    newPerson.save(function(err, success) {
        if (err) {
            res.send('fail')
        } else {
            res.send('saved person')
        }
    })
})

app.post('/update-location', function(req, res) { // python should call this api for save lat, long to db
    const { carId, lat, long }= req.body

    Location.findOneAndUpdate(
        { carId },
        { lat, long }
    , function(err, success) {
        if (err) {
            res.send('fail')
        } else {
            res.send('success')
        }
    })
})

app.get('/get-location/:carId', function(req, res) {
    const carId = req.params.carId
    Location.findOne({ carId }, function(err, success) {
        if (err) {
            console.log('err', err)
            res.send({})
        } else {
            res.send(success)
        }
    })
})

app.listen(3000, function() {
    console.log('running port 3000')
})
