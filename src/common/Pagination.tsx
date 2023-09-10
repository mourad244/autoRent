import React, { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Button2Props {
  content: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  variant?: "outlined" | "text";
  size?: "sm" | "md";
}

function Button2({
  content,
  onClick,
  active,
  disabled,
  variant = "text",
  size = "sm",
}: Button2Props) {
  const baseClasses =
    "flex items-center justify-center transition-colors rounded-lg h-9";

  let variantClasses;
  switch (variant) {
    case "outlined":
      variantClasses = "border border-gray-300 p-2 m-1 text-sm ";
      break;
    case "text":
    default:
      variantClasses = "";
      break;
  }

  let sizeClasses;
  if (variant === "text")
    switch (size) {
      case "sm":
        sizeClasses = "w-9  text-sm";
        break;
      case "md":
      default:
        sizeClasses = "w-12 h-12 text-base";
        break;
    }

  const activeClasses = active ? "bg-gray-800 text-white" : "";
  const hoverClasses =
    !active && !disabled ? "hover:bg-gray-800 hover:text-white" : "";
  const disabledClasses = disabled
    ? "text-gray-400 cursor-not-allowed"
    : "text-gray-800";

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${activeClasses} ${hoverClasses} ${disabledClasses}`;

  return (
    <button className={combinedClasses} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

interface PaginationNav1Props {
  gotoPage: (page: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  itemsPerPage: number;
  totalItems: number;
}

function PaginationNav1({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  itemsPerPage,
  totalItems,
}: PaginationNav1Props) {
  const renderPageLinks = useCallback(() => {
    const visiblePageButtonCount = 5;

    if (pageCount <= visiblePageButtonCount) {
      // When there are fewer pages than the visiblePageButtonCount
      return Array.from({ length: pageCount }, (_, idx) => (
        <Button2
          key={idx}
          content={idx + 1}
          onClick={() => gotoPage(idx)}
          active={pageIndex === idx}
        />
      ));
    }

    // When there are more than visiblePageButtonCount pages:
    let startPage = Math.max(pageIndex - 1, 0);
    let endPage = Math.min(pageIndex + 1, pageCount - 1);

    if (pageIndex === 0) {
      endPage = Math.min(pageIndex + 2, pageCount - 1);
    } else if (pageIndex === pageCount - 1) {
      startPage = Math.max(pageIndex - 2, 0);
    }

    return Array.from(
      { length: visiblePageButtonCount },
      (_, idx) => startPage + idx
    ).map((pageIndexToMap) => (
      <Button2
        key={pageIndexToMap}
        content={pageIndexToMap + 1}
        onClick={() => gotoPage(pageIndexToMap)}
        active={pageIndex === pageIndexToMap}
      />
    ));
  }, [pageIndex, pageCount]);

  return (
    <div className="flex items-center gap-2 justify-center font-semibold">
      <Button2
        content="«"
        onClick={() => gotoPage(0)}
        disabled={pageIndex === 0}
        variant="outlined"
        size="sm"
      />
      <Button2
        content="Previous"
        onClick={() => gotoPage(Math.max(0, pageIndex - 1))}
        disabled={!canPreviousPage}
        variant="outlined"
        size="sm"
      />
      <div className="flex items-center gap-2">{renderPageLinks()}</div>
      <Button2
        content="Next"
        onClick={() => gotoPage(Math.min(pageCount - 1, pageIndex + 1))}
        disabled={!canNextPage}
        variant="outlined"
        size="sm"
      />
      <Button2
        content="»"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={pageIndex === pageCount - 1}
        variant="outlined"
        size="sm"
      />
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const pageIndex = currentPage - 1; // Zero-based page index

  return (
    <PaginationNav1
      gotoPage={(page) => onPageChange(page + 1)}
      canPreviousPage={pageIndex > 0}
      canNextPage={pageIndex < pageCount - 1}
      pageCount={pageCount}
      pageIndex={pageIndex}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
    />
  );
}
