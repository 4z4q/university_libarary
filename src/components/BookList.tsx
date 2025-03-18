import BookCard from "./BookCard";

interface BookListProps {
  title: string;
  books: Book[];
  containerClassName: string;
}
// id,
// title,
// author,
// genre,
// rating,
// totalCopies,
// availableCopies,
// description,
// coverColor,
// coverUrl,
// videoUrl,
// summary,
// createdAt,
const BookList = ({ title, books, containerClassName }: BookListProps) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-2xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
