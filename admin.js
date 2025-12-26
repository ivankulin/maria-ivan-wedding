const loginPanel = document.getElementById("loginPanel");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("adminLoginForm");
const loginStatus = document.getElementById("loginStatus");
const tableBody = document.getElementById("rsvpTableBody");
const stats = document.getElementById("stats");
const refreshBtn = document.getElementById("refreshBtn");
const logoutBtn = document.getElementById("logoutBtn");

function showLogin() {
  loginPanel.hidden = false;
  adminPanel.hidden = true;
  logoutBtn.hidden = true;
}

function showAdmin() {
  loginPanel.hidden = true;
  adminPanel.hidden = false;
  logoutBtn.hidden = false;
}

function renderStats(rsvps) {
  const attending = rsvps.filter((rsvp) => rsvp.attending === "yes").length;
  const notAttending = rsvps.filter((rsvp) => rsvp.attending === "no").length;
  const adultCount = rsvps.reduce((sum, rsvp) => sum + (rsvp.adults || 0), 0);
  const childCount = rsvps.reduce((sum, rsvp) => sum + (rsvp.children || 0), 0);

  stats.innerHTML = "";
  const cards = [
    { label: "Total", value: rsvps.length },
    { label: "Attending", value: attending },
    { label: "Not attending", value: notAttending },
    { label: "Adults", value: adultCount },
    { label: "Children", value: childCount }
  ];

  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = "stat-card";
    div.innerHTML = `<strong>${card.value}</strong><div>${card.label}</div>`;
    stats.appendChild(div);
  });
}

function renderTable(rsvps) {
  tableBody.innerHTML = "";

  if (!rsvps.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 12;
    cell.textContent = "No RSVPs yet.";
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  rsvps.forEach((rsvp) => {
    const row = document.createElement("tr");
    const createdAt = new Date(rsvp.created_at);
    row.innerHTML = `
      <td>${createdAt.toLocaleString()}</td>
      <td>${rsvp.code || ""}</td>
      <td>${rsvp.name || ""}</td>
      <td>${rsvp.email || ""}</td>
      <td>${rsvp.attending === "yes" ? "Yes" : "No"}</td>
      <td>${rsvp.adults ?? ""}</td>
      <td>${rsvp.children ?? ""}</td>
      <td>${rsvp.plus_one || ""}</td>
      <td>${rsvp.meal || ""}</td>
      <td>${rsvp.nights ?? ""}</td>
      <td>${rsvp.notes || ""}</td>
      <td><button class="small-button" data-id="${rsvp.id}">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

async function loadRsvps() {
  const response = await fetch("/api/rsvps");
  if (response.status === 401) {
    showLogin();
    return;
  }

  const data = await response.json();
  renderStats(data.rsvps);
  renderTable(data.rsvps);
  showAdmin();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginStatus.textContent = "";

  const password = loginForm.elements["password"].value.trim();
  if (!password) return;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });

  if (!response.ok) {
    loginStatus.textContent = "Invalid password.";
    return;
  }

  loginForm.reset();
  await loadRsvps();
});

refreshBtn.addEventListener("click", loadRsvps);

logoutBtn.addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  showLogin();
});

tableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;

  const id = button.dataset.id;
  await fetch(`/api/rsvp/${id}`, { method: "DELETE" });
  await loadRsvps();
});

loadRsvps();
