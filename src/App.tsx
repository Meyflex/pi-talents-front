import './index.css'
import { observer } from 'mobx-react-lite'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GuestRoute, ProtectedRoute } from './routes';
import { Navbar } from './components';
import { SignInMaitre,LoginPageAprenti1,LoginPageApprenti2, NotFoundPage, LoginPageApprenti3, SignUpMaitre, SignInApprenti, DashboardMaitre, HardSkillMaitre, DashboardApprenti, SkillApprenti } from './views';

const App=observer(() => {
  return (
    <Router>
      <Navbar />
    <Routes>
      <Route path="/apprenti/signUpOne" element={<GuestRoute><LoginPageAprenti1 /></GuestRoute>} />
      <Route path="/apprenti/signUpTwo" element={<GuestRoute><LoginPageApprenti2 /></GuestRoute>} />
      <Route path="/apprenti/signUpThree" element={<GuestRoute><LoginPageApprenti3 /></GuestRoute>} />
      <Route path="/apprenti/signIn" element={<GuestRoute><SignInApprenti /></GuestRoute>} />
      
      <Route path="/MaitreApprentissage/signUpMaitre/:mailMaitre/:nomMaitre/:prenomMaitre/:email" element={<GuestRoute><SignUpMaitre /></GuestRoute>} />
      <Route path="/MaitreApprentissage/signIn" element={<GuestRoute><SignInMaitre /></GuestRoute>} />

      <Route path="/MaitreApprentissage/dashboard" element={<ProtectedRoute><DashboardMaitre /></ProtectedRoute>} />
      <Route path="/MaitreApprentissage/competence" element={<ProtectedRoute><HardSkillMaitre /></ProtectedRoute>} />
      
      <Route path="/apprenti/dashboard" element={<ProtectedRoute><DashboardApprenti /></ProtectedRoute>} />
      <Route path="/apprenti/competence" element={<ProtectedRoute><SkillApprenti /></ProtectedRoute>} />
      {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
  )
})

export default App
