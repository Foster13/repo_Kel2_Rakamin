//INHERITANCE
class Animal {
    #nameFamily //encapsulation (hanya bisa dipake didlm klsnya)
    constructor(name, nameFamily) {
        this.name = name
        this.#nameFamily = nameFamily
    }

    getNameFamily() {
        return this.#nameFamily
    }

    setterFamily(newInput) {

        console.log(newInput, "==> DARI CHILDREN");
        
        this.#nameFamily = newInput
    }

    //poly (dari parent di overwrite ke children)
    makeSoundAnimal() {
        return "meoww"
    }
}

class Kucing extends Animal {
    constructor(name, nameFamily){
        super(name, nameFamily) //lempar ke parent
    }

    getShowDataParent() {
        return this.getNameFamily()
    }

    makeSoundAnimal() {
        return "KERRNAON"
    }
}

const kucingGarong = new Kucing("Kucing Garong", "Mamalia")
console.log(kucingGarong.getShowDataParent(), "==> BEFORE");

kucingGarong.setterFamily("Mamacita")
console.log(kucingGarong.getShowDataParent(), "==> AFTER");

console.log(kucingGarong.makeSoundAnimal())


// const animal = new Animal ("Kucing", "Mamalia")
// console.log(animal.getNameFamily(), "==> Class Animall");


//POLYMORPH
