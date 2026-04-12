// DEMO credentials (visible in browser)
const USERNAME = "admin";
const PASSWORD = "1234";

let data = [];

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === USERNAME && pass === PASSWORD) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("appPage").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText = "Invalid login!";
  }
}

function addData() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) return;

  data.push({ name, email });
  renderTable();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function renderTable() {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  data.forEach((row, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.email}</td>
      <td><button onclick="deleteRow(${index})">Delete</button></td>
    `;

    tbody.appendChild(tr);
  });
}

function deleteRow(index) {
  data.splice(index, 1);
  renderTable();
}

function downloadCSV() {
  let csv = "Name,Email\n";

  data.forEach(row => {
    csv += `${row.name},${row.email}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "members.csv";
  a.click();
}