// hooks/useAuthRedirect.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // adjust based on your path
import { useUserLocalStorage } from "@/app/useUserLocalStorage";
import { useRouter } from "next/navigation";

const useAuthRedirect = () => {
  const router = useRouter();
  const {isAuthentication } = useSelector((state: RootState) => state.user);
  const { localUser } = useUserLocalStorage();

  
  useEffect(() => {
    if ( !isAuthentication && !localUser) {
      router.push("/login");
    }
  }, [isAuthentication, localUser, router]);
};

export default useAuthRedirect;
