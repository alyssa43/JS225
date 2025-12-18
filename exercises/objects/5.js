function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return [...this.courses];
    },

    findCourseByCode(code) {
      return this.courses.find(course => course.code === code);
    },

    addNote(code, note) {
      const course = this.findCourseByCode(code)
      if (course === undefined) return;
      course.note ??= []; // Initialize note to an empty array if it’s currently null or undefined
      course.note.push(note);
    },

    viewNotes() {
      this.courses.filter(c => c.note && c.note.length > 0).forEach(c => {
        console.log(`${c.name}: ${c.note.join('; ')}`);
      });
    },

    updateNote(code, note) {
      const course = this.findCourseByCode(code);
      if (course === undefined) return;
      course.note = [note];
    }
  }
}

let school = {
  students: [],

  addStudent(name, year) {
    switch (year) {
      case '1st':
      case '2nd':
      case '3rd':
      case '4th':
      case '5th': 
        const student = createStudent(name, year);
        this.students.push(student);
        return student;
      default: 
        return 'Invalid Year';
    }
  },

  enrollStudent(student, course) {
    student.addCourse(course);
  },

  addGrade(student, code, grade) {
    const course = student.findCourseByCode(code);
    if (course === undefined) return;
    course.grade = grade;
  },

  getReportCard(student) {
    student.courses.forEach(c => {
      console.log(`${c.name}: ${c.grade || 'In progress'}`);
    });
  },

  courseReport(courseName) {
    const names = [];
    const grades = [];
    this.students.forEach(student => {
      const course = student.courses.find(course => course.name === courseName);
      if (course) {
        const grade = course.grade;
        if (grade) {
          names.push(student.name)
          grades.push(grade);
        }
      }
    });
    if (grades.length === 0) {
      return undefined;
    } else {
      console.log(`=${courseName} Grades=`);
      names.forEach((name, i) => console.log(`${name}: ${grades[i]}`));
      console.log('---');
      console.log(`Course Average: ${this.getGradeAverage(grades)}`);
    }
  },

  getGradeAverage(grades) {
    return grades.reduce((total, score) =>  total + score, 0) / grades.length;
  }
}

let paul = school.addStudent('Paul', '3rd');
school.enrollStudent(paul, { name: 'Math', code: 101 });
school.enrollStudent(paul, { name: 'Advanced Math', code: 102 }),
school.enrollStudent(paul, { name: 'Physics', code: 202, });
school.addGrade(paul, 101, 95);
school.addGrade(paul, 102, 90);
console.log(paul);
// {
//   name: 'Paul',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// }

let mary = school.addStudent('Mary', '1st');
school.enrollStudent(mary, { name: 'Math', code: 101 })
school.addGrade(mary, 101, 91);
console.log(mary);
// {
//   name: 'Mary',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }

let kim = school.addStudent('Kim', '2nd');
school.enrollStudent(kim, { name: 'Math', code: 101 });
school.enrollStudent(kim, { name: 'Advanced Math', code: 102 });
school.addGrade(kim, 101, 93);
school.addGrade(kim, 102, 90);
console.log(kim);
// {
//   name: 'Kim',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//    ],
// }

console.log(school.addStudent('Alyssa', '6th')); // Invalid Year

school.getReportCard(paul);
// Math: 95
// Advanced Math: 90
// Physics: In progress
console.log('....')
school.courseReport('Math');
// =Math Grades=
// Paul: 95
// Mary: 91
// Kim: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// Paul: 90
// Kim: 90
// ---
// Course Average: 90

school.courseReport('Physics');
// = undefined
