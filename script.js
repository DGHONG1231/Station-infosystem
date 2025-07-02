let stationData = {};

function getSelectedStation() {
  return document.getElementById("stationSelect").value;
}

function updateStationSelect() {
  const stationSelect = document.getElementById("stationSelect");
  stationSelect.innerHTML = "";
  Object.keys(stationData).forEach((station) => {
    const option = document.createElement("option");
    option.value = station;
    option.textContent = station;
    stationSelect.appendChild(option);
  });
  updateUI();
}

function updateUI() {
  const station = getSelectedStation();
  const notesList = document.getElementById("stationNotes");
  const img = document.getElementById("stationImage");
  const tbody = document.querySelector("#workTable tbody");

  // 특이사항
  notesList.innerHTML = "";
  (stationData[station]?.notes || []).forEach((note, idx) => {
    const li = document.createElement("li");
    li.textContent = note;
    li.onclick = () => {
      stationData[station].notes.splice(idx, 1);
      updateUI();
    };
    notesList.appendChild(li);
  });

  // 이미지
  img.src = stationData[station]?.image || "";

  // 작업내용
  tbody.innerHTML = "";
  (stationData[station]?.works || []).forEach((work, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${work.date}</td>
      <td>${work.content}</td>
      <td>${work.worker}</td>
      <td>${work.status}</td>
      <td>${work.priority}</td>
      <td><button onclick="deleteWork('${station}', ${idx})">❌</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function addStation() {
  const input = document.getElementById("stationInput");
  const name = input.value.trim();
  if (name && !stationData[name]) {
    stationData[name] = { notes: [], works: [], image: "" };
    updateStationSelect();
    input.value = "";
  }
}

function deleteStation() {
  const station = getSelectedStation();
  if (station && stationData[station]) {
    delete stationData[station];
    updateStationSelect();
  }
}

function addNote() {
  const note = document.getElementById("noteInput").value.trim();
  const station = getSelectedStation();
  if (note && station) {
    stationData[station].notes.push(note);
    document.getElementById("noteInput").value = "";
    updateUI();
  }
}

function previewImage(event) {
  const station = getSelectedStation();
  const reader = new FileReader();
  reader.onload = () => {
    stationData[station].image = reader.result;
    updateUI();
  };
  reader.readAsDataURL(event.target.files[0]);
}

function addWork() {
  const station = getSelectedStation();
  const date = document.getElementById("workDate").value;
  const content = document.getElementById("workContent").value;
  const worker = document.getElementById("worker").value;
  const status = document.getElementById("workStatus").value;
  const priority = document.getElementById("workPriority").value;

  if (station && date && content && worker) {
    stationData[station].works.push({ date, content, worker, status, priority });
    document.getElementById("workDate").value = "";
    document.getElementById("workContent").value = "";
    document.getElementById("worker").value = "";
    updateUI();
  }
}

function deleteWork(station, index) {
  stationData[station].works.splice(index, 1);
  updateUI();
}
