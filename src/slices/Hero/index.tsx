import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";



export type HeroProps = SliceComponentProps<Content.HeroSlice>;


const Hero: FC<HeroProps> = ({ slice }) => {


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="absolute inset-0 opacity-0 motion-safe:scale-125"
      >
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover motion-reduce:opacity-50"
        />
      </FadeIn>

      <div className="relative flex h-screen flex-col justify-center">
        <RevealText
          field={slice.primary.heading}
          id="hero-heading"
          staggerAmount={.7}
          duration={3}
          as={"h1"}
          className="font-display max-w-xl text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl"
        />

        <FadeIn
          className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
          vars={{ delay: 2, duration: 1.3 }}
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>

        <FadeIn vars={{ delay: 3, duration: 1.5 }} className="mt-8 translate-y-5">

          {slice.primary.button.map((link) => (

            <ButtonLink 
            key={link.key}
            field={link} 
            className="w-fit"
            variant="Secondary"
              />


          ))}

        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
