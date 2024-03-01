import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Image, Flex } from '@chakra-ui/react';

export type Apprenti = {
  id: number;
  nom: string;
  prenom: string;
  photoURL: string;
};

type StudentSelectorProps = {
  apprentis: Apprenti[];
  onApprentiSelected: (id: number) => void; // Function to update selected student in parent component
};

export const StudentSelector: React.FC<StudentSelectorProps> = ({ apprentis, onApprentiSelected }) => {
    const [selectedApprenti, setSelectedApprenti] = useState<Apprenti | undefined>(undefined);

    useEffect(() => {
      // Set the first apprenti as the default selection
      if (apprentis.length > 0) {
        setSelectedApprenti(apprentis[0]);
      }
    }, [apprentis]);
  
    const handleApprentiSelected = (apprenti: Apprenti) => {
    onApprentiSelected(apprenti.id)
    setSelectedApprenti(apprenti);
      
    };
  
    return (
      <Menu >
        <MenuButton as={Button}  width="full%" sx={{
            border: 'none',
            boxShadow: 'none',
            justifyContent: 'space-between',
            width: 'full%',
            background:'transparent',
            _hover: { bg: 'transparent', boxShadow: 'none' },
            _active: { bg: 'transparent', boxShadow: 'none' },
            _focus: { boxShadow: 'none' },
          }}
          className="font-display">
          <Flex align="center">
            {selectedApprenti ? (
              <>
                  <div className='text-left mr-3' >{selectedApprenti.nom}<br/>{selectedApprenti.prenom}</div>
                <Image
                  borderRadius='10px'
                  boxSize="2rem"
                  src={selectedApprenti.photoURL}
                  alt={`${selectedApprenti.nom} ${selectedApprenti.prenom}`}
                  mr="12px"
                />
              </>
            ) : (
              'Select etudiant'
            )}
          </Flex>
        </MenuButton>
        <MenuList>
          {apprentis.map((apprenti) => (
            <MenuItem
              key={apprenti.id}
              onClick={() => handleApprentiSelected(apprenti)}
              minH="48px"
            >
              <Image
                borderRadius='10px'
                boxSize="2rem"
                src={apprenti.photoURL}
                alt={`${apprenti.nom} ${apprenti.prenom}`}
                mr="12px"
              />
              <text>{apprenti.nom}  {apprenti.prenom}</text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  };

export default StudentSelector;
