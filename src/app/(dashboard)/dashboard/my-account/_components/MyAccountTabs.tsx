"use client";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import PersonalDetails from "./PersonalDetails";
import ProfileTab from "./ProfileTab";
import Password from "./Password";
import Verification from "./Verification";
import { useState } from "react";

interface Tab {
  value: string;
  label: string;
  component: React.ReactNode;
}

const tabs: Tab[] = [
  {
    value: "personal-details",
    label: "Personal Details",
    component: <PersonalDetails />,
  },
  {
    value: "profile",
    label: "Profile",
    component: <ProfileTab />,
  },
  {
    value: "password",
    label: "Password",
    component: <Password />,
  },
  {
    value: "verification",
    label: "Verification",
    component: <Verification />,
  },
];

export default function MyAccountTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  return (
    <Tabs
      defaultValue="personal-details"
      color="black"
      value={activeTab}
      onChange={(value) => setActiveTab(value || tabs[0].value)}>
      <TabsList className=" w-3/4">
        {tabs.map((tab) => (
          <TabsTab
            key={tab.value}
            value={tab.value}
            className={`${
              activeTab === tab.value ? "border-b-2 border-black" : ""
            }`}>
            <span
              className={`body-2  ${
                activeTab === tab.value
                  ? "text-black/80 font-bold"
                  : "text-black/50"
              }`}>
              {tab.label}
            </span>
          </TabsTab>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsPanel
          key={tab.value}
          value={tab.value}>
          {tab.component}
        </TabsPanel>
      ))}
    </Tabs>
  );
}
