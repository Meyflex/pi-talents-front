import React, { useState, useEffect } from 'react';

type CardProps = {
    id: number;
    text: string;
    initialScore: number | null;
    onUpdate: (id: number, score: number ) => void;
    onDelete: (id: number) => void;
  };

export const Card: React.FC<CardProps> = ({ id, text, initialScore, onUpdate, onDelete }) => {
  const [score, setScore] = useState<string>(initialScore?.toString() ?? '');
  const [isEditing, setIsEditing] = useState(true);
  const [animationClass, setAnimationClass] = useState('slide-in');

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(e.target.value);
  };

  const handleScoreBlur = () => {
    const numScore = parseInt(score, 10);
    if (!isNaN(numScore) && numScore >= 1 && numScore <= 10) {
      onUpdate(id, numScore);
      setAnimationClass('slide-out');
    }
  };

  // Trigger the slide-out animation and then update the state to not editing
  useEffect(() => {
    if (animationClass === 'slide-out') {
      const timer = setTimeout(() => {
        setIsEditing(false);
      }, 500); // Match the duration of the slide-out animation
      return () => clearTimeout(timer);
    }
  }, [animationClass]);

  return (
    <div className={`relative p-3 bg-main-color text-md font-medium font-display w-36 h-24 text-white rounded-lg flex items-end justify-end ${isEditing ? 'col-span-2' : 'col-span-1' }`}>
      <p className={` absolute left-2 top-2 `}>
      {text}    </p>
      {isEditing ? (
        <div className='absolute -right-52 mr-2 flex flex-col justify-between items-start w-48 text-lightText font-semibold text-sm leading-tigh z-10'>
            <p className={` opacity-50 ${animationClass} `}>
            Ajoutez un score au Skill de votre apprenti entre 1-10    </p>
            <input
                className={`w-48 outline-none p-4 rounded-lg border-0 py-2 text-lightText shadow-sm ring-1 ring-inset ring-main-color ${animationClass} `}
                type="number"
                value={score}
                onChange={handleScoreChange}
                onBlur={handleScoreBlur}
                min="1"
                max="10"
                placeholder="Score 1-10"
        />
        </div>
      ) : (
        <>
          
        </>
      )}
        <button onClick={() => { setIsEditing(true); setAnimationClass('slide-in'); }} className='absolute left-0 bottom-0 text-white rounded p-1'>E</button>
        <div className=' text-grey-200 text-6xl '>{(score.length && !isEditing) ? score : '?'}</div>
      <button onClick={() => onDelete(id)} className='absolute right-0 top-0 text-white rounded p-1'>X</button>
    </div>
  );
};
