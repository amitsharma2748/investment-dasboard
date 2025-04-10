import { Box, Button, useDisclosure } from "@chakra-ui/react"; 
import SideModal from "../../../components/SideDrawerModal";
import AddInvestmentForm from "./AddInvestmentForm";
import { useForm } from "react-hook-form";
import { InvestmentFormData } from "../InvestmentTypes";
import { investmentSchema } from "../yupValidators";
import { yupResolver } from "@hookform/resolvers/yup";
import { addInvestment } from "../../../redux/slice/addInvestmentSlice";
import { useAppDispatch } from "../../../redux/store";
import { useTranslation } from "react-i18next";

// Component for investment action bar
const InvestmentActionBar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Form setup with Yup validation
  const investmentFormData = useForm<InvestmentFormData>({
    resolver: yupResolver(investmentSchema),
  });

  const { handleSubmit, reset } = investmentFormData;

  // Handle form submission
  const handleSave = async (data: InvestmentFormData) => {
    dispatch(addInvestment(data));
    reset();
    onClose();
  };

  // Handle modal close
  const handleClose = () => { 
    onClose();
  };

  return (
    <>
      {/* Action button container */}
      <Box mb={4} display="flex" justifyContent="flex-end">
        <Button onClick={onOpen}>{t("add") + " " + t("investment")}</Button>
      </Box>
      {/* Side modal for adding investments */}
      <SideModal
        title="Add Investment"
        isOpen={isOpen}
        onSave={handleSubmit(handleSave)}
        onClose={handleClose}
      >
        <AddInvestmentForm investmentFormData={investmentFormData} />
      </SideModal>
    </>
  );
};

export default InvestmentActionBar;