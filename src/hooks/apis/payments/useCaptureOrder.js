import { capturePaymentRequest } from "@/api/payments"
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useCaptureOrder = () => {
    const { auth } = useAuth();
    const {
        mutateAsync: captureOrderMutation,
        error,
        isSuccess,
        isPending
    } = useMutation({
        mutationFn: ({ orderId, status, paymentId, signature }) => capturePaymentRequest({
            token: auth?.token,
            orderId,
            status,
            paymentId,
            signature
        }),
        onSuccess: () => {
            console.log('Payment captured successfully');
        },
        onError: (error) => {
            console.log('Error in capturing payment', error);
        }
    });
    return {
        captureOrderMutation,
        error,
        isSuccess,
        isPending
    }
}