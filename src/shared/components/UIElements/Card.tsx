import React from 'react';

import './Card.css';

interface Props {
  className: string;
  style: React.CSSProperties;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
