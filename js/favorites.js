document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.meal-card[data-href]').forEach((card) => {
        card.addEventListener('click', () => {
            window.location.href = card.dataset.href;
        });
    });

    document.querySelectorAll('.meal-favorite-btn, .burger-favorite-btn').forEach((btn) => {
        btn.setAttribute('aria-pressed', 'false');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isFavorited = btn.classList.toggle('is-favorited');
            btn.setAttribute('aria-pressed', String(isFavorited));
        });
    });
});
