import { Box, Flex, HStack, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { Sidebar } from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { HeaderValue } from "../../utils/contants";
import { useTranslation } from "react-i18next";

 
const IndexSidenavBar = () =>{
    const location=useLocation()
    const headerText = HeaderValue[location.pathname] || " ";
    const {t}=useTranslation()
    const [collapse, setCollapse] = React.useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    return (
      <HStack w="full" h="100vh" bg="gray.100" padding={{ base: 4, md: 10 }} >
        <Flex
          as="aside"
          w={isMobile ? "full" : collapse ? "350px" : "100px"}
          h="full"
          maxW={isMobile ? "100%" : collapse ? 350 : 100}
          bg="white"
          alignItems="start"
          padding={6}
          flexDirection="column"
          justifyContent="space-between"
          transition="ease-in-out .2s"
          borderRadius="3xl"
          display={{ base: collapse ? "flex" : "none", md: "flex" }}
          position={{ base: "absolute", md: "relative" }}
          zIndex={10}
        >
          <Sidebar collapse={collapse} />
        </Flex>
        <Flex
          as="main"
          w="full"
          h="full"
          bg="white"
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="column"
          position="relative"
          borderRadius="3xl"
          // ml={{ md: collapse ? "350px" : "100px" }}
          transition="ease-in-out .2s"
        >
          <IconButton
            aria-label="Menu Collapse" 
            position="absolute"
            top={6}
            left={6}
            onClick={() => setCollapse(!collapse)}
          >
            <MdMenu /> 
          </IconButton>

          <Box w={"full"} display={"flex"} h={"full"} flexDir={"column"} justifyContent={"center"}>
            <Box p={4} display={"flex"}  justifyContent={"center"}>
              <Text className="header-text" fontSize="4xl">{t(headerText.toLowerCase())}</Text> 
            </Box>
            <Box display={"flex"}  justifyContent={"flex-start"} flexDirection={"column"}  mt={15} p={2} w={"full"} h={"full"}> 
              <Outlet/>
            </Box>
          </Box>
        </Flex>
      </HStack>
    );
  };

export default IndexSidenavBar