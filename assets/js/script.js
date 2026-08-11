/* ==========================================
   HERO SLIDER
========================================== */

const slides = [
    {
        subtitle: "PREMIUM INTERIOR DESIGN",
        title: "Transforming Spaces Into Timeless Beauty",
        description: "We design elegant furniture and premium interiors that combine beauty, comfort and functionality.",
        image: "assets/images/hero/hero-1.jpg"
    },
    {
        subtitle: "MODERN LIVING ROOM",
        title: "Luxury Living Room Interior Design",
        description: "Elegant living spaces designed with premium materials and timeless aesthetics.",
        image: "assets/images/hero/hero-2.jpg"
    },
    {
        subtitle: "MODERN KITCHEN",
        title: "Smart Kitchen For Modern Families",
        description: "Functional kitchen cabinets and beautiful layouts crafted for everyday life.",
        image: "assets/images/hero/hero-3.jpg"
    },
    {
        subtitle: "BEDROOM INTERIOR",
        title: "Comfort Meets Luxury",
        description: "Beautiful bedroom interiors designed for relaxation and elegance.",
        image: "assets/images/hero/hero-4.jpg"
    },
    {
        subtitle: "OFFICE INTERIOR",
        title: "Professional Spaces That Inspire",
        description: "Creative office interiors that improve productivity.",
        image: "assets/images/hero/hero-5.jpg"
    }
];

const heroSubtitle = document.getElementById("hero-subtitle");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");

const image1 = document.getElementById("hero-image-1");
const image2 = document.getElementById("hero-image-2");

const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

const dots = document.querySelectorAll(".dot");
if (nextBtn && prevBtn && image1 && image2) {
    let current = 0;
    let showingFirst = true;
    let autoSlide;

    /* ========================= */

    function updateDots(index) {

        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");

    }

    /* ========================= */

    function changeSlide(index) {

        heroSubtitle.textContent = slides[index].subtitle;
        heroTitle.textContent = slides[index].title;
        heroDescription.textContent = slides[index].description;

        heroSubtitle.classList.remove("text-animate");
        heroTitle.classList.remove("text-animate");
        heroDescription.classList.remove("text-animate");

        void heroTitle.offsetWidth;

        heroSubtitle.classList.add("text-animate");
        heroTitle.classList.add("text-animate");
        heroDescription.classList.add("text-animate");

        const activeImage = showingFirst ? image1 : image2;
        const hiddenImage = showingFirst ? image2 : image1;

        hiddenImage.src = slides[index].image;

        hiddenImage.classList.add("active");
        activeImage.classList.remove("active");

        showingFirst = !showingFirst;

        updateDots(index);

    }

    /* ========================= */

    function nextSlide() {

        current++;

        if (current >= slides.length) {

            current = 0;

        }

        changeSlide(current);

    }

    /* ========================= */

    function prevSlide() {

        current--;

        if (current < 0) {

            current = slides.length - 1;

        }

        changeSlide(current);

    }

    /* ========================= */

    nextBtn.addEventListener("click", nextSlide);

    prevBtn.addEventListener("click", prevSlide);

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            current = index;

            changeSlide(current);

        });

    });

    /* ========================= */

    function startAuto() {

        autoSlide = setInterval(nextSlide, 5000);

    }

    function stopAuto() {

        clearInterval(autoSlide);

    }

    document.querySelector(".hero-slider").addEventListener("mouseenter", stopAuto);

    document.querySelector(".hero-slider").addEventListener("mouseleave", startAuto);

    /* ========================= */

    document.addEventListener("keydown", (e) => {

        if (e.key === "ArrowRight") nextSlide();

        if (e.key === "ArrowLeft") prevSlide();

    });

    /* ========================= */

    startAuto();


    /* ==========================================
       HEADER SCROLL EFFECT
    ========================================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

    /* ==========================================
       MOBILE SWIPE SUPPORT
    ========================================== */

    const slider = document.querySelector(".hero-slider");

    let startX = 0;
    let endX = 0;

    slider.addEventListener("touchstart", (e) => {

        startX = e.touches[0].clientX;

    });

    slider.addEventListener("touchend", (e) => {

        endX = e.changedTouches[0].clientX;

        handleSwipe();

    });

    function handleSwipe() {

        const distance = startX - endX;

        if (distance > 50) {

            nextSlide();

        } else if (distance < -50) {

            prevSlide();

        }

    }
}
/* ==========================================
   DESIGN SERVICE SLIDER
========================================== */

const serviceSliders = document.querySelectorAll(".service-slider");

