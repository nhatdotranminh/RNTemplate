const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic',
  multi: {
    bold: 'Muli-Bold',
    regular: 'Muli-Regular'
  }
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,
  size22: 22,
  size13: 13,
  size15: 15
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}
const fontFamily = {
  fontLight: "Muli-Light",
  fontLightItalic: "Muli-LightItalic",
  fontRegular: "Muli-Regular",
  fontRegularItalic: "Muli-Italic",
  fontSemiBold: "Muli-SemiBold",
  fontSemiBoldItalic: "Muli-Semi-BoldItalic",
  fontBold: "Muli-Bold",
  fontBoldItalic: "Muli-BoldItalic",
  fontExtraBold: "Muli-ExtraBold",

}

export default {
  type,
  size,
  style,
  fontFamily
}
