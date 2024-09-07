import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";
import { auth } from "@/lib/http.js";
import GoogleIcon from "@mui/icons-material/Google";

export default function Authentication() {
  const { mutate } = useMutation({
    mutationFn: auth.initiateGoogleAuth,
  });

  const handleGoogleSignIn = () => {
    mutate();
  };

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login/Signup to your Account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your google details for quick access and authentication
            </p>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white grid grid-cols-3 hover:bg-red-400 hover:shadow-md"
          >
            <GoogleIcon className="mr-2" />
            Continue Google
          </Button>
          
        </div>
      </div>
      <div className="hidden bg-muted lg:flex lg:flex-col lg:justify-center lg:items-center relative overflow-hidden">
        <img
          src="src/assets/login.png"
          alt="img"
          className="h-96 w-96 object-cover z-10"
        />
        <div className="absolute inset-0 z-0">
          <Boxes className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}