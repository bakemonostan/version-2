import { BUILT_FOR_HOSTS_DATA } from "@/app/contents/landing";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";

export default function BuiltForHosts() {
  return (
    <section className="py-[120px]">
      <Shell>
        <p className="heading-3 text-center pb-16">Built for hosts like you</p>
        <div className="grid grid-cols-2 gap-y-16 gap-x-32">
          {BUILT_FOR_HOSTS_DATA.map((item) => (
            <div key={item.title}>
              <p className="heading-4 pb-4">{item.title}</p>
              <p className="body-1-medium text-black/80">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-16 pb-6">
          <Button variant="cta">Start earning on Kaparki</Button>
        </div>
      </Shell>
    </section>
  );
}
