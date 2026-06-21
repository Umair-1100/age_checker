document.addEventListener("DOMContentLoaded", () => {
  const formAgeChecker = document.querySelector(".formAgeChecker");
  const dateInput = document.querySelector("#dateInput");
  const result = document.querySelector(".result");
  const current_time = document.querySelector(".current_time");

  const startLiveClock = () => {
    setInterval(() => {
      const currentDate = new Date();

      const liveFormat = Intl.DateTimeFormat("eng-US", {
        dateStyle: "medium",
        timeStyle: "medium",
        hour12: true,
      }).format(currentDate);

      current_time.innerHTML = liveFormat;
    }, 1000);
  };

  startLiveClock();

  formAgeChecker.addEventListener("submit", (e) => {
    e.preventDefault();

    result.style.display = "block";

    if (!dateInput.value) {
      result.style.color = "red";
      result.innerHTML = "Friend, select the date first!";
      dateInput.classList.add("error-border");
      return;
    }

    const currentDate = new Date();
    const birthDate = new Date(dateInput.value);

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age <= 0) {
      result.style.display = "block";
      result.style.color = "red";
      result.innerHTML =
        "Hey brother, have you come from the today or future? Enter the correct date.";
      return;
    }

    dateInput.classList.remove("error-border");
    result.style.color = "var(--clr-neutral-600)";
    result.innerHTML = `You are ${age} years old!`;
  });
});
