import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader: React.FC = () => {
  return (
    <Box alignItems={"center"}>
      <Spinner size="lg" />
    </Box>
  );
};

export default Loader;
