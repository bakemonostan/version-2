import { TickCircleIcon } from "@/components/icons";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { howItWorksContent } from "@/contents/data";

// New reusable component for both sections
const BenefitSection = ({ 
  data 
}: { 
  data: { 
    title: string;
    benefits: string[];
    primaryButton: { text: string; href: string };
    secondaryButton: { text: string; href: string };
  }
}) => {
  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <h3 className="text-xl font-bold pb-6">{data.title}</h3>
      <div className="space-y-4 pb-20">
        {data.benefits.map((benefit, index) => (
          <p
            key={index}
            className={`flex gap-3 items-start ${index === 0 ? 'pr-20' : ''}`}>
            <TickCircleIcon />
            <span>{benefit}</span>
          </p>
        ))}
      </div>
      <div className="flex gap-4 items-end h-full">
        <Button
          variant="cta"
          className="w-max">
          <Link
            href={data.primaryButton.href}
            className="button-text">
            {data.primaryButton.text}
          </Link>
        </Button>
        <Button
          variant="link"
          className="w-max">
          <Link
            href={data.secondaryButton.href}
            className="button-text">
            {data.secondaryButton.text}
          </Link>
        </Button>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const { title, subtitle, forRenters, forOwners } = howItWorksContent;

  return (
    <section className="py-[92px]">
      <Shell>
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg">{subtitle}</p>
        </div>

        <div className="flex">
          {/* For Renters */}
          <div className="w-full">
            <BenefitSection data={forRenters} />
          </div>
          
          {/* divider */}
          <div className="w-[2px] mx-[85px] min-h-1/2 my-3 bg-black/10"></div>
          
          {/* For Owners */}
          <div className="w-full">
            <BenefitSection data={forOwners} />
          </div>
        </div>
      </Shell>
    </section>
  );
};

export default HowItWorks;
