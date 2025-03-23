"use client";
import { useCounterStore } from "@/store/CounterStore";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SelectInput,
  TextInput,
  CheckboxInput,
  RadioInput,
  SwitchInput,
  SliderInput,
} from "./Form/FormFields";
import Link from "next/link";
import { deleteCookie } from "cookies-next/client";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3)
    .max(5),
  items: z.string({
    required_error: "Items are required",
  }),
  acceptTerms: z.boolean({
    required_error: "Accept terms is required",
  }),
  radio: z.string({
    required_error: "Radio is required",
  }),
  switch: z.boolean({
    required_error: "Switch is required",
  }),
  slider: z.number({
    required_error: "Slider is required",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const HomePage = () => {
  const count = useCounterStore((state) => state.count);
  const incrementCount = useCounterStore((state) => state.incrementCount);
  const decrementCount = useCounterStore((state) => state.decrementCount);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  // Dashboard routes
  const dashboardRoutes = [
    { href: "/overview", label: "Dashboard Overview" },
    { href: "/listings", label: "My Listings" },
    { href: "/requests", label: "Requests" },
    { href: "/bookings", label: "My Bookings" },
    { href: "/my-account", label: "My Account" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/notifications", label: "Notifications" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Home Page</h1>
      <Button onClick={() => deleteCookie("token")}>Logout</Button>
      <div className="w-full max-w-md my-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Dashboard Navigation</h2>
        <div className="grid grid-cols-1 gap-2">
          {dashboardRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="block p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>

      <p>Count: {count || "loading..."}</p>
      <Button
        onClick={incrementCount}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment Count
      </Button>
      <button
        onClick={decrementCount}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Decrement Count
      </button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput
            name="name"
            placeholder="Name"
            label="Name"
            control={form.control}
          />
          <SelectInput
            name="items"
            items={["Item 1", "Item 2", "Item 3"]}
            labelText="Items"
            control={form.control}
          />
          <CheckboxInput
            name="acceptTerms"
            labelText="Accept terms"
            control={form.control}
          />
          <RadioInput
            name="radio"
            options={["Option 1", "Option 2", "Option 3"]}
            labelText="Radio"
            control={form.control}
          />
          <SwitchInput name="switch" label="Switch" control={form.control} />
          <SliderInput name="slider" label="Slider" control={form.control} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
