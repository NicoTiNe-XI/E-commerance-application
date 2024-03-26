// Appending A Clone Copy Of The Slider For The Repeating Of The Animation
const sliderCopy = document.querySelector(".slider").cloneNode(true);
document.querySelector("section.our-brands").appendChild(sliderCopy);

// Burger Menu Display and Remove
document.querySelector(".burger-menu").addEventListener("click", () => {
    document.querySelector(".burger-menu").querySelector("span").innerHTML = document.querySelector(".burger-menu").querySelector("span").innerHTML === "close" ? "menu" : "close";
    document.querySelector(".burger-menu").querySelector("ul").style.display = document.querySelector(".burger-menu").querySelector("ul").style.display === "block" ? "none" : "block";
})

// Count Down Function
function countDown() {
    const countDate = new Date("December 31, 2024 00:00:00").getTime();
    let intervalId;

    function updateCount() {
        const now = new Date().getTime()
        const gap = countDate - now;

        if (gap <= 0) {
            clearInterval(intervalId);
            document.querySelector(".days").innerHTML = "0";
            document.querySelector(".hours").innerHTML = "00";
            document.querySelector(".minutes").innerHTML = "00";
            document.querySelector(".seconds").innerHTML = "00";
            return;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = String(Math.floor((gap % day) / hour)).padStart(2, '0');
        const textMinute = String(Math.floor((gap % hour) / minute)).padStart(2, '0');
        const textSecond = String(Math.floor((gap % minute) / second)).padStart(2, '0');

        document.querySelector(".days").innerHTML = textDay;
        document.querySelector(".hours").innerHTML = textHour;
        document.querySelector(".minutes").innerHTML = textMinute;
        document.querySelector(".seconds").innerHTML = textSecond;
    }

    updateCount();
    intervalId = setInterval(updateCount, 1000);
}
countDown();

// Slider Function
const sliderImages = Array.from(document.querySelectorAll(".slider-container img"));
const sliderCounter = sliderImages.length;
let counter = 1;
const discountText = document.getElementById("discount-number");
const bullets = document.querySelectorAll(".bullets span");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("previous");

nextButton.onclick = nextSlider;
prevButton.onclick = prevSlider;

function nextSlider() {
    if (nextButton.classList.contains("disabled")) {
        return false;
    } else {
        counter++
        checker()
    }
}

function prevSlider() {
    if (prevButton.classList.contains("disabled")) {
        return false;
    } else {
        counter--
        checker()
    }
}

bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        counter = index + 1;
        checker();
    });
});

function checker() {
    removeActive();
    sliderImages[counter - 1].classList.add("active");
    bullets.forEach((bullet, index) => {
        if (index === counter - 1) {
            bullet.classList.add("active");
        }
        if (bullet.classList.contains("active")) {
            bullet.innerHTML = "radio_button_checked";
        } else {
            bullet.innerHTML = "radio_button_unchecked";
        }
        if (counter === 1) {
            discountText.querySelector(".title").innerHTML = `0${counter}<span></span>Spring Sale`;
            discountText.querySelector(".discount").innerHTML = "30%";
        } else if (counter === 2) {
            discountText.querySelector(".title").innerHTML = `0${counter}<span></span>Spring Sale`;
            discountText.querySelector(".discount").innerHTML = "40%";
        } else if (counter === 3) {
            discountText.querySelector(".title").innerHTML = `0${counter}<span></span>Spring Sale`;
            discountText.querySelector(".discount").innerHTML = "25%";
        } else if (counter === sliderCounter) {
            discountText.querySelector(".title").innerHTML = `0${counter}<span></span>Winter Sale`;
            discountText.querySelector(".discount").innerHTML = "10%";
        }
    });
    prevButton.classList.toggle("disabled", counter === 1);
    nextButton.classList.toggle("disabled", counter === sliderCounter);
}


function removeActive() {
    sliderImages.forEach(function (img) {
        img.classList.remove("active");
    })
    bullets.forEach(bullet => {
        bullet.classList.remove("active");
    })
}

// Fetching Data From Json File
fetch("/element.json").then((res) => {
    if (!res.ok) {
        throw new Error(`HTTP Error! Status: ${res.status}`);
    }
    return res.json();
}).then((data) => {
    usingTheFetchedData(data);
}).catch((error) => {
    console.error("Unable To Fetch Data:", error);
})

