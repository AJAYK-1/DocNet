import gsap from 'gsap'

export const HomeNavbarAnimation = (navelements) => {
    const { homeNavRef, navElementsRef } = navelements

    gsap.fromTo(
        homeNavRef.current,
        { y: -100 },
        { y: 0, stagger: 1, duration: 1 })

    gsap.fromTo(
        navElementsRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.6, duration: 1, delay: 1 })

}

export const HomePageHeroSection = (elements) => {

    const { firstDivRef, welcomeRef, statementRef, loginRef, registerRef } = elements

    gsap.fromTo(
        firstDivRef.current,
        { y: 200, opacity: 0 },
        { y: 0, delay: 1, opacity: 1, duration: 0.5 })

    gsap.fromTo(
        welcomeRef.current,
        { x: 500, opacity: 0 },
        { x: 0, duration: 2, delay: 1, opacity: 1 })

    gsap.fromTo(
        statementRef.current,
        { x: -500, opacity: 0 },
        { x: 0, delay: 1, opacity: 1, duration: 2 })

    gsap.fromTo(
        loginRef.current,
        { y: 200, },
        { y: 0, delay: 1, duration: 3 })

    gsap.fromTo(
        registerRef.current,
        { y: -700 },
        { y: 0, delay: 1, duration: 3 })
}