import { EmptySVG } from "@/assets/icons/EmptySVG";
import { Box, Text } from "@mantine/core";
import React from "react";

const Empty = ({ text, h }: { text?: string; h?: string }) => {
  return (
    <Box
      className={`text-center flex flex-col justify-center items-center space-y-2 ${
        h ? h : "h-[80vh]"
      }`}
    >
      <Box className="flex items-center justify-center">
        <EmptySVG />
      </Box>
      <Text c="gray" className="italic">
        {text ?? "Tidak ada data"}
      </Text>
    </Box>
  );
};

export default Empty;
