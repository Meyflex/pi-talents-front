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
  inputText:string;
  apprentiId:number;
  type:string;
  comptence:Competence|undefined;
};

const MyModal: React.FC<Props> = ({ isOpen, onClose,inputText ,apprentiId,type,comptence}) => {
  // State to store the input values
  console.log(inputText )
  const [nomCompetence, setNomCompetence] = useState( inputText);
  const [note, setNote] = useState(comptence?.noteMaitre ? comptence.noteMaitre :'');
  const { authenticationStore } = useStores();
  const val = authenticationStore.jsonData;
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (comptence?.nomCompetence !== undefined) {
        setNomCompetence(comptence.nomCompetence);
      }else{
        setNomCompetence('');
      }
  }, [comptence?.nomCompetence]);

  useEffect(() => {
    if (inputText) {
        setNomCompetence(inputText);
      }else{
        setNomCompetence('');
      }
  }, [inputText]);
  
  useEffect(() => {
    if (comptence?.noteMaitre !== undefined) {
      setNote(comptence.noteMaitre);
    }else{
        setNote('')
    }
  }, [comptence?.noteMaitre]);


  const handleSubmit = async () => {
    // Implement your submit logic here using nomCompetence and note
        try {
            const config = {
                headers: { Authorization: `Bearer ${val.token}` }
            };
            if(comptence === undefined){
                const response = await api.post(`/evaluate/createNoteMaitre`,{
                    nomCompetence:nomCompetence,
                    maitreId:val.maitre.id,
                    apprentiId:apprentiId,
                    noteMaitre:note,
                    type:type
                },config)
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
            }else{
                const response = await api.put(`/evaluate/updateNote?idCompetence=${comptence.id}`,{
                    nomCompetence:nomCompetence,
                    noteMaitre:note,
                },config)
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

            setNomCompetence('');
            setNote('')
            onClose();
    } catch (error : any) {
        console.error('Error sending data:', error.message);
        
      }
    
  };

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
              }}
              placeholder='1-10'
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='nav-bar-selected' onClick={handleSubmit} className='w-40 font-display bg-nav-bar-selected text-white font-bold py-2 px-4 rounded' mr={3}>
            J'envoie
          </Button>
          <Button onClick={()=>{setNomCompetence('');
            setNote('');
            onClose();}}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export  {MyModal};
