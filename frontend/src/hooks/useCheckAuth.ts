import { AuthContext } from "@/contexts/authContext";
import authService from "@/services/authService";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

interface UseCheckAuthProps {
  routeToPushIfNoAuth?: string;
  routeToPushIfAuth?: string;
}

export const useCheckAuth = ({ routeToPushIfNoAuth, routeToPushIfAuth }: UseCheckAuthProps) => {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const userData = await authService.validateRefreshToken();
      
      setUser(userData || null);

      setIsLoading(false);
    })()
  }, []);

  useEffect(() => {
    if (!user && !isLoading && routeToPushIfNoAuth) {
      router.push(routeToPushIfNoAuth);
    }

    if (user && !isLoading && routeToPushIfAuth) {
      router.push(routeToPushIfAuth);
    }
  }, [user, isLoading]);

  return { user, isLoading };
}