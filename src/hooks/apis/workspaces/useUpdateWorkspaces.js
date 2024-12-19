import { useMutation } from '@tanstack/react-query';

import { updateWorkspaceRequest } from '@/api/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useUpdateWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const {isLoading, isSuccess, error, mutateAsync : updateWorkspaceMutation} = useMutation({
        mutationFn: (name) => updateWorkspaceRequest({ workspaceId, name, token: auth?.token}),
        onSuccess: () => {
            console.log('Workspace updated successfully');
        },
        onError: (error) => {
            console.log('Error in updating workspace', error);
        }
    });

    return {
        isPending: isLoading,
        isSuccess,
        error,
        updateWorkspaceMutation
    };
};