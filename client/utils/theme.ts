//add colours here give name with respect to design
const colors = {
  PRIMARY: "#22DD33",
  TEXTCOLOR: "#000",
  WHITE: "#fff",
  GREY50: "#F5F5F5",
  GREY100: "#ECECEC",
  GREY400: "#B1B1B1",
  GREY900: "#202020",
  GREY200: "#D8D8D8",
  GREY500: "#9E9E9E",
  GREY600: "#7E7E7E",
  GREY700: "#5F5F5F",
  GREY800: "#3F3F3F",
  PRIMARYBLUE: "#003dab",
  ROYAL_BLUE: "#00177A",
  REDFF7875: "#FF7875",
  REDFFCCC7: "#FFCCC7",
  REDFF4D4F: "#FF4D4F",
  REDFFA39E: "#FFA39E",
  TRANSPARENT: "transparent",
  PURPLE100: "#F1EFFB",
  PURPLE200: "#E3DFF6",
  PURPLE300: "#D5CFF2",
  PURPLE400: "#C7BFEE",
  PURPLE500: "#B8AFE9",
  PURPLE600: "#AA9EE5",
  PURPLE800: "#8E7EDD",
  PURPLE900: "#806ED8",
  PURPLE: "#725ED4",
  DEEPNAVY400: "#9EA1B1",
  DEEPNAVY: "#0C133D",
  PRIMARY200: "#CCD8EE",
  PRIMARY600: "#668BCB",
  GREENB7EB8F: "#B7EB8F",
  GREENSUCCESS: "#389E0D",
  PRIMARY100: "#E5ECF6",
  PRIMARY300: "#B3C5E5",
  PRIMARY400: "#99B1DC",
  PRIMARY700: "#4D77C2",
  REDFFF1F0: "#FFF1F0",
  ALERT: "#FF4D4F",
  BLUEC8EDFF: "#C8EDFF",
  BLUEE6F7FF: "#E6F7FF",
  BLUEE096DD9: "#096DD9",
  PINK_100: "#faeef6",
  PINK_200: "#f4deec",
  PINK_300: "#efcde3",
  NONE: undefined,
};

const fontFamilies = {
  POPPINS_LIGHT: "Poppins-Light",
  POPPINS_MEDIUM: "Poppins-Medium",
  POPPINS_REGULAR: "Poppins-Regular",
  POPPINS_SEMIBOLD: "Poppins-SemiBold",
  URBANIST_MEDIUM: "Urbanist-Medium",
  URBANIST_REGULAR: "Urbanist-Regular",
  URBANIST_SEMIBOLD: "Urbanist-SemiBold",
};
const spacings = {
  NONE: 0,
  TINY: 2,
  SMALL: 4,
  BASE: 8,
  MEDIUM: 12,
  MID_LARGE: 14,
  LARGE: 16,
  EXTRA_LARGE: 24,
  SECTION: 32,
  EXTRA_SECTION: 40,
  GUTTER: 48,
  DOUBLE_GUTTER: 64,
};

const radii = {
  NONE: 0,
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 16,
  EXTRALARGE: 24,
  FULL: 9999,
};

const fontSizes = {
  XS: 10,
  SM: 12,
  MD: 14,
  LG: 16,
  XL: 18,
  XXL: 20,
  "3XL": 22,
  "4XL": 24,
  "5XL": 28,
  "6XL": 32,
  "20PX": 20,
  "48PX": 48,
  "64PX": 64,
};

type ColorsType = keyof typeof colors;
type FontFamilyType = keyof typeof fontFamilies;
type SpacingType = keyof typeof spacings;
type FontSizeType = keyof typeof fontSizes;
type RadiiType = keyof typeof radii;

export { colors, fontFamilies, fontSizes, spacings, radii };
export type {
  ColorsType,
  FontFamilyType,
  SpacingType,
  FontSizeType,
  RadiiType,
};
