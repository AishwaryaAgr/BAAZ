gsap.registerPlugin(ScrollTrigger);

let bodyScrollBar;

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const sections = selectAll('.rg__column');
initContent();


function initContent() {
    initPinSteps();
    initScrollTo();

}

// Smoooth Scrollbar
function initSmoothScrollbar() {
    
    bodyScrollBar = Scrollbar.init(select('#viewport'), {damping: 0.07});

    // remove horizontal scrollbar
    bodyScrollBar.track.xAxis.element.remove();

    // keep ScrollTrigger in sync with Smooth Scrollbar
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                bodyScrollBar.scrollTop = value; // setter
            }
            return bodyScrollBar.scrollTop;    // getter
        }
    });
    
    // when the smooth scroller updates, tell ScrollTrigger to update() too: 
    bodyScrollBar.addListener(ScrollTrigger.update);

}



// Reveal Gallery
function initHoverReveal() {
    
    sections.forEach(section => {

        // get componenets for animation
        section.imageBlock = section.querySelector('.rg__image');
        section.image = section.querySelector('.rg__image img');
        section.mask = section.querySelector('.rg__image--mask');
        section.text = section.querySelector('.rg__text');
        section.textCopy = section.querySelector('.rg__text--copy');
        section.textMask = section.querySelector('.rg__text--mask');
        section.textP = section.querySelector('.rg__text--copy p');

        // reset the initial position
        gsap.set([section.imageBlock, section.textMask], { yPercent: -101});
        gsap.set([section.mask, section.textP], { yPercent: 100});
        gsap.set(section.image, { scale: 1.2});

        // add event listeners to each section
        section.addEventListener('mouseenter', createHoverReveal);
        section.addEventListener('mouseleave', createHoverReveal);

    });
}

function createHoverReveal(e){
    // console.log(e.type);

    const { imageBlock, mask, text, textCopy, textMask, textP, image, dataset } = e.target;

    const { color } = dataset;

    let tl = gsap.timeline({
        defaults: {
            duration: 1.8,
            ease: 'power4.out'
        }
    });

    if(e.type === 'mouseenter'){

        tl
            .to([mask, imageBlock, textMask, textP], {
                yPercent: 0, 
                onStart: () => updateBodyColor()
            })
            .to(text, {y: () => -getTextHeight(textCopy)/2}, 0)
            .to(image, {duration: 1.1, scale: 1}, 0);

    } else if(e.type === 'mouseleave') {

        tl
            .to([mask, textP], {yPercent: 100})
            .to([imageBlock, textMask], {yPercent: -101}, 0)
            .to(text, {y: 0}, 0)
            .to(image, {scale: 1.2}, 0);

    }

    return tl;

}

// Portfolio Hover
const updateBodyColor = () => {
    // gsap.to('.fill-background', { backgroundColor: color, ease: 'none'});
    // document.documentElement.style.setProperty('--bcg-fill-color', color);
    console.log("vosdf")
}

// Fixed navigation
function initPinSteps() {
    
    ScrollTrigger.create({
        trigger: '.fixed-nav',
        start: 'top center',
        endTrigger: '#stage9',
        end: 'center center',
        pin: true,
        pinReparent: true
    });

    const getVh = () => {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return vh;
    }

    gsap.utils.toArray('.stage').forEach((stage, index) => {

        const navLinks = gsap.utils.toArray('.fixed-nav li');

        ScrollTrigger.create({
            trigger: stage,
            start: 'top center',
            end: () => `+=${stage.clientHeight+getVh()/10}`,
            toggleClass: {
                targets: navLinks[index],
                className: 'is-active'
            }
        });

    });

}

function initScrollTo(){

    // find all links and animate to the right position
    gsap.utils.toArray('.fixed-nav a').forEach(link => {

        const target = link.getAttribute('href');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(select(target));
            bodyScrollBar.scrollIntoView(select(target), {damping: 0.07, offsetTop: 100});
        });

    });

}

// no window.addEventListener('load') because we are using imagesLoaded for preloading