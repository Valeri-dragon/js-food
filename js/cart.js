const cart = () => {
  const buttonCart = document.getElementById("cart-button");
  const modalCart = document.querySelector(".modal-cart");
  const close = document.querySelector(".close");
  const modalBody = document.querySelector(".modal-body");
  const btnMakingOrder = document.querySelector(".button-order");
  const clearCart = document.querySelector(".clear-cart");
  const resetCart = () => {
    modalBody.innerHTML = "";
    localStorage.removeItem("cart");
    modalCart.classList.remove("is-open");
  };
 
  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.map((item) => {
  
      if (item.id === id) {
        item.count++;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItems(cartArray);
  };
  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.map((item) => {
      
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
        
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItems(cartArray);
  };
  
  const renderItems = (data) => {
    modalBody.innerHTML = "";
    data.forEach((cartItem) => {
      const { count, id, name, price } = cartItem;
      const cartElem = document.createElement("div");
      cartElem.classList.add("food-row");
      cartElem.innerHTML = `
        <span class="food-name">${name}</span>
        <strong class="food-price">${price}</strong>
        <div class="food-counter">
          <button class="counter-button btn-dec" data-index="${id}"  >-</button>
          <span class="counter">${count}</span>
          <button class="counter-button btn-inc" data-index="${id}">+</button>
        </div>
        `;
      modalBody.append(cartElem);
    });
  };

  clearCart.addEventListener("click", resetCart);

  modalBody.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("btn-inc")) {
      incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains("btn-dec")) {
      decrementCount(e.target.dataset.index);
    }
  });

  
  btnMakingOrder.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart");

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: cartArray,
    })
      .then((response) => {
        if (response.ok) {
          resetCart();
        }
      })
      .catch();
  });
  buttonCart.addEventListener("click", () => {
    if (localStorage.getItem("cart")) {
      renderItems(JSON.parse(localStorage.getItem("cart")));
    }
    if (!modalCart.classList.contains("is-open")) {
      modalCart.classList.add("is-open");
    } else {
      modalCart.classList.remove("is-open");
    }
  });
  modalCart.addEventListener("click", (event) => {
    if (event.target === close || event.target === modalCart) {
      modalCart.classList.remove("is-open");
    }
  });
 
};
cart();
