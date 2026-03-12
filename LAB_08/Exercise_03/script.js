class Course {
  constructor(courseName, instructor, availableSeats) {
    this.courseName = courseName;
    this.instructor = instructor;
    this.availableSeats = Number(availableSeats);
    this.enrolledCount = 0;
  }

  getDetails() {
    return `Course: ${this.courseName}, Instructor: ${this.instructor}`;
  }

  enroll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.availableSeats > this.enrolledCount) {
          this.enrolledCount++;
          resolve(`Enrollment Successful!\n(${this.enrolledCount}/${this.availableSeats + this.enrolledCount - 1} seats taken)`);
        } else {
          reject("Course Full – No seats available");
        }
      }, 700);
    });
  }
}

const enrollBtn = document.getElementById("enrollBtn");
const resultDiv = document.getElementById("result");

enrollBtn.addEventListener("click", async () => {
  const courseName   = document.getElementById("courseName").value.trim();
  const instructor   = document.getElementById("instructor").value.trim();
  const seatsInput   = document.getElementById("seats").value.trim();

  if (!courseName || !instructor || !seatsInput) {
    resultDiv.textContent = "Please fill all fields";
    resultDiv.className = "result info";
    return;
  }

  const seats = Number(seatsInput);
  if (isNaN(seats) || seats < 0) {
    resultDiv.textContent = "Please enter a valid number of seats";
    resultDiv.className = "result info";
    return;
  }

  const course = new Course(courseName, instructor, seats);

  resultDiv.textContent = "Processing enrollment...";
  resultDiv.className = "result info";

  console.log(course.getDetails());

  try {
    const message = await course.enroll();
    console.log(message);
    resultDiv.textContent = message;
    resultDiv.className = "result success";
  } catch (error) {
    console.log(error);
    resultDiv.textContent = error;
    resultDiv.className = "result error";
  }
});