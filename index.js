import express from 'express';
import cors from 'cors';
import { mostPopularCar } from './mostPopular.js';
import {cars} from './cars.js'

const app = express();
const PORT = process.env.PORT || 3005;
app.use(cors());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Most popular make
app.get('/api/popular-car', function (req, res) {
    const result = mostPopularCar(cars);
    res.json({ 
      mostPopularCar: result 
    });
  });

//All cars
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// Add a new entry
app.post('/api/cars', (req, res) => {
  const newCar = req.body;
  newCar.id = cars.length ? cars[cars.length - 1].id + 1 : 1;
  cars.push(newCar);
  res.json(newCar)({
    color: '',
    make: '',
    model: '',
    reg_number: ''
  })
});

// Delete an old entry
app.delete('/api/cars/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const carIndex = cars.findIndex(car => car.reg_number === reg_number);
  if (carIndex !== -1) {
    cars.splice(carIndex, 1);
    res.json({ message: 'Car deleted successfully' });
  } else {
    res.json({ message: 'Car not found' });
  }
});

app.listen(3005, function () {
    console.log('Example app listening on port 3005!');
});