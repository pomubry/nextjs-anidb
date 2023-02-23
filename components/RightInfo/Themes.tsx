interface PropType {
  themes: string[];
  heading: string;
}

const Themes = ({ themes, heading }: PropType) => {
  return (
    <div className="flex-[50%]">
      <h3 className="text-sm font-bold text-purple-500 dark:text-purple-300 sm:text-base md:text-lg">
        {heading}
      </h3>
      <ul className="text-xs sm:text-sm">
        {themes.map((song) => (
          <li
            className="my-2 rounded-md bg-slate-100 p-3 dark:bg-slate-900"
            key={song}
          >
            {song}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Themes;
