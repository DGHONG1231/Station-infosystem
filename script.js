document.getElementById("uploadMap").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("mapPreview").innerHTML = `<img src="${e.target.result}" alt="배치도 이미지" />`;
    };
    reader.readAsDataURL(file);
  }
});
