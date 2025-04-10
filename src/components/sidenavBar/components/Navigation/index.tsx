import { IconProps, List, ListItem, Text } from "@chakra-ui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineShoppingBag} from "react-icons/md";
import { NavItem } from "./NavItem";

const items = [
  {
    type: "link",
    label: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    path: "/dashboard",
  },
  {
    type: "link",
    label: "Invest",
    icon: MdOutlineShoppingBag,
    path: "/investment",
  }

 
];

interface NavigationProps{
  collapse:boolean
}

export const Navigation = ({ collapse }:NavigationProps) => (
  <List.Root w="full" my={4} variant={"plain"}>
    {items.map((item :any, index) => (
      <List.Item key={index}>
        <NavItem item={item} isActive={index === 0} collapse={collapse} />
      </List.Item>
    ))}
  </List.Root>
);
