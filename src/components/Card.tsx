import React from 'react';

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
  setOpenModal:(boolean:boolean)=>void,
  hideGradeMaitre? : boolean;
};

export const Card: React.FC<CardProps> = ({ competence ,setCompetence,setOpenModal,hideGradeMaitre=false }) => {
  const handleClicked =()=>{
    setCompetence(competence);
    setOpenModal(true);
  }
  return (
    <div className='relative bg-main-color text-gray-200 text-xs font-semibold font-display w-36 h-24 rounded-lg space-y-2' onClick={handleClicked}>
      <h3 className={` absolute left-3 top-3 `}>{competence.nomCompetence}</h3>
      {(!hideGradeMaitre || competence.noteApprenti !== null) &&  <p className=' text-6xl absolute  bottom-0 right-2 ` '>{competence.noteMaitre}</p>}
      {competence.noteApprenti !== undefined && <p  className=' text-4xl absolute  bottom-0 left-2  '> {competence.noteApprenti}</p>}
    </div>
  );
};
