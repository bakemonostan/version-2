/* eslint-disable @next/next/no-img-element */

"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useCategories,
  useCategoryId,
  useGetSubcategoriesByCategoryId,
} from "@/hooks/hooks";
import { Skeleton } from "@mantine/core";
import React from "react";
import { usePathname } from "next/navigation";
import GradientButton from "@/components/GradientButton";

export default function CarListing() {
  const { categoryNames, isLoading } = useCategories();
  const [activeCategory, setActiveCategory] = React.useState("Car");
  const id = useCategoryId(activeCategory);
  const { subCategoryFields, subcategoriesLoading } =
    useGetSubcategoriesByCategoryId(id!);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const route = usePathname();

  return (
    <>
      {route !== "/how-kaparki-works" && (
        <Separator className="hidden lg:block  container mx-auto bg-black/10" />
      )}
      <div className="py-8 lg:py-[5.75rem] px-3 md:px-0">
        <div className="relative grid gap-[10rem] mx-auto lg:grid-cols-2 pb-8">
          <div>
            <h3 className="text-2xl font-bold heading-3 pb-4">
              Find the perfect car to conquer the great outdoors
            </h3>
            <p className="body-1-medium text-black/80 pb-4">
              Go prepared in a rugged 4x4 to take on winter roads with ease, or
              a camper van to take you to the trees.
            </p>
          </div>
        </div>
        <div className="mx-auto space-y-2">
          <div className="flex flex-wrap gap-2 overflow-scroll overflow-y-hidden">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    h={50}
                    w={120}
                  />
                ))
              : categoryNames?.map((tab) => (
                  <GradientButton
                    key={tab}
                    onClick={() => handleCategoryChange(tab)}
                    title={tab}
                    isActive={activeCategory === tab}
                    innerBg={
                      activeCategory === tab ? "var(--color-yellow-50)" : ""
                    }
                  />
                ))}
          </div>
          {!subcategoriesLoading ? (
            subCategoryFields && subCategoryFields.length > 0 ? (
              <Link
                href=""
                className="flex w-full gap-5 overflow-x-auto cursor-grab sm:p-3 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:flex-wrap">
                {subCategoryFields?.map((car) => (
                  <figure
                    key={car.id}
                    className="relative flex-shrink-0 transition duration-200 rounded-lg cursor-pointer hover:scale-105">
                    <div className="grid grid-rows-[1fr_auto]">
                      <img
                        src={
                          car.image ||
                          "https://motozitelive.blob.core.windows.net/motozite-live/newcars_images/1670408248No-Image.jpg"
                        }
                        alt=""
                        className="object-cover col-start-1 row-start-1 rounded-lg size-44 md:w-full md:h-full aspect-square"
                      />
                      <figcaption className="z-10 self-end col-start-1 row-start-1 p-1 text-white rounded-b-md bg-black/20">
                        {car.name}
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </Link>
            ) : (
              <div className="flex flex-col items-center max-w-[13.1875rem] justify-center p-8 text-center border border-gray-200 shadow-sm bg-white rounded-lg">
                <div className="w-12 h-12 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  No listings available yet
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Check back later for available vehicles
                </p>
              </div>
            )
          ) : (
            <div>
              <Skeleton
                h={200}
                w={200}
              />
            </div>
          )}
          <Button
            variant="cta"
            className="w-max">
            <Link href="/results">Browse all</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
