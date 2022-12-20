const linkBasketEl = document.querySelector('.header__link-basket');
const basketEl = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.header__link-basket span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const catalogEl = document.querySelector('.catalog__wrp');
const basketTotalEl = document.querySelector('.basketTotal');

const basket = {};

linkBasketEl.addEventListener('click', () => {
    basketEl.classList.toggle('visually-hidden');
});

catalogEl.addEventListener('click', e => {
    if (!e.target.classList.contains('add-to-cart')) {
        return;
    }
    const closestItem = e.target.closest('.catalog__wrp-box');
    const id = +closestItem.dataset.id;
    const name = closestItem.dataset.name;
    const price = +closestItem.dataset.price;
    addToCart(id, name, price);
})

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow')
        .textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span> шт.
            </div>
            <div>$${basket[productId].price}</div>
            <div>
                $<span class="productTotalRow">${(basket[productId].price * basket[productId].count)}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}