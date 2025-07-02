  <script>
    function addStation() {
      const input = document.getElementById('stationInput');
      const list = document.getElementById('stationList');
      if (input.value.trim()) {
        const li = document.createElement('li');
        li.textContent = input.value;
        list.appendChild(li);
        input.value = '';
      }
    }

    function addStationNote() {
      const input = document.getElementById('stationNotesInput');
      const list = document.getElementById('stationNotes');
      if (input.value.trim()) {
        const li = document.createElement('li');
        li.textContent = input.value;
        list.appendChild(li);
        input.value = '';
      }
    }

    function previewImage(event) {
      const image = document.getElementById('mapImage');
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          image.src = reader.result;
          image.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    }

    function addWork() {
      const date = document.getElementById('workDate').value;
      const content = document.getElementById('workContent').value;
      const worker = document.getElementById('worker').value;
      const status = document.getElementById('status').value;
      const priority = document.getElementById('priority').value;
      const table = document.getElementById('workTable');

      const row = table.insertRow();
      row.innerHTML = `
        <td>${date}</td>
        <td>${content}</td>
        <td>${worker}</td>
        <td><span class="badge yellow">${status}</span></td>
        <td><span class="badge red">${priority}</span></td>
      `;
    }
  </script>
</body>
</html>

