document.addEventListener("DOMContentLoaded", function () {
    const authButton = document.querySelector(".button-auth");
    const logoutButton = document.querySelector(".button-out");
    const modalAuth = document.querySelector(".modal-auth");
    const closeAuthButton = document.querySelector(".close-auth");
    const loginForm = document.getElementById("logInForm");
    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");
    const userNameSpan = document.querySelector(".user-name");
    const cardsContainer = document.querySelector(".cards.cards-restaurants");

    const restaurants = [
        {
            name: "Піца плюс",
            image: "img/pizza-plus/preview.jpg",
            time: "50 хвилин",
            rating: 4.5,
            price: "від 200 ₴",
            category: "Піца"
        },
        {
            name: "Танукі",
			image: "img/tanuki/preview.jpg",
            time: "60 хвилин",
            rating: 4.5,
            price: "От 1 200 ₴",
            category: "Суші, роли"
        },
        {
            name: "FoodBand",
			image: "img/food-band/preview.jpg",
            time: "40 хвилин",
            rating: 4.5,
            price: "От 150 ₴",
            category: "Піца"
        },
        {
            name: "Ikigai",
			image: "img/palki-skalki/preview.jpg",
            time: "55 хвилин",
            rating: 4.5,
            price: "От 250 ₴",
            category: "Піца"
        },
        {
            name: "Пузата хата",
			image: "img/gusi-lebedi/preview.jpg",
            time: "75 хвилин",
            rating: 4.5,
            price: "От 300 ₴",
            category: "Українські страви"
        },
        {
            name: "PizzaBurger",
			image: "img/pizza-burger/preview.jpg",
            time: "45 хвилин",
            rating: 4.5,
            price: "От 700 ₴",
            category: "Піца"
        }
    ];

    function generateRestaurantCards() {
        restaurants.forEach(restaurant => {
            const cardHTML = `
                <a href="#" class="card card-restaurant">
                    <img src="${restaurant.image}" alt="image" class="card-image" />
                    <div class="card-text">
                        <div class="card-heading">
                            <h3 class="card-title">${restaurant.name}</h3>
                            <span class="card-tag tag">${restaurant.time}</span>
                        </div>
                        <div class="card-info">
                            <div class="rating">${restaurant.rating}</div>
                            <div class="price">${restaurant.price}</div>
                            <div class="category">${restaurant.category}</div>
                        </div>
                    </div>
                </a>
            `;
            cardsContainer.insertAdjacentHTML("beforeend", cardHTML);
        });
    }

    cardsContainer.addEventListener("click", function (event) {
		const card = event.target.closest(".card-restaurant");

		if (!card) return;
		
		event.preventDefault();

		if (!localStorage.getItem("login")) {
			modalAuth.style.display = "flex";
			document.body.style.overflow = "hidden";
		} else {
			window.location.href = "restaurant.html";
		}
	});


    authButton.addEventListener("click", () => {
        modalAuth.style.display = "flex";
        document.body.style.overflow = "hidden";
        resetInputBorders();
    });

    closeAuthButton.addEventListener("click", () => {
        closeModal();
    });

    modalAuth.addEventListener("click", (event) => {
        if (event.target === modalAuth) {
            closeModal();
        }
    });

    if (localStorage.getItem("login")) {
        displayLoggedIn(localStorage.getItem("login"));
    } else {
        displayLoggedOut();
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        if (login && password) {
            localStorage.setItem("login", login);
            displayLoggedIn(login);
            closeModal();
        } else {
            if (!login) loginInput.style.borderColor = "red";
            if (!password) passwordInput.style.borderColor = "red";
            alert("Будь ласка, введіть логін та пароль.");
        }
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("login");
        displayLoggedOut();
    });

    function closeModal() {
        modalAuth.style.display = "none";
        document.body.style.overflow = "";
        resetInputBorders();
    }

    function resetInputBorders() {
        loginInput.style.borderColor = "";
        passwordInput.style.borderColor = "";
    }

    function displayLoggedIn(login) {
        authButton.style.display = "none";
        logoutButton.style.display = "inline-block";
        userNameSpan.textContent = login;
        userNameSpan.style.display = "inline";
        loginInput.value = "";
        passwordInput.value = "";
    }

    function displayLoggedOut() {
        authButton.style.display = "inline-block";
        logoutButton.style.display = "none";
        userNameSpan.textContent = "";
        userNameSpan.style.display = "none";
        loginInput.value = "";
        passwordInput.value = "";
    }

    generateRestaurantCards();
});

document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.swiper', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
});

