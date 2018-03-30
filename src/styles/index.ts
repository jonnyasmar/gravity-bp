import g from 'glamorous';
import * as _ from './_';

export const main = _.special(g.main, [
  {
    height: '100vh',
    '> *': {
      boxSizing: 'border-box'
    }
  },
]);

export const header = _.special(g.header, [
  {
    padding: '1em',
    color: _.white,
    background: _.primary,
    borderBottom: `1px solid ${_.darken(.5, _.primary)}`
  },
]);

export const footer = _.special(g.footer, [
  {
    padding: '1em',
    background: _.secondary,
    borderTop: `1px solid ${_.darken(.5, _.secondary)}`
  },
]);

export const section = _.special(g.section, [
  {
    ..._.textCenter,
    padding: '150px 1em 150px 2em',
    background: _.white,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '1em',
    },
    '&::-webkit-scrollbar-track': {
      background: _.gray,
    },
    '&::-webkit-scrollbar-thumb': {
      background: _.secondary,
      margin: '2px'
    }
  },
  (props: any) =>{
    switch(props.id){
      case 'Home':
        return {};
      default:
        return {};
    }
  },
]);

export const div = _.special(g.div, []);

export const h1 = _.special(g.h1, [
  {
    ..._.textCenter,
    color: _.primary,
    [_.screen('t')]: {
      color: _.darken(.5, _.primary)
    }
  }
]);