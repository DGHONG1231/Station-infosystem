// 역 이름 추가
function addStation() {
  const input = document.getElementById("stationInput");
  const value = input.value.trim();
  if (value !== "") {
    const select = document.getElementById("stationSelect");
    const option = document.createElement("option");
    option.text = value;
    select.add(option);
    input.value = "";
  }
}

// 특이사항 추가
function addNote() {
  const input = document.getElementById("noteInput");
  const value = input.value.trim();
  if (value !== "") {
    const ul = document.getElementById("stationNotes");
    const li = document.createElement("li");
    li.textContent = value;
    ul.appendChild(li);
    input.value = "";
  }
}

// 배치도 미리보기
function previewImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const img = document.getElementById("stationImage");
    img.src = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

// 작업 추가
function addWork() {
  const date = document.getElementById("workDate").value;
  const content = document.getElementById("workContent").value;
  const worker = document.getElementById("worker").value;
  const status = document.getElementById("workStatus").value;
  const priority = document.getElementById("workPriority").value;

  const table = document.getElementById("workTable").getElementsByTagName('tbody')[0];
  const row = table.insertRow();

  row.insertCell(0).innerText = date;
  row.insertCell(1).innerText = content;
  row.insertCell(2).innerText = worker;

  const statusTag = document.createElement("span");
  statusTag.className = "tag-" + status;
  statusTag.innerText = status;
  row.insertCell(3).appendChild(statusTag);

  const priorityTag = document.createElement("span");
  priorityTag.className = "tag-" + priority;
  priorityTag.innerText = priority;
  row.insertCell(4).appendChild(priorityTag);

  // 삭제 버튼
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerText = "삭제";
  deleteBtn.onclick = function () {
    row.remove();
  };
  row.insertCell(5).appendChild(deleteBtn);

  // 입력값 초기화
  document.getElementById("workDate").value = "";
  document.getElementById("workContent").value = "";
  document.getElementById("worker").value = "";
}
