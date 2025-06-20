import css from "./ErrorMessage.module.css";
interface MessageProps {
  message: string;
}

const ErrorMessage = ({ message }: MessageProps) => {
  return (
    <div className={css.message}>
      <h3 className={css.title}>{message}</h3>
      <p className={css.text}>
        When entering words, please put spaces between them and use the layout
        with the input language.
      </p>
    </div>
  );
};
export default ErrorMessage;
