console.log("Cart.js carregado!");

const cart = [];
const cartList = document.querySelector("#cart-items");
const clearCartButton = document.querySelector("#clear-cart");
const checkoutButton = document.querySelector("#checkout");
const cartTotal = document.querySelector("#cart-total");

const productPrices = {
    "Maltada": 15.99,
    "Pé Na Areia": 19.99,
    "CoffeBeer": 19.99,
    "Nórdica": 19.99,
    "Cerveja Do Padre": 19.99,
    "Especial Da Casa": 19.99,
};


const addToCartButtons = document.querySelectorAll('.menu .btn');


addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const itemBox = button.parentElement;
        const itemName = itemBox.querySelector('h3').innerText;
        const quantity = parseInt(itemBox.querySelector('.quantity').value);

        console.log(`Produto: ${itemName}, Quantidade: ${quantity}`);


        const cartItem = cart.find(item => item.name === itemName);
        if (cartItem) {
            cartItem.quantity += quantity;
            alert(`Quantidade atualizada: ${cartItem.quantity}x ${itemName}`);
        } else if (productPrices[itemName] !== undefined) {

            cart.push({ name: itemName, quantity, price: productPrices[itemName] });
            alert(`${quantity}x ${itemName} foi adicionado ao carrinho!`);
        } else {
            alert(`Erro: Preço do produto "${itemName}" não encontrado.`);
            console.error(`Produto sem preço no objeto: ${itemName}`);
        }

        updateCart();
    });
});


function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.quantity}x ${item.name} - R$ ${(item.quantity * item.price).toFixed(2)}`; // Exibe a quantidade, nome e subtotal
        cartList.appendChild(li);
        total += item.quantity * item.price;
    });


    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    console.log(`Total do Carrinho: R$ ${total.toFixed(2)}`);
}


clearCartButton.addEventListener('click', () => {
    cart.length = 0;
    updateCart();
    alert("Carrinho limpo!");
});


checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
    } else {
        alert(`Compra finalizada! Você comprou: \n${cart.map(item => `${item.quantity}x ${item.name}`).join('\n')}\nTotal: R$ ${cart.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)}`);
        cart.length = 0;
        updateCart();
    }
});
