import { Box } from "@mantine/core";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface ILoadingMobileProps {
  loading: boolean;
}

const LoadingMobile = ({ loading }: ILoadingMobileProps) => {
  if (!loading) return null;
  return (
    <Box className="flex justify-center md:hidden h-[60vh] items-center">
      <LoaderCircle className="animate-spin h-8 w-8 opacity-30" />
    </Box>
  );
};

export default LoadingMobile;
