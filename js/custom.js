

const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const headerMenu = document.getElementById("header");

// Open Close Navbar Menu on Click Burger
if (burgerMenu && navbarMenu) {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });
}

// Close Navbar Menu on Click Menu Links
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("is-active");
    navbarMenu.classList.remove("is-active");
  });
});

// Change Header Background on Scrolling
window.addEventListener("scroll", () => {
  if (this.scrollY >= 85) {
    headerMenu.classList.add("on-scroll");
  } else {
    headerMenu.classList.remove("on-scroll");
  }
});

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (navbarMenu.classList.contains("is-active")) {
      navbarMenu.classList.remove("is-active");
    }
  }
});



// owl carousel - section:3 

console.clear();

/**
 * Class to manage the slider element (events, state, ...) 
 */
class Slider {
  constructor(sliderEl) {
    this.sliderEl = sliderEl;
    this.slides = this.sliderEl.querySelectorAll('.slider__card');
    this.slideCount = this.slides.length;
    this.bulletsContainer = this.sliderEl.querySelector('.slider__bullets');
    this.arrows = {
      prev: this.sliderEl.querySelector('.slider__arrow--prev'),
      next: this.sliderEl.querySelector('.slider__arrow--next'),
    }
    this.bullets = [];

    this.activeIndex = 0;

    this._initializeSlider();
  }

  /* Initialize the slider by creating necessary elements and updating the UI */
  _initializeSlider = () => {
    this._createBullets();
    this._addBulletsToSlider();
    this._addEventListeners();

    this._updateUI();
  }

  /************ SETUP FUNCTIONS *****/

  /* Add event listeners to the slider arrows */
  _addEventListeners = () => {
    this.arrows.prev.addEventListener('click', this._onPrevArrowClick);
    this.arrows.next.addEventListener('click', this._onNextArrowClick);
  }

  /* Go to previous slide on the prev arrow is clicked */
  _onPrevArrowClick = () => {
    this.activeIndex = this.activeIndex - 1;
    if (this.activeIndex < 0) {
      this.activeIndex = this.slideCount - 1;
    }

    this._updateUI();
  }

  /* Go to next slide when the next arrow is clicked */
  _onNextArrowClick = () => {
    this.activeIndex = (this.activeIndex + 1) % this.slideCount;
    this._updateUI();
  }

  /* Create one bullet element corresponding to each of the slides */
  _createBullets = () => {
    this.slides.forEach((slide) => {
      const bullet = document.createElement('button');
      bullet.classList.add('slider__bullet');
      this.bullets.push(bullet);
    })
  }

  /* Add the bullet elements to the slider */
  _addBulletsToSlider = () => {
    this.bullets.forEach((bullet) => {
      this.bulletsContainer.appendChild(bullet);
    })
  }

  /************ UPDATE FUNCTIONS *****/
  
  /* Update the whole UI accordion to the current state */
  _updateUI = () => {
    this._updateActiveBullet();
    this._updateArrowsUI();
    this._updateSlidesUI();
  }

  /* Update the active bullet attribute */
  _updateActiveBullet = () => {
    this.bullets.forEach((bullet, index) => {
      index === this.activeIndex
        ? bullet.setAttribute('active', '')
      : bullet.removeAttribute('active');
    })
  }
  
  /* Update the arrows disabled attribute so they are only clickable when relevant */
  _updateArrowsUI = () => {
    this.activeIndex === 0
      ? this.arrows.prev.setAttribute('disabled', '')
      : this.arrows.prev.removeAttribute('disabled');
    
    this.activeIndex === this.slideCount - 1
      ? this.arrows.next.setAttribute('disabled', '')
      : this.arrows.next.removeAttribute('disabled');
  }
  
  /* Update the active slide */
  _updateSlidesUI = () => {
    this.slides.forEach((slide, index) => {
      index === this.activeIndex
        ? slide.setAttribute('active', '')
        : slide.removeAttribute('active');
    })
  }
}

function init() {
  const slider = document.querySelector('.slider');

  if (!slider) {
    console.warn('Could not get slider element!')
    return;
  }

  new Slider(slider);
}

init();



// Faq Accordion 

const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    const currentlyActiveAccordionItemHeader = document.querySelector(
      ".accordion-item-header.active"
    );
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }
    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});
