interface SortedColumn<T> {
  key: keyof T;
  direction: "asc" | "desc";
}

export function sortItems<T>(items: T[], sortedColumn: SortedColumn<T>): T[] {
  return items.sort((a, b) => {
    const aValue = a[sortedColumn.key];
    const bValue = b[sortedColumn.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortedColumn.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortedColumn.direction === "asc"
        ? (aValue as any) - (bValue as any)
        : (bValue as any) - (aValue as any);
    } else if (aValue instanceof Date && bValue instanceof Date) {
      return sortedColumn.direction === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      if (aValue === bValue) return 0;
      if (sortedColumn.direction === "asc") {
        return aValue ? -1 : 1;
      } else {
        return aValue ? 1 : -1;
      }
    }
    return 0;
  });
}
