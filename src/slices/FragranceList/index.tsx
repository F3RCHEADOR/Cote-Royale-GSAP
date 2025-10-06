import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { RevealText } from "@/components/RevealText";
import { PrismicNextLink } from "@prismicio/next";
import { FragranceDisplay } from "./FragranceDisplay";

/**
 * Props for `FragranceList`.
 */
export type FragranceListProps =
  SliceComponentProps<Content.FragranceListSlice>;

/**
 * Component for "FragranceList" Slices.
 */
const FragranceList: FC<FragranceListProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="space-y-8 bg-black py-16 text-center text-white md:py-24"
    >
      <div className="mx-auto space-y-8">
        <p className="text-sm font-light tracking-tight uppercase"> {slice.primary.eyebrow}</p>


        <RevealText as={"h2"} id={`fragrance-list-heading-${slice.id}`} field={slice.primary.heading} align="center" duration={1.5} staggerAmount={.3} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl " />

        <div className="mx-auto max-w-2xl text-lg text-balance text-neutral-300">

          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="mt-12 grid gap-12">
          {slice.primary.fragrances.map((item) => {
            if (isFilled.contentRelationship(item.fragrance)) {
              return (
                <FragranceDisplay key={item.fragrance.id} id={item.fragrance.id} />
              )
            }
          })}

        </div>
      </div>

    </Bounded>
  );
};

export default FragranceList;
