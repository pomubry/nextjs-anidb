interface PropType {
  children: React.ReactNode;
  className?: string;
}

export default function ListParent({ children, className }: PropType) {
  return (
    <ul
      className={`relative mb-10 grid grid-cols-[1fr] gap-3 md:grid-cols-[1fr,1fr] ${className}`}
    >
      {children}
    </ul>
  );
}
