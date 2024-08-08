document.addEventListener("alpine:init", () => {
    Alpine.data('popularMake', () => ({
      cars: [],
      popularMake: '',
      message: '',
      messageType: '',
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
        if (!this.newCar.color || !this.newCar.make || !this.newCar.model || !this.newCar.reg_number) {
          this.message = 'Please fill in all fields correctly.';
          this.messageType = 'error';
          this.clearMessage();
          return;
        }

        const existingCar = this.cars.find(car => car.reg_number === this.newCar.reg_number);
        if (existingCar) {
          this.message = 'Error: Registration number is already in use!';
          this.messageType = 'error';
          this.clearMessage();
          return;
        }

        axios.post(`/api/cars`, this.newCar)
          .then(response => {
            this.cars.push(response.data);
            this.message = 'Entry added successfully!';
            this.messageType = 'success';
            this.newCar = { color: '', make: '', model: '', reg_number: '' };
            this.clearMessage();
          })
          .catch(error => {
            this.message = 'Failed to add car. Please try again.';
            this.messageType = 'error';
            this.clearMessage();
          });
      },
  
      deleteCarEntry() {
        axios.delete(`/api/cars/${this.deleteCar.reg_number}`)
          .then(response => {
            if (response.data.message === 'Car entry deleted successfully') {
              this.cars = this.cars.filter(car => car.reg_number !== this.deleteCar.reg_number);
              this.message = 'Car entry deleted successfully!';
              this.messageType = 'success';
            } else {
              this.message = 'Car details not found!';
              this.messageType = 'error';
            }
            this.deleteCar = { reg_number: '' };
            this.clearMessage();
          })
          .catch(error => {
            this.message = 'Please input a valid registration number.';
            this.messageType = 'error';
            this.clearMessage();
          });
      },

      clearMessage() {
        setTimeout(() => {
          this.message = '';
        }, 5000);
      },
    }));
  });