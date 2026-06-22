import { defineThemes } from './theme.models';

export const { themes: appThemes, useTheme: useAppTheme } = defineThemes({
  light: {
    background: '#ffffff',
    text: {
      baseColor: '#333639',
      mutedColor: '#767c82',
    },
    default: {
      color: 'rgba(46, 51, 56, 0.05)',
      colorHover: 'rgba(46, 51, 56, 0.09)',
      colorPressed: 'rgba(46, 51, 56, 0.22)',
    },
    primary: {
      color: '#18a058',
      colorHover: '#1ea54c',
      colorPressed: '#0C7A43',
      colorFaded: '#18a0582f',
    },
    warning: {
      color: '#f59e0b',
      colorHover: '#f59e0b',
      colorPressed: '#f59e0b',
      colorFaded: '#f59e0b2f',
    },
    success: {
      color: '#18a058',
      colorHover: '#36ad6a',
      colorPressed: '#0c7a43',
      colorFaded: '#18a0582f',
    },
    error: {
      color: '#d03050',
      colorHover: '#de576d',
      colorPressed: '#ab1f3f',
      colorFaded: '#d030502a',
    },
  },
  warm: {
    background: '#f4e8c8',
    text: {
      baseColor: '#433121',
      mutedColor: '#7b6b55',
    },
    default: {
      color: 'rgba(67, 49, 33, 0.06)',
      colorHover: 'rgba(67, 49, 33, 0.1)',
      colorPressed: 'rgba(67, 49, 33, 0.2)',
    },
    primary: {
      color: '#c08a27',
      colorHover: '#d39b38',
      colorPressed: '#a36f19',
      colorFaded: '#c08a2730',
    },
    warning: {
      color: '#b46a1d',
      colorHover: '#c17921',
      colorPressed: '#9c5a14',
      colorFaded: '#b46a1d2f',
    },
    success: {
      color: '#5f8453',
      colorHover: '#6e935e',
      colorPressed: '#4c6f43',
      colorFaded: '#5f84532f',
    },
    error: {
      color: '#b15b5b',
      colorHover: '#c46b6b',
      colorPressed: '#984d4d',
      colorFaded: '#b15b5b2a',
    },
  },
  dark: {
    background: '#1e1e1e',
    text: {
      baseColor: '#ffffffd1',
      mutedColor: '#ffffff80',
    },
    default: {
      color: 'rgba(255, 255, 255, 0.08)',
      colorHover: 'rgba(255, 255, 255, 0.12)',
      colorPressed: 'rgba(255, 255, 255, 0.24)',
    },
    primary: {
      color: '#1ea54c',
      colorHover: '#36AD6A',
      colorPressed: '#0C7A43',
      colorFaded: '#18a0582f',
    },
    warning: {
      color: '#f59e0b',
      colorHover: '#f59e0b',
      colorPressed: '#f59e0b',
      colorFaded: '#f59e0b2f',
    },
    success: {
      color: '#18a058',
      colorHover: '#36ad6a',
      colorPressed: '#0c7a43',
      colorFaded: '#18a0582f',
    },
    error: {
      color: '#e88080',
      colorHover: '#e98b8b',
      colorPressed: '#e57272',
      colorFaded: '#e8808029',
    },
  },
});
