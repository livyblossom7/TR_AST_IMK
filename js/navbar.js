(function () {
    'use strict';

    function closeAllDropdowns() {
        document.querySelectorAll('.profile-menu-wrapper.is-open').forEach(function (wrapper) {
            wrapper.classList.remove('is-open');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.profile-menu-wrapper').forEach(function (wrapper) {
            var trigger = wrapper.querySelector('.profile-trigger');
            if (!trigger) return;
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                var isOpen = wrapper.classList.contains('is-open');
                closeAllDropdowns();
                wrapper.classList.toggle('is-open', !isOpen);
            });
        });

        document.addEventListener('click', closeAllDropdowns);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAllDropdowns();
        });
    });
})();
