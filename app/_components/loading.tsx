import { FC } from 'react';
import '../_styles/loading.scss';

const Loading: FC = () => {
  return (
    <div className="overlay">
      <div className="loading">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Loading;
