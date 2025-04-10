import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AiFillThunderbolt, AiOutlineSearch } from "react-icons/ai";

export const Logo = ({ collapse }:any) => {
  const {t}=useTranslation()
  return(
  <Flex
    w="full"
    alignItems="center"
    justifyContent="space-between"
    flexDirection={collapse ? "row" : "column"}
    gap={4}
  >
    <Box display="flex" alignItems="center" gap={2}>
      <Icon as={AiFillThunderbolt} fontSize={28} />
      {collapse && (
        <Text fontWeight="bold" fontSize={16}>
          {t('investment') +" "+t('manager') } 
        </Text>
      )}
    </Box>
    {/* <IconButton
      variant="ghost"
      aria-label="search"
      icon={<AiOutlineSearch />}
      fontSize={26}
      color="gray.400"
      borderRadius="50%"
    /> */}
  </Flex>
);
}