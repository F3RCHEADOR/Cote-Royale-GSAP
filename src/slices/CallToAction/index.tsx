import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-[url('/background.avif')] bg-cover bg-center py-16 text-neutral-100 md:py-28"
    >


      <div className="relative z-10 mx-auto max-w-4xl text-center space-y-8">

        <FadeIn className="translate-y-2 text-sm font-light tracking-widest uppercase text-neutral-400" vars={{duration: .8}} >
          {slice.primary.eyebrow}
        </FadeIn>

        <RevealText as={"h2"} id="cta-heading" align="center" field={slice.primary.heading}  className="max-w-4xl mx-auto font-display text-6xl md:text-7xl" staggerAmount={0.1} duration={0.8} />


        <FadeIn className="mx-auto max-w-2xl translate-y-2 text-lg text-neutral-300" vars={{duration:.8, delay:.4}}>
          <PrismicRichText field={slice.primary.body}  />
        </FadeIn>

        <div className="mt-10">
          {slice.primary.button.map((link) => (
          <FadeIn key={link.key}>
            <ButtonLink

              field={link}
              variant={link.variant}
            />
          </FadeIn>
        ))}
        </div>
      </div>
    </Bounded>
  );
};

export default CallToAction;
