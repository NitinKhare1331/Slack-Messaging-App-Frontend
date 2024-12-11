import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SigninCard = () => {

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign In to log in</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-3">
                    <Input 
                        placeholder="Email"
                        required
                        onChange={(e) => setSignupForm({ ...signupForm, email:e.target.value })}
                        value={signupForm.email}
                        type="email"
                        disabled={false}
                    />
                    <Input 
                        placeholder="Password"
                        required
                        onChange={(e) => setSignupForm({ ...signupForm, password:e.target.value })}
                        value={signupForm.password}
                        type="password"
                        disabled={false}
                    />
                    <Button 
                        disabled={false}
                        size="lg"
                        type="submit"
                        className="w-full"
                    >
                        Continue
                    </Button>
                </form>

                <Separator className="my-5" />
                <p className="text-sm text-muted-foreground mt-4">
                    Do not have an account ? {' '}
                    <span 
                        className="text-sky-600 hover:underline cursor-pointer"
                        onClick={() => navigate('/auth/signup')}
                    >
                        Sign Up
                    </span>
                </p>
            </CardContent>
        </Card>
    );
}