import { _ } from 'styles/utils';

const Main = _.g.main(props => {
  let fontSize = Math.max(Math.round(props.window.width * 0.02), 14);
  return [
    {
      position: 'fixed',
      height: `calc(100%)`,
      width: '100%',
      fontFamily: 'sans-serif',
      fontSize: `${fontSize}px`,
      lineHeight: '2em',
      '> *': {
        boxSizing: 'border-box',
      },
      '& form': {
        '& input': {
          padding: '.5em .75em',
          border: `1px solid ${_.colors.gray}`,
        },
        '& button': {
          padding: '.5em 2em',
          cursor: 'pointer',
          color: _.colors.white,
          background: _.colors.primary,
          flex: '0 0 0',
          transition: 'background .25s',
          '&:hover': {
            background: _.polished.darken(0.125, _.colors.primary),
          },
          '&[disabled]': {
            background: _.colors.gray,
            pointerEvents: 'none',
          },
        },
      },
    },
  ];
});

const Header = _.g.header({
  padding: '1em',
  color: _.colors.white,
  background: _.colors.primary,
  borderBottom: `1px solid ${_.polished.darken(0.5, _.colors.primary)}`,
});

const Footer = _.g.footer({
  padding: '1em',
  background: _.colors.secondary,
  borderTop: `1px solid ${_.polished.darken(0.5, _.colors.secondary)}`,
});

const Section = _.g.section([
  {
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '100%',
    background: _.colors.white,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      width: '1em',
    },
    '&::-webkit-scrollbar-track': {
      background: _.colors.gray,
    },
    '&::-webkit-scrollbar-thumb': {
      background: _.colors.secondary,
      margin: '2px',
    },
  },
  (props: any) => {
    switch (props.id) {
      case 'Chat':
        return {};
      default:
        return {};
    }
  },
]);

const Chat = _.g.section({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '1em 1em 1em 2em',
});

const Form = _.g.form([{}]);

const Div = _.g.div();

const H1 = _.g.h1({
  color: _.colors.primary,
  [_.screen('t')]: {
    color: _.polished.darken(0.5, _.colors.primary),
  },
});

export const g = {
  Main,
  Header,
  Footer,
  Section,
  Chat,
  Form,
  Div,
  H1,
};
