class Pendaftar {
    constructor(nama, umur, uangSangu) {
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }
}

const pendaftarList = [];
const registrationForm = document.getElementById("registrationForm");
const pendaftarTable = document.getElementById("pendaftarTable");
const pendaftarListElement = document.getElementById("pendaftarList");
const resumeElement = document.getElementById("resume");

registrationForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const nama = e.target.nama.value;
    const umur = parseInt(e.target.umur.value);
    const uangSangu = parseInt(e.target.uangSangu.value);

    if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
        alert("Mohon isi form dengan benar.");
        return;
    }

    const pendaftar = new Pendaftar(nama, umur, uangSangu);
    pendaftarList.push(pendaftar);

    e.target.reset();

    await updatePendaftarList();
    updateResume();
});

function formatUang(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updatePendaftarList() {
    pendaftarListElement.innerHTML = "";
    pendaftarList.forEach((pendaftar) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pendaftar.nama}</td>
            <td>${pendaftar.umur}</td>
            <td>${formatUang(pendaftar.uangSangu)}</td>
        `;
        pendaftarListElement.appendChild(row);
    });
}

function updateResume() {
    const totalUangSangu = pendaftarList.reduce((acc, pendaftar) => acc + pendaftar.uangSangu, 0);
    const rataRataUangSangu = totalUangSangu / pendaftarList.length;
    const totalUmur = pendaftarList.reduce((acc, pendaftar) => acc + pendaftar.umur, 0);
    const rataRataUmur = totalUmur / pendaftarList.length;

    resumeElement.innerHTML = `Rata-rata pendaftar memiliki uang sangu sebesar ${rataRataUangSangu} dengan rata-rata umur ${rataRataUmur}`;
}

function openTab(tabName) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    const tab = document.getElementById(tabName);
    tab.classList.add("active");
}
