const auth = () => {
  const buttonAuth = document.querySelector(".button-auth");
  const modalAuth = document.querySelector(".modal-auth");
  const closeAuth = document.querySelector(".close-auth");
  const logInForm = document.getElementById("logInForm");
  const inputLogin = document.getElementById("login");
  const inputPassword = document.getElementById("password");
  const userName = document.querySelector(".user-name");
  const buttonOut = document.querySelector(".button-out");
  const buttonCart = document.querySelector(".button-cart");

  const login = (user) => {
    buttonAuth.style.display = "none";
    buttonOut.style.display = "flex";
    userName.style.display = "flex";
    buttonCart.style.display = "flex";

    userName.textContent = user.login;
    modalAuth.style.display = "none";
  };
  const logOut = () => {
    userName.style.display = "none";
    buttonOut.style.display = "none";
    buttonCart.style.display = "none";
    userName.textContent = "";
    buttonAuth.style.display = "flex";

    localStorage.removeItem("user");
  };

  buttonAuth.addEventListener("click", () => {
    modalAuth.style.display = "flex";
  });
  modalAuth.addEventListener("click", (event) => {
    if (event.target === closeAuth || event.target === modalAuth) {
      modalAuth.style.display = "none";
    }
  });
  logInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };
    let newSpan = document.querySelector(".error");

    if (user.login == "") {
      newSpan.innerHTML = "Заполните поле";
    } else {
      newSpan = "";
      localStorage.setItem("user", JSON.stringify(user));
      login(user);
    }

    /* for (let elem of logInForm.elements) {
    if (elem.tagName === "INPUT" && !elem.classList.contains("button-login")) {
      console.log(elem.value);
      const user = {
          elem
      }
    }
  }*/
  });
  buttonOut.addEventListener("click", logOut);
  if (localStorage.getItem("user")) {
    login(JSON.parse(localStorage.getItem("user")));
  }
};
auth();
