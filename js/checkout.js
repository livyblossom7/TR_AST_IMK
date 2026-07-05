(function () {
    'use strict';

    var CART_KEY = 'wagba_cart';

    function getCartItems() {
        try {
            if (window.WagbaCart && typeof window.WagbaCart.getCart === 'function') {
                return window.WagbaCart.getCart();
            }
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function formatCurrency(value) {
        return '$' + value.toFixed(2);
    }

    function renderCheckoutSummary() {
        var items = getCartItems();
        var subtotal = items.reduce(function (sum, item) {
            return sum + (Number(item.price) || 0) * (Number(item.qty) || 1);
        }, 0);
        var deliveryFee = subtotal > 0 ? 4 : 0;
        var ppnTax = subtotal * 0.11;
        var mbgTax = subtotal * 0.69;
        var total = subtotal + deliveryFee + ppnTax + mbgTax;

        var subtotalEl = document.getElementById('checkoutSubtotal');
        var deliveryEl = document.getElementById('checkoutDelivery');
        var taxEl = document.getElementById('checkoutTax');
        var mbgEl = document.getElementById('checkoutMbg');
        var totalEl = document.getElementById('checkoutTotal');
        var orderListEl = document.getElementById('checkoutOrderList');
        var buyNowBtn = document.getElementById('buyNowBtn');

        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (deliveryEl) deliveryEl.textContent = formatCurrency(deliveryFee);
        if (taxEl) taxEl.textContent = formatCurrency(ppnTax);
        if (mbgEl) mbgEl.textContent = formatCurrency(mbgTax);
        if (totalEl) totalEl.textContent = formatCurrency(total);

        if (orderListEl) {
            if (!items.length) {
                orderListEl.innerHTML = '<p class="checkout-order-empty">Your cart is empty.</p>';
            } else {
                orderListEl.innerHTML = items.map(function (item) {
                    return '<div class="checkout-order-item"><span>' + item.name + ' × ' + (item.qty || 1) + '</span><span>' + formatCurrency((Number(item.price) || 0) * (Number(item.qty) || 1)) + '</span></div>';
                }).join('');
            }
        }

        if (!buyNowBtn) return;
        if (items.length === 0) {
            buyNowBtn.disabled = true;
            buyNowBtn.textContent = 'Cart is empty';
        } else {
            buyNowBtn.disabled = false;
            buyNowBtn.textContent = 'Buy Now';
        }
    }

    var CHEVRON = '<svg width="18" height="19" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.2104 13.7881C19.7573 14.3676 19.7573 15.3088 19.2104 15.8883L12.2104 23.3062C11.6635 23.8857 10.7754 23.8857 10.2285 23.3062C9.68164 22.7267 9.68164 21.7855 10.2285 21.206L16.2398 14.8359L10.2329 8.46575C9.68602 7.88622 9.68602 6.94508 10.2329 6.36555C10.7798 5.78603 11.6679 5.78603 12.2148 6.36555L19.2148 13.7835L19.2104 13.7881Z" fill="black"/></svg>';

    var BACK_ARROW = '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.81152 13.0112C8.26465 13.5581 8.26465 14.4462 8.81152 14.9931L15.8115 21.9931C16.3584 22.54 17.2465 22.54 17.7934 21.9931C18.3403 21.4462 18.3403 20.5581 17.7934 20.0112L11.7821 14L17.789 7.98871C18.3359 7.44184 18.3359 6.55371 17.789 6.00684C17.2421 5.45996 16.354 5.45996 15.8071 6.00684L8.80715 13.0068L8.81152 13.0112Z" fill="black"/></svg>';

    var TRANSFER_ICON = '<svg width="90" height="90" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.2432 12.9937C23.1819 11.0549 26.3172 11.0549 28.2354 12.9937C30.1535 14.9324 30.1741 18.0677 28.2354 19.9858L21.8418 26.3794H105.579C112.86 26.3794 118.779 32.299 118.779 39.5796V76.3325L117.728 75.2808C111.932 69.4853 102.527 69.4855 96.7314 75.2808C91.1215 80.8907 90.9353 89.8423 96.1533 95.6792H110.116L103.723 89.2856C101.784 87.3469 101.784 84.2116 103.723 82.2935C105.661 80.3753 108.797 80.3547 110.715 82.2935L125.564 97.144C127.503 99.0828 127.503 102.217 125.564 104.135L110.715 118.986C108.776 120.924 105.641 120.924 103.723 118.986C101.805 117.047 101.784 113.912 103.723 111.994L110.116 105.6H26.3584C19.0778 105.6 13.1582 99.6805 13.1582 92.3999V55.646L14.21 56.6978C20.0056 62.4934 29.4114 62.4934 35.207 56.6978C40.8166 51.0878 41.002 42.1371 35.7842 36.3003H21.8213L28.2148 42.6938C30.1534 44.6325 30.1533 47.767 28.2148 49.6851C26.2761 51.6032 23.1408 51.6238 21.2227 49.6851L6.39355 34.856C4.45486 32.9172 4.45482 29.7819 6.39355 27.8638L21.2432 12.9937Z" fill="#FF8800"/></svg>';

    var CASHREG_ICON = '<svg width="80" height="80" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.9998 12.8C24.9398 12.8 19.1998 18.54 19.1998 25.6C19.1998 32.66 24.9398 38.4 31.9998 38.4H41.5998V44.8H30.1998C23.8798 44.8 18.4998 49.42 17.5398 55.68L13.0198 85.62C12.8798 86.5601 12.7998 87.5201 12.7998 88.48V102.4C12.7998 109.46 18.5398 115.2 25.5998 115.2H102.4C109.46 115.2 115.2 109.46 115.2 102.4V88.48C115.2 87.5201 115.12 86.5601 114.98 85.6001L110.44 55.68C109.5 49.42 104.12 44.8 97.7998 44.8H54.3998V38.4H63.9998C71.0598 38.4 76.7998 32.66 76.7998 25.6C76.7998 18.54 71.0598 12.8 63.9998 12.8H31.9998Z" fill="#FF8800"/></svg>';

    var TRUCK_ICON = '<svg width="90" height="90" viewBox="0 0 166 166" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6 41.4999C16.6 32.344 24.0441 24.8999 33.2 24.8999H107.9C117.056 24.8999 124.5 32.344 124.5 41.4999V49.7999H137.65C142.06 49.7999 146.288 51.5377 149.4 54.6502L161.15 66.3999C164.262 69.5124 166 73.7402 166 78.1496V116.2C166 125.356 158.556 132.8 149.4 132.8H148.544C145.847 142.371 137.028 149.4 126.575 149.4C116.122 149.4 107.329 142.371 104.606 132.8H77.9941C75.2966 142.371 66.4778 149.4 56.025 149.4C45.5722 149.4 36.7794 142.371 34.0559 132.8H33.2C24.0441 132.8 16.6 125.356 16.6 116.2V103.75H6.225C2.77531 103.75 0 100.975 0 97.5249C0 94.0752 2.77531 91.2999 6.225 91.2999H35.275C38.7247 91.2999 41.5 88.5246 41.5 85.0749C41.5 81.6252 38.7247 78.8499 35.275 78.8499H6.225C2.77531 78.8499 0 76.0746 0 72.6249C0 69.1752 2.77531 66.3999 6.225 66.3999H51.875C55.3247 66.3999 58.1 63.6246 58.1 60.1749C58.1 56.7252 55.3247 53.9499 51.875 53.9499H6.225C2.77531 53.9499 0 51.1746 0 47.7249C0 44.2752 2.77531 41.4999 6.225 41.4999H16.6Z" fill="#FF8800"/></svg>';

    var SEARCH_ICON = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5002 9.3502C16.5002 10.928 15.988 12.3855 15.1252 13.568L19.4771 17.9233C19.9068 18.353 19.9068 19.0508 19.4771 19.4805C19.0474 19.9102 18.3496 19.9102 17.9199 19.4805L13.568 15.1252C12.3855 15.988 10.928 16.5002 9.3502 16.5002C5.40051 16.5002 2.2002 13.2999 2.2002 9.3502C2.2002 5.40051 5.40051 2.2002 9.3502 2.2002C13.2999 2.2002 16.5002 5.40051 16.5002 9.3502ZM9.3502 14.3002C12.083 14.3002 14.3002 12.083 14.3002 9.3502C14.3002 6.61738 12.083 4.4002 9.3502 4.4002C6.61738 4.4002 4.4002 6.61738 4.4002 9.3502C4.4002 12.083 6.61738 14.3002 9.3502 14.3002Z" fill="black" fill-opacity="0.25"/></svg>';

    var PIN_ICON = '<svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.40002 13.3841C6.40002 7.86305 10.7 3.39111 16 3.39111C21.3 3.39111 25.6 7.86305 25.6 13.3841C25.6 19.7052 19.59 27.2821 17.08 30.1698C16.49 30.848 15.505 30.848 14.915 30.1698C12.405 27.2821 6.39502 19.7052 6.39502 13.3841H6.40002ZM16 16.9553C17.765 16.9553 19.2 15.4346 19.2 13.5642C19.2 11.6939 17.765 10.1732 16 10.1732C14.235 10.1732 12.8 11.6939 12.8 13.5642C12.8 15.4346 14.235 16.9553 16 16.9553Z" fill="black"/></svg>';

    /* ---------------------------------------------------------
       Payment method catalogue
       --------------------------------------------------------- */
    var CATALOGUE = {
        cod: { label: 'Cash on Delivery' },
        va: {
            label: 'Virtual Account',
            options: [
                { id: 'bca', name: 'BCA (Bank Central Asia)' },
                { id: 'bri', name: 'BRI (Bank Rakyat Indonesia)' },
                { id: 'fti', name: 'FTIBank' }
            ]
        },
        card: {
            label: 'Credit/Debit',
            options: [
                { id: 'credit', name: 'Credit Card' },
                { id: 'debit', name: 'Debit Card' }
            ]
        },
        ewallet: {
            label: 'E-Wallet',
            options: [
                { id: 'dana', name: 'Dana' },
                { id: 'gopay', name: 'GoPay' },
                { id: 'foodapp', name: 'FoodAppWallet' }
            ]
        },
        minimarket: {
            label: 'Minimarket',
            options: [
                { id: 'indomaret', name: 'Indomaret' },
                { id: 'alfamart', name: 'Alfamart' },
                { id: 'fti', name: 'FTIMart' }
            ]
        }
    };

    var overlay = document.getElementById('modalOverlay');
    var modalBox = document.getElementById('modalBox');

    var selectedPayment = null; // { category, optionId, optionName }

    function openModal(html, size) {
        modalBox.className = 'modal' + (size ? ' modal--' + size : '');
        modalBox.innerHTML = html;
        overlay.classList.add('is-open');
    }

    function closeModal() {
        overlay.classList.remove('is-open');
        modalBox.innerHTML = '';
    }

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });

    /* ---------------------------------------------------------
       Step 1: category picker
       --------------------------------------------------------- */
    function renderCategoryList() {
        var rows = [
            row('cod', CATALOGUE.cod.label),
            row('va', CATALOGUE.va.label),
            row('card', CATALOGUE.card.label),
            row('ewallet', CATALOGUE.ewallet.label),
            row('minimarket', CATALOGUE.minimarket.label)
        ].join('');

        function row(id, label) {
            return '<button type="button" class="method-list-item" data-category="' + id + '">' +
                '<span>' + label + '</span>' + CHEVRON + '</button>';
        }

        openModal(
            '<h2 class="modal-title">Payment Method</h2>' +
            '<p class="modal-subtitle">Choose how you want to pay</p>' +
            '<div class="method-list">' + rows + '</div>',
            'list'
        );

        modalBox.querySelectorAll('.method-list-item').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var category = btn.dataset.category;
                if (category === 'cod') {
                    setSelectedPayment({ category: 'cod', optionId: null, optionName: null });
                    closeModal();
                } else {
                    renderSubChoice(category);
                }
            });
        });
    }

    /* ---------------------------------------------------------
       Step 2: sub-choice (bank / provider / card type / store)
       --------------------------------------------------------- */
    function renderSubChoice(category) {
        var cat = CATALOGUE[category];
        var rows = cat.options.map(function (opt) {
            return '<button type="button" class="method-list-item" data-option="' + opt.id + '" data-name="' + opt.name + '">' +
                '<span>' + opt.name + '</span>' + CHEVRON + '</button>';
        }).join('');

        openModal(
            BACK_ARROW_BTN() +
            '<h2 class="modal-title">' + cat.label + '</h2>' +
            '<p class="modal-subtitle">' + subChoicePrompt(category) + '</p>' +
            '<div class="method-list">' + rows + '</div>',
            'list'
        );

        wireBack(function () { renderCategoryList(); });

        modalBox.querySelectorAll('.method-list-item').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var optionId = btn.dataset.option;
                var optionName = btn.dataset.name;
                if (category === 'card' || category === 'ewallet') {
                    renderCredentialForm(category, optionId, optionName);
                } else {
                    finalizePaymentSelection(category, optionId, optionName);
                }
            });
        });
    }

    function subChoicePrompt(category) {
        if (category === 'va') return 'Choose your bank';
        if (category === 'card') return 'Choose your provider';
        if (category === 'ewallet') return 'Choose your provider';
        if (category === 'minimarket') return 'Choose a minimarket';
        return '';
    }

    /* ---------------------------------------------------------
       Step 3: credential input (card / e-wallet only)
       --------------------------------------------------------- */
    function renderCredentialForm(category, optionId, optionName) {
        var isCard = category === 'card';
        var titleName = isCard ? optionName : optionName;

        var fieldsHtml = isCard ?
            '<div class="cred-field">' +
            '<label class="cred-field-label" for="fieldNumber">' + optionName + ' Number</label>' +
            '<input type="text" id="fieldNumber" class="cred-input" placeholder="1921-2938-1923-1234" maxlength="19" />' +
            '</div>' +
            '<div class="cred-row">' +
            '<div class="cred-field"><label class="cred-field-label" for="fieldExpiry">Valid Thru</label>' +
            '<input type="text" id="fieldExpiry" class="cred-input" placeholder="12/28" maxlength="5" /></div>' +
            '<div class="cred-field"><label class="cred-field-label" for="fieldCvv">CVC/CVV</label>' +
            '<input type="text" id="fieldCvv" class="cred-input" placeholder="192" maxlength="4" /></div>' +
            '</div>' +
            '<div class="cred-field">' +
            '<label class="cred-field-label" for="fieldName">Card Holder&rsquo;s Name</label>' +
            '<input type="text" id="fieldName" class="cred-input" placeholder="John Doe" />' +
            '</div>'
            :
            '<div class="cred-field">' +
            '<label class="cred-field-label" for="fieldNumber">Phone Number</label>' +
            '<input type="text" id="fieldNumber" class="cred-input" placeholder="+62-291-1231-1232" />' +
            '</div>' +
            '<div class="cred-field">' +
            '<label class="cred-field-label" for="fieldName">Name</label>' +
            '<input type="text" id="fieldName" class="cred-input" placeholder="John Doe" />' +
            '</div>';

        openModal(
            BACK_ARROW_BTN() +
            '<h2 class="modal-title">' + titleName + '</h2>' +
            '<p class="modal-subtitle">Input your credentials</p>' +
            '<form class="cred-form" id="credForm">' + fieldsHtml + '</form>' +
            '<button type="button" class="modal-submit" id="credSubmit">Add Account</button>',
            'narrow'
        );

        wireBack(function () { renderSubChoice(category); });

        modalBox.querySelector('#credSubmit').addEventListener('click', function () {
            var data = {
                number: valueOf('fieldNumber') || (isCard ? '1921-2938-1923-1234' : '+62-291-1231-1232'),
                name: valueOf('fieldName') || 'John Doe'
            };
            if (isCard) {
                data.expiry = valueOf('fieldExpiry') || '12/28';
                data.cvv = valueOf('fieldCvv') || '192';
            }
            renderConfirmation(category, optionId, optionName, data);
        });
    }

    function valueOf(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    /* ---------------------------------------------------------
       Step 4: confirmation ("Account found")
       --------------------------------------------------------- */
    function renderConfirmation(category, optionId, optionName, data) {
        var isCard = category === 'card';

        var rows = isCard ?
            reviewRow('Card Number', data.number) +
            reviewRow('Valid Thru', data.expiry) +
            reviewRow('CVC/CVV', data.cvv) +
            reviewRow('Card Holder\u2019s', data.name)
            :
            reviewRow('Phone Number', data.number) +
            reviewRow('Name', data.name);

        function reviewRow(label, value) {
            return '<div class="review-row"><span class="review-row-label">' + label + '</span><span class="review-row-value">' + value + '</span></div>';
        }

        openModal(
            BACK_ARROW_BTN() +
            '<h2 class="modal-title">' + optionName + '</h2>' +
            '<p class="modal-subtitle">Account found</p>' +
            '<div class="review-rows">' + rows + '</div>' +
            '<p class="confirm-note">Make sure the credentials that you have inputed are correct</p>' +
            '<button type="button" class="modal-submit" id="confirmSubmit">Add Account</button>',
            'narrow'
        );

        wireBack(function () { renderCredentialForm(category, optionId, optionName); });

        modalBox.querySelector('#confirmSubmit').addEventListener('click', function () {
            finalizePaymentSelection(category, optionId, optionName, data);
        });
    }

    /* ---------------------------------------------------------
       Buy Now step (VA / Minimarket): transfer instructions.
       Shown only after "Buy Now" is clicked, since the VA number /
       transfer ID / deadline represent a real pending transaction
       and shouldn't appear while the person is still just picking
       a payment method.
       --------------------------------------------------------- */
    function renderTransferInstructions(payment) {
        var category = payment.category;
        var optionName = payment.optionName;
        var isVA = category === 'va';
        var refNumber = isVA ? '1282-1621-3618-361192' : '1920-1023-1932';
        var deadline = formatDeadline();

        openModal(
            '<div class="redirect-icon">' + (isVA ? TRANSFER_ICON : CASHREG_ICON) + '</div>' +
            '<h2 class="redirect-title">' + (isVA ? 'Transfer to this Virtual Account number to continue' : 'Go to your local minimarket and give them this ID') + '</h2>' +
            '<div class="va-details">' +
            '<div class="va-details-row"><span class="va-label">' + (isVA ? 'Bank' : 'Minimarket') + '</span><span class="va-value">' + optionName + '</span></div>' +
            '<div class="va-details-row"><span class="va-label">' + (isVA ? 'VA Number' : 'Transfer ID') + '</span><span class="va-value">' + refNumber + '</span></div>' +
            '</div>' +
            '<div class="va-deadline">' +
            '<p class="va-deadline-label">Transfer before</p>' +
            '<p class="va-deadline-value">' + deadline + '</p>' +
            '</div>' +
            '<div class="modal-btn-stack">' +
            '<button type="button" class="modal-btn-primary" id="redirectConfirm">' + (isVA ? 'I have already transferred' : 'I have finished the transaction') + '</button>' +
            '<button type="button" class="modal-btn-secondary" id="redirectBack">Back to Checkout</button>' +
            '</div>',
            ''
        );

        modalBox.querySelector('#redirectConfirm').addEventListener('click', function () {
            closeModal();
            renderOrderSuccess();
        });
        modalBox.querySelector('#redirectBack').addEventListener('click', function () {
            closeModal();
        });
    }

    function finalizePaymentSelection(category, optionId, optionName, data) {
        setSelectedPayment({
            category: category,
            optionId: optionId || null,
            optionName: optionName || null,
            data: data || null
        });
        closeModal();
    }

    function formatDeadline() {
        var d = new Date(Date.now() + 24 * 60 * 60 * 1000);
        var pad = function (n) { return String(n).padStart(2, '0'); };
        return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ', ' + pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear();
    }

    /* ---------------------------------------------------------
       Shared helpers
       --------------------------------------------------------- */
    function BACK_ARROW_BTN() {
        return '<button type="button" class="modal-back-btn" id="modalBackBtn">' + BACK_ARROW + '</button>';
    }

    function wireBack(handler) {
        var btn = modalBox.querySelector('#modalBackBtn');
        if (btn) btn.addEventListener('click', handler);
    }

    /* ---------------------------------------------------------
       Update checkout page display
       --------------------------------------------------------- */
    function setSelectedPayment(payment) {
        selectedPayment = payment;

        var picker = document.getElementById('paymentPicker');
        var label = document.getElementById('paymentPickerLabel');
        var sub = document.getElementById('paymentPickerSub');
        var action = document.getElementById('paymentPickerAction');
        var boxLabel = document.getElementById('paymentBoxLabel');

        picker.classList.remove('is-error');
        picker.classList.add('is-selected');
        boxLabel.classList.remove('is-error');
        boxLabel.textContent = 'Payment Method';

        var cat = CATALOGUE[payment.category];
        label.textContent = cat.label;

        if (payment.optionName) {
            sub.style.display = 'block';
            sub.textContent = subLabelPrefix(payment.category) + payment.optionName;
        } else {
            sub.style.display = 'none';
            sub.textContent = '';
        }

        action.innerHTML = 'Change payment method' + CHEVRON;
    }

    function subLabelPrefix(category) {
        if (category === 'va') return 'Bank: ';
        if (category === 'minimarket') return 'via: ';
        if (category === 'ewallet') return 'Provider: ';
        return '';
    }

    function showPaymentError() {
        var picker = document.getElementById('paymentPicker');
        var label = document.getElementById('paymentPickerLabel');
        var boxLabel = document.getElementById('paymentBoxLabel');

        picker.classList.remove('is-selected');
        picker.classList.add('is-error');
        boxLabel.classList.add('is-error');
        boxLabel.textContent = 'Choose your payment method first';
        label.textContent = 'You haven\u2019t picked yet!';
    }

    /* ---------------------------------------------------------
       Delivery address flow
       --------------------------------------------------------- */
    var addresses = [
        { id: 'home', label: 'Rumah', recipient: 'John Doe', address: 'Jl. Soekarno-Hatta No 87, RT 029/RW 012, Menteng, Jakarta Pusat, DKI Jakarta', phone: '+62-291-2912-1290' }
    ];
    var selectedAddressId = 'home';

    function getAddress(id) {
        for (var i = 0; i < addresses.length; i++) {
            if (addresses[i].id === id) return addresses[i];
        }
        return null;
    }

    function renderAddressList() {
        var selected = getAddress(selectedAddressId);
        var others = addresses.filter(function (a) { return a.id !== selectedAddressId; });

        var otherHtml = others.length ?
            others.map(function (a) {
                return '<div class="address-card" data-address-id="' + a.id + '">' +
                    '<div class="address-card-accent"></div>' +
                    '<div>' +
                    '<div class="address-card-header"><span class="address-card-name">' + a.label + '</span><span class="address-card-divider"></span><span class="address-card-recipient">' + a.recipient + '</span></div>' +
                    '<p class="address-card-line">' + a.address + '</p>' +
                    '<p class="address-card-line">' + a.phone + '</p>' +
                    '</div></div>';
            }).join('') :
            '<p class="address-empty">You don\u2019t have any :(</p>';

        openModal(
            BACK_ARROW_BTN() +
            '<h2 class="address-modal-title">Addresses</h2>' +
            '<div class="address-search">' + SEARCH_ICON + '<input type="text" class="address-search-input" placeholder="Find your address..." /></div>' +
            '<p class="address-list-label">Selected Address:</p>' +
            '<div class="address-card is-selected">' +
            '<div class="address-card-accent"></div>' +
            '<div>' +
            '<div class="address-card-header"><span class="address-card-name">' + selected.label + '</span><span class="address-card-divider"></span><span class="address-card-recipient">' + selected.recipient + '</span></div>' +
            '<p class="address-card-line">' + selected.address + '</p>' +
            '<p class="address-card-line">' + selected.phone + '</p>' +
            '<button type="button" class="address-card-edit" id="editAddressBtn">Edit Address</button>' +
            '</div></div>' +
            '<p class="address-list-label">Your Other Address:</p>' +
            otherHtml +
            '<button type="button" class="modal-submit modal-submit--wide" id="addNewAddressBtn">Add New Address</button>',
            'address'
        );

        wireBack(closeModal);

        modalBox.querySelector('#editAddressBtn').addEventListener('click', function () {
            renderEditAddress(selected);
        });
        modalBox.querySelector('#addNewAddressBtn').addEventListener('click', renderAddNewAddress);
        modalBox.querySelectorAll('.address-card[data-address-id]').forEach(function (card) {
            card.addEventListener('click', function () {
                selectedAddressId = card.dataset.addressId;
                applySelectedAddress();
                closeModal();
            });
        });
    }

    function renderEditAddress(address) {
        openModal(
            BACK_ARROW_BTN() +
            '<h2 class="address-modal-title">Edit Address</h2>' +
            '<div class="address-form">' +
            '<div><label class="address-form-label">Location:</label>' +
            '<div class="address-location-field">' + PIN_ICON + '<span class="address-location-value">' + address.address + '</span><span class="address-location-edit">Edit</span></div></div>' +
            '<div><label class="address-form-label">Point Name:</label>' +
            '<input type="text" class="address-form-input" id="addrPointName" value="' + address.label + '" /></div>' +
            '<div><label class="address-form-label">Recepient\u2019s Name</label>' +
            '<input type="text" class="address-form-input" id="addrRecipientName" value="' + address.recipient + '" /></div>' +
            '<div><label class="address-form-label">Recepient\u2019s Telephone</label>' +
            '<input type="text" class="address-form-input" id="addrRecipientPhone" value="' + address.phone + '" /></div>' +
            '</div>' +
            '<button type="button" class="modal-submit modal-submit--wide" id="saveAddressBtn">Save Edit</button>',
            'address'
        );

        wireBack(renderAddressList);

        modalBox.querySelector('#saveAddressBtn').addEventListener('click', function () {
            address.label = valueOf('addrPointName') || address.label;
            address.recipient = valueOf('addrRecipientName') || address.recipient;
            address.phone = valueOf('addrRecipientPhone') || address.phone;
            applySelectedAddress();
            renderAddressList();
        });
    }

    function renderAddNewAddress() {
        openModal(
            BACK_ARROW_BTN() +
            '<h2 class="address-modal-title">Add New Address</h2>' +
            '<div class="address-form">' +
            '<div><label class="address-form-label">Location:</label>' +
            '<div class="address-location-field">' + PIN_ICON + '<span class="address-location-value is-placeholder">Pick your location...</span><span class="address-location-edit">Edit</span></div></div>' +
            '<div><label class="address-form-label">Point Name:</label>' +
            '<input type="text" class="address-form-input" id="addrPointName" placeholder="Save your address as...." /></div>' +
            '<div><label class="address-form-label">Recepient\u2019s Name</label>' +
            '<input type="text" class="address-form-input" id="addrRecipientName" placeholder="Insert name..." /></div>' +
            '<div><label class="address-form-label">Recepient\u2019s Telephone</label>' +
            '<input type="text" class="address-form-input" id="addrRecipientPhone" placeholder="Insert your number..." /></div>' +
            '</div>' +
            '<button type="button" class="modal-submit modal-submit--wide" id="saveAddressBtn">Save New Address</button>',
            'address'
        );

        wireBack(renderAddressList);

        modalBox.querySelector('#saveAddressBtn').addEventListener('click', function () {
            var newAddress = {
                id: 'addr' + Date.now(),
                label: valueOf('addrPointName') || 'New Address',
                recipient: valueOf('addrRecipientName') || 'John Doe',
                address: addresses[0].address,
                phone: valueOf('addrRecipientPhone') || addresses[0].phone
            };
            addresses.push(newAddress);
            selectedAddressId = newAddress.id;
            applySelectedAddress();
            closeModal();
        });
    }

    function applySelectedAddress() {
        var address = getAddress(selectedAddressId);
        document.getElementById('addressRowName').innerHTML = address.label + '&nbsp;&nbsp;|&nbsp; ' + address.recipient;
        document.getElementById('addressRowSub').textContent = address.address;
    }

    /* ---------------------------------------------------------
       Buy-now redirect flow
       --------------------------------------------------------- */
    function renderPaymentRedirect() {
        if (selectedPayment.category === 'va' || selectedPayment.category === 'minimarket') {
            renderTransferInstructions(selectedPayment);
            return;
        }

        var title = 'Redirecting to payment apps';
        var subtitle = 'You are now being redirected to finish your payment';
        if (selectedPayment.category === 'card') {
            title = 'Redirecting to payment apps';
            subtitle = 'Continue in your card app to complete the transaction';
        } else if (selectedPayment.category === 'ewallet') {
            subtitle = 'Continue in your e-wallet app to complete the transaction';
        } else if (selectedPayment.category === 'cod') {
            subtitle = 'Your order will be confirmed on delivery';
        }

        openModal(
            '<div class="redirect-icon">' + TRANSFER_ICON + '</div>' +
            '<h2 class="redirect-title">' + title + '</h2>' +
            '<p class="redirect-sub">' + subtitle + '</p>' +
            '<div class="modal-btn-stack">' +
            '<button type="button" class="modal-btn-primary" id="redirectConfirm">I have already transferred</button>' +
            '<button type="button" class="modal-btn-secondary" id="redirectBack">Back to Checkout</button>' +
            '</div>',
            ''
        );

        modalBox.querySelector('#redirectConfirm').addEventListener('click', function () {
            closeModal();
            renderOrderSuccess();
        });
        modalBox.querySelector('#redirectBack').addEventListener('click', function () {
            closeModal();
        });
    }

    /* ---------------------------------------------------------
       Order success modal
       --------------------------------------------------------- */
    function renderOrderSuccess() {
        openModal(
            '<div class="success-icon">' + TRUCK_ICON + '</div>' +
            '<h2 class="success-title">Food Ordered Successfully!</h2>' +
            '<p class="success-sub">The chefs are on their way preparing your meal</p>' +
            '<p class="success-time">Estimated Time : 30-40 Mins</p>' +
            '<div class="modal-btn-stack">' +
            '<a href="#" class="modal-btn-primary">Track your Order</a>' +
            '<a href="../index.html" class="modal-btn-secondary">Back to Menu</a>' +
            '</div>',
            ''
        );
    }

    /* ---------------------------------------------------------
       Wire up entry points
       --------------------------------------------------------- */
    document.getElementById('addressRow').addEventListener('click', renderAddressList);

    document.getElementById('paymentPicker').addEventListener('click', renderCategoryList);

    document.getElementById('buyNowBtn').addEventListener('click', function () {
        if (!selectedPayment) {
            showPaymentError();
            return;
        }
        renderPaymentRedirect();
    });

    document.addEventListener('DOMContentLoaded', renderCheckoutSummary);
    window.addEventListener('storage', renderCheckoutSummary);
    renderCheckoutSummary();
})();
