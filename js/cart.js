(function () {
    'use strict';

    var CART_KEY = 'wagba_cart';
    var DB_NAME = 'wagba_db';
    var STORE_NAME = 'cart_store';

    function normalizeCart(cart) {
        if (!Array.isArray(cart)) return [];
        return cart.filter(function (item) {
            return item && typeof item === 'object' && item.name;
        });
    }

    function getCart() {
        try {
            return normalizeCart(JSON.parse(localStorage.getItem(CART_KEY)));
        } catch (e) {
            return [];
        }
    }

    function persistToIndexedDb(cart) {
        if (!window.indexedDB) return;

        var request = window.indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = function () {
            var db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = function () {
            var db = request.result;
            var tx = db.transaction(STORE_NAME, 'readwrite');
            var store = tx.objectStore(STORE_NAME);
            store.put({ id: 'cart', items: cart });
            tx.oncomplete = function () {
                db.close();
            };
        };
        request.onerror = function () {
            // IndexedDB unavailable/blocked — cart still works via localStorage.
        };
    }

    function hydrateCartFromIndexedDb() {
        if (!window.indexedDB) return;

        var request = window.indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = function () {
            var db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = function () {
            var db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.close();
                return;
            }
            var tx = db.transaction(STORE_NAME, 'readonly');
            var store = tx.objectStore(STORE_NAME);
            var getRequest = store.get('cart');
            getRequest.onsuccess = function () {
                var data = getRequest.result;
                if (data && Array.isArray(data.items) && data.items.length && getCart().length === 0) {
                    localStorage.setItem(CART_KEY, JSON.stringify(normalizeCart(data.items)));
                    updateCartBadge();
                }
                db.close();
            };
        };
        request.onerror = function () {
            // IndexedDB unavailable/blocked — cart still works via localStorage.
        };
    }

    function saveCart(cart) {
        var normalizedCart = normalizeCart(cart);
        localStorage.setItem(CART_KEY, JSON.stringify(normalizedCart));
        persistToIndexedDb(normalizedCart);
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
                    badge.className = 'cart-badge badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle';
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
        hydrateCartFromIndexedDb();
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