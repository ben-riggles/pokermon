type Props = {
  bgColor?: string;
  fgColor?: string;
  height?: number;
  width?: number;
};

export default function Diamond({
  bgColor = '#ff2233',
  fgColor = '#880000',
  height = 22,
  width = 22,
}: Props) {
  return (
    <div className='center-flex'>
      <svg
        height={height * 1.2}
        width={width * 1.2}
        className='absolute'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <g transform='translate(0,0)'>
          <path
            d='M431.76 256c-69 42.24-137.27 126.89-175.76 224.78C217.51 382.89 149.25 298.24 80.24 256c69-42.24 137.27-126.89 175.76-224.78C294.49 129.11 362.75 213.76 431.76 256z'
            fill={bgColor}
            fillOpacity='1'
          ></path>
        </g>
      </svg>
      <svg
        className='absolute'
        height={height}
        width={width}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <g transform='translate(0,0)'>
          <path
            d='M431.76 256c-69 42.24-137.27 126.89-175.76 224.78C217.51 382.89 149.25 298.24 80.24 256c69-42.24 137.27-126.89 175.76-224.78C294.49 129.11 362.75 213.76 431.76 256z'
            fill={fgColor}
            fillOpacity='1'
          ></path>
        </g>
      </svg>
    </div>
  );
}
