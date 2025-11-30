let p = console.log;

function makeCountry(name, continent, visited=false) {
  return {
    name,
    continent,
    visited,
    getDescription() {
      let description = `${this.name} is located in ${this.continent}.`
      let visitStatus = this.visited ? 'have' : "haven't";
      return `${description} I ${visitStatus} visited ${this.name}.`;
    },
    visitCountry() {
      this.visited = true;
    },
  };
}

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

p(canada.getDescription()); // "Canada is located in North America. I haven't visited Canada."
canada.visitCountry();
p(canada.getDescription()); // "Canada is located in North America. I have visited Canada."
