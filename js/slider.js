document.addEventListener('DOMContentLoaded', () => {
    const updateButtonState = (row) => {
        const maxScroll = row.scrollWidth - row.clientWidth;
        const prevBtn = document.querySelector(`.slider-btn--prev[data-slider-target="${row.id}"]`);
        const nextBtn = document.querySelector(`.slider-btn--next[data-slider-target="${row.id}"]`);
        if (prevBtn) prevBtn.disabled = row.scrollLeft <= 0;
        if (nextBtn) nextBtn.disabled = row.scrollLeft >= maxScroll - 1;
    };

    document.querySelectorAll('.scroll-row[id]').forEach((row) => {
        updateButtonState(row);
        row.addEventListener('scroll', () => updateButtonState(row));
        window.addEventListener('resize', () => updateButtonState(row));
    });

    document.querySelectorAll('.slider-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const row = document.getElementById(btn.dataset.sliderTarget);
            if (!row) return;
            const amount = row.clientWidth * 0.8;
            const direction = btn.classList.contains('slider-btn--prev') ? -1 : 1;
            row.scrollBy({ left: amount * direction, behavior: 'smooth' });
        });
    });
});
