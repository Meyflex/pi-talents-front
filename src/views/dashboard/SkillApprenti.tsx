import { api } from '../../services';
import {  Card, Competence, MyModalApprenti } from '../../components';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useStores } from '../../stores';
import { useToast } from '@chakra-ui/react';



const SkillApprenti = observer(() => {

      const location = useLocation();
      const [data, setData] = useState<Competence[]>([]);
      const { authenticationStore } = useStores();
      const val = authenticationStore.jsonData;
      const [openModal, setOpenModal] = useState<boolean>(false);
      const [competenceToUpdate, setCompetenceToUpdate] = useState<Competence>();
      const toast = useToast();

    

  
    const handleSetComptence = (val : Competence)=>{
      setCompetenceToUpdate(val)
    }
     
      const { type } = location.state || {type:"HARD"}; // Defaulting to an empty object if state is undefined
      const [typeVal,setTypeVal]=useState<string>(type);

      const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const getUserData = async () =>{
      
      
        try {
            const config = {
                headers: { Authorization: `Bearer ${val.token}` }
            };
        const response = await api.get(`/evaluate/getCompetence?idUser=${val.apprenti.maitre.id}&idApprenti=${val.apprenti.id}&type=${typeVal}`,config)
        setData(response.data)
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
        
    } catch (error : any) {
        toast({
            title: "Error",
            description: error.response && error.response.status === 400 ? error.response.data.message : "An error occurred while fetching data.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
      }
    
    }

    useEffect(() => {
      if(openModal ===false){
        getUserData()
      }
      }, [openModal,typeVal]);

      
  useEffect(() => {
    // Ensure the ref current value exists
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevents the page from scrolling down
      scrollContainer.scrollLeft += e.deltaY + e.deltaX; // Adjusts the scroll position based on the wheel delta
    };

    // Add event listener
    scrollContainer.addEventListener('wheel', handleWheel);

    // Clean up function to remove event listener
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <div className="relative flex justify-center flex-col items-center" >
        <div className="container flex overflow-x-auto overflow-y-hidden max-h-[50px] scroll-smooth hide-scrollbar my-12 " ref={scrollContainerRef}>
        <div className="flex space-x-4 text-md font-semibold font-display">
            {/* Items */}
            <div role='button' className={`${ typeVal === 'HARD' ?"bg-blue" :'bg-main-color' } min-w-[200px] h-[50px] text-white rounded-lg flex justify-center items-center`} onClick={()=>setTypeVal('HARD')}>Hard Skills</div>
            <div role='button' className={`${ typeVal === 'SOFT' ?"bg-blue" :'bg-main-color' } min-w-[200px] h-[50px] text-white rounded-lg flex justify-center items-center`} onClick={()=>setTypeVal('SOFT')}>Soft Skills</div>
            <div role='button' className={`${ typeVal === 'TOOL' ?"bg-blue" :'bg-main-color' } min-w-[200px] h-[50px] text-white rounded-lg flex justify-center items-center`} onClick={()=>setTypeVal('TOOL')}>Outils de Travail</div>
            <div className='bg-main-color min-w-[220px] h-[50px] text-white rounded-lg flex justify-center items-center text-center'>Suivre mon Apprenti</div>
            <div className='bg-main-color min-w-[220px] h-[50px] text-white rounded-lg flex justify-center items-center text-center'>Contacter mon apprenti</div>
            <div className='bg-main-color min-w-[200px] h-[50px] text-white rounded-lg flex justify-center items-center'>Bilans</div>
            <div className='bg-main-color min-w-[200px] h-[50px] text-white rounded-lg flex justify-center items-center'>Rapports CFA</div>
        </div>
        </div>
        
        
      <div className='container grid grid-cols-6 gap-4'>
      {data.map((competence) => (
        <Card hideGradeMaitre key={competence.id} competence={competence} setCompetence={handleSetComptence} setOpenModal={setOpenModal} />
      ))}
      </div>
      {competenceToUpdate &&
      <MyModalApprenti comptence={competenceToUpdate}  isOpen={openModal} onClose={() => {setOpenModal(false);setCompetenceToUpdate(undefined)}}  />
}
       
        </div>
  );
});

export { SkillApprenti };