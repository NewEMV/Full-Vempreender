
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ReferralHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      toast({
        title: "Indicação Aplicada!",
        description: `Bem-vindo! Seu código de indicação "${ref}" foi aplicado com sucesso.`,
        duration: 5000,
      });
    }
  }, [searchParams, toast]);

  return null;
}
