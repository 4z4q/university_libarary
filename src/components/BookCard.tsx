import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "flex flex-col items-center w-full")}>
      <Link
        href={""}
        className={cn(isLoanedBook && "flex flex-col items-center w-full")}
      >
        <BookCover coverColor={color} coverImage={cover} />
      </Link>

      <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>

      {isLoanedBook && (
        <div className="w-full mt-4">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={40}
              height={40}
              className="object-contain"
            />
            <p className="text-light-100">11 days left to return</p>
          </div>
          <Button className="book-btn">Download Receipt</Button>
        </div>
      )}
    </li>
  );
};

export default BookCard;
