interface LoadMoBtnProps {
  incPage: () => void;
}

const LoadMoBtn = ({ incPage }: LoadMoBtnProps) => {
  return <button onClick={incPage}>Load more</button>;
};
export default LoadMoBtn;
