"use client";

import { logoutUser } from "@/lib/actions/auth";
import { Button } from "./ui/button";

const Logout = () => {
  return (
    <Button
      onClick={async () => {
        await logoutUser();
      }}
      className="cursor-pointer"
    >
      Logout
    </Button>
  );
};

export default Logout;
