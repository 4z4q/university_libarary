import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-white p-7 w-full rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h2 className="font-semibold text-xl">ALL BOOK</h2>
        <Button asChild className="bg-primary-admin">
            <Link href="/admin/books/new" className="text-white ">+ Create a New Book</Link>
        </Button>
      </div>
      <div className="w-full overflow-hidden mt-7 ">
        <p>Table</p>
      </div>
    </div>
  );
};

export default page;
