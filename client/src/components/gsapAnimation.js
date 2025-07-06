import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger'


export const HomeNavbarAnimation = () => {

    gsap.fromTo(
        ".navbar",
        { y: -100 },
        { y: 0, stagger: 1, duration: 1 })

    gsap.fromTo(
        ".navbar-contents",
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, delay: 0.6, stagger: { each: 0.3, from: "end" } })

}

export const HomePageHeroSection = () => {

    const tl = gsap.timeline()

    // Reveal from bottom to top
    tl.to('.hero-overlay', {
        height: 0,
        duration: 1.5,
        ease: 'power3.inOut',
    })

    gsap.registerPlugin(SplitText)
    let split = new SplitText(".hero-title", { type: "words,chars" })

    // Fade in text sequentially
    tl.from(split.chars, { y: 30, autoAlpha: 0, delay: 0.5, stagger: 0.05 }, '-=1')
        .from(".hero-subtext", { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(".hero-login", { opacity: 0, x: -30, duration: 0.6 }, '-=0.5')
        .from(".hero-register", { opacity: 0, x: 30, duration: 0.6 }, '-=0.6')
}


export const HomePageContentSection = () => {

    const tl = gsap.timeline();

    tl.to('.carousel-overlay', {
        height: 0,
        duration: 1.5,
        ease: 'power2.inOut',
    }).from(".carousel-image", {
        scale: 2,
        duration: 1.2,
        ease: 'power2.out',
    }, '-=1.3');

    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
        ".section-title",
        { y: 50, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
                trigger: '.section-title',
                start: 'top 80%'
            }
        }
    )

    gsap.fromTo(
        "#info-card",
        { x: 500, opacity: 0 },
        {
            x: 0, opacity: 1, ease: 'bounce.out', stagger: {
                each: 0.5,
                from: 'start',
                delay: 1
            },
            scrollTrigger: {
                trigger: "#info-card",
                start: 'top 70%',

            }
        }
    )
}


export const UserSection = () => {

    const tl = gsap.timeline()
    gsap.registerPlugin(SplitText)

    tl.to('.hero-overlay', {
        width: 0,
        duration: 1,
        ease: 'power3.inOut',
    })

    setTimeout(() => {
        const splitWelcome = new SplitText(".welcome-part", { type: "words, chars" })
        const splitUsername = new SplitText(".user-name", { type: "words, chars" })
        tl.from(
            splitWelcome.chars,
            { y: 30, autoAlpha: 0, delay: 1, stagger: { each: 0.06, from: 'random' } }, '-=1')
            .from(
                splitUsername.chars,
                { y: 30, autoAlpha: 0, delay: 0.5, stagger: { each: 0.06, from: 'random' } }, '-=1')

    }, 10);

    gsap.from(
        '.health-image',
        { scale: 0, opacity: 0, duration: 1, delay: 1 }
    )

    gsap.from(
        '.health-quote-text',
        { x: 300, opacity: 0, delay: 1.2, stagger: 0.8 }
    )

    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
        ".info-card",
        { y: 100, opacity: 0 },
        {
            y: 0, opacity: 1, ease: 'bounce.out', stagger: {
                each: 0.5,
                from: 'random',
                delay: 1
            },
            scrollTrigger: {
                trigger: ".info-card",
                start: 'top 70%',

            }
        }
    )

}