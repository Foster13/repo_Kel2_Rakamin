class Car {
  #timeStamp;
  #plateNumber;
  #merk;

  constructor(plateNumber, timeStamp, merk) {
    this.#plateNumber = plateNumber;
    this.#timeStamp = timeStamp;
    this.#merk = merk;
  }

  get plateNumber() {
    return this.#plateNumber;
  }

  get timeStamp() {
    return this.#timeStamp;
  }

  get Merk() {
    return this.#merk;
  }

  getcarInfo() {
    let tampObj = {
      merk: this.#merk,
      timeStamp: this.#timeStamp,
      plateNumber: this.#plateNumber,
    };

    return tampObj;
  }
}

class ParkingLot {
  constructor(id, capacity) {
    this.id = id; //kode utk lt 1 2 3
    this.capacity = capacity; //kapasitas perlantai
    this.parkingSpots = new Map(); //lahan parkiran
  }

  park(car) {
    //for parking

    if (this.parkingSpots.size >= this.capacity) {
      throw new Error("Parkir Full");
    }

    this.parkingSpots.set(car.plateNumber, car); //masukin mobil ke lahannya by plateNumber

    console.log(`Mobil ${car.plateNumber} masuk ke parkir ${this.id}`);

    let ticket = {
      numberPlate: car.plateNumber,
      timeStamp: new Date(),
      merk: car.merk,
    };

    if (this.parkingSpots.size === this.capacity) {
      // // console.log(`Parkir ${this.id} is Full`);
    }
    return ticket;
  }
  unpark(ticket) {
    //cabut
    if (!ticket) {
      throw new Error("Gaada tiket");
    }

    if (this.parkingSpots.has(ticket.numberPlate) === false) {
      throw new Error("Mobil tidak ditemukan");
    }
    // // console.log(this.parkingSpots.entries());
    this.parkingSpots.delete(ticket.numberPlate);
    // // console.log(`Slot parkir ${this.id} tersedia ===> COBA`);
    // // console.log(this.parkingSpots.entries());
    return true;
  }

  getParkLot() {
    return this.parkingSpots.entries();
  }
}

class AreaParking {
  constructor(name) {
    this.nameManager = name;
    this.LotParking = new Map();
  }

  addLotParking(inputLot) {
    // // console.log(inputLot, "==> Penasaran");

    this.LotParking.set(inputLot.id, inputLot);
  }

  getDataLotParking() {
    return this.LotParking;
  }

  enterParkingArea(car) {
    // // console.log(this.LotParking, "PARKIR BUDI");

    for (let index = 0; index < this.LotParking.size; index++) {
      // // console.log(this.LotParking.values());
      //iterator diubah ke Array
      let parkingLot = Array.from(this.LotParking.values())[index];
      if (parkingLot.parkingSpots.has(car.plateNumber)) {
        //klo kapastias parkiran > jumlah mobil yg udh diparkir
        throw new Error("Plat sudah Ada");
      }

      if (parkingLot.capacity > parkingLot.parkingSpots.size) {
        //klo kapastias parkiran > jumlah mobil yg udh diparkir
        return parkingLot.park(car);
      }
    }
    // console.log("All Parking Full");
  }

  parkHighestCapacityLot(car) {
    let highestCapacityLot = null;
    let maxCapacity = 0;

    for (const parkingLot of this.LotParking.values()) {
      // // console.log(parkingLot, "==> PARKING LOT");
      //cek kapasitas tiap lot
      if (parkingLot.capacity > maxCapacity) {
        maxCapacity = parkingLot.capacity;
        highestCapacityLot = parkingLot;
      }
    }
    // console.log(highestCapacityLot, " ==> LOT TERBESAR");
    // console.log(maxCapacity, "===> MAX CAPACITY");

    highestCapacityLot.park(car);
    return highestCapacityLot;
  }

