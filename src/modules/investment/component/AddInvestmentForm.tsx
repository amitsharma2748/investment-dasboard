import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { InvestmentFormData } from "../InvestmentTypes";
import { useTranslation } from "react-i18next";

// Form component for adding investments
const AddInvestmentForm = ({ investmentFormData }: { investmentFormData: ReturnType<typeof useForm<InvestmentFormData>> }) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = investmentFormData;

  // State for file upload
  const [documentFile, setDocumentFile] = useState<File | undefined>(undefined);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentFile(file);
      // setValue("document", file, { shouldValidate: true });
    }
  };

  return (
    // Container for the form
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg">
      <VStack spacing={4}>
        {/* Investment name field */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">{t("investment") + " " + t("name")}</FormLabel>
          <Input
            id="name"
            placeholder="Enter investment name"
            {...register("name")}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        {/* Amount field */}
        <FormControl isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount">{t("amount")}</FormLabel>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            {...register("amount")}
          />
          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>

        {/* ROI field */}
        <FormControl isInvalid={!!errors.roi}>
          <FormLabel htmlFor="roi">ROI</FormLabel>
          <Input
            id="roi"
            type="number"
            placeholder="Enter ROI"
            {...register("roi")}
          />
          <FormErrorMessage>
            {errors.roi && errors.roi.message}
          </FormErrorMessage>
        </FormControl>

        {/* File upload field */}
        <FormControl>
          <FormLabel htmlFor="document">{t("document")}</FormLabel>
          <Input
            id="document"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            hidden
          />
          <Button
            as="label"
            variant="outline"
            cursor="pointer"
            w="full"
            htmlFor="document"
          >
            {documentFile?.name || "Choose file"}
          </Button>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default AddInvestmentForm;