serviceSliders.forEach((slider) => {

    const images = slider.querySelectorAll(".service-image");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const dotsContainer = slider.querySelector(".service-dots");

    /* Stop if there are no images */

    if (!images.length) {
        return;
    }

    let current = 0;
    let autoSlide;


    /* ==========================================
       CREATE DOTS
    ========================================== */

    if (dotsContainer) {

        images.forEach((_, index) => {

            const dot = document.createElement("span");

            dot.classList.add("service-dot");

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {

                current = index;

                showSlide();

            });

            dotsContainer.appendChild(dot);

        });

    }


    const dots = dotsContainer
        ? dotsContainer.querySelectorAll(".service-dot")
        : [];


    /* ==========================================
       SHOW SLIDE
    ========================================== */

    function showSlide() {

        images.forEach((img) => {
            img.classList.remove("active");
        });

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });


        if (images[current]) {
            images[current].classList.add("active");
        }

        if (dots[current]) {
            dots[current].classList.add("active");
        }

    }


    /* ==========================================
       NEXT
    ========================================== */

    function nextSlide() {

        current++;

        if (current >= images.length) {
            current = 0;
        }

        showSlide();

    }


    /* ==========================================
       PREVIOUS
    ========================================== */

    function prevSlide() {

        current--;

        if (current < 0) {
            current = images.length - 1;
        }

        showSlide();

    }


    /* ==========================================
       NEXT BUTTON
    ========================================== */

    if (nextBtn) {

        nextBtn.addEventListener("click", nextSlide);

    }


    /* ==========================================
       PREVIOUS BUTTON
    ========================================== */

    if (prevBtn) {

        prevBtn.addEventListener("click", prevSlide);

    }


    /* ==========================================
       AUTO SLIDE
    ========================================== */

    function startAuto() {

        if (images.length <= 1) {
            return;
        }

        autoSlide = setInterval(nextSlide, 10000);

    }


    function stopAuto() {

        if (autoSlide) {
            clearInterval(autoSlide);
        }

    }


    /* ==========================================
       PAUSE ON HOVER
    ========================================== */

    slider.addEventListener("mouseenter", stopAuto);

    slider.addEventListener("mouseleave", startAuto);


    /* ==========================================
       START AUTO SLIDE
    ========================================== */

    startAuto();

});
/* =========================================================
   PRODUCT SYSTEM
========================================================= */

const productGrid = document.querySelector(".product-grid");
const productSectionTitle =
    document.querySelector("#product-section-title");

if (productGrid) {

    const urlParams = new URLSearchParams(window.location.search);

    const selectedCategory = urlParams.get("category");

    fetch("assets/data/products.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("Products data could not be loaded.");
            }

            return response.json();

        })

        .then(products => {

            let filteredProducts = products;

            /* -----------------------------------------
               UPDATE PRODUCT SECTION TITLE
            ----------------------------------------- */

            if (selectedCategory && productSectionTitle) {

                productSectionTitle.textContent =
                    selectedCategory + " Furniture";

            } else if (productSectionTitle) {

                productSectionTitle.textContent =
                    "All Furniture";

            }
            /* -----------------------------------------
               FILTER BY CATEGORY
            ----------------------------------------- */

            if (selectedCategory) {

                filteredProducts = products.filter(product =>
                    product.category.toLowerCase() ===
                    selectedCategory.toLowerCase()
                );

            }


            /* -----------------------------------------
               SHOW PRODUCTS
            ----------------------------------------- */

      if (filteredProducts.length === 0) {

    productGrid.innerHTML = `

        <div class="no-products">

            <div class="no-products-icon">

                <i class="fa-solid fa-couch"></i>

            </div>

            <h3>
                Looking for Something Custom?
            </h3>

            <p>
                We don't have a ready-made product in this category yet.
                But that's not a problem. Share your preferred design,
                measurements or requirements with us, and we'll create
                it specially for your space.
            </p>

            <a href="contact.html" class="primary-btn">

                Request Custom Furniture

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        </div>

    `;

    return;

}

            filteredProducts.forEach(product => {

                const card = document.createElement("div");

                card.classList.add("product-card");


                card.innerHTML = `

                    <div class="product-image">

                        <img
                            src="${product.images[0]}"
                            alt="${product.name}"
                        >

                        <span class="product-category">

                            ${product.category}

                        </span>

                    </div>


                    <div class="product-info">

                        <h3>

                            ${product.name}

                        </h3>


                        <span class="product-id">

                            Product ID: ${product.id}

                        </span>


                        <div class="product-bottom">

                            <strong>

                                ৳${product.price.toLocaleString()}

                            </strong>


                            <a
                                href="product-details.html?id=${product.id}"
                                class="product-link"
                            >

                                View Details

                                <i class="fa-solid fa-arrow-right"></i>

                            </a>

                        </div>

                    </div>

                `;


                productGrid.appendChild(card);

            });

        })

        .catch(error => {

            console.error("Product Error:", error);

        });

}
/* ==========================================
   SMART HEADER
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".header");

    if (!header) return;


    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {

        const currentScrollY = window.scrollY;


        /* ------------------------------------------
           At the very top
        ------------------------------------------ */

        if (currentScrollY <= 20) {

            header.classList.remove("header-hidden");

            header.classList.add("header-visible");

            lastScrollY = currentScrollY;

            return;
        }


        /* ------------------------------------------
           Scrolling Down
        ------------------------------------------ */

        if (currentScrollY > lastScrollY) {

            header.classList.remove("header-visible");

            header.classList.add("header-hidden");

        }


        /* ------------------------------------------
           Scrolling Up
        ------------------------------------------ */

        else if (currentScrollY < lastScrollY) {

            header.classList.remove("header-hidden");

            header.classList.add("header-visible");

        }


        lastScrollY = currentScrollY;

    });

});