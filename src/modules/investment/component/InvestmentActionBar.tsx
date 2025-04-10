import { Box, Button, Drawer } from '@chakra-ui/react'
import React from 'react'
import SideModal from '../../../components/SideDrawerModal'
import AddInvestmentForm from './AddInvestmentForm'

const InvestmentActionBar = () => {
    const handleSave=()=>{

    }
    const handleClose=()=>{

    }
  return (
    <Drawer.Root>
        <Drawer.Trigger asChild>
        <Box mb={4} display={'flex'} justifyContent={"flex-end"}>
        <Button>Add Investment</Button>
        </Box>
      </Drawer.Trigger>
        
        <SideModal title='Add Investment' onSave={handleSave} onClose={handleClose}>
            <AddInvestmentForm/>
        </SideModal>

    </Drawer.Root>
    
  )
}

export default InvestmentActionBar