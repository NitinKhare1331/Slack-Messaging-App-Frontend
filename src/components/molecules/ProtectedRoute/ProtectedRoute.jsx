import { useAuth } from "@/hooks/context/useAuth";
import { LucideLoader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();

    //If the loading state becomes false

    if(auth.isLoading) {
        return <div><LucideLoader2 className="animate-spin ml-2" />Loading...</div>;
    }

    if(!auth.user || !auth.token){
        return <Navigate to="/auth/signin" />
    }

    return children;
};