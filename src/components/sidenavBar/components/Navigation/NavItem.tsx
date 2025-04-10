import {
  Icon,
  Box,
  Badge,
  Text,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface NavItemProps {
  item: {
    label: string;
    type: string;
    path: string;
    icon?: any;
    notifications?: any;
    messages?: number;
  };
  isActive: boolean;
  collapse: boolean;
}

export const NavItem = ({ item, isActive, collapse }: NavItemProps) => {
  const { label } = item;
  if (item.type === "link") {
    const { icon, notifications, messages, path } = item; 
    return (
      <Box display="flex" alignItems="center" my={6} justifyContent="center">
        <RouterLink to={path}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            _hover={{ textDecoration: "none", color: "black" }}
            fontWeight="medium"
            color={isActive ? "black" : "gray.400"}
            w="full"
            justifyContent={!collapse ? "center" : ""}
          >
            <Icon as={icon} fontSize={22} m="0" />
            {collapse && <Text>{label}</Text>}
          </Box>
        </RouterLink>
        {collapse && (
          <>
            {notifications && (
              <Badge
                borderRadius="full"
                colorScheme="yellow"
                w={6}
                textAlign="center"
              >
                {notifications}
              </Badge>
            )}
            {messages && (
              <Badge
                borderRadius="full"
                colorScheme="green"
                w={6}
                textAlign="center"
              >
                {messages}
              </Badge>
            )}
          </>
        )}
      </Box>
    );
  }
  return (
    <Heading
      color="gray.400"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      borderTopWidth={1}
      borderColor="gray.100"
      pt={collapse ? 8 : 0}
      my={6}
    >
      <Text display={collapse ? "flex" : "none"}>{label}</Text>
    </Heading>
  );
};