import { Route, Routes } from 'react-router-dom';

import { SigninContainer } from '@/components/organisms/Auth/SigninContainer';
import { SignupContainer } from '@/components/organisms/Auth/SignupContainer';
import { Auth } from '@/pages/Auth/Auth';
import { Home } from '@/pages/Home/Home';
import { Notfound } from '@/pages/Notfound/Notfound';
import { ProtectedRoute } from '@/components/molecules/ProtectedRoute/ProtectedRoute';
import { WorkspaceLayout } from '@/pages/workspace/Layout';
import { JoinPage } from '@/pages/workspace/JoinPage';
import { Channel } from './pages/workspace/Channel/Channel';
import { Payments } from './pages/Payments/Payments';


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/signup" element={<Auth><SignupContainer /></Auth>} />
            <Route path="/auth/signin" element={<Auth><SigninContainer /></Auth>} />
            <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route path="/workspaces/:workspaceId" element={<ProtectedRoute><WorkspaceLayout></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/workspaces/:workspaceId/channels/:channelId" element={<ProtectedRoute><WorkspaceLayout><Channel /></WorkspaceLayout></ProtectedRoute>}/>
            <Route path="/workspaces/join/:workspaceId" element={<JoinPage />} />
            <Route path="/makepayment" element={<ProtectedRoute><Payments/></ProtectedRoute>} />
            <Route path="/*" element={<Notfound />} />
        </Routes>
    );
};