  highestCapacity(car) {
    let templot;

    for (let i = 0; i < this.LotParking.size; i++) {
      //iterator diubah ke Array
      let parkingLot = Array.from(this.LotParking.values())[i];

      let parkingLotAvailable =
        parkingLot.capacity - parkingLot.parkingSpots.size;

      let templotAvailable = templot
        ? templot.capacity - templot.parkingSpots.size
        : 0;

      console.log(
        `==== PARKING LOT ${parkingLot.id} kapasitas ${parkingLot.capacity}, udah diisi ${parkingLot.parkingSpots.size}, jadi availability ${parkingLotAvailable} ====`
      );

      if (i === 0 || parkingLotAvailable > templotAvailable) {
        templot = parkingLot;
      }
    }
    templot.park(car);
  }

  leaveParkingArea(ticket) {
    //ngecek ticketnya ada di parkiran mana
    for (const parkingLot of this.LotParking.values()) {
      //utk tiap parking lot di kumpulan tempat parkir
      if (parkingLot.parkingSpots.has(ticket.plateNumber)) {
        return parkingLot.unpark(ticket);
      }
    }

    // // console.log("Car not parked in any LOT");
    return null;
  }
}

//Instance utk lahan parkir, termasuk define kuota parkir
let lotA = new ParkingLot("Lot A", 3);
let lotB = new ParkingLot("Lot B", 2);
let lotC = new ParkingLot("Lot C", 5);

let mobil1 = new Car("D 1111 KUY", new Date(), "Honda City").getcarInfo();
let mobil2 = new Car("D 2222 YUK", new Date(), "Honda Jazz").getcarInfo();
let mobil3 = new Car("D 3333 UYK", new Date(), "Honda Brio").getcarInfo();
let mobil4 = new Car("D 4444 UKY", new Date(), "Honda CRV").getcarInfo();
let mobil5 = new Car("D 5555 UKY", new Date(), "Honda CRV").getcarInfo();
let mobil6 = new Car("D 6666 UKY", new Date(), "Honda CRV").getcarInfo();
let mobil7 = new Car("D 7777 UKY", new Date(), "Honda CRV").getcarInfo();
let mobil8 = new Car("D 8888 UKY", new Date(), "Honda CRV").getcarInfo();
let mobil9 = new Car("D 9999 UKY", new Date(), "Honda CRV").getcarInfo();
let mobil10 = new Car("D 0000 UKY", new Date(), "Honda CRV").getcarInfo();

// // console.log(lotA, "==> PARKIR LAHAN");

// let mobil1Parkir = lotA.park(mobil1);
// // console.log(mobil1Parkir, "==> TICKET");
// let mobil2Parkir = lotA.park(mobil2);
// // console.log(mobil2Parkir, "==> Ticket Mobil2");
// let mobil3Parkir = lotA.park(mobil3);
// // console.log(mobil3Parkir, "==> Ticket Mobil3");
// let mobil4Parkir = lotA.park(mobil4);
// // console.log(mobil4Parkir, "==> Ticket Mobil4");

let areaParkBudi = new AreaParking("Budi");
areaParkBudi.addLotParking(lotA);
let checkBudi = areaParkBudi.getDataLotParking();

// // console.log(areaParkBudi);

areaParkBudi.addLotParking(lotB);
areaParkBudi.addLotParking(lotC);

let areanyaBudi = areaParkBudi.getDataLotParking();

// // console.log(areanyaBudi, ">> Area Budi");

// // console.log(
//   "==================================== ini mobil yang mau di keluarin"
// );
// // console.log(mobil1Parkir);
// // console.log("==================================== mobil yang keluar");

// lotA.printParkedCars();

// lotA.unpark(mobil1Parkir);

let cekLotParkA = lotA.getParkLot();

areaParkBudi.highestCapacity(mobil1);
areaParkBudi.highestCapacity(mobil2);
areaParkBudi.highestCapacity(mobil3);
areaParkBudi.highestCapacity(mobil4);
areaParkBudi.highestCapacity(mobil5);
areaParkBudi.highestCapacity(mobil6);
areaParkBudi.highestCapacity(mobil7);
areaParkBudi.highestCapacity(mobil8);
areaParkBudi.highestCapacity(mobil9);
areaParkBudi.highestCapacity(mobil10);
// // console.log(areanyaBudi);
// // console.log(mobil1);
