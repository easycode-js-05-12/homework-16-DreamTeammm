// -------------------------- Home work - 16 --------------------------
// -------------------------- Шульженко Дмитрий Игоревич --------------------------

// ЗАМЫКАНИЯ
// 1. Есть класс Planet
// function Planet(name) {
// 	this.name = name;
// 	this.getName = function () {
// 		return 'Planet name is ' + this.name;
// 	}
// }
// Создать наследника от Planet, который будет называться PlanetWithSatellite и будет принимать, кроме name, название спутника (satelliteName). Переопределите метод getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку + дополнительный текст 'The satellite is' + satelliteName.
// Например:
// var earth = new PlanetWithSatellite('earth', 'moon');
// earth.getName(); // 'Planet name is earth. The satellite is moon’
// 2. Создайте класс “Здание” (пусть у него будет имя, количество этажей, метод “получить количество этажей” и метод “установить количество этажей”).
// Создайте наследников этого класса:
// 	-классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование
// 	-У жилого дома появится свойство “количество квартир на этаже”, а метод “получить количество этажей” должен вернуть объект вида {этажи: 5, всегоКвартир: 5 * количествоКвартир}
// 	-У торгового центра появится свойство “количество магазинов на этаже”, а метод “получить количество этажей” должен вернуть объект вида {этажи: 3, всегоМагазинов: 3 * количествоМагазинов}
// От каждого класса создать экземпляр (дом, торговый центр)
// 3. Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом “получить информацию” (метод должен вывести имя и цену). Метод должен быть объявлен с помощью прототипов (Func.prototype...). Создать два экземпляра класса “Мебель”: экземпляр “ОфиснаяМебель” и “Мебель для дома”. Придумайте им по одному свойству, которые будут характерны только для этих экземпляров (например, для офисной мебели - наличие компьютерного стола или шредера). Метод “получить информацию” должен учитывать и добавленное вами новое свойство. Задача на переопределение метода у экземпляров класса.
// 4. Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации” и методом “получить информацию” (метод должен вывести имя и дату регистрации). Метод должен быть объявлен с помощью прототипов (Func.prototype...) Создать два наследника класса “Пользователь”: класс “Админ” и класс “Гость”. У класса “Админ” должно быть дополнительное свойство “суперАдмин” (может быть true/false, должно быть скрытым). Свойства определяются в момент вызова конструктора. У класса “Гость” должно быть свойство “срокДействия” (validDate, например), содержащее дату (например, одну неделю от момента регистрации). У классов-наследников метод “получить информацию” должен так же содержать информацию о дополнительных свойствах (“суперАдмин” и “срокДействия”)

// 1.
//ES-5
function Planet(name) {
	this.name = name;
	this.getName = function () {
		return 'Planet name is ' + this.name;
	}
}

function PlanetWithSatellite(name, satelliteName) {
	Planet.call(this, name);
	this.satelliteName = satelliteName;

	var parentGetName = this.getName;

	this.getName = function () {
		return parentGetName.call(this) + '. The satellite is ' + this.satelliteName;
	}
}

let earth = new PlanetWithSatellite('earth', 'moon');
earth.getName();

//ES-6
class Planet1 {
	constructor(name) {
		this.name = name;
	}

	getName() {
		return 'Planet name is ' + this.name;
	}
}

class PlanetWithSatellite1 extends Planet1 {
	constructor(name, satelliteName) {
		super(name);
		this.satelliteName = satelliteName;
	}

	getName() {
		return `${ super.getName() }. The satellite is ${ this.satelliteName }`;
	}
}

let earth1 = new PlanetWithSatellite1('earth', 'moon');
earth1.getName();

// 2.
class Building {
	constructor(name, countOfFloors) {
		this.name = name;
		this.floors = countOfFloors;
	}

	getFloors() {
		return this.floors;
	};

	setFloors(countOfFloors) {
		this.floors = countOfFloors;
	};
}

class House extends Building {
	constructor(name, countOfFloors, countOfApartments) {
		super(name, countOfFloors);
		this.apartmentsOnFloor = countOfApartments;
	}

	getFloors() {
		return {
			floors: super.getFloors(),
			totalApartments: super.getFloors() * this.apartmentsOnFloor
		};
	}
}

class Emporium extends Building {
	constructor(name, countOfFloors, countOfStores) {
		super(name, countOfFloors);
		this.countOfStoresOnFloor = countOfStores;
	}

	getFloors() {
		return {
			floors: super.getFloors(),
			totalStores: super.getFloors() * this.countOfStoresOnFloor
		};
	}
}

const house = new House('RiverTown', 5, 5);
house.getFloors();

const emporium = new Emporium('SpaceMarket', 3, 100);
emporium.getFloors();

// 3.
class Furniture {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}
}

Furniture.prototype.getInfo = function () {
	return {
		name: this.name,
		price: this.price
	};
}

class OfficeFurniture extends Furniture {
	constructor(name, price, board) {
		super(name, price);
		this.board = board;
	}

	getInfo() {
		const result = super.getInfo();
		result.board = this.board
		return result;
	}
}

class HomeFurniture extends Furniture {
	constructor(name, price, sofa) {
		super(name, price);
		this.sofa = sofa
	};

	getInfo() {
		const result = super.getInfo();
		result.sofa = this.sofa;
		return result;
	}
}

const officeFurniture = new OfficeFurniture('xds', 100, 'board');
officeFurniture.getInfo();

const homeFurniture = new HomeFurniture('abc', 1234, 'sofa');
homeFurniture.getInfo();

// 4.
class User {
	constructor(name, date) {
		this.name = name;
		this.dateOfRegistration = date;
	}
}

User.prototype.getInfo = function () {
	return {
		name: this.name,
		dateOfRegistration: this.dateOfRegistration
	};
}

class Admin extends User {
	constructor(name, date) {
		super(name, date);
		this.__superAdmin = true;
	};

	getInfo() {
		const result = super.getInfo();
		result.superAdmin = this.__superAdmin;
		return result;
	}
}

const admin = new Admin('AAAA', '00.00.0000');
admin.getInfo();

class Guest extends User {
	constructor(name, date) {
		super(name, date);
		this.validDate = 999999999999999;
	}

	getInfo() {
		const result = super.getInfo();
		result.validDate = this.validDate;
		return result;
	}
}

const guest = new Guest('BBB', '00.00.0000');
guest.getInfo();