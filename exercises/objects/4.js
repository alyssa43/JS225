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

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
console.log(foo.listCourses());
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses());
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"