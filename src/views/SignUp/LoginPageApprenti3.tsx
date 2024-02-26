import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react';


const validationSchema = Yup.object().shape({
    prenom: Yup.string().required('Le prénom est requis'),
    nom: Yup.string().required('Le nom est requis'),
    email: Yup.string().email('L\'email est invalide').required('L\'email est requis'),
});

function base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
  

  
  const LoginPageApprenti3 = observer(() => {
      const { signUpApprentiStore,authenticationStore } = useStores();
      const navigate = useNavigate();
      const toast = useToast();

      
      const handleCreateApprenti =async ()=>{
        try {
        const photoBlob = signUpApprentiStore.photo ? base64ToBlob(signUpApprentiStore.photo, 'image/jpeg') : null;

            const formData = new FormData();
            formData.append('nom', signUpApprentiStore.nom);
            formData.append('prenom', signUpApprentiStore.prenom);
            formData.append('email', signUpApprentiStore.email);
            formData.append('password', signUpApprentiStore.password);
            formData.append('bio', signUpApprentiStore.bio);
            formData.append('domaineApprentissage', signUpApprentiStore.domaineApprentissage);
            formData.append('specialite', signUpApprentiStore.specialite);
            formData.append('mailMaitre', signUpApprentiStore.mailMaitre);
            formData.append('nomMaitre', signUpApprentiStore.nomMaitre);
            formData.append('prenomMaitre', signUpApprentiStore.prenomMaitre);
            if (photoBlob) formData.append('image', photoBlob, signUpApprentiStore.photoName);
    
        // Envoi avec Axios
        const response = await api.post('/auth/registerApprentit', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log(response.data); 
        const { token } = response.data;
        const { email } = response.data.apprenti;
        Cookies.set('userToken', token,{secure:true});    
        authenticationStore.setAuthToken(token);
        authenticationStore.setAuthEmail(email);
        authenticationStore.setUserType("Apprenti");
        authenticationStore.setUserJson(response.data)
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
        navigate('/apprenti/dashboard')
      } catch (error:any) {
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
      
      return (
    <div className='flex justify-center flex-col items-center font-display'>
      <p className='text-main-color font-semibold flex self-start text-xl leading-tight mt-32 mb-14 ml-72'>
        Et Maintenant {signUpApprentiStore.prenom},<br />
        Il est temps d’inviter ton maitre d’apprentissage á s’inscrire et te rejoindre dans l’aventure Pi Talents.
      </p>

      <Formik
        initialValues={{ prenom: signUpApprentiStore.prenomMaitre, nom:signUpApprentiStore.nomMaitre, email: signUpApprentiStore.mailMaitre}}
        validationSchema={validationSchema}
        className='w-full flex flex-col justify-center items-center self-center'
        onSubmit={async (values, actions) => {
        

          signUpApprentiStore.setMailMaitre(values.email);
          signUpApprentiStore.setNomMaitre(values.nom);
          signUpApprentiStore.setPrenomMaitre(values.prenom);
          handleCreateApprenti();
          actions.setSubmitting(false);
        
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 grid-flow-row'>
          
            
            <label htmlFor="prenom" className="text-main-color font-semibold flex justify-start items-center text-xl leading-tight">
                Prénom
            </label>
              <div className="mt-2">
              <Field
                  type="text"
                  name="prenom"
                  id="prenom"
                  placeholder="Le nom du maitre d'apprentissage"
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.prenom && touched.prenom && errors.prenom}</div>
              </div>

            
              <label htmlFor="nom" className="text-main-color font-semibold flex items-center justify-start text-xl leading-tight">
              Nom
              </label>

              <div className="mt-2">
                <Field
                  type="text"
                  name="nom"
                  id="nom"
                  placeholder="Le nom du maitre d'apprentissage"
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.nom && touched.nom && errors.nom}</div>
             </div>

              <label htmlFor="email" className="text-main-color font-semibold flex items-center justify-start text-xl leading-tight">
                Email
              </label>
              <div className="mt-2 w-full2">
              <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder='ex : back end development'
                  className="min-w-96 outline-none p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-main-color placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nav-bar-selected sm:text-sm sm:leading-6"
                />
                <div className="text-red-500 text-sm min-h-[20px]">{errors.email && touched.email && errors.email}</div>
              </div>
              <div className="mt-2 w-full2 row-start-5 col-start-2 flex justify-end">
                <button type="submit" className="mt-4 w-40 bg-blue text-white  font-bold py-2 px-4 rounded hover:bg-blue-700 max-w-32">
                    J’envoie
                </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
});

export { LoginPageApprenti3 };
