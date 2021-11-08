const changeTitle = (restaurant) => {
  //console.log(restaurant);
  const { name, price, kitchen, stars } = restaurant;
  const restaurantTitle = document.querySelector(".restaurant-title");
  const sectionHeading = document.querySelector(".section-heading");
  restaurantTitle.textContent = name;
  const infoCard = document.createElement("div");
  infoCard.classList.add("card-info");
  infoCard.innerHTML = `
        <div class="rating">${stars}</div>
              <div class="price">От ${price} ₽</div>
              <div class="category">${kitchen}</div>
        `;
  sectionHeading.append(infoCard);
};

const cardsMenu = document.querySelector(".cards-menu");
const renderItems = (data) => {
  data.forEach(({ description, id, image, name, price }) => {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.innerHTML = `
    <img
    src="${image}"
    alt="${name}"
    class="card-image"
    />
    <div class="card-text">
    <div class="card-heading">
    <h3 class="card-title card-title-reg">${name}</h3>
    </div>
    <!-- /.card-heading -->
    <div class="card-info">
    <div class="ingredients">
       ${description}
    </div>
    </div>
    <!-- /.card-info -->
    <div class="card-buttons">
    <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
    </button>
    <strong class="card-price-bold">${price} ₽</strong>
    </div>
`;
    cardsMenu.append(divCard);
  });
};

if (localStorage.getItem("restaurant")) {
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));
  changeTitle(restaurant);

  fetch(
    `./db/${restaurant.products}`
  ) 
    .then((response) => response.json())
    .then((data) => {
      renderItems(data);
    })
    .catch((error) => {});
} else {
  window.location.href = "/";
}
