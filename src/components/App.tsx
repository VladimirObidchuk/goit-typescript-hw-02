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
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");

  const bottomRef = useRef<HTMLImageElement>(null);

  const handleSearch = (newImage: string) => {
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
    setModalAlt(photo.alt_description || "Unsplash photo");
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
