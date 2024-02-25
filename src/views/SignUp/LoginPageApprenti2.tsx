import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  bio: Yup.string().required('La bio est requise'),
  domaineApprentissage: Yup.string().required('Le domaine d’apprentissage est requis'),
  specialite: Yup.string().required('La spécialité est requise'),
});

function fileToBase64(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
const LoginPageApprenti2 = observer(() => {
  const { signUpApprentiStore } = useStores();
  const [imageName, setImageName]=useState<string>(signUpApprentiStore.photoName);
  const navigate = useNavigate();

  return (
    <div className='flex justify-center flex-col items-center font-display'>
      <p className='text-main-color font-semibold flex self-start text-xl leading-tight mt-32 mb-14 ml-72'>
        Bienvenue sur ton Hub Apprenti {signUpApprentiStore.prenom},<br />
        Il est important de remplir ton profil avant d’inviter ton maître d’apprentissage en ajoutant une photo de profil et une belle bio qui te ressemble.
      </p>

      <Formik
        initialValues={{ bio: signUpApprentiStore.bio, domaineApprentissage:signUpApprentiStore.domaineApprentissage, specialite: signUpApprentiStore.specialite, photo:{}}}
        validationSchema={validationSchema}
        className='w-full flex flex-col justify-center items-center self-center'
        onSubmit={async (values, actions) => {
          // Ici, vous traiterez les valeurs du formulaire, y compris le téléchargement de la photo
          if ((values?.photo as File)?.name) {
            console.log((values.photo as File).name);
            const base64String = await fileToBase64(values.photo as File);
            signUpApprentiStore.setPhoto(base64String);
            signUpApprentiStore.setPhotoName((values.photo as File).name);
          } else if (!signUpApprentiStore.photoName.length) {
            return;
          }

          signUpApprentiStore.setBio(values.bio);
          signUpApprentiStore.setDomaineApprentissage(values.domaineApprentissage);
          signUpApprentiStore.setSpecialite(values.specialite);
          actions.setSubmitting(false);
          navigate('/apprenti/signUpThree');
        }}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => (
          <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-4 grid-flow-row'>
            {/* Bio Field */}
            
            <div className=" flex flex-row items-center justify-between max-w-3xl w-1/2 mb-4 col-start-1">
                <label htmlFor="photo" className="text-main-color font-semibold flex items-center text-xl leading-tight">
                Ta Photo <input
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={(event) => {event.currentTarget?.files && setFieldValue("photo", event.currentTarget.files[0]) ;event.currentTarget?.files &&  setImageName(event.currentTarget?.files[0].name) }}
                    className="hidden"/>
                    <div className='flex flex-col items-center justify-center truncate h-28 w-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 '>
                    <p className="text-xs text-gray-500  ">{ imageName?.length ? imageName: ' Upload Image'}</p>
                    </div>
               </label>     
            </div>
            
            
            <label htmlFor="bio" className="text-main-color font-semibold flex justify-end items-center text-xl leading-tight">
            Ta Bio
            </label>
            
              <div className="mt-2 h-full col-span-2 row-span-4">
                <Field
                  as="textarea"
                  name="bio"
                  id="bio"
                  placeholder='Une belle bio qui te ressemble'
                  className=" min-h-60 min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.bio && touched.bio && errors.bio}</div>
              </div>

            
              <label htmlFor="domaineApprentissage" className="text-main-color row-start-5 col-span-2  font-semibold flex items-center justify-end text-xl leading-tight">
              Ton Domaine d’apprentissage
              </label>

              <div className="mt-2 row-start-5 col-span-2">
                <Field
                  type="text"
                  name="domaineApprentissage"
                  id="domaineApprentissage"
                  placeholder='ex : IT'
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.domaineApprentissage && touched.domaineApprentissage && errors.domaineApprentissage}</div>
             </div>


              <label htmlFor="specialite" className="text-main-color row-start-6 col-span-2 font-semibold flex items-center justify-end text-xl leading-tight">
                Ta Spécialité
              </label>
              <div className="mt-2 w-full row-start-6 col-span-2">
              <Field
                  type="text"
                  name="specialite"
                  id="specialite"
                  placeholder='ex : back end development'
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.specialite && touched.specialite && errors.specialite}</div>
              </div>

            {/* Boutons d'action */}
            <button type="submit" className="mt-4 col-end-5 bg-blue text-white font-bold py-2 px-4 rounded hover:bg-blue-700 max-w-32">
              Je valide
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
});

export { LoginPageApprenti2 };
