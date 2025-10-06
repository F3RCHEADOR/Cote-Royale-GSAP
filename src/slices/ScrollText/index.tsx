"use client"

import { FC, useRef } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";


/**
 * Props for `ScrollText`.
 */
export type ScrollTextProps = SliceComponentProps<Content.ScrollTextSlice>;

/**
 * Component for "ScrollText" Slices.
 */
const ScrollText: FC<ScrollTextProps> = ({ slice }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const words = asText(slice.primary.text).split(" ");



  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(() => {

    const component = componentRef.current;
    const textElement = textRef.current;
    const contentElement = contentRef.current;
    const letters = textElement?.querySelectorAll("span")

    if (!component || !textElement || !letters || !contentElement) return

    //set initial blur and colors
    gsap.set(contentElement, { filter: "blur(40px)" });
    gsap.set(letters, { color: "hsl(220, 9%, 20%)" })


    // 👉 Animación 1: Quitar el blur del contenido al hacer scroll
    gsap.to(contentElement, {
      filter: "blur(0px)",   // El filtro CSS pasa de "blur(40px)" (antes seteado con gsap.set) a "blur(0px)" → se ve nítido
      duration: 1,           // Duración de la animación (en segundos), aunque con scrub la duración real depende del scroll
      scrollTrigger: {
        trigger: component,  // Elemento que activa la animación cuando entra en la vista (el scroll se "engancha" aquí)
        start: "top 75%",    // Punto de inicio → cuando la parte superior de "component" llega al 75% de la ventana
        end: "top top",      // Punto de fin → cuando la parte superior de "component" llega al tope superior de la ventana
        scrub: 2,            // Sincroniza la animación con el scroll.  
        //  - scrub: true  → se mueve exactamente con el scroll  
        //  - scrub: 2     → agrega un "delay" de 2s para suavizar (interpolación suave al moverse)
      }
    });


    // 👉 Animación 2: Timeline para cambio de color en las letras
    const colorTL = gsap.timeline({
      scrollTrigger: {
        trigger: component,    // El mismo "component" activa este timeline
        start: "top top",      // Empieza cuando la parte superior del componente toca el tope de la ventana
        end: "bottom -200%",   // Termina mucho después, cuando el bottom pasa -150% (esto alarga bastante el recorrido)
        pin: true,             // "Pinea" (fija) el componente en la pantalla mientras dure la animación
        scrub: 2,              // Otra vez sincronización con el scroll (suavizada con retardo de 2s)
      }
    });

    // 👉 Paso dentro del timeline: animar letras
    colorTL.to(letters, {
      color: "white",          // Las letras cambian de color a blanco
      stagger: {               // Animación escalonada → cada letra aparece en secuencia
        each: 0.01,             // Cada letra comienza 0.1s después de la anterior
        from: "start",         // El orden es desde la primera letra hasta la última
        ease: "power1.inOut"   // Curva de aceleración → inicio y fin suaves
      }
    });

    colorTL.to(".glow-background",{
      opacity:1,
      ease: "power2.inOut",
      duration: 1
    }, 0)



  }, { scope: componentRef })


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={componentRef}
      className="flex min-h-screen items-center bg-neutral-950 relative"
    >

      <div className="glow-background opacity-0 absolute inset-0 z-0 h-full "></div>
      <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-30 mix-blend-color"></div>


      <div ref={contentRef}>
        <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base">
          {slice.primary.eyebrown}
        </div>


        {/* Paragraph */}
        <div ref={textRef} className="text-center">
          <p className="font-display flex flex-wrap justify-center text-2xl md:text-4xl lg:text-6xl leading-tight text-balance uppercase  ">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block">
                {word.split("").map((char, charIndex) => (
                  <span key={`${char}-${charIndex}`} className="inline-block">
                    {char}
                  </span>
                ))}
                {index < words.length - 1 && " "}
              </span>
            ))}
          </p>
        </div>

      </div>

    </Bounded>
  );
};

export default ScrollText;
