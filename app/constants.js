export function getValuesFromOptions(options) {
  return options.map(function (option) {
    return option.value;
  });
}

export const JOB_TYPES_OPTIONS = [
  {
    value: "full fulltime",
    label: "Full-time",
  },
  {
    value: "part parttime",
    label: "Part-time",
  },
  {
    value: "contract",
    label: "Contractor",
  },
  {
    value: "temp temporary",
    label: "Temporary",
  },
  {
    value: "intern internship",
    label: "Internship",
  },
  {
    value: "other",
    label: "Other",
  },
];
export const JOB_TYPES_OPTION_VALUES = getValuesFromOptions(JOB_TYPES_OPTIONS);

export const BRAND_COLOR_OPTIONS = [
  {
    value: "default",
    label: "Monochrome",
    postBG: "bg-white/5",
    ballBG: "bg-neutral-500",
  },
  {
    value: "red",
    label: "Red",
    postBG: "bg-red-500/5",
    ballBG: "bg-red-500",
  },
  {
    value: "orange",
    label: "Orange",
    postBG: "bg-orange-500/5",
    ballBG: "bg-orange-500",
  },
  {
    value: "amber",
    label: "Amber",
    postBG: "bg-amber-500/5",
    ballBG: "bg-amber-500",
  },
  {
    value: "yellow",
    label: "Yellow",
    postBG: "bg-yellow-500/5",
    ballBG: "bg-yellow-500",
  },
  {
    value: "lime",
    label: "Lime",
    postBG: "bg-lime-500/5",
    ballBG: "bg-lime-500",
  },
  {
    value: "green",
    label: "Green",
    postBG: "bg-green-500/5",
    ballBG: "bg-green-500",
  },
  {
    value: "emerald",
    label: "Emerald",
    postBG: "bg-emerald-500/5",
    ballBG: "bg-emerald-500",
  },
  {
    value: "teal",
    label: "Teal",
    postBG: "bg-teal-500/5",
    ballBG: "bg-teal-500",
  },
  {
    value: "cyan",
    label: "Cyan",
    postBG: "bg-cyan-500/5",
    ballBG: "bg-cyan-500",
  },
  {
    value: "sky",
    label: "Sky",
    postBG: "bg-sky-500/5",
    ballBG: "bg-sky-500",
  },
  {
    value: "blue",
    label: "Blue",
    postBG: "bg-blue-500/5",
    ballBG: "bg-blue-500",
  },
  {
    value: "indigo",
    label: "Indigo",
    postBG: "bg-indigo-500/5",
    ballBG: "bg-indigo-500",
  },
  {
    value: "violet",
    label: "Violet",
    postBG: "bg-violet-500/5",
    ballBG: "bg-violet-500",
  },
  {
    value: "purple",
    label: "Purple",
    postBG: "bg-purple-500/5",
    ballBG: "bg-purple-500",
  },
  {
    value: "fuchsia",
    label: "Fuchsia",
    postBG: "bg-fuchsia-500/5",
    ballBG: "bg-fuchsia-500",
  },
  {
    value: "pink",
    label: "Pink",
    postBG: "bg-pink-500/5",
    ballBG: "bg-pink-500",
  },
  {
    value: "rose",
    label: "Rose",
    postBG: "bg-rose-500/5",
    ballBG: "bg-rose-500",
  },
];
export const BRAND_COLOR_OPTION_VALUES =
  getValuesFromOptions(BRAND_COLOR_OPTIONS);

export const JOB_EXPIRE_OPTIONS = [
  {
    value: "7",
    label: "1 week",
  },
  {
    value: "15",
    label: "15 days",
  },
  {
    value: "31",
    label: "1 month",
  },
];
export const JOB_EXPIRE_OPTION_VALUES =
  getValuesFromOptions(JOB_EXPIRE_OPTIONS);

export const CURRENCY_OPTIONS = [
  {
    value: "USD",
    label: "$ / USD",
    symbol: "$",

    pricePost: 1 * 100, // $1 in cents
  },
  {
    value: "INR",
    label: "₹ / INR",
    symbol: "₹",

    pricePost: 75 * 100, // ₹50 in paisa
  },
];
export const CURRENCY_OPTION_VALUES = getValuesFromOptions(CURRENCY_OPTIONS);

export const JOB_PIN_OPTIONS = [
  {
    value: "0",
    label: "Don't",
    price: 0,
  },
  {
    value: "7",
    label: "1 week",
    price: 1,
  },
  {
    value: "15",
    label: "15 days",
    price: 2,
  },
  {
    value: "31",
    label: "1 month",
    price: 3,
  },
];
