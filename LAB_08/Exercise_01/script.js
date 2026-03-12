const student = Object.freeze({
  name: "Arun",
  subjects: [
    { name: "Mathematics", score: 85 },
    { name: "Physics",     score: 90 },
    { name: "Chemistry",   score: 88 }
  ]
});

const computeTotal = scores => scores.reduce((a, { score }) => a + score, 0);

const computeAverage = scores => Number((computeTotal(scores) / scores.length).toFixed(2));

const createStatElement = (label, value, isHighlight = false) => `
  <div class="stat ${isHighlight ? 'average' : ''}">
    <span class="stat-label">${label}</span>
    <span class="stat-value">${value}</span>
  </div>
`;

const renderStats = () => {
  const { name, subjects } = student;
  const total = computeTotal(subjects);
  const avg = computeAverage(subjects);

  const html = [
    createStatElement("Student", name),
    ...subjects.map(s => createStatElement(s.name, s.score)),
    createStatElement("Total Score", total),
    createStatElement("Average", avg, true)
  ].join('');

  document.getElementById("stats").innerHTML = html;

  console.log(`Student Name: ${name}`);
  console.log(`Total Marks: ${total}`);
  console.log(`Average Marks: ${avg}`);
};

renderStats();