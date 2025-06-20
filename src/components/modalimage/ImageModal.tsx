import Modal from "react-modal";

Modal.setAppElement("#root");

interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  src: string;
  alt: string;
}

const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImageModal = ({ modalIsOpen, closeModal, src, alt }: ImageModalProps) => {
  return (
    <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      overlayClassName="overlay"
    >
      <img
        src={`${src}&w=800&h=600&fm=webp`}
        srcSet={`${src}&w=800&h=600&fm=webp 1x, ${src}&w=800&h=600&dpr=2&fm=webp 2x`}
        alt={alt}
      />
    </Modal>
  );
};
export default ImageModal;
