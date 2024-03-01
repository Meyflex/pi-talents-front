import React, { useRef } from 'react';
import logo from '../assets/delete.svg'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { api } from '../services';
import { useStores } from '../stores';
export type Competence = {
  id: string,
  descriptionCompetence: string,
  noteMaitre: number,
  noteApprenti: string,
  type: string,
  nomCompetence: string,
};

type CardProps = {
  competence: Competence,
  setCompetence:(val: Competence) => void;
  setOpenModal:(boolean:boolean)=>void;
  setOpenModalDelete:(boolean:boolean)=>void;
  hideGradeMaitre? : boolean;
  hideDelete?:boolean;
  openModalDelete:boolean;
};

export const Card: React.FC<CardProps> = ({ competence ,setCompetence,setOpenModal,setOpenModalDelete,openModalDelete,hideGradeMaitre=false ,hideDelete=false}) => {
  
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const { authenticationStore } = useStores();
  const val = authenticationStore.jsonData;
  const handleClicked =()=>{
    setCompetence(competence);
    setOpenModal(true);
  }
  const handleDelete =async ()=>{
    try {
      const config = {
          headers: { Authorization: `Bearer ${val.token}` }
      };
      if (competence !== undefined) {
        const response = await api.delete(`/evaluate/deteleteCompetence?idDetele=${competence.id}`, config);

        if (response.status === 400) {
          toast({
            title: "Error",
            description: response.data.message && response.status === 400 ? response.data.message : "An error occurred while fetching data.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }
          setOpenModalDelete(false)
      }

     
} catch (error : any) {
  console.error('Error sending data:', error.message);
  
}

  }
  return (
    <div className='relative bg-main-color text-gray-200 text-xs font-semibold font-display w-36 h-24 rounded-lg space-y-2' onClick={handleClicked}>
      <h3 className={` absolute left-3 top-3 truncate h-2/3 w-2/3`}>{competence.nomCompetence}</h3>
      { hideDelete && <img src={logo} alt="delete" className="absolute top-1 right-3 h-4 w-4" onClick={(event) => { event.stopPropagation(); setOpenModalDelete(true); }} />}      {(!hideGradeMaitre || competence.noteApprenti !== null) &&  <p className=' text-6xl absolute  bottom-0 right-2 ` '>{competence.noteMaitre}</p>}
      {competence.noteApprenti !== undefined && <p  className=' text-4xl absolute  bottom-0 left-2 text-wrap '> {competence.noteApprenti}</p>}
      <Modal isCentered initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={openModalDelete} onClose={()=>setOpenModalDelete(true)}>
      <ModalOverlay />
      <ModalContent className='font-display text-white font-bold '>
        <ModalHeader>Suprimer le Skill <span className='text-nav-bar-selected font-extrabold'>{competence.nomCompetence}</span></ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='nav-bar-selected' onClick={handleDelete} className='w-40 font-display bg-nav-bar-selected text-white font-bold py-2 px-4 rounded' mr={3}>
            Suprimer
          </Button>
          <Button onClick={()=>setOpenModalDelete(false)}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </div>
  );
};
