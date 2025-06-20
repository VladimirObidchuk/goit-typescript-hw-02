import css from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import type { SearchBarProps } from "../../types/searchBar";

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get("search") as string;
    if (searchValue.trim() === "") {
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
