import {cars} from './cars.js'
export function mostPopularCar(carArray) {
    const makeCount = {};
    let mostPopularMake = "";
    let maxCount = 0;
  
    for (const car of carArray) {
      if (makeCount[car.make]) {
        makeCount[car.make]++;
      } else {
        makeCount[car.make] = 1;
      }
  
      if (makeCount[car.make] > maxCount) {
        maxCount = makeCount[car.make];
        mostPopularMake = car.make;
      }
    }
  
    return mostPopularMake;
  }

  console.log(mostPopularCar(cars));