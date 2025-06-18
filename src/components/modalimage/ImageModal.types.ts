export interface ImageSrc {
  raw: string;
  full?: string; // Необов’язкове поле, якщо воно не завжди присутнє
}

export interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  src: ImageSrc;
  alt: string;
}
