(function () {
    'use strict';

    var logoutBtn = document.getElementById('logoutBtn');
    var overlay = document.getElementById('logoutModalOverlay');
    var cancelBtn = document.getElementById('logoutCancelBtn');
    var confirmBtn = document.getElementById('logoutConfirmBtn');

    if (!logoutBtn || !overlay || !cancelBtn || !confirmBtn) return;

    function openModal() {
        overlay.classList.add('is-open');
    }

    function closeModal() {
        overlay.classList.remove('is-open');
    }

    logoutBtn.addEventListener('click', openModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });

    confirmBtn.addEventListener('click', function () {
        window.location.href = '../index.html';
    });
})();
