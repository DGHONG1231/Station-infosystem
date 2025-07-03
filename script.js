let stations = {};
let currentStation = "";

function addStation() {
  const stationInput = document.getElementById("stationInput");
  const stationName = stationInput.value.trim();
  if (!stationName || stations[stationName]) return;
  stations[stationName] = { notes: [], image: "", works: [] };
  currentStation = stationName;

  const option = document.createElement("option");
  option.value = stationName;
  option.text = stationName;
  document.getElementById("stationSelect").appendChild(option);
  document.getElementById("stationSelect").value = stationName;
  updateUI();
  stationInput.value = "";
}

function deleteStation() {
  const stationSelect = document.getElementById("stationSelect");
  const selected = stationSelect.value;
  if (selected && stations[selected]) {
    delete stations[selected];
    stationSelect.remove(stationSelect.selectedIndex);
    currentStation = stationSelect.value || "";
    updateUI();
  }
}

function updateUI() {
  const station = document.getElementById("stationSelect").value;
  currentStation = station;

  // 특이사항
  const noteList = document.getElementById("stationNotes");
  noteList.innerHTML = "";
  if (station && stations[station]) {
    stations[station].notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.textContent = note;
      const xBtn = document.createElement("button");
      xBtn.textContent = "❌";
      xBtn.style.marginLeft = "10px";
      xBtn.onclick = () => {
        stations[station].notes.splice(index, 1);
        updateUI();
      };
      li.appendChild(xBtn);
      noteList.appendChild(li);
    });

    // 이미지
    const image = document.getElementById("stationImage");
    image.src = stations[station].image || "";

    // 작업 테이블
    const tbody = document.querySelector("#workTable tbody");
    tbody.innerHTML = "";
    stations[station].works.forEach((work, i) => {
      const row = tbody.insertRow();
      row.innerHTML = `
        <td>${work.date}</td>
        <td>${work.content}</td>
        <td>${work.worker}</td>
        <td>${work.status}</td>
        <td>${work.priority}</td>
        <td><button onclick="deleteWork(${i})">❌</button></td>
      `;
    });
  }
}

function addNote() {
  const input = document.getElementById("noteInput");
  const note = input.value.trim();
  if (!note || !currentStation) return;
  stations[currentStation].notes.push(note);
  input.value = "";
  updateUI();
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file && currentStation) {
    const reader = new FileReader();
    reader.onload = function (e) {
      stations[currentStation].image = e.target.result;
      updateUI();
    };
    reader.readAsDataURL(file);
  }
}

function addWork() {
  const date = document.getElementById("workDate").value.trim();
  const content = document.getElementById("workContent").value.trim();
  const worker = document.getElementById("worker").value.trim();
  const status = document.getElementById("workStatus").value;
  const priority = document.getElementById("workPriority").value;
  if (!date || !content || !worker || !currentStation) return;

  stations[currentStation].works.push({ date, content, worker, status, priority });
  document.getElementById("workDate").value = "";
  document.getElementById("workContent").value = "";
  document.getElementById("worker").value = "";
  updateUI();
}

function deleteWork(index) {
  if (currentStation && stations[currentStation]) {
    stations[currentStation].works.splice(index, 1);
    updateUI();
  }
}
