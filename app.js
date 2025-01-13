const apiURL = "https://6784df9a1ec630ca33a6185f.mockapi.io/data";
const productsContainer = document.getElementById("products");
const createBtn = document.getElementById("create-btn");


function renderProduct(product) {
   const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <h3>${product.title}</h3>
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <button class="update">Update</button>
    <button class="delete">Delete</button>
  `;

  //update-put
  card.querySelector(".update").addEventListener("click", () => {
    const newTitle = prompt("Enter the title:");
    if (newTitle) {
      fetch(`${apiURL}/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "json" },
        body: JSON.stringify({ title: newTitle })
      }).then(() => card.querySelector("h3").textContent = newTitle);
    }
  });

  //delete
  card.querySelector(".delete").addEventListener("click", () => {
    fetch(`${apiURL}/${product.id}`,
      { method: "DELETE" })
      .then(() => card.remove());
  });

  productsContainer.appendChild(card);
}

fetch(apiURL).then(res => res.json()).then(data => {
  data.slice(0, 20).forEach(renderProduct);
});

// Create
createBtn.addEventListener("click", () => {
  const title = prompt("Enter title:");
  const price = prompt("Enter price:");
  const description = prompt("Enter description:");

  //post
  if (title && price && description) {
    fetch(apiURL, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, description })
    }).then(res => res.json()).then(renderProduct);
  }
});
