const baseColors = {
  purpleLight: '#cfc3cf',
  purpleDark: '#3f0e40',
  purpleDark2: '#350d36',
  greenLight: '#00a017',
  redDark: '#c20000',
  redLight: '#ff0000',
  blueLight: '#4285f4',
};

export const lightTheme = {
  colors: {
    ...baseColors,
    white: '#FFF',
    white2: 'rgb(248,248,248)',
    black1: '#1D1C1D',
    black2: 'rgb(34,37,42)',
    whiteHover1: 'rgba(29,28,29,0.04)',
    blackHover1: 'rgba(248,248,248,1)',
    borderWhite1: 'rgba(29,28,29,0.13)',
    whiteHover2: 'rgba(29,28,29,0.07)',
    blackHover2: 'rgba(255,255,255,0.07)',
    borderBlack1: 'rgba(255,255,255,0.13)',
    grayDark: '#505563',
    grayLight: 'rgba(255,255,255,0.7)',
    toggleBorder: '#01729d',
    gradient: 'linear-gradient(#39598A, #79D7ED)',
  },
};

export const darkTheme = {
  colors: {
    ...baseColors,
    white: '#1A1D21',
    white2: 'rgb(34,37,42)',
    black1: '#FFF',
    black2: 'rgb(248,248,248)',
    whiteHover1: 'rgba(255,255,255,0.04)',
    blackHover1: 'rgba(29,28,29,0.04)',
    whiteHover2: 'rgba(255,255,255,0.07)',
    blackHover2: 'rgba(29,28,29,0.07)',
    borderWhite1: 'rgba(255,255,255,0.13)',
    borderBlack1: 'rgba(29,28,29,0.13)',
    grayDark: 'rgba(255,255,255,0.7)',
    grayLight: '#505563',
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(#091236, #1E215D)',
  },
};
