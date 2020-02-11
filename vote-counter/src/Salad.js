import inventory from './inventory.ES6';
import nextId from "react-id-generator";

export default class Salad {
    constructor() {
        this.foundation = '';
        this.protein = [];
        this.extra = [];
        this.dressing = '';

        Object.defineProperty(this, "id",  {value: nextId(), writable: false});
    }

    add(name, ingredient) {

        let ingrObj = {
            name: name,
            ...inventory[name]
        }

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation = ingrObj
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.push(ingrObj);
        } else if (ingredient.hasOwnProperty('extra')) {
            this.extra.push(ingrObj);
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing = ingrObj;
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    remove(ingredient) {

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation = '';
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.splice(this.protein.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('extra')) {
            this.extra.splice(this.extra.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing = '';
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    // Task 7
    price() {
        let salad = [].concat(this.foundation, this.protein, this.extra, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredient.price, 0);
    }

    print(salad) {
        let proteinString = " Protein: ";
        let extraString = " Extra: ";
        salad.protein.forEach(e => proteinString += e.name + ", ");
        salad.extra.forEach(e => extraString += e.name + ", ");
        return "Bas: " + salad.foundation.name + proteinString.substring(0, proteinString.length - 2) + extraString.substring(0, proteinString.length - 2) + " Dressing: " + salad.dressing.name;
    }

}