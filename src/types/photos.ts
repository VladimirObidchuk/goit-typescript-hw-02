import React from "react";

export interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
    raw: string;
  };
  alt_description: string;
}

export interface Collection {
  data: {
    results: Photo[];
    total: number;
    total_pages: number;
  };
}

export interface ImageGalleryProps {
  photos: Photo[];
  openModal: (photo: Photo) => void;
  bottomRef: React.RefObject<HTMLImageElement | null>;
}

export interface ImageCardProps {
  photo: Photo;
  openModal: (photo: Photo) => void;
  isLast: boolean;
  bottomRef: React.RefObject<HTMLImageElement | null>;
}
