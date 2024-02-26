import { api } from '../../services';
import {  Card, Competence, MyModal, StudentSelector } from '../../components';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useStores } from '../../stores';
import React from 'react';



const HardSkillMaitre = observer(() => {
      const location = useLocation();
      const [data, setData] = useState<Competence[]>([]);
      const { authenticationStore } = useStores();
      const val = authenticationStore.jsonData;

      const [selectedApprenti, setSelectedApprenti] = useState<number>(val.maitre.apprentis[0].id);
      const [inputText, setInputText] = useState<string>('');
      const [openModal, setOpenModal] = useState<boolean>(false);
      const [competenceToUpdate, setCompetenceToUpdate] = useState<Competence>();

    

  
    const handleSetComptence = (val : Competence)=>{
      setCompetenceToUpdate(val)
    }

    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
      };

      const handleApprentiSelected = (number: number) => {
        setSelectedApprenti(number);
      };
      const { type } = location.state || {type:"HARD"}; // Defaulting to an empty object if state is undefined
      const [typeVal,setTypeVal]=useState<string>(type);

      const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const getUserData = async () =>{
      
      if (selectedApprenti){
        try {
            const config = {
                headers: { Authorization: `Bearer ${val.token}` }
            };
        const reponse = await api.get<Competence[]>(`/evaluate/getCompetence?idUser=${val.maitre.id}&idApprenti=${selectedApprenti}&type=${typeVal}`,config)
        setData(reponse.data)
        
    } catch (error : any) {
        console.error('Error sending data:', error.message);

      }
    }
    }

    useEffect(() => {
      if(openModal ===false){
        getUserData()
      }
      }, [selectedApprenti,openModal,typeVal]);

      
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
        <div className="container flex ">
            <p className= 'text-main-color font-semibold text-xl leading-tight mt-10 mb-14 '>
            Ajoutez les Hard Skills de votre apprenti pour ensuite les Scorer entre 1-10     </p>
        </div>
        <div className='container flex items-center  mb-4'>
        <input 
          type="text" 
          value={inputText} 
          onChange={handleInputChange} 
          className="w-96 outline-none p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
          placeholder="Enter card text" 
        />
        <button onClick={()=>setOpenModal(true)} className=" mx-4 bg-blue text-white font-bold py-2 px-4 rounded ">
          +
        </button>
      </div>
      <div className='container grid grid-cols-6 gap-4'>
      {data.map((competence) => (
        <Card key={competence.id} competence={competence} setCompetence={handleSetComptence} setOpenModal={setOpenModal} />
      ))}
      </div>
      
      <MyModal comptence={competenceToUpdate} inputText={inputText} isOpen={openModal} onClose={() => {setOpenModal(false);setCompetenceToUpdate(undefined);setInputText('')}} apprentiId={selectedApprenti} type={typeVal} />

        <div className='absolute -top-14 right-24 h-32 w-40'>
          <StudentSelector
            apprentis={val.maitre.apprentis}
            onApprentiSelected={handleApprentiSelected} />
          </div>
        </div>
  );
});

export { HardSkillMaitre };