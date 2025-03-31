import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "../../schema";
import { AddressSchemaType } from "../../schema";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { TextInput } from "@/components/Form/FormFields";
import { Button } from "@/components/ui/button";
import { useVehicleListingStore } from "../../vehicleListingstore";
import { useEffect, useState } from "react";
import MapComponent from "../MapComponent";
import { useModal } from "@/providers/ModalContext";
import { fetchAddressFromPostalCode } from "../../utils/addressUtils";
import { useDebouncedValue } from "@mantine/hooks";

export default function ListAVehicleAddressModal() {
  const { address, setAddress, toggleMap, setToggleMap, setPostalCode } =
    useVehicleListingStore();
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      postal_code: address.postal_code || "",
      country: address.country || "",
    },
  });
  
  useEffect(() => {
    form.reset({
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      postal_code: address.postal_code || "",
      country: address.country || "",
    });
  }, [address, form]);

  const postalCode = form.watch("postal_code");
  const [debouncedPostalCode] = useDebouncedValue(postalCode, 700);

  useEffect(() => {
    if (debouncedPostalCode && debouncedPostalCode.length > 3) {
      handlePostalCodeChange(debouncedPostalCode);
    }
  }, [debouncedPostalCode]);

  const handlePostalCodeChange = async (postal_code: string) => {
    setIsLoading(true);
    try {
      const addressData = await fetchAddressFromPostalCode(postal_code);
      if (addressData && !addressData.isError) {
        form.setValue("street", addressData.street || "");
        form.setValue("city", addressData.city || "");
        form.setValue("state", addressData.state || "");
        form.setValue("country", addressData.country || "");
        
        // Set the postal code in the store to trigger the map update
        setPostalCode(postal_code);
        
        // Also update the address with coordinates in the store
        if (addressData.coordinates) {
          setAddress({
            ...address,
            street: addressData.street || "",
            city: addressData.city || "",
            state: addressData.state || "",
            postal_code: postal_code,
            country: addressData.country || "",
            coordinates: addressData.coordinates
          });
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (values: AddressSchemaType) => {
    setPostalCode(values.postal_code);
    setToggleMap(true);
  };

  const handleConfirmLocation = () => {
    const postal_code = form.getValues("postal_code");
    closeModal();
    setToggleMap(false);
    setPostalCode(postal_code);
    setAddress({
      street: form.getValues("street"),
      city: form.getValues("city"),
      state: form.getValues("state"),
      postal_code: postal_code,
      country: form.getValues("country"),
      coordinates: address.coordinates
    });
  };

  return (
    <Modal
      onClose={() => setToggleMap(false)}
      id="address-modal"
      title="Address"
      description={
        toggleMap
          ? "Guests will pick up your car here. Adjust the pin if this doesn't match your cars exact location."
          : "We need your complete address"
      }
      className="max-w-lg">
      {!toggleMap && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextInput
              label="Street address"
              name="street"
              placeholder="Enter your street address"
              control={form.control}
              disabled={isLoading}
            />
            <div className="grid grid-cols-2 gap-2 pt-4">
              <TextInput
                label="City"
                name="city"
                placeholder="City"
                control={form.control}
                disabled={isLoading}
              />
              <TextInput
                label="State"
                name="state"
                placeholder="State"
                control={form.control}
                disabled={isLoading}
              />
              <TextInput
                label="Postal Code"
                name="postal_code"
                placeholder="e.g 129182"
                control={form.control}
                disabled={isLoading}
              />
              <TextInput
                label="Country"
                name="country"
                placeholder="Enter your country"
                control={form.control}
                disabled={isLoading}
              />
            </div>
            <div className="flex pt-4">
              <Button
                className="w-full"
                type="submit"
                variant="cta"
                disabled={isLoading}>
                {isLoading ? "Loading..." : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
      )}
      {toggleMap && (
        <div>
          <MapComponent />
          <div className="grid grid-cols-2 gap-2 pt-4">
            <Button
              onClick={() => setToggleMap(false)}
              variant={"link"}>
              Back
            </Button>
            <Button
              onClick={handleConfirmLocation}
              variant="cta">
              Confirm location
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
