import React from "react";
import { Box, Select } from "@chakra-ui/react"; 
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { useTranslation } from "react-i18next";

export const Sidebar = ({ collapse }: any) => {
  // Use the hook to get the reactive i18n instance (and t if needed)
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value; 
    // Change language via the hook, which will update react-i18next's context
    i18n.changeLanguage(selectedLang);
  };

  return (
    <React.Fragment>
      <Box w="full">
        <Logo collapse={collapse} />
        <Navigation collapse={collapse} />
        {collapse && (
          <Select
            onChange={handleLanguageChange}
            value={i18n.language} // This value now updates reactively
            width="auto"
            variant="filled"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </Select>
        )}
      </Box>
      {/* <AvatarBox collapse={collapse} /> */}
    </React.Fragment>
  );
};
