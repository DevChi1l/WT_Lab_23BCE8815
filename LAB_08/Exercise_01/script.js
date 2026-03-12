const calculateTotal = (m1, m2, m3) => m1 + m2 + m3;

const calculateAverage = (m1, m2, m3) => Number(((m1 + m2 + m3) / 3).toFixed(2));

const getResultMessage = (name, total, avg) => `
Student Name: ${name}
Total Marks : ${total}
Average Marks: ${avg}
`.trim();

document.getElementById("calculateBtn").addEventListener("click", () => {
  const name   = document.getElementById("studentName").value.trim();
  const mark1  = Number(document.getElementById("mark1").value);
  const mark2  = Number(document.getElementById("mark2").value);
  const mark3  = Number(document.getElementById("mark3").value);

  const resultDiv = document.getElementById("result");

  if (!name || isNaN(mark1) || isNaN(mark2) || isNaN(mark3)) {
    resultDiv.innerHTML = "<span style='color:#ef4444;'>Please fill all fields with valid numbers.</span>";
    return;
  }

  if (mark1 < 0 || mark1 > 100 || mark2 < 0 || mark2 > 100 || mark3 < 0 || mark3 > 100) {
    resultDiv.innerHTML = "<span style='color:#ef4444;'>Marks should be between 0 and 100.</span>";
    return;
  }

  const total   = calculateTotal(mark1, mark2, mark3);
  const average = calculateAverage(mark1, mark2, mark3);

  const message = getResultMessage(name, total, average);

  resultDiv.innerHTML = `<span class="highlight">${message.replace(/\n/g, "<br>")}</span>`;

  console.log(`Student Name: ${name}`);
  console.log(`Total Marks: ${total}`);
  console.log(`Average Marks: ${average}`);
});