// ===== Toggle password visibility =====
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.toggle-eye').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '&#128065;&#65039;';
      } else {
        input.type = 'password';
        btn.innerHTML = '&#128065;';
      }
    });
  });

  // ===== Hardcoded login submit =====
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Login berhasil (dummy)! Mengarahkan ke halaman Offers...');
      window.location.href = 'offers.html';
    });
  }

  // ===== Hardcoded signup submit =====
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const pass = document.getElementById('password').value;
      const confirm = document.getElementById('confirmPassword').value;
      if (pass !== confirm) {
        alert('Password dan konfirmasi password tidak sama!');
        return;
      }
      alert('Akun berhasil dibuat (dummy)! Silakan login.');
      window.location.href = 'login.html';
    });
  }

  // ===== Copy promo code buttons =====
  document.querySelectorAll('.btn-copy-code').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const code = btn.getAttribute('data-code') || 'WAGBA';
      navigator.clipboard.writeText(code).then(function () {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () {
          btn.textContent = original;
        }, 1500);
      }).catch(function () {
        alert('Kode promo: ' + code);
      });
    });
  });

  // ===== Edit profile toggle (hardcoded) =====
  const editBtn = document.getElementById('editProfileBtn');
  if (editBtn) {
    const inputs = document.querySelectorAll('.profile-editable');
    editBtn.addEventListener('click', function () {
      const isEditing = editBtn.getAttribute('data-editing') === 'true';
      if (!isEditing) {
        inputs.forEach(function (i) { i.removeAttribute('readonly'); i.classList.add('border-warning'); });
        editBtn.textContent = 'Save Profile';
        editBtn.setAttribute('data-editing', 'true');
      } else {
        inputs.forEach(function (i) { i.setAttribute('readonly', true); i.classList.remove('border-warning'); });
        editBtn.textContent = 'Edit Profile';
        editBtn.setAttribute('data-editing', 'false');
        alert('Profil berhasil disimpan (dummy)!');
      }
    });
  }

  // ===== Logout button (hardcoded) =====
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if (confirm('Yakin ingin logout?')) {
        window.location.href = 'login.html';
      }
    });
  }
});