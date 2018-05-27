import glamorous from 'glamorous';
import { HTMLGlamorousComponentFactory } from 'glamorous/typings/built-in-component-factories';
import { CSSProperties, StyleArgument } from 'glamorous';
import * as props from 'styles/utils/_props';

const enhancer: any = {
  ...props,
  generator: function() {
    let style = {};
    let args = arguments[0];
    let keys = Object.keys(args);
    keys.forEach((key: any) => {
      if (!enhancer[key] || !args[key]) return;
      let vals = args[key].split(' ');
      vals.forEach((val: any) => {
        val = val.split(':');
        let props = enhancer[key][val[0]];
        if (val[1] && typeof props === 'function') props = props(val[1]);
        else if (typeof props === 'function') props = props();
        style = { ...props, ...style };
      });
    });

    return style;
  },
};

const enhance = (glam: HTMLGlamorousComponentFactory<HTMLElement>) => {
  return (styles: StyleArgument<CSSProperties, {}> | StyleArgument<CSSProperties, {}>[]) => {
    return glam<props.GravityProps>([styles, enhancer.generator]);
  };
};

export const compose = (glam: any) => {
  return (styles: StyleArgument<CSSProperties, {}> | StyleArgument<CSSProperties, {}>[]) => {
    return glamorous(glam)<props.GravityProps>([styles, enhancer.generator]);
  };
};

type glam = {
  [key: string]: Function;
};

const g: glam = {};
Object.keys(glamorous).forEach((key: string) => {
  g[key] = enhance((glamorous as any)[key]);
});

export { g, glamorous };
