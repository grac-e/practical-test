document.addEventListener("alpine:init", () => {
  Alpine.data('popularMake', () => ({
    cars: [],
    popularMake: '',
    addMessage: '',
    addMessageType: '',
    deleteMessage: '',
    deleteMessageType: '',
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
        this.addMessage = 'Please fill in all fields correctly.';
        this.addMessageType = 'error';
        this.clearAddMessage();
        return;
      }

      const existingCar = this.cars.find(car => car.reg_number === this.newCar.reg_number);
      if (existingCar) {
        this.addMessage = 'Error: Registration number is already in use!';
        this.addMessageType = 'error';
        this.clearMessage();
        return;
      }

      axios.post(`/api/cars`, this.newCar)
        .then(response => {
          this.cars.push(response.data);
          this.addMessage = 'Entry added successfully!';
          this.addMessageType = 'success';
          this.newCar = { color: '', make: '', model: '', reg_number: '' };
          this.clearAddMessage();
        })
        .catch(error => {
          this.addMessage = 'Failed to add car. Please try again.';
          this.addMessageTypeessageType = 'error';
          this.clearAddMessage();
        });
    },

    deleteCarEntry() {
      axios.delete(`/api/cars/${this.deleteCar.reg_number}`)
          .then(response => {
              if (response.data.message === 'Car deleted successfully') {
                  this.cars = this.cars.filter(car => car.reg_number !== this.deleteCar.reg_number);
                  this.deleteMessage = 'Car deleted successfully!';
                  this.deleteMessageType = 'success';
                  this.deleteCar.reg_number = '';
              } else if (response.data.message === 'Car not found') {
                  this.deleteMessage = 'Car details not found.';
                  this.deleteMessageType = 'error';
              }
              this.clearDeleteMessage();
          })
          .catch(error => {
              console.error(error);
              this.deleteMessage = 'Please input a valid registration number.';
              this.deleteMessageType = 'error';
              this.clearDeleteMessage();
          });
  },

    clearAddMessage() {
      setTimeout(() => {
          this.addMessage = '';
          this.addMessageType = '';
      }, 5000);
  },

  clearDeleteMessage() {
      setTimeout(() => {
          this.deleteMessage = '';
          this.deleteMessageType = '';
      }, 5000);
  }
  }));
});