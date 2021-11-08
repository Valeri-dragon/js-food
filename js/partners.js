const partners = () => {
  const cardsRestaurants = document.querySelector(".cards-restaurants");

//пишем функцию для перебора данных из массива с объектами
const renderItems = (data) => {
  //console.log(data);
  data.forEach(
    (elem) => {
      const { image, kitchen, name, price, products, stars, time_of_delivery } = elem;
      const a = document.createElement("a");

      a.setAttribute("href", "/restaurant.html");
      a.classList.add("card");
      a.classList.add("card-restaurant");

      a.dataset.products = products;

      a.innerHTML = `
        <img
        src="${image}"
        alt="${name}"
        class="card-image"
    />
    <div class="card-text">
        <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${time_of_delivery} мин</span>
        </div>
        <div class="card-info">
        <div class="rating">${stars}</div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
        </div>
     </div>`;
a.addEventListener("click", (e)=> {
e.preventDefault();

localStorage.setItem('restaurant', JSON.stringify(elem));
window.location.href = '/restaurant.html';
})
      cardsRestaurants.append(a);
})
};

fetch("https://jsfood-c82ac-default-rtdb.firebaseio.com/db/partners.json")
  .then((response) => response.json())
  .then((data) => {
    // здесь получаем массив объектов с данными
    renderItems(data);
  }) /*метод для работы с серверными запросами
 в первый аргумент метода передается url запроса/
 Метод then() получает call back.
 Далее используем метод response.json() и продолжаем цепочку метода then*/

  /*обработка ошибок методом catch*/
  .catch((error) => {});
/*кроме then и catch есть метод finally(), который отработает
 в любом случае
 будто успехи или ошибка, данный метод используется редко*/
// .finally()
//динамический вывод контента

};
partners();