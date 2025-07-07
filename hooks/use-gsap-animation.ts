"use client";

import { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationOptions = {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number | object;
  scrollTrigger?: boolean;
  threshold?: number;
  from?: object;
  to?: object;
};

export function useGSAPAnimation(
  selector: string,
  options: AnimationOptions = {},
) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    let elements: Element[] | NodeListOf<Element>;

    // Handle the special case for direct children selector
    if (selector === "> *") {
      // Get direct children instead of using querySelectorAll with the invalid selector
      elements = Array.from(elementRef.current.children);
    } else {
      // For other valid selectors, use querySelectorAll as before
      elements = elementRef.current.querySelectorAll(selector);
    }

    if (elements.length === 0) return;

    const {
      duration = 0.8,
      delay = 0.2,
      ease = "power3.out",
      stagger = 0.1,
      scrollTrigger = false,
      threshold = 0.1,
      from = { y: 50, opacity: 0 },
      to = { y: 0, opacity: 1 },
    } = options;

    let animation: gsap.core.Tween;

    if (scrollTrigger) {
      elements.forEach((element) => {
        gsap.fromTo(element, from, {
          ...to,
          duration,
          ease,
          scrollTrigger: {
            trigger: element,
            start: `top bottom-=${threshold * 100}%`,
            toggleActions: "play none none none",
          },
        });
      });
    } else {
      animation = gsap.fromTo(elements, from, {
        ...to,
        duration,
        delay,
        stagger,
        ease,
      });
    }

    return () => {
      if (animation) animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector, options]);

  return elementRef;
}

// Presets for common animations
export const fadeInUp = {
  from: { y: 50, opacity: 0 },
  to: { y: 0, opacity: 1 },
  duration: 0.8,
  ease: "power3.out",
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 0.8,
  ease: "power2.out",
};

export const scaleIn = {
  from: { scale: 0.8, opacity: 0 },
  to: { scale: 1, opacity: 1 },
  duration: 0.6,
  ease: "back.out(1.7)",
};

export const slideInLeft = {
  from: { x: -100, opacity: 0 },
  to: { x: 0, opacity: 1 },
  duration: 0.8,
  ease: "power3.out",
};

export const slideInRight = {
  from: { x: 100, opacity: 0 },
  to: { x: 0, opacity: 1 },
  duration: 0.8,
  ease: "power3.out",
};
