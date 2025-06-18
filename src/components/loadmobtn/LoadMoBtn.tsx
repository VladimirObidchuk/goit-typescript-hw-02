type Props = {
  incPage: () => void;
};

const LoadMoBtn: React.FC<Props> = ({ incPage }) => {
  return <button onClick={incPage}>Load more</button>;
};
export default LoadMoBtn;
