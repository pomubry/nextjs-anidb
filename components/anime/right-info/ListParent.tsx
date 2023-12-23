interface PropType {
  children: React.ReactNode;
  className?: string;
  isPlaceholderData?: boolean;
}

export default function ListParent({
  children,
  className,
  isPlaceholderData,
}: PropType) {
  return (
    <ul
      className={`relative mb-10 grid grid-cols-[1fr] gap-3 md:grid-cols-[1fr,1fr] ${className} ${
        isPlaceholderData ? "select-none opacity-50" : "select-auto opacity-100"
      }`}
    >
      {children}
    </ul>
  );
}
