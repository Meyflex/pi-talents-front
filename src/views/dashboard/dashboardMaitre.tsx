import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';



const DashboardMaitre = observer(() => {
      const navigate = useNavigate();
      
    

      return (
        <div className='flex justify-center items-center'>
                <div className=' max-h-[600px] w-[1200px] p-20'>
                    <div className='grid grid-cols-11 grid-row-12 gap-4 text-3xl font-semibold font-display'>
                        {/* <!-- Row 1 --> */}
                        <div className='bg-blue text-white  rounded-lg col-span-3 row-span-5 flex justify-end items-end p-4' onClick={()=>navigate('/MaitreApprentissage/competence', { state: { type: 'HARD' } })}>Hard Skills</div>
                        <div className='bg-main-color text-white rounded-lg h-[250px] col-span-4 row-span-5 flex justify-end items-end p-4' onClick={()=>navigate('/MaitreApprentissage/competence', { state: { type: 'SOFT' } })}>Soft Skills</div>
                        <div className='bg-nav-bar-selected text-white rounded-lg h-[250px] col-span-4 row-span-5 flex justify-end items-end p-4' onClick={()=>navigate('/MaitreApprentissage/competence', { state: { type: 'TOOL' } })}>Outils de Travail</div>
                        {/* <!-- Row 2 --> */}
                        <div className='relative bg-lightGray text-white h-[150px] w-full rounded-lg col-span-7 row-span-3 items-end p-4 text-right'>
                            <p className='bg-lightGray absolute left-4 top-4 text-main-color text-lg font-bold	'>En Cours de Développement</p>
                            <p className=' absolute right-4 bottom-3'>Suivre<br/> mon Apprenti</p>
                        </div>
                        <div className='bg-blue relative text-white h-[150px] rounded-lg col-span-4 row-span-3 flex justify-end items-end p-4 text-right' >
                        <p className=' absolute left-3 top-4 text-[#05757A] text-base font-bold	'>En Cours de Développement</p>

                            Contacter<br/> mon apprenti</div>
                        {/* <!-- Row 3 --> */}
                        <div className='bg-blue relative text-white h-[150px] w-full rounded-lg col-span-4 row-span-3 flex justify-end items-end p-4 text-right'>
                            <p className=' absolute left-3 top-4 text-[#05757A] text-base font-bold	'>En Cours de Développement</p>
                            <p className=' absolute right-4 bottom-3'>Bilans</p>

                            </div>
                        <div className='bg-nav-bar-selected relative text-white h-[150px] rounded-lg col-span-7 row-span-3 flex justify-end items-end p-4 text-right'>
                            <p className=' absolute left-4 top-4 text-[#A63B0F] text-lg font-bold	'>En Cours de Développement</p>
                            Rapports<br/> CFA
                        </div>
                    </div>
                </div>
            </div>
  );
});

export { DashboardMaitre };