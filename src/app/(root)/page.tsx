import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "../constant";
// import { db } from "@/database/drizzle";
// import { usersTable } from "@/database/schema";

export default  function Home() {
  // const result = await db.select().from(usersTable);
  // console.log(result);

  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Leatast Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
}
