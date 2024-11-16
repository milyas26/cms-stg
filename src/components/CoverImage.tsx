import { Image } from "@mantine/core";

const CoverImage = ({
  data,
}: {
  data: {
    coverImage: string;
    title: string;
    coverCustom?: {
      fontSize: number;
      backgroundColor: string;
      backgroundUrl: string;
      color: string;
    };
  };
}) => {
  const { coverImage, title, coverCustom } = data;

  const coverStyle = coverCustom
    ? {
        fontSize: `${coverCustom.fontSize}px`,
        backgroundColor: coverCustom.backgroundColor,
        backgroundImage: `url(${coverCustom.backgroundUrl})`,
        color: coverCustom.color || "white",
      }
    : {};

  return (
    <>
      {coverImage ? (
        <Image
          radius="sm"
          src={coverImage}
          alt={title}
          w={180}
          fallbackSrc="https://placehold.co/140x200?text=No+Image"
        />
      ) : (
        <div className="relative aspect-7/10">
          {coverCustom && (
            <div
              className="w-[180px] px-2 bg-cover bg-center rounded-md"
              style={coverStyle}
            >
              <div className="w-[180px] aspect-[7/10] flex items-center">
                <p className="w-[200px] text-center leading-snug text-[14px]">
                  {title || ""}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CoverImage;
