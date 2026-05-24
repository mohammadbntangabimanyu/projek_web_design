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
  const ewAmount  = document.getElementById('ew-amount');
  if (ewAmount)  ewAmount.textContent  = formatIDR(price);
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
    el.style.display = 'none';
  });

  // Tampilkan step yang dituju
  const targetStep = document.getElementById('step' + step);
  if (targetStep) {
    targetStep.classList.remove('hidden');
    targetStep.style.display = 'block';
  }

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
/**
 * Salin nomor rekening ke clipboard.
 */
function copyAccount(elementId) {
  const targetId = elementId ? elementId : 'bd-account';
  const accountEl = document.getElementById(targetId);
  if (!accountEl) return;

  const accNum = accountEl.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(accNum).then(() => {
      showCopyFeedback(targetId);
    }).catch(() => {
      fallbackCopy(accNum, targetId);
    });
  } else {
    fallbackCopy(accNum, targetId);
  }
}

function fallbackCopy(text, targetId) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity  = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showCopyFeedback(targetId);
  } catch (e) {
    alert('Gagal menyalin. Nomor rekening: ' + text);
  }
  document.body.removeChild(ta);
}

function showCopyFeedback(targetId) {
  const accountEl = document.getElementById(targetId);
  const btn = accountEl.nextElementSibling; 
  if (btn && btn.classList.contains('copy-btn')) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
    btn.style.background = 'var(--accent)';
    btn.style.color = 'var(--black)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = 'var(--dark2)';
      btn.style.color = 'var(--light-grey)';
    }, 2000);
  }
}

/**
 * Pilih e-wallet di opsi Cash/E-Wallet.
 * event.stopPropagation() mencegah tertutupnya accordion pembayaran.
 */

/**
 * Pilih E-Wallet
 */
function selectEwallet(event, walletCode) {
  event.stopPropagation();

  // Data Dummy Akun E-Wallet Perusahaan (Code On Academy)
  const wallets = {
    gopay:     ['GoPay',     '0812 3456 7890'],
    ovo:       ['OVO',       '0812 9876 5432'],
    dana:      ['DANA',      '0811 2233 4455'],
    shopeepay: ['ShopeePay', '0899 8877 6655']
  };

  const data = wallets[walletCode];
  if (data) {
    document.getElementById('ew-name').textContent = data[0];
    document.getElementById('ew-account').textContent = data[1];
    document.getElementById('ewalletDetails').style.display = 'block';
    document.getElementById('ewalletUpload').style.display = 'block';
  }

  document.querySelectorAll('.ewallet-opt').forEach((el) => el.classList.remove('active'));
  const clicked = event.currentTarget || event.target.closest('.ewallet-opt');
  if (clicked) clicked.classList.add('active');
}

/**
 * Handle upload file bukti transfer — tampilkan preview gambar dan nama file.
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
  const uploadArea = document.querySelector('.file-upload span');

  if (preview) {
    preview.style.display = 'block';

    // Cek apakah file yang diunggah adalah gambar (PNG/JPG)
    if (file.type.startsWith('image/')) {
      const reader = new FileReader(); // Fitur JS untuk membaca file menjadi gambar
      
      reader.onload = function(e) {
        // Tampilkan gambar dan teks sukses
        preview.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 10px 0;">
            <img src="${e.target.result}" alt="Preview Bukti Transfer" style="max-height: 200px; width: auto; border-radius: 4px; border: 1px solid var(--dark2);" />
            <div style="color: var(--accent); font-size: 0.85rem;">
              <i class="fas fa-check-circle"></i> Berhasil diupload: <strong>${file.name}</strong>
            </div>
          </div>
        `;
      };
      reader.readAsDataURL(file); // Render gambarnya
      
    } else {
      // Jika yang diupload bukan gambar (misal PDF)
      preview.innerHTML = `
        <div style="color: var(--accent); font-size: 0.85rem; text-align: center; padding: 10px 0;">
          <i class="fas fa-file-pdf"></i> Dokumen diterima: <strong>${file.name}</strong>
        </div>
      `;
    }
  }

  // Update teks di dalam area putus-putus
  if (uploadArea) {
    uploadArea.textContent = 'File dipilih: ' + file.name;
  }
}