import { Typography } from "@material-tailwind/react";

interface TextBlockProps {
  text: string | number | boolean | undefined;
  subText?: string | number;
}
const TextBlock = ({ text, subText }: TextBlockProps) => {
  if (typeof text === "boolean" || typeof text === undefined) return null;
  return (
    <div className="flex flex-col">
      <Typography variant="small" color="blue-gray" className="font-normal">
        {text}
      </Typography>
      {subText && (
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal opacity-70"
        >
          {subText}
        </Typography>
      )}
    </div>
  );
};

export default TextBlock;
