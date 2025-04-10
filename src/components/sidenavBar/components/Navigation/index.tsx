import { List, ListItem, Text } from "@chakra-ui/react";
import { MdOutlineSpaceDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { IconType } from "react-icons"; // For icon typing
import { NavItem } from "./NavItem";
import { useLocation } from "react-router-dom";

interface NavItemType {
  type: "link"; // Could expand to other types (e.g., "button") if needed
  label: string;
  icon: IconType; // Type from react-icons
  path: string;
}

const items: NavItemType[] = [
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
  },
];

interface NavigationProps {
  collapse: boolean;
}

export const Navigation = ({ collapse }: NavigationProps) =>{
  const location=useLocation()
  return(
  <List w="full" my={4} variant="plain">
    {items.map((item, index) => (
      <ListItem key={index}>
        <NavItem item={item} isActive={item.path === location.pathname} collapse={collapse} />
      </ListItem>
    ))}
  </List>
);}