import { Chip } from "@material-tailwind/react";

interface ChipBlockProps {
  isAvailable: boolean | undefined;
}

const ChipBlock = ({ isAvailable }: ChipBlockProps) => (
  <div className="w-max">
    <Chip
      variant="ghost"
      size="sm"
      value={isAvailable ? "Available" : "Not Available"}
      color={isAvailable ? "green" : "blue-gray"}
    />
  </div>
);

export default ChipBlock;
