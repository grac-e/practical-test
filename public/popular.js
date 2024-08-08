document.addEventListener("alpine:init", () => {
    Alpine.data('popularMake', () => ({
      cars: [],
      popularMake: '',
      newCar: {
        color: '',
        make: '',
        model: '',
        reg_number: ''
      },
      deleteCar: {
        reg_number: ''
      },
  
      fetchCars() {
        axios.get(`/api/cars`)
          .then(response => {
            this.cars = response.data;
          })
      },
  
      findMostPopularCar() {
        axios.get(`/api/popular-car`)
          .then(response => {
            this.popularMake = response.data.mostPopularCar;
            setTimeout(() => {
              this.popularMake = null;
          }, 5000);
          })
      },
  
      addNewCar() {
        axios.post(`/api/cars`, this.newCar)
          .then(response => {
            this.cars.push(response.data);
            this.newCar = { color: '', make: '', model: '', reg_number: '' };
          })
      },
  
      deleteCarEntry() {
        axios.delete(`/api/cars/${this.deleteCar.reg_number}`)
          .then(response => {
            this.cars = this.cars.filter(car => car.reg_number !== this.deleteCar.reg_number);
            this.deleteCar = { reg_number: '' };
          })
      }
    }));
  });






































          
//   addCar() {
//     axios.post('http://localhost:3005/api/cars', this.newCar)
//       .then(response => {
//         this.cars.push(response.data);
//         this.newCar = { color: '', make: '', model: '', reg_number: '' };
//       })
//       .catch(error => console.error(error));
//   },
//   updateCar(car) {
//     axios.put(`http://localhost:3005/api/cars/${car.reg_number}`, car)
//       .then(response => {
//         const index = this.cars.findIndex(c => c.reg_number === car.reg_number);
//         this.cars[index] = response.data;
//       })
//       .catch(error => console.error(error));
//   },
//   deleteCar(reg_number) {
//     axios.delete(`http://localhost:3005/api/cars/${reg_number}`)
//       .then(response => {
//         this.cars = this.cars.filter(c => c.reg_number !== reg_number);
//       })
//       .catch(error => console.error(error));
//   },
//   findMostPopularCar() {
//     this.popularMake = mostPopularCar(this.cars);
//   }