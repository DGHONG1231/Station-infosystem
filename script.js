// 역 추가
document.getElementById("addStationBtn").addEventListener("click", function () {
  const stationInput = document.getElementById("stationInput");
  const stationSelect = document.getElementById("stationSelect");

  if (stationInput.value.trim() !== "") {
    const option = document.createElement("option");
    option.text = stationInput.value;
    stationSelect.add(option);
    stationInput.value = "";
  }
});

// 특이사항 추가
document.getElementById("addNoteBtn").addEventListener("click", function () {
  const noteInput = document.getElementById("noteInput");
  const stationNotes = document.getElementById("stationNotes");

  if (noteInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = noteInput.value;
    stationNotes.appendChild(li);
    noteInput.value = "";
  }
});

// 배치도 미리보기
document.getElementById("imageUpload").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const preview = document.getElementById("stationImage");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// 작업 등록
document.getElementById("addWorkBtn").addEventListener("click", function () {
  const workDate = document.getElementById("workDate").value;
  const workContent = document.getElementById("workContent").value;
  const worker = document.getElementById("worker").value;
  const status = document.getElementById("workStatus").value;
  const priority = document.getElementById("workPriority").value;
  const tbody = document.querySelector("#workTable tbody");

  if (workDate && workContent && worker) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${workDate}</td>
      <td>${workContent}</td>
      <td>${worker}</td>
      <td>${status}</td>
      <td>${priority}</td>
      <td><button class="deleteBtn">삭제</button></td>
    `;

    tbody.appendChild(row);

    // 삭제 이벤트
    row.querySelector(".deleteBtn").addEventListener("click", () => {
      row.remove();
    });

    // 입력값 초기화
    document.getElementById("workDate").value = "";
    document.getElementById("workContent").value = "";
    document.getElementById("worker").value = "";
    document.getElementById("workStatus").value = "진행중";
    document.getElementById("workPriority").value = "긴급";
  }
});
