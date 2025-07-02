// 역 이름 추가
function addStation() {
  const input = document.getElementById("stationInput");
  const select = document.getElementById("stationSelect");

  if (input.value.trim() !== "") {
    const option = document.createElement("option");
    option.text = input.value;
    select.add(option);
    input.value = "";
  }
}

// 특이사항 추가
function addNote() {
  const input = document.getElementById("noteInput");
  const ul = document.getElementById("stationNotes");

  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;
    ul.appendChild(li);
    input.value = "";
  }
}

// 역 배치도 이미지 미리보기
function previewImage(event) {
  const img = document.getElementById("stationImage");
  img.src = URL.createObjectURL(event.target.files[0]);
  img.style.maxWidth = "100%";
  img.style.marginTop = "10px";
}

// 작업 등록
function addWork() {
  const date = document.getElementById("workDate").value;
  const content = document.getElementById("workContent").value;
  const worker = document.getElementById("worker").value;
  const status = document.getElementById("workStatus").value;
  const priority = document.getElementById("workPriority").value;

  if (!date || !content || !worker) {
    alert("작업일자, 내용, 작업자는 필수 입력 항목입니다.");
    return;
  }

  const table = document.getElementById("workTable").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${date}</td>
    <td>${content}</td>
    <td>${worker}</td>
    <td><span class="status ${status === '진행중' ? 'in-progress' : 'complete'}">${status}</span></td>
    <td><span class="priority ${priority === '긴급' ? 'urgent' : 'normal'}">${priority}</span></td>
    <td><button onclick="deleteRow(this)">삭제</button></td>
  `;

  // 입력값 초기화
  document.getElementById("workDate").value = "";
  document.getElementById("workContent").value = "";
  document.getElementById("worker").value = "";
  document.getElementById("workStatus").value = "진행중";
  document.getElementById("workPriority").value = "긴급";
}

// 행 삭제
function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
