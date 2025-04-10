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
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core"
import {arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"

const SortableUser=({investment}:{investment :fetchInvestmentSliceTypeListType})=>{
  const {attributes,listeners,setNodeRef,transform,transition}= useSortable({id:investment?.id})
  const styles={
    transition,
    transform:CSS.Transform.toString(transform)
  }

  return(
    <Tr ref={setNodeRef} {...attributes} {...listeners} key={investment.id} style={styles}>
    <Td>{investment?.name}</Td>
    <Td>{investment?.amount}</Td>
    <Td>{investment?.roi}</Td>
  </Tr>
  )
}

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
  const [displayData,setDisplayData]=useState<fetchInvestmentSliceTypeListType[]|null>(null)
  const itemsPerPage = 5;

    // Pagination calculations
    const totalItems = investmentListData?.length ||0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems); 
      const currentData :fetchInvestmentSliceTypeListType[]|null= investmentListData?.slice(startIndex, endIndex)||null;
  
    const emptyRowsCount = itemsPerPage - (currentData?.length ||0);
    const emptyRows = Array(emptyRowsCount).fill({ id: `empty-${Math.random()}` }); 
  
    const onDragEnd=(event:DragEndEvent)=>{
       const {active,over}=event
       if(active.id===over?.id){
        return
       }
        setDisplayData((investments :fetchInvestmentSliceTypeListType[]|null)=>{
          if(investments){
            const oldIndex=investments?.findIndex((investment)=>investment.id===active.id)
          const newIndex=investments?.findIndex((investment)=>investment.id===over?.id)
          return arrayMove(investments,oldIndex,newIndex)
          }
          return investments;
          
        }

        )
    }
  
    // Pagination handlers
    const handlePrevious = () => setCurrentPage((prev) => Math.max(1, prev - 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  
    useEffect(()=>{
      if(currentData)
      setDisplayData([...currentData])
  
    },[])

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



  if(!displayData){
    return(
      <p>
        No Data Found
      </p>
    )
  }

  return (
    // Main container
    <Stack width="full" gap={1}>
      <TableContainer>
        <Table  variant="simple" color={"GrayText"} size="lg" w="full">
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
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={displayData} strategy={verticalListSortingStrategy}>
                    {displayData.map((investment) => (
                      <SortableUser key={investment.id} investment={investment}/>
                    ))}
                </SortableContext>

            </DndContext>
           
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