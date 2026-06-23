import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  Menu: {
    itemHeight: '32px',
  },

  Layout: { color: '#f1f5f9' },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const warmThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#c08a27',
    primaryColorHover: '#d39b38',
    primaryColorPressed: '#a36f19',
    primaryColorSuppl: '#d39b38',
  },

  Notification: {
    color: '#fff8e8',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#fcf2dc' },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#f4e8c8',
    siderColor: '#efe0b9',
    siderBorderColor: 'transparent',
  },

  Card: {
    color: '#fffaf0',
    borderColor: '#ead8b0',
  },

  Table: {
    tdColor: '#fffaf0',
    thColor: '#f1e1bc',
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1ea54cFF',
    primaryColorHover: '#36AD6AFF',
    primaryColorPressed: '#0C7A43FF',
    primaryColorSuppl: '#36AD6AFF',
  },

  Notification: {
    color: '#333333',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#1c1c1c',
    siderColor: '#232323',
    siderBorderColor: 'transparent',
  },

  Card: {
    color: '#232323',
    borderColor: '#282828',
  },

  Table: {
    tdColor: '#232323',
    thColor: '#353535',
  },
};
