import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor (container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach((slide, i) => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    autoPlayActivate() {
        if (this.autoplay) {
            const paused = setInterval(() => this.nextSlide(), 5000);
            this.slides.forEach(slide => {
                if (slide.closest('a')) {
                    slide.addEventListener('mouseenter', () => {
                        clearInterval(paused);
                    });
                    slide.addEventListener('mouseleave', () => {
                        this.autoPlayActivate();
                    });
                }
            })
        }
    }

    nextSlide() {
        this.slides.forEach(slide => {

            if (slide.tagName === "BUTTON") {
                let active = this.slides[this.slides.length - 1];
                this.container.insertBefore(active, slide);
            }

        });

        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            this.slides.forEach(slide => {

                if (slide.tagName === "BUTTON") {
                    let active = this.slides[2];
                    this.container.appendChild(active);
                }

            });

            let active = this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
        });
    }

    init() { 
        this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
        `;
        this.bindTriggers();
        this.decorizeSlides();
        this.autoPlayActivate();   
    }
}