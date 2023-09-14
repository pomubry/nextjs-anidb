interface PropType {
  themes: string[];
  heading: string;
}

const Themes = ({ themes, heading }: PropType) => {
  return (
    <div className="flex-[50%]">
      <h3 className="text-sm font-bold text-purple sm:text-base md:text-lg">
        {heading}
      </h3>
      <ul className="text-xs sm:text-sm">
        {themes.map((song) => (
          <li className="my-2 rounded-md p-3 shadow-xl bg-card" key={song}>
            {song}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Themes;
