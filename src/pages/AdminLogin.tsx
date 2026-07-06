import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, KeyRound, ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showOtpInput) return;
    
    setTimeLeft(60);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showOtpInput]);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("OTP sent to your registered admin email!");
        setShowOtpInput(true);
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (err) {
      toast.error("Error connecting to auth server.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("isAdminAuth", "true");
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Invalid OTP. Please check your email.");
      }
    } catch (err) {
      toast.error("Error verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setOtp("");
    try {
      const res = await fetch(`${API_URL}/admin/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("OTP resent successfully!");
        setTimeLeft(60);
      } else {
        toast.error(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      toast.error("Error connecting to auth server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-24 flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
              {showOtpInput ? (
                <KeyRound className="text-primary h-6 w-6" />
              ) : (
                <Lock className="text-primary h-6 w-6" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {showOtpInput ? "Enter Verification Code" : "Admin Login"}
            </CardTitle>
            <CardDescription>
              {showOtpInput 
                ? "Enter the 6-digit OTP code sent to your registered email" 
                : "Enter your credentials to access the dashboard"}
            </CardDescription>
          </CardHeader>
          
          {!showOtpInput ? (
            <form onSubmit={handleRequestOtp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="admin"
                    required 
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••"
                    required 
                    disabled={loading}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending OTP..." : "Request OTP"}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="otp">One-Time Password (OTP)</Label>
                    <button 
                      type="button" 
                      onClick={() => setShowOtpInput(false)}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                      disabled={loading}
                    >
                      <ArrowLeft className="h-3 w-3" /> Back
                    </button>
                  </div>
                  <Input 
                    id="otp" 
                    type="text" 
                    maxLength={6}
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
                    placeholder="Enter 6-digit code"
                    className="text-center text-lg tracking-[0.5em] font-mono"
                    required 
                    disabled={loading || timeLeft === 0}
                  />
                  {timeLeft > 0 ? (
                    <p className={`text-xs text-center mt-2 ${timeLeft < 10 ? 'text-red-500 font-bold animate-pulse' : 'text-slate-500'}`}>
                      Expires in: {timeLeft}s
                    </p>
                  ) : (
                    <div className="text-center mt-2 space-y-2">
                      <p className="text-xs text-red-500 font-bold">OTP has expired.</p>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-xs text-primary hover:underline font-semibold"
                        disabled={loading}
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading || timeLeft === 0}>
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
