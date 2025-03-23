import { Flex, Badge, Text } from "@mantine/core";
import React from "react";

type StatusBadgeProps = {
  status: "success" | "pending" | "review" | "cancelled";
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const statusConfig = {
  success: {
    color: "green.2",
    dotColor: "bg-success/78",
    textColor: "green.9",
    label: "Success"
  },
  pending: {
    color: "yellow.2",
    dotColor: "bg-warning/78",
    textColor: "yellow.9",
    label: "Pending"
  },
  review: {
    color: "blue.2",
    dotColor: "bg-info/78",
    textColor: "blue.9",
    label: "In Review"
  },
  cancelled: {
    color: "red.2",
    dotColor: "bg-destructive/78",
    textColor: "red.9",
    label: "Cancelled"
  }
};

export default function StatusBadge({ status, label, size = 'lg' }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge color={config.color} size={size} radius="sm">
      <Flex align="center" gap={4}>
        <div className={`rounded-full size-2 ${config.dotColor}`} />
        <Text c={config.textColor} fw={500} size="xs">
          {label || config.label}
        </Text>
      </Flex>
    </Badge>
  );
}
