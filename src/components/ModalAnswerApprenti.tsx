import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { api } from '../services';
import { useStores } from '../stores';
import { Competence } from './Card';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  comptence:Competence;
};

const MyModalApprenti: React.FC<Props> = ({ isOpen, onClose ,comptence}) => {
  // State to store the input values
  const [nomCompetence, setNomCompetence] = useState(comptence.nomCompetence ?? '');
  const [note, setNote] = useState(comptence.noteApprenti ?? '');
  
  const { authenticationStore } = useStores();
  const val = authenticationStore.jsonData;
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    setNomCompetence(comptence?.nomCompetence ?? '');
  }, [comptence?.nomCompetence]);
  
  useEffect(() => {
    setNote(comptence?.noteApprenti ?? '');
  }, [comptence?.noteApprenti]);


  const handleSubmit = async () => {
    // Implement your submit logic here using nomCompetence and note
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${val.token}`,
                  'Content-Type': 'application/json', // Specify that you're sending JSON
                },
              };
            
            if(comptence !== undefined){
                const response = await api.post(`/evaluate/createNoteApprenti?note=${note}&idCompetence=${comptence.id}`,{},config)
                if(response.status ===400){
                  toast({
                    title: "Error",
                    description: response.data.message && response.status ===400 ? response.data.message : "An error occurred while fetching data.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right",
                  });
                }
            }
            

        onClose();
    } catch (error : any) {
        console.error('Error sending data:', error.message);
        
      }
    
  };
  console.log(comptence.noteApprenti)
  return (
    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className='font-display text-white font-bold '>
        <ModalHeader>Ajoutez les Skills de votre apprenti</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nom Competence</FormLabel>
            <Input
              focusBorderColor='#F15412'
              value={nomCompetence}
              onChange={(e) => setNomCompetence(e.target.value)}
              ref={initialRef}
              placeholder='Ex: Machine Learning'
              isReadOnly
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Note</FormLabel>
            <Input
              focusBorderColor='#F15412'
              value={note}
              onChange={(e) => {
                // Convert input value to a number for validation
                const inputValue = Number(e.target.value);
                
                // Check if the value is a number, is not NaN, and is between 0 and 10
                if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 10) {
                  // If valid, update state with the string representation of the number
                  setNote(e.target.value);
                } else if (e.target.value === "") {
                  // Allow clearing the input
                  setNote("");
                }
                // If the value is not valid (not a number, < 0, or > 10), do not update the state
                // This effectively ignores the input
              }}              placeholder='1-10'
              isReadOnly={comptence.noteApprenti !== null && comptence.noteApprenti !== undefined }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {(comptence.noteApprenti === null || comptence.noteApprenti === undefined)  &&
            <Button colorScheme='nav-bar-selected' onClick={handleSubmit} className='w-40 font-display bg-nav-bar-selected text-white font-bold py-2 px-4 rounded' mr={3}>
            J'envoie
          </Button>}
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export  {MyModalApprenti};
