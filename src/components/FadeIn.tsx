"use client"

import React, { useRef } from 'react'
import gsap from 'gsap'
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string
}

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const FadeIn = ({ children,start = "top 80%" , vars = {}, className }: FadeInProps) => {

  const containerRef = useRef<HTMLDivElement>(null)


  useGSAP(() => {

    const mm = gsap.matchMedia();

     mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(containerRef.current, {
        duration: 4,
        opacity: 1,
        ease: "power3.Out",
        y: 0,
        ...vars,
        scrollTrigger: {
          trigger: containerRef.current,
          start
        }
      })
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.to(containerRef.current, {
        duration: .5,
        opacity: 1,
        ease: "none",
        y: 0,
        stagger: 0
      })
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={clsx("opacity-0", className)}>{children}</div>
  )
}

