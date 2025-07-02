let stationData = {};

function addStation() {
  const name = document.getElementById("stationInput").value.trim();
  if (!name) return;
  if (!stationData[name]) {
    stationData[name] = {
      notes: [],
      works: [],
      image: ""
    };
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    document.getElementById("stationSelect").appendChild(option);
  }
  document.getElementById("stationInput").value = "";
  document.getElementById("stationSelect").value = name;
  loadStationData(name);
}

function loadStationData(name) {
  // 특이사항
  const noteList = document.getElementById("stationNotes");
  noteList.innerHTML = "";
  stationData[name]?.notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    noteList.appendChild(li);
  });

  // 작업 내용
  const tbody = document.querySelector("#workTable tbody");
  tbody.innerHTML = "";
  stationData[name]?.works.forEach((work, index) => {
    const row = tbody.insertRow();
    Object.values(work).forEach(text => {
      const cell = row.insertCell();
      cell.textContent = text;
    });
    const del = row.insertCell();
    const btn = document.createElement("button");
    btn.textContent = "삭제";
    btn.onclick = () => {
      stationData[name].works.splice(index, 1);
      loadStationData(name);
    };
    del.appendChild(btn);
  });

  // 이미지
  const img = document.getElementById("stationImage");
  img.src = stationData[name]?.image || "";
}

function addNote() {
  const name = document.getElementById("stationSelect").value;
  const note = document.getElementById("noteInput").value.trim();
  if (!name || !note) return;
  stationData[name].notes.push(note);
  document.getElementById("noteInput").value = "";
  loadStationData(name);
}

function addWork() {
  const name = document.getElementById("stationSelect").value;
  const date = document.getElementById("workDate").value;
  const content = document.getElementById("workContent").value;
  const worker = document.getElementById("worker").value;
  const status = document.getElementById("workStatus").value;
  const priority = document.getElementById("workPriority").value;
  if (!name || !date || !content || !worker) return;
  stationData[name].works.push({ date, content, worker, status, priority });
  document.getElementById("workDate").value = "";
  document.getElementById("workContent").value = "";
  document.getElementById("worker").value = "";
  loadStationData(name);
}

function previewImage(event) {
  const name = document.getElementById("stationSelect").value;
  const reader = new FileReader();
  reader.onload = function () {
    const img = document.getElementById("stationImage");
    img.src = reader.result;
    if (name) {
      stationData[name].image = reader.result;
    }
  };
  reader.readAsDataURL(event.target.files[0]);
}

document.getElementById("stationSelect").addEventListener("change", (e) => {
  loadStationData(e.target.value);
});
