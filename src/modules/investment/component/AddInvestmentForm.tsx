import {
    Box,
    Button, 
    Field, 
    Fieldset, 
    Input, 
    VStack, 
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
//   import { toaster } from "@/components/ui/toaster"
  import * as yup from "yup";
import { investmentSchema } from "../yupValidators";
import { useEffect } from "react";
  

  
  type InvestmentFormData = yup.InferType<typeof investmentSchema>;
  
    const AddInvestmentForm = () => { 
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
      reset,
    } = useForm<InvestmentFormData>({
      resolver: yupResolver(investmentSchema),
    });
  
    const documentFile :any= watch("document");
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setValue("document", file);
      }
    };
  
    const onSubmit = async (data: InvestmentFormData) => {
      // Mock API call
      console.log("Submitting:", data);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
    //   toaster.success({
    //     title: "Investment added",
    //     description: "Your investment has been successfully added.",
    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //   });
      
      reset();
    };
  
    useEffect(()=>{
      console.log({errors})
    },[errors])

    return (
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceX={4}>
            <Fieldset.Root> {/* Added Fieldset.Root wrapper */}
              <Fieldset.Content>
                <Field.Root invalid={!!errors.name}>
                  <Field.Label htmlFor="name">Investment Name</Field.Label>
                  <Input
                    id="name"
                    placeholder="Enter investment name"
                    {...register("name")}
                  />
                  <Fieldset.ErrorText>
                    {errors.name && errors.name.message}
                  </Fieldset.ErrorText>
                </Field.Root>
  
                <Field.Root invalid={!!errors.amount}>
                  <Field.Label htmlFor="amount">Amount</Field.Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    {...register("amount")}
                  />
                  <Fieldset.ErrorText>
                    {errors.amount && errors.amount.message}
                  </Fieldset.ErrorText>
                </Field.Root>
  
                <Field.Root invalid={!!errors.document}>
                  <Field.Label htmlFor="document">Document</Field.Label>
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
                  >
                    {documentFile?.name || "Choose file"}
                  </Button>
                  <Fieldset.ErrorText>
                    {errors.document && errors.document.message}
                  </Fieldset.ErrorText>
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root> {/* Closing Fieldset.Root */}
            
             
          </VStack>
        </form>
      </Box>
    );
  };

  export default AddInvestmentForm