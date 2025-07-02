let stations = {}; // 전체 역 데이터 저장

// 역 추가
function addStation() {
  const input = document.getElementById('stationInput');
  const stationName = input.value.trim();
  if (!stationName) return;

  if (!stations[stationName]) {
    stations[stationName] = {
      notes: [],
      image: '',
      works: []
    };

    const select = document.getElementById('stationSelect');
    const option = document.createElement('option');
    option.value = stationName;
    option.textContent = stationName;
    select.appendChild(option);
  }

  input.value = '';
  document.getElementById('stationSelect').value = stationName;
  updateStationDisplay(stationName);
}

// 역 삭제
function deleteStation() {
  const select = document.getElementById('stationSelect');
  const selected = select.value;
  if (!selected) return;

  delete stations[selected];
  select.remove(select.selectedIndex);
  clearStationDisplay();
}

// 역 선택 변경 시 화면 업데이트
document.getElementById('stationSelect').addEventListener('change', (e) => {
  updateStationDisplay(e.target.value);
});

// 특이사항 추가
function addNote() {
  const station = getCurrentStation();
  const input = document.getElementById('noteInput');
  const note = input.value.trim();
  if (!station || !note) return;

  stations[station].notes.push(note);
  input.value = '';
  updateNoteList(station);
}

// 배치도 이미지 미리보기 및 저장
function previewImage(event) {
  const station = getCurrentStation();
  if (!station) return;

  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    stations[station].image = e.target.result;
    document.getElementById('stationImage').src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 작업 추가
function addWork() {
  const station = getCurrentStation();
  if (!station) return;

  const date = document.getElementById('workDate').value.trim();
  const content = document.getElementById('workContent').value.trim();
  const worker = document.getElementById('worker').value.trim();
  const status = document.getElementById('workStatus').value;
  const priority = document.getElementById('workPriority').value;

  if (!date || !content || !worker) return;

  stations[station].works.push({ date, content, worker, status, priority });
  updateWorkTable(station);

  document.getElementById('workDate').value = '';
  document.getElementById('workContent').value = '';
  document.getElementById('worker').value = '';
}

// 작업 삭제
function deleteWork(station, index) {
  stations[station].works.splice(index, 1);
  updateWorkTable(station);
}

// === Helper Functions ===

// 현재 선택된 역
function getCurrentStation() {
  return document.getElementById('stationSelect').value;
}

// 화면 업데이트: 전체 (특이사항, 이미지, 작업목록)
function updateStationDisplay(station) {
  updateNoteList(station);
  updateImage(station);
  updateWorkTable(station);
}

// 특이사항 목록
function updateNoteList(station) {
  const list = document.getElementById('stationNotes');
  list.innerHTML = '';
  stations[station].notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    list.appendChild(li);
  });
}

// 이미지
function updateImage(station) {
  const img = document.getElementById('stationImage');
  img.src = stations[station].image || '';
}

// 작업 목록 테이블
function updateWorkTable(station) {
  const tbody = document.querySelector('#workTable tbody');
  tbody.innerHTML = '';
  stations[station].works.forEach((work, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${work.date}</td>
      <td>${work.content}</td>
      <td>${work.worker}</td>
      <td>${work.status}</td>
      <td>${work.priority}</td>
      <td><button onclick="deleteWork('${station}', ${index})">❌</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// 역 삭제 시 화면 클리어
function clearStationDisplay() {
  document.getElementById('stationNotes').innerHTML = '';
  document.getElementById('stationImage').src = '';
  document.querySelector('#workTable tbody').innerHTML = '';
}
