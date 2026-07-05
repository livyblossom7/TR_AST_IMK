document.addEventListener('DOMContentLoaded', () => {
    const updateButtonState = (row) => {
        const maxScroll = row.scrollWidth - row.clientWidth;
        const btns = document.querySelectorAll(`.slider-btn[data-slider-target="${row.id}"]`);
        btns.forEach((btn) => {
            if (btn.dataset.direction === 'prev') {
                btn.disabled = row.scrollLeft <= 0;
            } else {
                btn.disabled = row.scrollLeft >= maxScroll - 1;
            }
        });
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
            const direction = btn.dataset.direction === 'prev' ? -1 : 1;
            row.scrollBy({ left: amount * direction, behavior: 'smooth' });
        });
    });
});