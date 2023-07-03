const roles = {
	admin: "https://cdn-icons-png.flaticon.com/128/4472/4472507.png",
	student: "https://cdn-icons-png.flaticon.com/128/4472/4472559.png",
	lector: "https://cdn-icons-png.flaticon.com/128/4472/4472533.png"
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "https://cdn-icons-png.flaticon.com/128/4509/4509725.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "https://cdn-icons-png.flaticon.com/128/4509/4509624.png",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "https://cdn-icons-png.flaticon.com/128/4509/4509555.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "https://cdn-icons-png.flaticon.com/128/4509/4509714.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}
		]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "https://cdn-icons-png.flaticon.com/128/4509/4509636.png",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}
		]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "https://cdn-icons-png.flaticon.com/128/4509/4509630.png",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];

class User {
	constructor(name, age, img, role, courses) {
		this.name = name;
		this.age = age;
		this.img = img;
		this.role = role;
		this.courses = courses;
	}

	render() {
		return `
			<div class="users">
				<div class="user">
					<div class="user__info">
						<div class="user__info--data">
							<img src="${this.img}" alt="${this.name}" height="50">
							<div class="user__naming">
								<p>Name: <b>${this.name}</b></p>
								<p>Age: <b>${this.age}</b></p>
							</div>
						</div>
						<div class="user__info--role ${this.role}">
							<img src="${roles[this.role]}" alt="${this.role}" height="25">
							<p>${this.role}</p>
						</div>
					</div>
					${this.renderCourses()}
				</div>
			</div>
		`;
	}

	renderCourses() {
		if (!this.courses) return '';

		return `
			<div class="user__courses">
				${this.courses
					.map(course => `
						<p class="user__courses--course student">
							<span>${course.title}</span>
							${course.mark ? `<span class="${this.getMarkColorClass(course.mark)}">${this.getMarkDescription(course.mark)}</span>` : ''}
							${course.score ? `<span>${course.score}</span>` : ''}
							${course.lector ? `<span>${course.lector}</span>` : ''}
						</p>
					`)
					.join('')}
			</div>
		`;
	}

	getMarkDescription(mark) {
		for (const key in gradation) {
			if (mark <= Number(key)) {
				return gradation[key].charAt(0).toUpperCase() + gradation[key].slice(1);
			}
		}
		return '';
	}

	getMarkColorClass(mark) {
		if (mark <= 20) {
			return 'satisfactory';
		} else if (mark <= 55) {
			return 'good';
		} else if (mark <= 85) {
			return 'very-good';
		} else if (mark <= 100) {
			return 'excellent';
		} else {
			return '';
		}
	}
}

class Student extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}
}

class Lector extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}

	renderCourses() {
		if (!this.courses) return '';

		return `
			<div class="user__courses admin--info">
				${this.courses
					.map(
						(course) => `
							<div class="user__courses--course lector">
								<p>Title: <b>${course.title}</b></p>
								${course.score ? `<p>Lector's score:<span class="${this.getMarkColorClass(course.studentsScore)}">${this.getMarkDescription(course.studentsScore)}</span></p>` : ''}
								${course.studentsScore ? `<p>Average student's score:<span class="${this.getMarkColorClass(course.studentsScore)}">${this.getMarkDescription(course.studentsScore)} </span>` : ''}
							</div>`
					)
					.join('')}
			</div>
		`;
	}
}

class Admin extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses);
	}

	renderCourses() {
		if (!this.courses) return '';

		return `
			<div class="user__courses admin--info">
				${this.courses
					.map(
						(course) => `
							<div class="user__courses--course admin">
								<p>Title: <b>${course.title}</b></p>
								${course.score ? `<p>Admin's score:<span class="${this.getMarkColorClass(course.score)}">${this.getMarkDescription(course.score)}</span></p>` : ''}
								${course.lector ? `<p>Lector: <span>${course.lector}</span></p>` : ''}
							</div>`
					)
					.join('')}
			</div>
		`;
	}
}

for (const user of users) {
	if (user.role === "student") {
		const student = new Student(user.name, user.age, user.img, user.role, user.courses);
		document.write(student.render());
	} else if (user.role === "admin") {
		const admin = new Admin(user.name, user.age, user.img, user.role, user.courses);
		document.write(admin.render());
	} else if (user.role === "lector") {
		const lector = new Lector(user.name, user.age, user.img, user.role, user.courses);
		document.write(lector.render());
	}
}


