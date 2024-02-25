import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useStores } from '../../stores';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  prenom: Yup.string().required('Le prénom est requis'),
  nom: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('L\'email est invalide').required('L\'email est requis'),
  password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
});

const LoginPageAprenti1 = observer(() => {

  const { signUpApprentiStore } = useStores();
 


    const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  return (
    <div className='flex justify-center flex-col items-center font-display'>
      <p className='text-main-color font-semibold flex self-start text-xl leading-tight mt-32 mb-14 ml-72'>
        Bienvenue sur ton portail Pi Talents,<br />
        Inscrivez-vous en remplissant le formulaire ci-dessous. <br />
        Si vous avez déjà un compte, cliquez sur “Me Connecter”
      </p>

      <Formik
        initialValues={{ prenom: signUpApprentiStore.prenom, nom: signUpApprentiStore.nom, email: signUpApprentiStore.email, password: signUpApprentiStore.password }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          signUpApprentiStore.setPrenom(values.prenom);
          signUpApprentiStore.setNom(values.nom);
          signUpApprentiStore.setEmail(values.email);
          signUpApprentiStore.setPassword(values.password);
          actions.setSubmitting(false);
          navigate('/apprenti/signUpTwo')
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center self-center'>
            {/* Prenom Field */}
            <div className="flex flex-row items-center justify-between max-w-3xl w-1/2">
              <label htmlFor="prenom" className="text-main-color font-semibold flex items-center text-xl leading-tight">
                Prénom
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="prenom"
                  id="prenom"
                  placeholder='Prénom'
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.prenom && touched.prenom && errors.prenom}</div>
              </div>
            </div>

            {/* Nom Field */}
            <div className="flex flex-row items-center justify-between max-w-3xl w-1/2 ">
              <label htmlFor="nom" className="text-main-color font-semibold flex items-center text-xl leading-tight">
                Nom
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="nom"
                  id="nom"
                  placeholder='Nom'
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.nom && touched.nom && errors.nom}</div>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-row items-center justify-between max-w-3xl w-1/2">
              <label htmlFor="email" className="text-main-color font-semibold flex items-center text-xl leading-tight">
                Email
              </label>
              <div className="mt-2">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Pi-talents@mail.com'
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.email && touched.email && errors.email}</div>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-row items-center justify-between max-w-3xl w-1/2 mb-4">
              <label htmlFor="password" className="text-main-color font-semibold flex items-center text-xl leading-tight">
                Mot de Passe
              </label>
              <div className="mt-2 relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder='Mot de Passe'
                  autoComplete="new-password"
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                  />
                  <button 
                  type="button" 
                  onClick={togglePasswordVisibility} 
                  className="absolute top-3 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              <div className="text-red-500 text-sm min-h-[20px]">{errors.password && touched.password && errors.password}</div>
              </div>
            </div>
            
            <div className="flex flex-row items-center justify-end max-w-3xl w-1/2">
            
            <button type="submit" className="mt-4 w-40 mx-16 bg-blue text-main-color font-bold py-2 px-4 rounded ">
              S'inscrire
            </button>
            <button type="button" onClick={()=>navigate('/apprenti/signIn')} className="mt-4 w-40 bg-nav-bar-selected text-white font-bold py-2 px-4 rounded">
              Me connecter
            </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
})

export  {LoginPageAprenti1};
