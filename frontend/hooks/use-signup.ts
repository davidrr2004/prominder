import { useCallback, useState } from "react";

interface SignupData {
  name: string;
  email: string;
}

interface SignupResult {
  success: boolean;
  message: string;
}

export function useSignup() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<SignupResult | undefined>(undefined);

  const reset = useCallback(() => {
    setIsPending(false);
    setIsSuccess(false);
    setData(undefined);
  }, []);

  const mutate = useCallback(async (payload: SignupData) => {
    setIsPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const firstName = payload.name.trim().split(" ")[0] || "there";
    setData({
      success: true,
      message: `Welcome aboard, ${firstName}! We'll be in touch soon.`,
    });
    setIsSuccess(true);
    setIsPending(false);
  }, []);

  return { mutate, isPending, isSuccess, data, reset };
}
