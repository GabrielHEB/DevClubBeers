console.log("Search.js carregado!");

const searchIcon = document.querySelector('.icons img:first-child');
const menuItems = document.querySelectorAll('.menu .box');

function showAllItems() {
    menuItems.forEach(item => {
        item.style.display = 'block';
    });
    document.querySelector("#search-indicator").textContent = "";
}

searchIcon.addEventListener('click', () => {
    const query = prompt("Digite o nome do produto:");
    const searchIndicator = document.querySelector("#search-indicator");

    if (query) {
        menuItems.forEach(item => {
            const name = item.querySelector('h3').innerText.toLowerCase();
            item.style.display = name.includes(query.toLowerCase()) ? 'block' : 'none';
        });

        searchIndicator.textContent = `Resultados para: "${query}"`;
    } else {
        showAllItems();
    }
});

document.querySelector("#show-all-btn").addEventListener('click', showAllItems);
