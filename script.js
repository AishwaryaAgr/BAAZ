// Owlcarousel
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        center: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    });
});

const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");
//END SECTION
const section = document.querySelector("section");
const end = section.querySelector("h1");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 9000,
  triggerElement: intro,
  triggerHook: 0
})
//   .addIndicators()
  .setPin(intro)
  .addTo(controller);

//Text Animation
const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim)
  .addTo(controller);

//Video Animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on("update", e => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  console.log(scrollpos, delay);

  video.currentTime = delay;
}, 33.3);


const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');
class Carousel {

    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
            el.classList.remove('gallery-item-6');
            el.classList.remove('gallery-item-7');
        });

        this.carouselArray.slice(0, 7).forEach((el,i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }
    setCurrentState(direction) {
        if (direction.className == "gallery-controls-previous") {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls(){
        this.carouselControls.forEach(control=>{
            galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
            document.querySelector(`.gallery-controls-${control}`).innerHTML = control;
        });
    }

    useControls(){
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control=>{
            control.addEventListener('click', e=>{
                e.preventDefault();
                this.setCurrentState(control);
            })
        })

    }

}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
exampleCarousel.setControls();
exampleCarousel.useControls();
