// URL Web App Google Apps Script hasil Deployment
const API_BASE_URL = "https://script.google.com/macros/s/AKfycbwcRkROT4f27_Av4LEjplgaM2KgLmU-K0xW6vPM3frWHWv40S7w2wSoIKSi-9dSIlOW2Q/exec";

const CBTApi = {
  // 1. Validasi Token Login Siswa
  async loginSiswa(tokenPin) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // Menyikapi redirect GAS
        body: JSON.stringify({
          action: "loginSiswa",
          tokenPin: tokenPin
        })
      });
      return await response.json();
    } catch (err) {
      console.error("Gagal terhubung ke API:", err);
      return { status: "error", message: "Gagal terhubung ke server CBT." };
    }
  },

  // 2. Ambil Daftar Soal Ujian (Tanpa Kunci Jawaban)[cite: 5, 6]
  async getBankSoal() {
    try {
      const response = await fetch(`${API_BASE_URL}?action=getBankSoal`);
      return await response.json();
    } catch (err) {
      console.error("Gagal mengambil soal:", err);
      return { status: "error", message: "Gagal memuat soal ujian." };
    }
  },

  // 3. Submit Jawaban Ujian Siswa
  async submitJawaban(studentId, packageId, answers, startTime) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "submitJawaban",
          studentId: studentId,
          packageId: packageId,
          answers: answers,
          startTime: startTime
        })
      });
      return await response.json();
    } catch (err) {
      console.error("Gagal submit jawaban:", err);
      return { status: "error", message: "Gagal mengirimkan jawaban." };
    }
  }
};
