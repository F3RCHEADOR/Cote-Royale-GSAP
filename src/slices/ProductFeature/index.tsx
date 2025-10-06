import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicImage, PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { createClient } from "@/prismicio";
import { formatPrice } from "@/app/utils/formatters";
import { ButtonLink } from "@/components/ButtonLink";

/**
 * Props for `ProductFeature`.
 */
export type ProductFeatureProps =
  SliceComponentProps<Content.ProductFeatureSlice>;

/**
 * Component for "ProductFeature" Slices.
 */
const ProductFeature: FC<ProductFeatureProps> = async ({ slice }) => {

  const client = createClient()

  const fragrance = isFilled.contentRelationship(slice.primary.fragrance) ? await client.getByID<Content.FragranceDocument>(slice.primary.fragrance.id) : null;

  const formattedPrice = formatPrice(fragrance?.data.price)

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden bg-black py-16 text-white md:py-24"
    >
      <div className="grid items-center gap-8 lg:grid-cols-3 lg:grid-rows-[auto,auto]">

        <FadeIn className="lg:col-span-2 translate-y-16 opacity-0 lg:row-span-2" vars={{ duration: 1 }} start="top 70%">
          <PrismicNextImage field={slice.primary.feature_image} className="h-auto w-full object-cover" />
        </FadeIn>

        <FadeIn className="translate-y-16 space-y-16 self-start bg-white/10 p-10 opacity-0 lg:col-start-3 lg:row-start-1" >

          <h2 className="text-3xl leading-tight font-semibold md:text-4xl">
            <PrismicText field={slice.primary.heading} />
          </h2>

          <div className="-mt-8 max-w-lg text-base text-neutral-200">
            <PrismicRichText field={slice.primary.description} />
          </div>

        </FadeIn>



        {/* Fragrance */}
        <FadeIn
          vars={{ duration: 1, delay: 1 }}
          className="animate-in opacity-0 relative translate-y-16 self-end bg-white/10 will-change-transform">

          <PrismicImage field={fragrance?.data.bottle_image}
            className="mx-auto -mt-10 w-ull -rotate-12 md:-mt-20"
          />

          <div className="flex justify-between p-10 pt-4">
            <div className="space-y-1">
              <h3 className="font-display text-4xl">
                <PrismicText field={fragrance?.data.title} fallback="Fragrance" />
              </h3>

              <p className="mt-1 text-gray-400">Eau de Parfum</p>
            <ButtonLink document={fragrance} variant="Secondary" className="mt-6">
              Shop Now
            </ButtonLink>
            </div>


            <p className="mt-4 text-gray-100" aria-label="Product price">
              <span>
                {formattedPrice}
              </span>
            </p>
          </div>

        </FadeIn>
      </div>
    </Bounded>
  );
};

export default ProductFeature;
