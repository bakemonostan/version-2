import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "../../schema";
import { AddressSchemaType } from "../../schema";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { TextInput } from "@/components/Form/FormFields";
import { Button } from "@/components/ui/button";
export default function AddressModal() {
  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
  });

  const onSubmit = (values: AddressSchemaType) => {
    console.log(values);
  };

  return (
    <Modal
      id="address-modal"
      title="Address"
      description="We need your complete addres"
      className="max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput
            label="Street address"
            name="street"
            placeholder="Enter your street address"
            control={form.control}
          />
          <div className="grid grid-cols-2 gap-2 pt-4">
            <TextInput
              label="City"
              name="city"
              placeholder="City"
              control={form.control}
            />
            <TextInput
              label="State"
              name="state"
              placeholder="State"
              control={form.control}
            />
            <TextInput
              label="Postal Code"
              name="postal_code"
              placeholder="e.g 129182"
              control={form.control}
            />
            <TextInput
              label="Country"
              name="country"
              placeholder="Enter your country"
              control={form.control}
            />
          </div>
          <div className="flex pt-4">
            <Button
              className="w-full"
              type="submit"
              variant="cta">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
