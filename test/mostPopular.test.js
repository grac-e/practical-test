import assert from "assert";
import { mostPopularCar } from "../mostPopular.js";
import {cars} from '../cars.js'

describe('The mostPopularCar test', function () {

    it('should return the most popular car make in an array', function () {
        const expectedCarMake = "Toyota"; 
        assert.equal(mostPopularCar(cars), expectedCarMake);
    });
});