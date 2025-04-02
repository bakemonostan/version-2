import AllVehiclesNavbar from "../_components/AllVehiclesNavbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AllVehiclesNavbar />
      <section className="flex flex-col  mx-auto lg:max-w-[79.5rem]">
        {children}
      </section>
    </>
  );
}
