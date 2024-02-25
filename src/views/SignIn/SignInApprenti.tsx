import  { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const validationSchema = Yup.object().shape({
   
    email: Yup.string().email('L\'email est invalide').required('L\'email est requis'),
    password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
  });
 
  
  const SignInApprenti = observer(() => {
      const { signUpApprentiStore,authenticationStore } = useStores();
      const navigate = useNavigate();
     
      const authenticateApprenti =async ()=>{
        try {
          // Envoi avec Axios
          const response = await api.post('/auth/authenticateApprenti', {
            username:signUpApprentiStore.email,
            password:signUpApprentiStore.password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const { token } = response.data;
          const { email } = response.data.apprenti;
          Cookies.set('userToken', token,{secure:true});    
          authenticationStore.setAuthToken(token);
          authenticationStore.setAuthEmail(email);
          authenticationStore.setUserType("Apprenti");
          authenticationStore.setUserJson(response.data);
          navigate('/apprenti/dashboard')
        } catch (error : any) {
          console.error('Error sending data:', error.message);
          
        }
        
      }
      const [showPassword, setShowPassword] = useState(false);

      const togglePasswordVisibility = () => setShowPassword(!showPassword);
      return (
    <div className='flex justify-center flex-col items-center font-display'>
      <p className='text-main-color font-semibold flex self-start text-xl leading-tight mt-32 mb-14 ml-72'>
        Bienvenue sur ton portail Pi Talents.     </p>

      <Formik
        initialValues={{ email: signUpApprentiStore.email, password: signUpApprentiStore.password }}
        validationSchema={validationSchema}
        className='w-full flex flex-col justify-center items-center self-center'
        onSubmit={async (values, actions) => {
          signUpApprentiStore.setEmail(values.email)
          signUpApprentiStore.setPassword(values.password)
          authenticateApprenti()
            actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 grid-flow-row'>
          
            
            

              <label htmlFor="email" className="text-main-color font-semibold flex items-center justify-start text-xl leading-tight">
                Email
              </label>
              <div className="mt-2 w-full2">
              <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Pi-talents@mail.com'
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.email && touched.email && errors.email}</div>
              </div>


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

              <div className="mt-2 w-full2 row-start-5 col-start-2 flex justify-end">
                <button type="submit" className="mt-4  bg-nav-bar-selected text-white  font-bold py-2 px-4 rounded hover:bg-blue-700 max-w-32">
                    Me connecter
                </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
});

export { SignInApprenti };