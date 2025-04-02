import { BUILT_FOR_HOSTS_DATA } from "@/app/contents/landing";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";

export default function BuiltForHosts() {
  return (
    <section className="py-[120px] px-4 md:px-0">
      <Shell>
        <p className="heading-3 text-center pb-16">Built for hosts like you</p>
        <div className="grid grid-cols-2 gap-y-16 gap-x-[120px]">
          {BUILT_FOR_HOSTS_DATA.map((item) => (
            <div
              key={item.title}
              className="max-w-[469px]">
              <p className="heading-4 pb-4">{item.title}</p>
              <p className="body-1-medium text-black/80">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-16 pb-8">
          <Button variant="cta">Start earning on Kaparki</Button>
        </div>
      </Shell>
    </section>
  );
}
