import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  id,
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
  videoUrl,
  summary,
  createdAt,
}: Book) => {
  return (
    <section className="book-overview">
      <div className="flex flex-col gap-5 flex-1 ">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200 ">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200 ">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src={"/icons/star.svg"} width={22} height={22} alt="star" />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books
            <span className="font-semibold text-light-200 ">
              {total_copies}
            </span>
          </p>
          <p>
            Available Books
            <span className="font-semibold text-light-200 ">
              {available_copies}
            </span>
          </p>
        </div>

        <p className="book-description"> {description}</p>

        <Button className="book-overview_btn">
          <Image src={"/icons/book.svg"} height={20} width={20} alt="book" />
          <p className="font-bebas-neue text-xl text-dark-100">Borrow Book Requset</p>
        </Button>
      </div>

      <div className="flex justify-center gap-5 flex-1">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />

          <div className="absolute top-6 left-40 transform rotate-10 blur-sm opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={color}
              coverImage={cover}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
