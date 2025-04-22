const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__links", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".steps__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".service__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".service__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".service__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".service__list li", {
  ...scrollRevealOption,
  delay: 1500,
  interval: 500,
});

ScrollReveal().reveal(".experience__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".download__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".download__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".download__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".download__links", {
  ...scrollRevealOption,
  delay: 1500,
});
const distances = {
    Chennai: { Arani: 120, Vellore: 140, Ranipet: 100, Bengaluru: 340 },
    Arani: { Chennai: 120, Vellore: 45, Ranipet: 30, Bengaluru: 260 },
    Vellore: { Chennai: 140, Arani: 45, Ranipet: 20, Bengaluru: 220 },
    Ranipet: { Chennai: 100, Arani: 30, Vellore: 20, Bengaluru: 240 },
    Bengaluru: { Chennai: 340, Arani: 260, Vellore: 220, Ranipet: 240 },
  };
  
  // Populate select options
  const cities = Object.keys(distances);
  const pickupSelect = document.getElementById('pickupSelect');
  const dropSelect = document.getElementById('dropSelect');
  
  cities.forEach(city => {
    const pickupOption = document.createElement('option');
    pickupOption.value = city;
    pickupOption.textContent = city;
    pickupSelect.appendChild(pickupOption);
  
    const dropOption = document.createElement('option');
    dropOption.value = city;
    dropOption.textContent = city;
    dropSelect.appendChild(dropOption);
  });
  
  // Fare Calculation
  function calculateFare() {
    const from = pickupSelect.value;
    const to = dropSelect.value;
    const farePerKm = 10;
  
    if (from === to) {
      alert("Pickup and Drop locations cannot be the same.");
      return;
    }
  
    const distance = distances[from]?.[to];
    const fareResult = document.getElementById("fareResult");
  
    if (distance !== undefined) {
      const fare = distance * farePerKm;
      fareResult.innerText = `Distance: ${distance} km | Fare: ₹${fare}`;
      showSignupForm(from, to, distance);
    } else {
      fareResult.innerText = "Invalid route selected.";
    }
  }
  
  // Show signup form with travel details
  function showSignupForm(from, to, distance,fare)  {
    const signupBox = document.querySelector('.signup-box');
    signupBox.innerHTML = `
      <h2>Enter the your detail</h2>
      <p><strong>Travel:</strong> ${from} ➝ ${to}</p>
      <p><strong>Distance:</strong> ${distance} km</p>
      <p><strong>Amount:</strong> ₹${fare}</p>
      <form class="form_signup">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your name" required>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email" required>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" placeholder="Enter your phone number" required>
        </div>
        <div class="form-group">
          <button type="submit">conform</button>
        </div>
      </form>
    `;
  
    // Add form submit listener
    document.querySelector('.form_signup').addEventListener('submit', function (e) {
        e.preventDefault();
      
        // Get values from the form
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
      
        // Check if any field is empty
        if (name === "" || email === "" || phone === "") {
          alert("Please fill out all the fields.");
          return;
        }
      
        // Ensure 'from', 'to', and 'distance' are defined
        if (typeof from === 'undefined' || typeof to === 'undefined' || typeof distance === 'undefined') {
          console.error("Missing travel details.");
          alert("Error: Travel details are missing. Please try again.");
          return;
        }
      
        const farePerKm = 10;
        const fare = distance * farePerKm;
      
        // Logging details to the console
        console.log("Signup Details:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Travel:", `${from} ➝ ${to}`);
        console.log("Distance:", `${distance} km`);
        console.log("Amount (Fare): ₹" + fare);
      
        // Show success message
        alert("Signup successful! Check console for details.");
      });
      
  }
  

