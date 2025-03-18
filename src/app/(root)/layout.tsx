import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if(!session) redirect("/sign-in");
  return (
    <main className="root-container text-white">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-15 pb-15">{children}</div>
      </div>
    </main>
  );
};

export default layout;
