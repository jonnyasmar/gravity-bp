import * as _ from 'styles/utils';

export const main = _.g.main({
  height: '100vh',
  '> *': {
    boxSizing: 'border-box',
  },
});

export const header = _.g.header({
  padding: '1em',
  color: _.colors.white,
  background: _.colors.primary,
  borderBottom: `1px solid ${_.polished.darken(0.5, _.colors.primary)}`,
});

export const footer = _.g.footer({
  padding: '1em',
  background: _.colors.secondary,
  borderTop: `1px solid ${_.polished.darken(0.5, _.colors.secondary)}`,
});

export const section = _.g.section([
  _.basic.textCenter,
  {
    padding: '150px 1em 150px 2em',
    background: _.colors.white,
    overflowY: 'scroll',
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
      case 'Home':
        return {};
      default:
        return {};
    }
  },
]);

export const div = _.g.div();

export const h1 = _.g.h1({
  color: _.colors.primary,
  [_.screen('t')]: {
    color: _.polished.darken(0.5, _.colors.primary),
  },
});
