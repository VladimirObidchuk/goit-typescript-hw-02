import css from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { SearchBarProps } from "./SearchBar.types";

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (formData: FormData): void => {
    const searchValue = formData.get("search") as string | null;
    if (!searchValue?.trim()) {
      toast.error(" No search parameter has been entered.");
      return;
    }

    onSubmit(searchValue.trim());
  };
  return (
    <header className={css.header}>
      <Toaster position="top-right" reverseOrder={false} />
      <form action={handleSubmit} className={css.form}>
        <button type="submit" className={css.btn}>
          <BsSearch />
        </button>
        <input
          type="text"
          name="search"
          className={css.input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default SearchBar;
