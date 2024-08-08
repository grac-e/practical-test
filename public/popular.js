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