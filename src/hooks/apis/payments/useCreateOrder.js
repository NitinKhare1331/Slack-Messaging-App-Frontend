import { createOrderRequest } from "@/api/payments";
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query";

export const useCreateOrder = () => {
    const { auth } = useAuth();
    const { mutateAsync: createOrderMutation, error, isSuccess, isPending } = useMutation({
        mutationFn: (amount) => createOrderRequest({ token: auth?.token, amount }),
        onSuccess: (data) => {
            console.log('Order created successfully', data);
        },
        onError: (error) => {
            console.log('Error in creating order', error);
        }
    });
    return {
        error,
        isSuccess,
        isPending,
        createOrderMutation
    };
}