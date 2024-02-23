import './index.css'
import { observer } from 'mobx-react-lite'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginPageAprenti1,LoginPageApprenti2, NotFoundPage, LoginPageApprenti3, SignUpMaitre} from './views'
import { GuestRoute, ProtectedRoute } from './routes';
import { Navbar } from './components';

const App=observer(() => {
  return (
    <Router>
      <Navbar />
    <Routes>
      <Route path="/apprenti/signUpOne" element={<GuestRoute><LoginPageAprenti1 /></GuestRoute>} />
      <Route path="/apprenti/signUpTwo" element={<GuestRoute><LoginPageApprenti2 /></GuestRoute>} />
      <Route path="/apprenti/signUpThree" element={<GuestRoute><LoginPageApprenti3 /></GuestRoute>} />
      <Route path="/MaitreApprentissage/signUpMaitre/:mailMaitre/:nomMaitre/:prenomMaitre/:email" element={<GuestRoute><SignUpMaitre /></GuestRoute>} />
      {/* <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} /> */}
      {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
  )
})

export default App
