const menu = () => {
  const cardsMenu = document.querySelector(".cards-menu");
/*когда будет объявляться переменная cartArray,
будет проверяться localStorage на присутствие ключа cart 
и если он есть мы положим в переменную все, что находится в 
localStorage, в  ином случае мы создадим пустой массив*/
  const cartArray = localStorage.getItem('cart')?
   JSON.parse(localStorage.getItem('cart')):
   [];

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
  /*функция добавления в корзину*/
  /*cartItem здесь объект, который получили при клике на кнопку в корзину на
  карточке товара*/
  const addToCart = (cartItem) => {
    if(cartArray.some((item) =>  item.id === cartItem.id)){

     cartArray.map((item=>{
      if(item.id === cartItem.id){

        item.count++;
      }
      return item
     }

     ))

    } else {
      cartArray.push(cartItem)
    }
    
    localStorage.setItem('cart', JSON.stringify(cartArray))

  }
/*конец добавления в корзину*/
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
  divCard.querySelector(".button-add-cart").addEventListener("click", () => {

   const cartItem = {
     name: name,
     price: price,
     id:id, //добавили для правильного подсчета в корзине
     count: 1
   }
   addToCart(cartItem);

  })
      cardsMenu.append(divCard);
    });
  };
  //console.log(localStorage.getItem('restaurant'))
  if (localStorage.getItem("restaurant")) {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    changeTitle(restaurant);

    fetch(
      `./db/${restaurant.products}`
    ) /*в обратных кавычкач мы можем исопльзовать js код*/
      .then((response) => response.json())
      .then((data) => {
        renderItems(data);
      })
      .catch((error) => {});
  } else {
    window.location.href = "/";
  }
};
menu();
