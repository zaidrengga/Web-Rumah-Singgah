"use client";

import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useFadeAnimations = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Fade-up animation for elements with the class 'fade-up'
    gsap.utils.toArray<HTMLElement>('.fade-up')?.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    // Fade-down animation for elements with the class 'fade-down'
    gsap.utils.toArray<HTMLElement>('.fade-down')?.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    // Fade-center animation for elements with the class 'fade-center'
    gsap.utils.toArray<HTMLElement>('.fade-center')?.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });

    // Fade-left animation for elements with the class 'fade-left'
    gsap.utils.toArray<HTMLElement>('.fade-left')?.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    // Fade-right animation for elements with the class 'fade-right'
    gsap.utils.toArray<HTMLElement>('.fade-right')?.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".stagger-grid")?.forEach((grid) => {
      if (!grid) return;
      const item = grid.querySelectorAll(".fade-item");
      if (item.length) {
        gsap.fromTo(item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        )
      }
      const itemLeft = grid.querySelectorAll(".fade-item-left");
      if (itemLeft.length) {
        gsap.fromTo(
          itemLeft,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        )
      }
    })
  }, [])
}
