"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@mantine/core";
import React from "react";
import bg from "../../../public/background/background-motif.svg";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { GoogleColorSvg } from "@/assets/icons/GoogleColor";
import { useTranslations } from "next-intl";

const Login = () => {
  const { loginGoogle, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations("auth");

  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="w-[470px] border border-slate-300 space-y-8 pb-10 mx-4 rounded-md">
          <div
            className="flex items-center justify-center"
            style={{
              backgroundImage: `url(${bg.src})`,
              backgroundSize: "cover",
              height: 200,
            }}
          >
            <img src="/logo/pena-black.svg" alt="inkcraft" width={160} />
          </div>
          <div className="flex justify-center">
            <div className="w-80 text-center">{t("login.description-1")}</div>
          </div>
          <div className="flex justify-center">
            <Button
              className="flex items-center gap-2 border-2 border-[#DDDDDD] text-black text-md"
              size="lg"
              color="#fff"
              variant="default"
              disabled={loading}
              onClick={loginGoogle}
            >
              <GoogleColorSvg className="h-8 w-8" />
              <div className="font-semibold pl-2">
                {t("login.login-with-google")}
              </div>
              {loading && (
                <LoaderCircle className="animate-spin font-semibold text-lg ml-2" />
              )}
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 text-center text-sm">
              {t("login.description-2")}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={() => router.push("/")}>{t("login.back")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
