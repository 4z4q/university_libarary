import { ReactNode } from "react";
import "../../styles/style.css";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/admin/AppSidebar";
import { SiteHeader } from "@/components/admin/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <SidebarInset>
        <div className="admin-container">
          <SiteHeader session={session} />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
