// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

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
    // Check if the clicked element is outside the content
    if (!content.contains(event.target) && event.target !== select_input) {
      content.style.display = "none";
      x = false;
    }
  });

  var selectedValue = "";
  var inputOptions = document.querySelectorAll("#" + inputType + "-options li");

  inputOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      selectedValue = e.target.textContent;
      select_input.textContent = selectedValue;
      content.style.display = "none";
    });
    selectedCollege = selectedValue;
  });

  const input_options = document.querySelector("#" + inputType + "-options");
  const inputElement = document.querySelector("." + inputType + "-input");
  let inputSearch = inputElement.value;

  inputElement.addEventListener("keyup", (e) => {
    let filteredData = [];
    inputSearch = e.target.value.toLowerCase();

    filteredData = data
      .filter((item) => {
        return item.toLowerCase().startsWith(inputSearch);
      })
      .map((item) => {
        return `<li>${item}</li>`;
      })
      .join("");
    input_options.innerHTML = filteredData;
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

    // Filter names that start with "BITS"
    const uNames = names.filter((item) => {
      return !item.startsWith("BITS");
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
 var playerState = document.querySelector(".select-college").textContent;
 var playerSport = document.querySelector(".select-sport").textContent;

 var male = document.querySelector("#male").checked;
 const playerGender = male ? "Male" : "Female";

  if (
    playerName == "" ||
    playerPhone == "" ||
    playerEmail == "" ||
    playerCollege == "SELECT COLLEGE" ||
    playerState == "SELECT STATE" ||
    playerSport == "SELECT SPORT" ||
    playerGender==null
  ) {
    alert("Please fill all form fields");
  }

  var scriptURL =
    "https://script.google.com/macros/s/AKfycbzOh22gkiQN2l1HO3ZZ-t49UkZ_B3an010Nw-lS-i95TMw44po5hP9Zofrwc1v-oOQF/exec";
  var formData = {
    name: playerName,
    email: playerEmail,
    phone: playerPhone,
    college: playerCollege,
    state: playerState,
    sport: playerSport,
    gender: playerGender,
  };

  try {
    await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred while submitting the form");
  }
}

