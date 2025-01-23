import Image from "next/image";
import { FC } from "react";

type RowPattern = {
  gifs: [number, number];
  ratio: number;
};

const rowPatterns: RowPattern[] = [
  { gifs: [1, 2], ratio: 0.7 },
  { gifs: [2, 3], ratio: 0.6 },
  { gifs: [3, 4], ratio: 0.5 },
  { gifs: [4, 1], ratio: 0.4 },
  { gifs: [1, 3], ratio: 0.3 },
  { gifs: [2, 4], ratio: 0.8 },
];

const HamsterGrid: FC = () => {
  const totalRows = 12;

  const getGifForPosition = (
    rowIndex: number,
    position: number,
    isMobile: boolean,
  ) => {
    const pattern = rowPatterns[rowIndex % rowPatterns.length];
    const imagesPerRow = isMobile ? 6 : 18;
    const useFirstGif = position < imagesPerRow * pattern.ratio;
    return `/${pattern.gifs[useFirstGif ? 0 : 1]}.gif`;
  };

  return (
    <div style={{ width: '100%', padding: '0.5rem 1rem 1rem' }}>
      {Array.from({ length: totalRows }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ width: '100%', marginBottom: '0.25rem' }}>
          {/* Mobile Grid */}
          <div className="hamster-row sm-hidden">
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <div key={colIndex} style={{ position: 'relative', aspectRatio: '1' }}>
                <Image
                  src={getGifForPosition(rowIndex, colIndex, true)}
                  alt={`Dancing Hamster ${rowIndex * 6 + colIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 16vw"
                  style={{ objectFit: 'contain' }}
                  priority={rowIndex < 6}
                />
              </div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hamster-row-desktop">
            {Array.from({ length: 18 }).map((_, colIndex) => (
              <div key={colIndex} style={{ position: 'relative', aspectRatio: '1' }}>
                <Image
                  src={getGifForPosition(rowIndex, colIndex, false)}
                  alt={`Dancing Hamster ${rowIndex * 18 + colIndex + 1}`}
                  fill
                  sizes="(min-width: 640px) 5.5vw, 66px"
                  style={{ objectFit: 'contain' }}
                  priority={rowIndex < 6}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HamsterGrid;
