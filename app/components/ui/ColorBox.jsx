export default function ColorBox({ color }) {
  return <div className={["w-4 h-4 rounded-md", color].join(" ")}></div>;
}

export function addColorBoxToOptions(options) {
  return options.map(function (option) {
    return {
      ...option,
      label: (
        <div className="flex flex-row items-center justify-start gap-2">
          <ColorBox color={option.ballBG} />
          <span>{option.label}</span>
        </div>
      ),
    };
  });
}
