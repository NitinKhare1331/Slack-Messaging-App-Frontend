import CreateWorkspaceContext from '@/context/CreateWorkspaceContext';
import { useContext } from 'react';

export const useCreateWorkspaceModal = () => {
    return useContext(CreateWorkspaceContext);
};