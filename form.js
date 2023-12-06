

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "New Delhi",
  "Puducherry",
  "Jammu and Kashmir",
  "Ladakh",
];

const sports = [
  "Badminton(F)",
  "Badminton(M)",
  "Basketball(F)",
  "Basketball(M)",
  "Boxing(F)",
  "Boxing(M)",
  "Carrom(F)",
  "Carrom(M)",
  "Chess(F)",
  "Chess(M)",
  "Cricket(F)",
  "Cricket(M)",
  "Football(F)",
  "Football(M)",
  "Futsal(F)",
  "Futsal(M)",
  "Kabaddi(F)",
  "Kabaddi(M)",
  "Powerlifting(F)",
  "Powerlifting(M)",
  "Squash(F)",
  "Squash(M)",
  "Table Tennis(F)",
  "Table Tennis(M)",
  "Tennis(F)",
  "Tennis(M)",
  "Volleyball(F)",
  "Volleyball(M)",
];

function dropBox(inputType, data) {
  let options = document.querySelector("#" + inputType + "-options");

  data.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = item;
    options.appendChild(li);
  });

  let x = true;
  var content = document.querySelector("." + inputType + "-content");
  var select_input = document.querySelector(".select-" + inputType);
  var selectedValue = "";

  select_input.addEventListener("click", () => {
    if (x) {
      content.style.display = "none";
      x = false;
    } else {
      content.style.display = "block";
      x = !x;
    }
  });

  document.addEventListener("click", (event) => {
    if (!content.contains(event.target) && event.target !== select_input) {
      content.style.display = "none";
      x = false;
    }
  });

  const input_options = document.querySelector("#" + inputType + "-options");
  const inputElement = document.querySelector("." + inputType + "-input");

  input_options.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      selectedValue = e.target.textContent;

      if (selectedValue === "Other...") {
        const otherValue = prompt(`Enter your ${inputType.toLowerCase()}:`);
        if (otherValue) {
          selectedValue = otherValue;
          data.push(otherValue);
        } else {
          // If the user cancels the prompt, don't change the selection
          return;
        }
      }

      select_input.textContent = selectedValue;
      content.style.display = "none";
    }
  });

  inputElement.addEventListener("keyup", (e) => {
    let filteredData = [];
    let inputSearch = e.target.value.toLowerCase();

    filteredData = data
      .filter((item) => item.toLowerCase().startsWith(inputSearch))
      .map((item) => `<li>${item}</li>`)
      .join("");

    input_options.innerHTML = filteredData;

    // Check if the input search value is not in the current data
    if (!data.includes(inputSearch) && inputSearch !== "other...") {
      // If not in the current data, fill the college name field with the search input
      select_input.textContent = inputSearch;
      selectedValue = inputSearch;
    }

    // Close the dropdown when Enter key is pressed
    if (e.key === "Enter") {
      content.style.display = "none";
      x = false;
    }
  });
}


dropBox("sport", sports);
dropBox("state", states);

fetch("https://bitsbosm.org/2023/registrations/get_colleges", {
  method: "GET",
})
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    const names = data.data.map((item) => {
      return item.name;
    });

    const uNames = names.filter((item) => {
      return !item.startsWith("BITS") && !item.startsWith("Alumni");
    });

    uNames.push("BITS PILANI", "BITS GOA", "BITS HYDERABAD");

    dropBox("college", uNames);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function submitForm() {
  var playerName = document.getElementById("name").value;
  var playerEmail = document.getElementById("emailinput").value;
  var playerPhone = document.getElementById("phoneinput").value;
  var playerCollege = document.querySelector(".select-college").textContent;
  var playerState = document.querySelector(".select-state").textContent;
  var playerSport = document.querySelector(".select-sport").textContent;
  var playerGender = null;

  var male = document.querySelector("#male").checked;
  var female = document.querySelector("#female").checked;
  if (male) {
    playerGender = "Male";
  } else if (female) {
    playerGender = "Female";
  }

  if (
    playerName == "" ||
    playerPhone == "" ||
    playerEmail == "" ||
    playerCollege.startsWith("SELECT") ||
    playerState.startsWith("SELECT") ||
    playerSport.startsWith("SELECT") ||
    playerGender == null
  ) {
    alert("Please fill all form fields");
    return;
  }

  if (playerCollege.startsWith("Other...")) {
    const otherCollege = prompt("Enter your college:");
    if (otherCollege) {
      document.querySelector(".select-college").textContent = otherCollege;
      playerCollege = otherCollege;
    } else {
      // If the user cancels the prompt, don't proceed with the registration
      return;
    }
  }

  const reg = document.querySelector(".register-text");
  reg.textContent = "Registering...";

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbz1c9Jw3qtzDAkvyFeMdB1Ue9O6-8qaCno13bKd8v-Py4dRt5j7uvdg4xRjqzmzGzpz/exec";

  const formData = {
    name: playerName,
    email: playerEmail,
    phone: playerPhone,
    college: playerCollege,
    state: playerState,
    sport: playerSport,
    gender: playerGender,
  };

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseText = await response.text();
      console.log("Server response:", responseText);
      alert("Registration Successful");
    } else {
      console.error("Error submitting form data:", response.statusText);
    }
  } catch (error) {
    console.error("Error submitting form data:", error.message);
  } finally {
    location.reload();
  }
}