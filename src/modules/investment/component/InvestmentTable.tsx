import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Stack,
  ButtonGroup,
  IconButton,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { fetchInvestmentSliceTypeListType } from "../InvestmentTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { API_STATUS_TYPE } from "../../../utils/globalTypes";
import Loader from "../../../components/Loader";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

// Component to display investment table with pagination
export const InvestmentTable = () => {
  const { resData: investmentListData, status: investmentStatus } = useSelector(
    (state: RootState) => state.investmentList as {
      resData: fetchInvestmentSliceTypeListType[] | undefined;
      status: API_STATUS_TYPE;
    }
  );
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Loading state
  if (
    investmentStatus === API_STATUS_TYPE.PENDING ||
    investmentStatus === API_STATUS_TYPE.NONE
  ) {
    return <Loader />;
  }

  // Error state
  if (investmentStatus === API_STATUS_TYPE.ERROR) {
    return <Text color="red.500">Error fetching investment data</Text>;
  }

  // Empty state
  if (!investmentListData || investmentListData.length === 0) {
    return <Text>No investment data available</Text>;
  }

  // Pagination calculations
  const totalItems = investmentListData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = investmentListData.slice(startIndex, endIndex);

  const emptyRowsCount = itemsPerPage - currentData.length;
  const emptyRows = Array(emptyRowsCount).fill({ id: `empty-${Math.random()}` });
  const displayData: fetchInvestmentSliceTypeListType[] = [...currentData];

  // Pagination handlers
  const handlePrevious = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    // Main container
    <Stack width="full" gap={1}>
      <TableContainer>
        <Table variant="striped" size="lg" w="full">
          {/* Table header */}
          <Thead background="blue.100">
            <Tr>
              <Th>{t("name")}</Th>
              <Th>{t("amount")}</Th>
              <Th>ROI (%)</Th>
            </Tr>
          </Thead>
          {/* Table body */}
          <Tbody>
            {displayData.map((investment) => (
              <Tr key={investment.id}>
                <Td>{investment?.name}</Td>
                <Td>{investment?.amount}</Td>
                <Td>{investment?.roi}</Td>
              </Tr>
            ))}
            {displayData.length !== 5 &&
              emptyRows.map(() => (
                <Tr key={nanoid()} h={16}>
                  <Td>{""}</Td>
                  <Td>{""}</Td>
                  <Td>{""}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Stack direction="row" justify="flex-end" p={2}>
          <ButtonGroup variant="outline" size="sm" colorScheme="blue" spacing={1}>
            <IconButton
              className="pagination-icon"
              onClick={handlePrevious}
              isDisabled={currentPage === 1}
              aria-label="Previous page"
              icon={<MdKeyboardArrowLeft />}
              color={currentPage === 1 ? "gray.400" : "blue.500"}
              _disabled={{ color: "gray.400", opacity: 0.5 }}
              boxSize={8}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "solid" : "outline"}
                colorScheme={page === currentPage ? "blue" : "gray"}
                onClick={() => setCurrentPage(page)}
                aria-label={`Page ${page}`}
                isActive={page === currentPage}
                color={page === currentPage ? "white" : "gray.700"}
                boxSize={8}
                minW={8}
              >
                {page}
              </Button>
            ))}
            <IconButton
              className="pagination-icon"
              onClick={handleNext}
              isDisabled={currentPage === totalPages}
              aria-label="Next page"
              icon={<MdKeyboardArrowRight />}
              color={currentPage === totalPages ? "gray.400" : "blue.500"}
              _disabled={{ color: "gray.400", opacity: 0.5 }}
              boxSize={8}
            />
          </ButtonGroup>
        </Stack>
      )}
    </Stack>
  );
};