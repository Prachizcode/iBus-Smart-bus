// Sample Bus Data
const buses = [
  { route: "Bhopal to Indore", departure: "Bhopal", arrival: "Indore", time: "10:00 AM", price: 500, seats: 5 , stops:["Sehore","Ashta","Dewas"]},
  { route: "Bhopal to Gwalior", departure: "Bhopal", arrival: "Gwalior", time: "11:00 AM", price: 300, seats: 10 , stops:["Vidisha","Sagar","Shivpuri"]},
  { route: "Indore to Shivpuri", departure: "Indore", arrival: "Shivpuri", time: "1:00 PM", price: 450, seats: 8, stops:["Ujjain","Guna"] },
  { route: "Gwalior to Bhopal", departure: "Gwalior", arrival: "Bhopal", time: "2:30 PM", price: 320, seats: 4, stops:["Vidisha","Sagar","Guna"] },
  { route: "Shivpuri to Indore", departure: "Shivpuri", arrival: "Indore", time: "4:00 PM", price: 480, seats: 7 , stops:["Guna", "Ujjain", "Dewas"]}
];

const searchInput = document.getElementById("search");
const destinationFilter = document.getElementById("destinationFilter");
const filterButton = document.getElementById("filterButton");
const busList = document.getElementById("buslist");

function displayBuses(busArray) {
  busList.innerHTML = "";
  if (busArray.length === 0) {
    busList.innerHTML = "<p>No buses found.</p>";
    return;
  }

  busArray.forEach(bus => {
    const busCard = document.createElement("div");
    busCard.className = "bus-card";

    const now = new Date();
    const busTime = new Date();
    const [timeStr, period] = bus.time.split(" ");
    let [hour, minute] = timeStr.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
    busTime.setHours(hour, minute, 0, 0);

    let diffMs = busTime - now;
    const isFuture = diffMs >= 0;
    diffMs = Math.abs(diffMs);

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;

    const timeStatus = isFuture
      ? `🕒 Leaves in: ${hours}h ${minutes}m`
      : `🔴 Left: ${hours > 0 ? `${hours}h ` : ""}${minutes}m ago`;

    busCard.innerHTML = `
      <h3>${bus.route}</h3>
      <p><strong>Departure:</strong> ${bus.departure}</p>
      <p><strong>Arrival:</strong> ${bus.arrival}</p>
      <p><strong>Time:</strong> ${bus.time} <span style="float:right;">${timeStatus}</span></p>
      <p><strong>Stops:</strong> ${bus.stops ? bus.stops.join(" → ") : "No stops listed"}</p>
      <p><strong>Price:</strong> ₹${bus.price}</p>
      <p><strong>Seats Available:</strong> ${bus.seats}</p>
    `;

    busList.appendChild(busCard);
  });
}

function filterBuses() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedDestination = destinationFilter.value.toLowerCase();

  const filtered = buses.filter(bus => {
    const matchesSearch = bus.route.toLowerCase().includes(searchValue) ||
                          bus.departure.toLowerCase().includes(searchValue) ||
                          bus.arrival.toLowerCase().includes(searchValue) ||
                          bus.time.toLowerCase().includes(searchValue);
    const matchesDestination = selectedDestination === "" || bus.arrival.toLowerCase() === selectedDestination;
    return matchesSearch && matchesDestination;
  });

  displayBuses(filtered);
}

searchInput.addEventListener("input", filterBuses);
filterButton.addEventListener("click", filterBuses);

displayBuses(buses);

// Registration Form
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Registered Successfully! (Functionality should be connected to backend in production)");
  registerForm.reset();
});

// Login Form
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("Loginusername").value;
  const pass = document.getElementById("Loginpassword").value;
  // This should be replaced with real authentication logic
  if (user && pass) {
    alert("Logged in as: " + user);
    loginForm.reset();
  } else {
    alert("Please enter credentials");
  }
});

logoutBtn.addEventListener("click", () => {
  alert("Logged out successfully");
});
