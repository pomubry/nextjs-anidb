interface BoxType {
  children: React.ReactNode;
  className?: string;
}

const ListParent = ({ children, className }: BoxType) => {
  return (
    <ul
      className={`relative mb-10 grid grid-cols-[1fr] gap-3 md:grid-cols-[1fr,1fr] ${className}`}
    >
      {children}
    </ul>
  );
};

export default ListParent;
