import React from 'react';

interface Props {
  thickness: number,
  color: string,
  height?: number,
  width?: number,
  style?: object
}

const CustomDivider : React.FC<Props> = ({thickness, color, height, width, style}) : JSX.Element => {
  let dividerStyle: React.CSSProperties = height ? 
  {
    height: `${height}%`,
    width: `${thickness}px`,
    backgroundColor: color,
    margin: 'auto 3px',
  } : {
    width: `${width}%`,
    height: `${thickness}px`,
    backgroundColor: color,
    margin: '3px auto',
  };
  return (
    <React.Fragment>
      {
        style ? 
        <div style={{...dividerStyle, ...style}}></div> : 
        <div style={dividerStyle}></div>
      }
    </React.Fragment>
  );
}

export default CustomDivider;