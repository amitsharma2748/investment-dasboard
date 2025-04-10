import { Table, Spinner, Text, Stack, Pagination, ButtonGroup, IconButton } from '@chakra-ui/react';
import { fetchInvestmentSliceTypeListType } from '../InvestmentTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { API_STATUS_TYPE } from '../../../utils/globalTypes';
import Loader from '../../../components/Loader';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

export const InvestmentTable = () => {
  const { resData: investmentListData, status: InvestmentStatus } = useSelector((state: RootState) => state.investmentList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle loading state
  if (InvestmentStatus === API_STATUS_TYPE.PENDING || InvestmentStatus === API_STATUS_TYPE.NONE) {
    return <Loader />;
  }

  // Handle error state
  if (InvestmentStatus === API_STATUS_TYPE.ERROR) {
    return <Text color="red.500">Error fetching investment data</Text>;
  }

  // Calculate paginated data with empty rows if needed
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = investmentListData?.slice(startIndex, endIndex) || [];
  
  // Fill with empty rows if needed
  const emptyRowsCount = itemsPerPage - currentData.length;
  const emptyRows = Array(emptyRowsCount).fill({ id: `empty-${Math.random()}`});
  const displayData = [...currentData];

  // Handle page changes
  const handlePrevious = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const handleNext = () => setCurrentPage(prev => Math.min(
    Math.ceil((investmentListData?.length || 0) / itemsPerPage), 
    prev + 1
  ));
 

  return (
    <Stack width="full" gap="5">
      <Table.Root variant="outline" stickyHeader size={'lg'} w={'full'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Amount</Table.ColumnHeader>
            <Table.ColumnHeader>ROI (%)</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {displayData.map((investment: any) => (
            <Table.Row key={investment.id}>
              <Table.Cell>{ investment.name}</Table.Cell>
              <Table.Cell>{investment.amount}</Table.Cell>
              <Table.Cell>{ investment.roi}</Table.Cell>
            </Table.Row>
          ))}
          {
            (displayData.length!==5)&& emptyRows.map(()=>(
                <Table.Row key={nanoid()} h={12}>
                <Table.Cell>{""}</Table.Cell>
                <Table.Cell>{""}</Table.Cell>
                <Table.Cell>{""}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>

      <Pagination.Root 
        count={(investmentListData?.length || 0) } 
        pageSize={5} 
        page={currentPage}
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton
              onClick={handlePrevious}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <MdKeyboardArrowLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton 
                variant={{ base: "ghost", _selected: "outline" }}
                aria-label={`Page ${page.value}`}
                onClick={() => setCurrentPage(page.value)}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton
              onClick={handleNext}
              aria-label="Next page"
              disabled={currentPage >= Math.ceil((investmentListData?.length ||0)/ itemsPerPage)}
            >
              <MdKeyboardArrowRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
};