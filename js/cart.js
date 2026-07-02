(function () {
    'use strict';

    var CART_KEY = 'wagba_cart';

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartBadge();
    }

    function addToCart(item) {
        var cart = getCart();
        var existing = cart.filter(function (i) { return i.name === item.name; })[0];
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name: item.name, price: item.price, image: item.image, qty: 1 });
        }
        saveCart(cart);
    }

    function getCartCount() {
        return getCart().reduce(function (sum, i) { return sum + i.qty; }, 0);
    }

    function updateCartBadge() {
        var count = getCartCount();
        document.querySelectorAll('[data-cart-icon]').forEach(function (btn) {
            var badge = btn.querySelector('.cart-badge');
            if (count > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge';
                    btn.appendChild(badge);
                }
                badge.textContent = count > 99 ? '99+' : String(count);
            } else if (badge) {
                badge.remove();
            }
        });
    }

    function wireAddToCartButtons() {
        document.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var card = btn.closest('.meal-card');
                if (!card) return;
                var nameEl = card.querySelector('.meal-name');
                var priceEl = card.querySelector('.meal-price');
                var imgEl = card.querySelector('.meal-photo img');
                if (!nameEl || !priceEl) return;
                addToCart({
                    name: nameEl.textContent.trim(),
                    price: parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')),
                    image: imgEl ? imgEl.getAttribute('src') : ''
                });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        updateCartBadge();
        wireAddToCartButtons();
    });

    window.WagbaCart = {
        getCart: getCart,
        saveCart: saveCart,
        addToCart: addToCart,
        getCartCount: getCartCount,
        updateCartBadge: updateCartBadge
    };
})();
