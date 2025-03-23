"use client";
import { REVIEW_TABS_DATA } from "@/app/contents/landing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export function ReviewsTabs() {
  const [activeTab, setActiveTab] = React.useState(REVIEW_TABS_DATA[0].value);

  return (
    <Tabs
      defaultValue={REVIEW_TABS_DATA[0].value}
      className="w-full"
      onValueChange={setActiveTab}
    >
      <TabsList className="p-0 h-auto bg-transparent gap-3 mb-6">
        {REVIEW_TABS_DATA.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative gradient-border transition-all duration-200"
          >
            <span
              className={`gradient-border-inner py-4 px-6  bg-white rounded-full button-text transition-all duration-200 ${
                activeTab === tab.value ? "bg-yellow-50 shadow-lg" : ""
              }`}
            >
              {tab.name}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {REVIEW_TABS_DATA.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className=" w-full">{tab.content()}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
