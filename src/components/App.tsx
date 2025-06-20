import "modern-normalize";
import "./App.css";
import { useEffect, useRef, useState } from "react";

import { GridLoader } from "react-spinners";

import { fetchData } from "../api/api";
import ImageGallery from "./gallery/ImageGallery";
import SearchBar from "./searchbar/SearchBar";
import ImageModal from "./modalimage/ImageModal";
import ErrorMessage from "./errormessage/ErrorMessage";
import LoadMoBtn from "./loadmobtn/LoadMoBtn";
import type { Photo } from "../types/photos";

export default function App() {
  const [collection, setCollection] = useState<Photo[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const bottomRef = useRef<HTMLImageElement>(null);

  const handleSearch = (newImage: string) => {
    console.log(" newImage", newImage);
    setSearchValue(newImage);
    setCurrentPage(1);
    setCollection([]);
    setIsError(false);
    setErrorMessage("");
  };
  const incPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const openModal = (photo: Photo) => {
    setModalSrc(photo.urls.raw);
    setModalAlt(photo.alt_description);
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
    setModalSrc("");
    setModalAlt("");
  }
  useEffect(() => {
    if (bottomRef.current && currentPage > 1) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [collection, currentPage]);

  useEffect(() => {
    if (searchValue === "") {
      setCollection([]);
      return;
    }
    async function fetchDataCollection(): Promise<void> {
      try {
        setLoading(true);
        const collection = await fetchData(searchValue, currentPage);
        setCollection((prevImages: Photo[]) => [
          ...prevImages,
          ...collection.data.results,
        ]);
        setTotalPages(collection.data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDataCollection();
  }, [currentPage, searchValue]);

  const hasCollection = collection.length > 0;
  const isLastPage = currentPage === totalPages;
  const valueSearch = searchValue.trim() !== "";

  return (
    <div className="main">
      <SearchBar onSubmit={handleSearch} />
      {loading && <GridLoader />}
      {hasCollection ? (
        <ImageGallery
          photos={collection}
          openModal={openModal}
          bottomRef={bottomRef}
        />
      ) : !loading && valueSearch && !isError ? (
        <ErrorMessage message="No results" />
      ) : null}
      {isError && <ErrorMessage message={errorMessage} />}
      {!loading && !isLastPage && hasCollection && (
        <LoadMoBtn incPage={incPage} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </div>
  );
}
