function toggleInput(checkbox) {
    const row = checkbox.closest("tr");
    const input = row.querySelector('input[type="number"]');
    input.readOnly = !checkbox.checked;
    if (checkbox.checked) {
        input.classList.add("editable");
        input.focus();
    } else {
        input.classList.remove("editable");
        input.value = "";
    }
}

//---------------------------------------------------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", function () {
  const numberInputs = document.querySelectorAll('input[type="number"]');

  numberInputs.forEach((input) => {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        input.blur();
      }
    });

    input.addEventListener("input", function () {
      input.value = input.value.replace(/\D/g, '');
      if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
      }
    });

    input.addEventListener("paste", function (e) {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData("text");
      const sanitized = paste.replace(/\D/g, '').slice(0, 4);
      document.execCommand("insertText", false, sanitized);
    });
  });
});
 // ---------------------------------------------------------------------------------------------------------//

function validateForm() {
  const checkedRows = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checkedRows.length === 0) {
    alert("Please select at least one item to reorder.");
    return false;
  }

  const orderData = [];

  checkedRows.forEach(checkbox => {
    const row = checkbox.closest("tr");
    const mnemonic = row.querySelector(".mnemonic")?.textContent.trim();
    const medsName = row.querySelector(".medsName")?.textContent.trim();
    const amount = row.querySelector('input[type="number"]').value.trim();

    if (mnemonic && medsName && amount) {
      orderData.push({ mnemonic, medsName, amount });
    }
  });

  localStorage.setItem("reorderData", JSON.stringify(orderData));

  window.location.href = "page2.html";
  return false;
}