function usingTheFetchedData(data) {
    const productsContainer = document.querySelector(".product-content");
    let stars = `<i class="fa fa-star"></i>`;
    data.forEach((data) => {
        let boxes = document.querySelector(".products").content.cloneNode(true);
        boxes.querySelector(".box").classList.add(`${data.gender}-${data.type}`);
        if (data.gender === "Unisex" && data.type === "Fashion") {
            boxes.querySelector(".box").classList.add("Men-Fashion", "Women-Fashion");
        }
        if (data.gender === "Unisex" && data.type === "Accessories") {
            boxes.querySelector(".box").classList.add("Men-Accessories", "Women-Accessories");
        }
        if (data.discount === "true") {
            boxes.querySelector(".box").classList.add("discount");
            boxes.querySelector(".discount-price").innerHTML = `$${data.discountPrice}`;
            boxes.querySelector(".price").innerHTML = `$${data.price}`;
            boxes.querySelector(".price").style.fontSize = "16px";
            boxes.querySelector(".price").style.textDecoration = "line-through";
        }
        boxes.querySelector(".product-name").innerHTML = `${data.title}`;
        boxes.querySelector(".brand").innerHTML = `${data.brand}`;
        boxes.querySelector(".reviews").innerHTML = `(${data.reviews}k) Customer Reviews`;
        boxes.querySelector(".price").innerHTML = `$${data.price}`;
        boxes.querySelector(".stock").innerHTML = `${data.stock} Left In Stock`;
        boxes.querySelector(".star").innerHTML = stars.repeat(Math.round(data.rating));
        boxes.querySelector(".product-image").setAttribute("src", `${data.image}`);
        productsContainer.append(boxes)
    });
}

// Show The Men's Fashion By Default Cause Men's Fashion button Has Active Class
window.addEventListener("load", () => {
    checkingForCategory("Men-Fashion");
});

// Filtering Our Product Via Category
const newArrivalsLinks = document.querySelectorAll(".new-arrivals-links li a");
newArrivalsLinks.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        newArrivalsLinks.forEach((btn) => {
            btn.classList.remove("active")
        });
        e.currentTarget.classList.add("active");
        checkingForCategory(e.currentTarget.id)
    });
});

// Function To Check For The Roles
function checkingForCategory(category) {
    // Declaring Variables
    const boxElement = document.querySelectorAll(".product-content .box");
    const menFashion = document.querySelectorAll(".Men-Fashion")
    const womenFashion = document.querySelectorAll(".Women-Fashion");
    const menAccessories = document.querySelectorAll(".Men-Accessories");
    const womenAccessories = document.querySelectorAll(".Women-Accessories");
    const discount = document.querySelectorAll(".discount");

    // Add Hidden Class For All Products
    boxElement.forEach((box) => {
        box.classList.add("hidden");
    });

    // Showing The Selected Category
    switch (category) {
        case "Men-Fashion":
            menFashion.forEach(box => {
                if (!box.classList.contains("discount")) {
                    box.classList.remove("hidden")
                }
            })
            break;
        case "Women-Fashion":
            womenFashion.forEach(box => {
                if (!box.classList.contains("discount")) {
                    box.classList.remove("hidden")
                }
            })
            break;
        case "Men-Accessories":
            menAccessories.forEach(box => {
                if (!box.classList.contains("discount")) {
                    box.classList.remove("hidden")
                }
            })
            break;
        case "Women-Accessories":
            womenAccessories.forEach(box => {
                if (!box.classList.contains("discount")) {
                    box.classList.remove("hidden")
                }
            })
            break;
        case "discount":
            discount.forEach(box => {
                box.classList.remove("hidden")
            })
            break;
        default:
            break;
    }
}

const backToTop = document.querySelector(".top");
const cart = document.querySelector(".cart");

// Checks If The btn Is Needed To Be Shown
window.onscroll = function () {
    scrollFunction();
};

// Shows The Back To Top Btn On Scroll
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTop.style.display = "block";
        cart.style.display = "block";
    } else {
        backToTop.style.display = "none";
        cart.style.display = "none";
    }
}

// Reset The Page to Top Again
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// Cart Function

function showCart() {
    document.querySelector(".cart-tab").style.display = "block"
}


document.querySelector(".checkout").onclick = () => {
    window.location.href = "./shopping-cart.html"
}

document.querySelector(".cart-close").onclick = () => {
    document.querySelector(".cart-tab").style.display = "none"
}