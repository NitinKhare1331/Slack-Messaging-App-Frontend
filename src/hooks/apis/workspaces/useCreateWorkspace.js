import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { createWorkspaceRequest } from '@/api/workspaces';

export const useCreateWorkspace = () => {
    const { auth } = useAuth();

    const { isLoading, isSuccess, error, mutateAsync: createWorkspaceMutation } = useMutation({
        mutationFn: (data) => createWorkspaceRequest({ ...data, token: auth?.token }),
        onSuccess: (data) => {
            console.log('Successfully created workspace', data);
        },
        onError: (error) => {
            console.error('Failed to create workspace', error);
        }
    });

    return {
        isPending: isLoading,
        isSuccess,
        error,
        createWorkspaceMutation
    };
};