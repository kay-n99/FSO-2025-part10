import { Platform } from "react-native";

const platformFonts = Platform?.select
  ? Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    })
  : 'System';

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    mainBackground: "#e1e4e8",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: platformFonts,
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
