// import { Drawer } from '@mui/material'
import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'
import  { Children, ForwardedRef, ReactNode, forwardRef } from 'react'

type SideModalPropsType = { 
  title:string
  onClose: () => void
  onSave:()=>void
  children: ReactNode
}

// Define styles in a separate object
const getDrawerStyles ={
  "& .MuiDrawer-paper": {
    width: "400px", // Dynamic width 
    padding: "16px",
    transition: "0.3s ease-in-out",
  },
}

// Forward ref to the Drawer component
const SideModal = forwardRef(
  ({ onSave, onClose,title, children }: SideModalPropsType, ref: ForwardedRef<HTMLDivElement>) => {


    return (
      
        <Portal>
         <Drawer.Backdrop />
         <Drawer.Positioner>
           <Drawer.Content>
             <Drawer.Header>
               <Drawer.Title>{title}</Drawer.Title>
             </Drawer.Header>
             <Drawer.Body>
              {children}
             </Drawer.Body>
             <Drawer.Footer>
               <Button variant="outline">Cancel</Button>
               <Button type='submit'>Save</Button>
             </Drawer.Footer>
             <Drawer.CloseTrigger asChild>
               <CloseButton size="sm" onClick={onClose}/>
             </Drawer.CloseTrigger>
           </Drawer.Content>
         </Drawer.Positioner>
         </Portal>
    )
  }
)


export default SideModal
