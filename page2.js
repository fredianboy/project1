document.addEventListener("DOMContentLoaded", function () {
    const reorderData = JSON.parse(localStorage.getItem("reorderData")) || [];
    const tableBody = document.querySelector("#summary-table tbody");

    if (!tableBody) return;

    if (reorderData.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3">No reorder data available.</td>`;
        tableBody.appendChild(row);
    } else {
        reorderData.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.mnemonic}</td>
        <td>${item.medsName}</td>
        <td>${item.amount}</td>
      `;
            tableBody.appendChild(row);
        });
    }
});


const dateInput = document.getElementById('date')
dateInput.addEventListener('click', () => {
    dateInput.focus();
    if (typeof dateInput.showPicker === 'function') {
        dateInput.showPicker();
    } else {
        dateInput.click();
    }
});

window.onload = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const todayString = `${year}-${month}-${day}`;
    document.getElementById('date').value = todayString;
};



function generatePDF() {
    window.scrollTo(0, 0);
    setTimeout(() => {
        const element = document.getElementById('a4-summary');
        const opt = {
            margin: [0, 0, 0, 0],
            filename: 'form-output.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                scrollY: 0,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: [220, 550],
                orientation: 'portrait'
            },
            pagebreak: { mode: ['avoid-all', 'css'] }
        };
        html2pdf().set(opt).from(element).save();
    }, 300);
}