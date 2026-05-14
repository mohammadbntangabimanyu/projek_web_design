document.addEventListener('DOMContentLoaded', () => {

  // 1. NAVBAR SCROLL EFFECT
  const navbar = document.getElementById('navbar');
  if (navbar && !document.body.classList.contains('booking-page')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. HAMBURGER MENU TOGGLE
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // 3. CONTACT FORM
  const contactForm = document.getElementById('contactForm');
  if (contactForm && !document.body.classList.contains('booking-page')) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih! Pesan kamu telah terkirim. Tim kami akan segera menghubungi.');
      contactForm.reset();
    });
  }

  // 4. BOOKING PAGE — inisialisasi state awal
  if (document.body.classList.contains('booking-page')) {
    // Set ringkasan harga dari opsi pertama saat halaman dimuat
    const courseSelect = document.getElementById('courseSelect');
    if (courseSelect) {
      updateSummary();
    }
  }

});

// ==========================================
// BOOKING FORM LOGIC (Global Functions)
// Dipanggil via onXxx="" di HTML
// ==========================================

/**
 * Update ringkasan harga saat kursus dipilih dari dropdown.
 */
function updateSummary() {
  const select = document.getElementById('courseSelect');
  if (!select) return;

  const selectedOption = select.options[select.selectedIndex];
  const price = parseInt(selectedOption.getAttribute('data-price'));
  const titleText = selectedOption.text.split(' – ')[0];

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);

  const sCourse = document.getElementById('s-course');
  const sPrice  = document.getElementById('s-price');
  const sTotal  = document.getElementById('s-total');

  if (sCourse) sCourse.textContent = titleText;
  if (sPrice)  sPrice.textContent  = formatIDR(price);
  if (sTotal)  sTotal.textContent  = formatIDR(price);

  // Sinkronisasi harga di panel pembayaran
  const qrisTotal = document.getElementById('qris-total');
  const bdAmount  = document.getElementById('bd-amount');
  if (qrisTotal) qrisTotal.textContent = formatIDR(price);
  if (bdAmount)  bdAmount.textContent  = formatIDR(price);
}

/**
 * Navigasi antar step (1: Data Diri, 2: Pembayaran, 3: Konfirmasi).
 * Menjalankan validasi sebelum berpindah ke Step 2.
 */
