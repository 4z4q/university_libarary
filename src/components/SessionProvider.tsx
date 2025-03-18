import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";

const SessionProviderWrapper = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;

export const revalidate = 0;