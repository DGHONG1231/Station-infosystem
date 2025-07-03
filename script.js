let stations = JSON.parse(localStorage.getItem("stations")) || {};
let currentStation = "";

function saveData() {
  localStorage.setItem("stations", JSON.stringify(stations));
}

function loadData() {
  const select = document.getElementById("stationSelect");
  select.innerHTML = "";

  for (let station in stations) {
    const option = document.createElement("option");
    option.text = station;
    option.value = station;
    select.appendChild(option);
  }

  if (select.options.length > 0) {
    currentStation = select.value;
    updateUI();
  }
}

function addStation() {
  const input = document.getElementById("stationInput");
  const name = input.value.trim();
  if (name && !stations[name]) {
    stations[name] = { notes: [], image: "", works: [] };
    saveData();
    loadData();
  }
  input.value = "";
}

function deleteStation() {
  const select = document.getElementById("stationSelect");
  const name = select.value;
  if (name && confirm(`정말 ${name} 역을 삭제할까요?`)) {
    delete stations[name];
    saveData();
    loadData();
  }
}

function updateUI() {
  const select = document.getElementById("stationSelect");
  currentStation = select.value;
  const station = stations[currentStation];

  // 특이사항 목록
  const noteList = document.getElementById("stationNotes");
  noteList.innerHTML = "";
  station.notes.forEach((note, i) => {
    const li = document.createElement("li");
    li.textContent = note + " ";
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      station.notes.splice(i, 1);
      saveData();
      updateUI();
    };
    li.appendChild(btn);
    noteList.appendChild(li);
  });

  // 이미지
  const img = document.getElementById("stationImage");
  img.src = station.image || "";
  img.style.maxWidth = "500px";

  // 작업 테이블
  const tbody = document.querySelector("#workTable tbody");
  tbody.innerHTML = "";
  station.works.forEach((work, i) => {
    const tr = document.createElement("tr");
    ["date", "content", "worker", "status", "priority"].forEach((key) => {
      const td = document.createElement("td");
      td.textContent = work[key];
      tr.appendChild(td);
    });

    const delTd = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      station.works.splice(i, 1);
      saveData();
      updateUI();
    };
    delTd.appendChild(btn);
    tr.appendChild(delTd);
    tbody.appendChild(tr);
  });
}

function addNote() {
  const input = document.getElementById("noteInput");
  const note = input.value.trim();
  if (note && currentStation) {
    stations[currentStation].notes.push(note);
    saveData();
    updateUI();
  }
  input.value = "";
}

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    if (currentStation) {
      stations[currentStation].image = e.target.result;
      saveData();
      updateUI();
    }
  };
  reader.readAsDataURL(event.target.files[0]);
}

function addWork() {
  const date = document.getElementById("workDate").value;
  const content = document.getElementById("workContent").value;
  const worker = document.getElementById("worker").value;
  const status = document.getElementById("workStatus").value;
  const priority = document.getElementById("workPriority").value;

  if (date && content && worker && currentStation) {
    stations[currentStation].works.push({ date, content, worker, status, priority });
    saveData();
    updateUI();

    document.getElementById("workDate").value = "";
    document.getElementById("workContent").value = "";
    document.getElementById("worker").value = "";
  }
}

window.onload = loadData;
