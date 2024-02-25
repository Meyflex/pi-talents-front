import { api } from '../../services';
import { Card } from '../../components';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useStores } from '../../stores';



const HardSkillMaitre = observer(() => {
      const navigate = useNavigate();
      const location = useLocation();
      const [inputText, setInputText] = useState('');
      const [openCardModal,setOpenCardModal] = useState<boolean>(false);
      const { authenticationStore } = useStores();
    const val = authenticationStore.jsonData;

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
      };
      const { type } = location.state || {type:"HARD"}; // Defaulting to an empty object if state is undefined
      const [typeVal,setTypeVal]=useState<string>(type);
      const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const getUserData = async () =>{
        try {
            const config = {
                headers: { Authorization: `Bearer ${val.token}` }
            };
        const reponse = await api.get(`/getCompetence?idUser=${val.maitre.id}&idApprenti=${val.maitre.apprentis[0].id}&type=${type}`,config)
        console.log(reponse.data);
    } catch (error : any) {
        console.error('Error sending data:', error.message);
        
      }
    }
    useEffect(() => {
        getUserData()
      }, []);
      
      

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
    <div className="flex justify-center flex-col items-center" >
        <div className="container flex overflow-x-auto overflow-y-hidden max-h-[50px] scroll-smooth hide-scrollbar my-12 " ref={scrollContainerRef}>
        <div className="flex space-x-4 text-md font-semibold font-display">
            {/* Items */}
            <div className={`${ typeVal === 'HARD' ?"bg-blue" :'bg-main-color' } min-w-[200px] h-[50px] text-white rounded-lg flex justify-center items-center`} onClick={()=>setTypeVal('HARD')}>Hard Skills</div>
            <div className={`${ typeVal === 'SOFT' ?"bg-blue" :'bg-main-color' } min-w-[200px] h-[50px] text-white rounded-lg flex justify-center items-center`} onClick={()=>setTypeVal('SOFT')}>Soft Skills</div>
            <div className={`${ typeVal === 'TOOL' ?"bg-blue" :'bg-main-color' } min-w-[200px] h-[50px] text-white rounded-lg flex justify-center items-center`} onClick={()=>setTypeVal('TOOL')}>Outils de Travail</div>
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
        <button onClick={()=>setOpenCardModal(true)} className=" mx-4 bg-blue text-white font-bold py-2 px-4 rounded ">
          +
        </button>
      </div>
      <div className='container grid grid-cols-6 gap-4'>
     
      </div>
        </div>
  );
});

export { HardSkillMaitre };