import { useCaptureOrder } from "@/hooks/apis/payments/useCaptureOrder";
import { useEffect } from "react";

const loadRazorpayScript = (src) => {
    return new Promise((res, rej) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log('Razorpay script loaded');
            res(true);
        };
        script.onerror = () => {
            console.log('Error in loading Razorpay script');
            res(false);
        };
        document.body.appendChild(script);
    })
}
export const RenderRazorpayPopup = ({ 
    orderId,
    keyId,
    currency,
    amount,
}) => {
    console.log('RenderRazorpayPopup', orderId, keyId, currency, amount);
    const { captureOrderMutation } = useCaptureOrder();
    
    const display = async (options) => {
        const scriptResponse = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!scriptResponse) {
            console.log('Error in loading script');
            return;
        }
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed',async function (response){
            console.log('Payment failed', response.error.code);
            await captureOrderMutation({
                orderId: options.order_id,
                status: 'failed',
                paymentId: '',
            });
        });
        rzp.open();
    }
    
    useEffect(() => {
        display({
            key: keyId,
            amount,
            currency,
            name: "Nitin Khare", // name of the company
            description: "Test Transaction",
            order_id: orderId,
            handler: async (response) => {
                console.log('Payment success', response);
                console.log('Signature', response.razorpay_signature);
                await captureOrderMutation({
                    orderId: orderId,
                    status: 'success',
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                });
                // redirect your user to your custom succesds page
            }
        })
        
    }, [orderId]);
    return null;
}