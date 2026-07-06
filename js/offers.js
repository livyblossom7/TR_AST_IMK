(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('promoModalOverlay');
        var closeBtn = document.getElementById('promoModalCloseBtn');
        var copyButtons = document.querySelectorAll('.promo-copy-btn');

        if (!overlay) return;

        function openModal() {
            overlay.classList.add('is-open');
        }

        function closeModal() {
            overlay.classList.remove('is-open');
        }

        copyButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var code = btn.getAttribute('data-promo-code') || '';
                if (navigator.clipboard && code) {
                    navigator.clipboard.writeText(code).catch(function () {});
                }
                openModal();
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    });
})();