function goToStep(step) {

  // Validasi Step 1 sebelum ke Step 2
  if (step === 2) {
    const fName = document.getElementById('firstName');
    const lName = document.getElementById('lastName');
    const email = document.getElementById('email');

    if (!fName.value.trim() || !lName.value.trim() || !email.value.trim()) {
      alert('Lengkapi Nama Depan, Nama Belakang, dan Email terlebih dahulu.');
      return;
    }
    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      alert('Masukkan alamat email yang valid.');
      return;
    }
  }

  // Persiapkan data konfirmasi untuk Step 3
  if (step === 3) {
    const fName  = document.getElementById('firstName');
    const email  = document.getElementById('email');
    const course = document.getElementById('s-course');
    const total  = document.getElementById('s-total');

    const confirmName   = document.getElementById('confirm-name');
    const confirmCourse = document.getElementById('confirm-course');
    const confirmTotal  = document.getElementById('confirm-total');
    const confirmEmail  = document.getElementById('confirm-email');
    const confirmId     = document.getElementById('confirm-id');

    if (confirmName)   confirmName.textContent   = fName  ? fName.value  : '—';
    if (confirmCourse) confirmCourse.textContent = course ? course.textContent : '—';
    if (confirmTotal)  confirmTotal.textContent  = total  ? total.textContent  : '—';
    if (confirmEmail)  confirmEmail.textContent  = email  ? email.value  : '—';
    if (confirmId)     confirmId.textContent     = '#CON-2026-' + Math.floor(1000 + Math.random() * 9000);
  }

  // Sembunyikan semua konten step
  document.querySelectorAll('.booking-step-content').forEach((el) => {
    el.classList.add('hidden');
  });

  // Tampilkan step yang dituju
  const targetStep = document.getElementById('step' + step);
  if (targetStep) targetStep.classList.remove('hidden');

  // Update indikator step (active / completed)
  document.querySelectorAll('.step').forEach((el, index) => {
    el.classList.remove('active', 'completed');
    if (index + 1 === step) {
      el.classList.add('active');
    } else if (index + 1 < step) {
      el.classList.add('completed');
    }
  });

  // Scroll ke atas form
  const formContainer = document.querySelector('.booking-form-container');
  if (formContainer) {
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Pilih metode pembayaran (toggle selected class).
 */
function selectPayment(method) {
  document.querySelectorAll('.payment-option').forEach((el) => {
    el.classList.remove('selected');
  });
  const target = document.getElementById('pay-' + method);
  if (target) target.classList.add('selected');
}

/**
 * Pilih bank untuk transfer — menampilkan detail rekening.
 * event.stopPropagation() mencegah tertutupnya accordion pembayaran.
 */
function selectBank(event, bankCode) {
  event.stopPropagation();

  const accounts = {
    bca:     ['BCA',     '8800 1234 5678'],
    bri:     ['BRI',     '0011 2233 4455'],
    bni:     ['BNI',     '1234 5678 90'],
    mandiri: ['Mandiri', '1122 3344 5566'],
    bsi:     ['BSI',     '7788 9900 1122'],
  };

  const data = accounts[bankCode];
  if (!data) return;

  const bdBank    = document.getElementById('bd-bank');
  const bdAccount = document.getElementById('bd-account');
  if (bdBank)    bdBank.textContent    = data[0];
  if (bdAccount) bdAccount.textContent = data[1];

  // Tandai tombol bank yang aktif
  document.querySelectorAll('.bank-opt').forEach((el) => el.classList.remove('active'));
  const clicked = event.currentTarget || event.target.closest('.bank-opt');
  if (clicked) clicked.classList.add('active');

  // Pastikan detail bank muncul
  const bankDetails = document.getElementById('bankDetails');
  if (bankDetails) bankDetails.style.display = 'block';
}

/**
 * Salin nomor rekening ke clipboard.
 */
function copyAccount() {
  const bdAccount = document.getElementById('bd-account');
  if (!bdAccount) return;

  const accNum = bdAccount.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(accNum).then(() => {
      showCopyFeedback('Nomor rekening disalin: ' + accNum);
    }).catch(() => {
      fallbackCopy(accNum);
    });
  } else {
    fallbackCopy(accNum);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity  = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showCopyFeedback('Nomor rekening disalin: ' + text);
  } catch (e) {
    alert('Gagal menyalin. Nomor rekening: ' + text);
  }
  document.body.removeChild(ta);
}

function showCopyFeedback(message) {
  const btn = document.querySelector('.copy-btn');
  if (btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
    btn.style.background = 'var(--accent)';
    btn.style.color = 'var(--black)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }
}

/**
 * Pilih e-wallet di opsi Cash/E-Wallet.
 * event.stopPropagation() mencegah tertutupnya accordion pembayaran.
 */
function selectEwallet(event, walletCode) {
  event.stopPropagation();

  // Tandai tombol e-wallet yang aktif
  document.querySelectorAll('.ewallet-opt').forEach((el) => el.classList.remove('active'));
  const clicked = event.currentTarget || event.target.closest('.ewallet-opt');
  if (clicked) clicked.classList.add('active');
}

/**
 * Handle upload file bukti transfer — tampilkan preview nama file.
 */
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validasi ukuran max 5 MB
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    alert('Ukuran file melebihi 5 MB. Pilih file yang lebih kecil.');
    event.target.value = '';
    return;
  }

  const preview = document.getElementById('filePreview');
  if (preview) {
    preview.style.display = 'block';
    preview.innerHTML =
      '<i class="fas fa-check-circle" style="color:var(--accent);margin-right:8px;"></i>' +
      'Berhasil diupload: <strong>' + file.name + '</strong>';
  }

  // Update visual area upload
  const uploadArea = document.querySelector('.file-upload span');
  if (uploadArea) uploadArea.textContent = file.name;
}
