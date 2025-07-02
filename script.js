// 역 추가
function addStation() {
  const input = document.getElementById("stationInput");
  const list = document.getElementById("stationList");

  if (input.value.trim()) {
    const li = document.createElement("li");
    li.textContent = input.value;
    list.appendChild(li);
    input.value = "";
  }
}

// 특이사항 추가
function addNote() {
  const input = document.getElementById("noteInput");
  const list = document.getElementById("noteList");

  if (input.value.trim()) {
    const li = document.createElement("li");
    li.textContent = input.value;
    list.appendChild(li);
    input.value = "";
  }
}

// 작업 등록
function addTask() {
  const date = document.getElementById("workDate").value;
  const desc = document.getElementById("workDesc").value;
  const worker = document.getElementById("worker").value;
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;

  if (!date || !desc || !worker) return;

  const table = document.getElementById("taskTableBody");
  const row = table.insertRow();

  row.innerHTML = `
    <td>${date}</td>
    <td>${desc}</td>
    <td>${worker}</td>
    <td><span class="status">${status}</span></td>
    <td><span class="priority">${priority}</span></td>
    <td><button onclick="deleteRow(this)">삭제</button></td>
  `;

  // 초기화
  document.getElementById("workDate").value = "";
  document.getElementById("workDesc").value = "";
  document.getElementById("worker").value = "";
}

// 삭제
function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.remove();
}

// 이미지 미리보기
document.getElementById("layoutImage").addEventListener("change", function () {
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("previewImage").src = e.target.result;
  };
  reader.readAsDataURL(this.files[0]);
});
