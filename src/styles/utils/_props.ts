export interface GravityProps {
  layout?: string;
  text?: string;
  width?: string;
}

export const layout: any = {
  flexible: {
    display: 'flex',
    '> *': {
      flex: '1 0 auto',
    },
  },
  vertical: {
    flexDirection: 'column',
  },
  stretch: (attributes: any = '1-0-auto') => {
    attributes = attributes.split('-');
    if (!attributes[1]) attributes[1] = '0';
    if (!attributes[2]) attributes[2] = 'auto';
    return {
      flex: `${attributes[0]} ${attributes[1]} ${attributes[2]}`,
    };
  },
};

export const text: any = {
  align: (dir: string = 'center') => ({
    textAlign: dir,
  }),
};

export const width: any = {
  narrow: {
    width: '400px',
  },
  wide: {
    width: '800px',
    maxWidth: '100%',
  },
};
