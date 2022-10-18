
// Owlcarousel
$(document).ready(function () {
    
    console.log("Hello Friend");
    
    const line = document.querySelector(".newDev");
    line.innerHTML="Baaz Bikes"

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

// console.log("Hisdf");

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
  var vids = document.getElementById("vid1");
//   console.log(vids);
//   await vids.play();
});

setInterval(()=>{
  delay += (scrollpos - delay) * accelamount;
  video.currentTime = delay;
},50)

setInterval(() => {
  var page5 = document.getElementById("ContainerPage5");
  var finder = document.getElementById("finder");
  var pos = page5.getBoundingClientRect();
  var topPos = 0;
  finder.style.top = "20vh"
  if(pos.top <= 0){
    finder.style.position = "fixed";
    finder.style.left = "16.8vw";
    if(pos.bottom < 720){
      topPos= pos.bottom - 600;
      finder.style.top = topPos;
    }
    if(pos.bottom <=400){
      finder.style.position = "absolute";
      finder.style.left = "6.8vw";
    }

  }
  else{
    finder.style.position = "absolute";
    finder.style.left = "6.8vw";
  }

  console.log(pos.bottom);
}, 30);

var logo = document.getElementById("logo_p1");
logo.addEventListener('click', ()=>{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})


function changeClass(task, tab){
  var element = document.getElementById("slider-"+tab);
  if(task == "add"){
      element.classList.add("slider1");
  }
  else{
      element.classList.remove("slider1");
  }
}

function changeTo(event){
  var current = event.target.id;
  console.log(current);
  tabArray = ["tab1", "tab2", "tab3"];

  tabArray.forEach(tab=>{
      if(tab==current){
          changeClass("add",tab);
      }
      else{
          changeClass("remove",tab);
      }
  })

}

document.querySelectorAll("input[name='tab-control']").forEach((input) => {
  input.addEventListener('change', changeTo);
});