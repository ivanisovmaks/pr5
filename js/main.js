document.addEventListener('DOMContentLoaded', function () {

    fetch('db/partners.json')
        .then(response => response.json())
        .then(restaurantsData => {
            const restaurantsContainer = document.getElementById('restaurantsContainer');
            const menuContainer = document.getElementById('menuContainer');
            const restaurantTitle = document.querySelector('.restaurant-title');
            const restaurantInfo = document.querySelector('.restaurant-info'); 

            const authModal = document.getElementById('authModal');
            const authButton = document.getElementById('authButton');
            const logoutButton = document.getElementById('logoutButton');
            const closeAuthButton = document.getElementById('closeAuth');
            const logInForm = document.getElementById('logInForm');
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const loginName = document.getElementById('loginName');
            const userLogin = document.getElementById('userLogin');
            const searchInput = document.querySelector('.input-search');
    
            
            function showAuthModal() {
                resetInputFields();
                authModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
    
    
            function closeModal() {
                authModal.style.display = 'none';
                document.body.style.overflow = '';
                resetInputStyles();
                resetInputFields();
            }
    
           
            function renderRestaurants() {
                if (!restaurantsContainer) {
                    console.error('restaurantsContainer не найден!');
                    return;
                }
            
                restaurantsContainer.innerHTML = '';
                restaurantsData.forEach((restaurant) => {
                    const restaurantCard = `
                        <div class="card" data-name="${restaurant.name}" data-link="${restaurant.products}">
                            <img src="${restaurant.image}" alt="${restaurant.name}" class="card-image" />
                            <div class="card-text">
                                <div class="card-heading">
                                    <h3 class="card-title">${restaurant.name}</h3>
                                </div>
                                <div class="card-info">
                                    <div class="card-info-row">
                                        <span class="card-info-label">Час доставки:</span>
                                        <span class="card-info-value">${restaurant.time_of_delivery} хвилин</span>
                                    </div>
                                    <div class="card-info-row">
                                        <span class="card-info-label">Рейтинг:</span>
                                        <span class="rating">${restaurant.stars}</span>
                                    </div>
                                    <div class="card-info-row">
                                        <span class="card-info-label">Ціна:</span>
                                        <span class="card-info-value">від ${restaurant.price} ₴</span>
                                    </div>
                                    <div class="card-info-row">
                                        <span class="card-info-label">Кухня:</span>
                                        <span class="card-info-value">${restaurant.kitchen}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    restaurantsContainer.innerHTML += restaurantCard;
                });
            
                document.querySelectorAll('.card').forEach(card => {
                    card.addEventListener('click', function () {
                        if (!localStorage.getItem('username')) {
                            showAuthModal(); 
                        } else {
                            const restaurantName = card.dataset.name;
                            localStorage.setItem('selectedRestaurant', restaurantName); 
                            window.location.href = "restaurant.html";  
                        }
                    });
                });
            }
            
              
            function renderMenu() {
                if (!menuContainer) {
                    console.error('menuContainer не найден!');
                    return;
                }
    
               
                const restaurantName = localStorage.getItem('selectedRestaurant');
                if (restaurantName && restaurantTitle) {
                    restaurantTitle.textContent = restaurantName;  
                }
    
                
                const restaurant = restaurantsData.find(r => r.name === restaurantName);
                if (restaurant) {
                
                    if (restaurantInfo) {
                        restaurantInfo.innerHTML = `
                            <div><strong>Час доставки:</strong> ${restaurant.time_of_delivery} хвилин</div>
                            <div><strong>Ціна:</strong> від ${restaurant.price} ₴</div>
                            <div><strong>Категорія:</strong> ${restaurant.kitchen}</div>
                        `;
                    }
    
                    const menuFile = restaurant.products;
                    if (menuFile) {
                        fetch(menuFile)
                            .then(response => response.json())
                            .then(menuData => {
                                menuContainer.innerHTML = '';
                                menuData.forEach(item => {
                                    const menuCard = `
                                        <div class="card">
                                            <img src="${item.image}" alt="${item.name}" class="card-image" />
                                            <div class="card-text">
                                                <div class="card-heading">
                                                    <h3 class="card-title">${item.name}</h3>  <!-- Название блюда -->
                                                </div>
                                                <div class="card-info">
                                                    <div class="ingredients">${item.description}</div>  <!-- Описание блюда -->
                                                </div>
                                                <div class="card-buttons">
                                                    <button class="button button-primary button-add-cart">
                                                        <span class="button-card-text">У кошик</span>
                                                    </button>
                                                    <strong class="card-price-bold">${item.price} ₴</strong>  <!-- Цена -->
                                                </div>
                                            </div>
                                        </div>`;
                                    menuContainer.innerHTML += menuCard;
                                });
                            })
                            .catch(error => {
                                console.error('Ошибка загрузки меню:', error);
                            });
                    }
                }
            }
    
           
            function resetInputStyles() {
                usernameInput.style.borderColor = '';
                passwordInput.style.borderColor = '';
            }
    
          
            function resetInputFields() {
                usernameInput.value = '';
                passwordInput.value = '';
            }
    
           
            authButton.addEventListener('click', function () {
                if (!localStorage.getItem('username')) {
                    showAuthModal();
                }
            });
    
            
            closeAuthButton.addEventListener('click', closeModal);
    
          
            window.addEventListener('click', function (event) {
                if (event.target === authModal) {
                    closeModal();
                }
            });
    
    
            logInForm.addEventListener('submit', function (event) {
                event.preventDefault();
    
                let hasError = false;
    
           
                if (usernameInput.value.length < 4 || usernameInput.value.length > 16) {
                    usernameInput.style.borderColor = 'red';
                    hasError = true;
                } else {
                    usernameInput.style.borderColor = '';
                }
    
                if (passwordInput.value.length < 5 || passwordInput.value.length > 20) {
                    passwordInput.style.borderColor = 'red';
                    hasError = true;
                } else {
                    passwordInput.style.borderColor = '';
                }
    
                if (hasError) {
                    return;
                }
    
                
                localStorage.setItem('username', usernameInput.value);
    
                
                authButton.style.display = 'none';
                logoutButton.style.display = 'block';
                userLogin.style.display = 'block';
                loginName.textContent = usernameInput.value;
    
                closeModal();
            });
    
     
            logoutButton.addEventListener('click', function () {
                localStorage.removeItem('username');
                authButton.style.display = 'block';
                logoutButton.style.display = 'none';
                userLogin.style.display = 'none';
            });
    
          
            const username = localStorage.getItem('login');
            if (username) {
                authButton.style.display = 'none';
                logoutButton.style.display = 'block';
                userLogin.style.display = 'block';
                loginName.textContent = username;
            }
    
           
            renderRestaurants();

            // Пошук страв і ресторанів
            function performSearch(query) {
                query = query.trim().toLowerCase();

                if (!query) {
                    searchInput.style.borderColor = 'red';
                    setTimeout(() => {
                        searchInput.style.borderColor = '';
                    }, 2000);
                    return;
                }

                restaurantsContainer.innerHTML = '';

                const results = [];

                restaurantsData.forEach((restaurant) => {
                    // Пошук серед ресторанів
                    if (restaurant.name.toLowerCase().includes(query)) {
                        results.push({
                            type: 'restaurant',
                            data: restaurant,
                        });
                    }

                    // Пошук серед страв у меню
                    fetch(restaurant.products)
                        .then(response => response.json())
                        .then(menuData => {
                            menuData.forEach((dish) => {
                                if (dish.name.toLowerCase().includes(query)) {
                                    results.push({
                                        type: 'dish',
                                        data: {
                                            restaurantName: restaurant.name,
                                            dish: dish,
                                        },
                                    });
                                }
                            });

                            // Рендер результатів пошуку
                            renderSearchResults(results);
                        });
                });
            }

            function renderSearchResults(results) {
                if (results.length === 0) {
                    restaurantsContainer.innerHTML = `<p>Нічого не знайдено</p>`;
                    return;
                }

                results.forEach((result) => {
                    if (result.type === 'restaurant') {
                        const restaurant = result.data;
                        restaurantsContainer.innerHTML += `
                            <div class="card">
                                <img src="${restaurant.image}" alt="${restaurant.name}" class="card-image" />
                                <div class="card-text">
                                    <h3 class="card-title">${restaurant.name}</h3>
                                    <p>Кухня: ${restaurant.kitchen}</p>
                                </div>
                            </div>
                        `;
                    } else if (result.type === 'dish') {
                        const { restaurantName, dish } = result.data;
                        restaurantsContainer.innerHTML += `
                            <div class="card">
                                <img src="${dish.image}" alt="${dish.name}" class="card-image" />
                                <div class="card-text">
                                    <h3 class="card-title">${dish.name}</h3>
                                    <p>${dish.description}</p>
                                    <p>Ресторан: ${restaurantName}</p>
                                </div>
                            </div>
                        `;
                    }
                });
            }

            searchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    performSearch(searchInput.value);
                }
            });

            if (window.location.pathname.includes("restaurant.html")) {
                renderMenu();
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных ресторанов:', error);
        });

	const swiper = new Swiper('.swiper', {
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
});