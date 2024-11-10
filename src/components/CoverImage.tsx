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
          w={56}
          fallbackSrc="https://placehold.co/140x200?text=No+Image"
        />
      ) : (
        <div className="relative aspect-7/10">
          {coverCustom && (
            <div
              className="w-14 px-2 bg-cover bg-center rounded-md"
              style={coverStyle}
            >
              <div className="w-14 aspect-[7/10] flex items-center">
                <p className="w-10 text-center leading-snug text-[10px]">
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
