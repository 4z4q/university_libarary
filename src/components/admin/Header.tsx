import { Session } from "next-auth";

export function SiteHeader({ session }: { session: Session }) {
  return (
    <header className="admin-header ">
      <div>
        {/* <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        /> */}
        <h2 className="text-dark-400 font-semibold text-2xl">
          MOHAMMED
          {/* {session.user?.name} */}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>
    </header>
  );
}
