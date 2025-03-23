import { TickCircleIcon } from "@/components/icons";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { howItWorksContent } from "@/contents/data";

const HowItWorks = () => {
  const { title, subtitle, forRenters, forOwners } = howItWorksContent;

  return (
    <section className="py-24">
      <Shell>
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg">{subtitle}</p>
        </div>

        <div className="flex gap-8 justify-between md:gap-12 ">
          {/* For Renters */}
          <div className="flex flex-col gap-6 w-full lg:max-w-[400px] ">
            <h3 className="text-xl font-bold">{forRenters.title}</h3>

            <div className="space-y-5">
              {forRenters.benefits.map((benefit, index) => (
                <p key={index} className="flex gap-3 items-start">
                  <TickCircleIcon />
                  <span>{benefit}</span>
                </p>
              ))}
            </div>

            <div className="flex gap-4 h-full items-end">
              <Button variant="cta" className="w-max">
                <Link
                  href={forRenters.primaryButton.href}
                  className="button-text"
                >
                  {forRenters.primaryButton.text}
                </Link>
              </Button>
              <Button variant="link" className="w-max">
                <Link
                  href={forRenters.secondaryButton.href}
                  className="button-text"
                >
                  {forRenters.secondaryButton.text}
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-[2px] min-h-1/2 my-3 bg-black/10"></div>
          {/* For Owners */}
          <div className="flex flex-col gap-6 w-full lg:max-w-[400px] ">
            <h3 className="text-xl font-bold">{forOwners.title}</h3>

            <div className="space-y-5">
              {forOwners.benefits.map((benefit, index) => (
                <p key={index} className="flex gap-3 items-start">
                  <TickCircleIcon />
                  <span>{benefit}</span>
                </p>
              ))}
            </div>

            <div className="flex gap-4 items-end h-full">
              <Button variant="cta" className="w-max">
                {forOwners.primaryButton.text}
              </Button>
              <Button variant="link" className="w-max">
                <Link
                  href={forOwners.secondaryButton.href}
                  className="button-text"
                >
                  {forOwners.secondaryButton.text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
};

export default HowItWorks;
