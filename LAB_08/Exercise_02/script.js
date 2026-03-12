const createStudent = () => Object.freeze({
  id: 101,
  name: "Priya",
  department: "CSE",
  marks: 92
});

const getGrade = marks => {
  return marks >= 90 ? "A+"
       : marks >= 85 ? "A"
       : marks >= 75 ? "B+"
       : marks >= 65 ? "B"
       : marks >= 50 ? "C"
       : "F";
};

const displayStudent = ({ id, name, department, marks }) => ({
  id,
  name,
  department,
  marks,
  grade: getGrade(marks)
});

const renderProfile = student => {
  const { id, name, department, marks, grade } = student;

  const fields = [
    { label: "ID",          value: id },
    { label: "Name",        value: name },
    { label: "Department",  value: department },
    { label: "Marks",       value: `${marks}%` }
  ];

  document.getElementById("info").innerHTML = fields
    .map(f => `<div class="field"><span class="label">${f.label}</span><span class="value">${f.value}</span></div>`)
    .join("");

  document.getElementById("grade").textContent = grade;

  console.log(id, name, department, marks);
  console.log("Original →", { ...student, grade: undefined });
  console.log("With Grade →", student);
};

const init = () => {
  const baseStudent   = createStudent();
  const enhancedStudent = displayStudent(baseStudent);

  renderProfile(enhancedStudent);
};

init();