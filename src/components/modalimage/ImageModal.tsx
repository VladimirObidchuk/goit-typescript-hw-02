import Modal, { Styles } from "react-modal";
import { ImageModalProps } from "./ImageModal.types";

Modal.setAppElement("#root");

const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImageModal: React.FC<ImageModalProps> = ({
  modalIsOpen,
  closeModal,
  src,
  alt,
}) => {
  return (
    <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      overlayClassName="overlay"
    >
      <img
        src={`${src.raw}&w=800&h=600&fm=webp`}
        srcSet={`${src.raw}&w=800&h=600&fm=webp 1x, ${src.raw}&w=800&h=600&dpr=2&fm=webp 2x`}
        alt={alt}
      />
    </Modal>
  );
};
export default ImageModal;
