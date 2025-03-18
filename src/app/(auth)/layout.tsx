"use server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const layaout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src={"/icons/logo.svg"} alt="logo" width={40} height={40} />
            <h1 className="text-2xl text-white font-semibold">BookWis</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="auth illustration"
          width={500}
          height={500}
          className="w-full object-cover h-full"
        />
      </section>
    </main>
  );
};

export default layaout;
