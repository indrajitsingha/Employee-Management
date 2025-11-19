import Navbar from "@/components/Navbar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const ProtectedRoutes = () => {
  return (
    <>
      <SignedIn>
        <Navbar />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedRoutes;
