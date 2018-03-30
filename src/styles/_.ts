import { CSSProperties } from "glamorous/typings/css-properties";
import { ExtraGlamorousProps } from "glamorous/typings/glamorous-component";
import * as React from "react";

export * from 'polished';
export * from './general';
export * from './colors';

export const screen = (s: string, minMax?: string): string =>{
  const screens = [
    {ps: 0},
    {p: 320},
    {pw: 480},
    {t: 768},
    {tw: 992},
    {d: 1200},
    {dw: 1366}
  ];

  let media = '@media only screen and';
  screens.map((val: any, i: number) =>{
    let key: any = Object.keys(val)[0];
    val = val[key];
    let next: any = screens[i + 1];
    if(next) next = next[Object.keys(next)[0]];

    if(key === s){
      if(i === 0) media = `${media} (max-width: ${next - 1}px)`;
      else if(i === screens.length - 1) media = `${media} (min-width: ${val}px)`;
      else if(minMax) media = `${media} (${minMax}-width: ${val - (minMax === 'max' ? 1 : 0)}px)`;
      else media = `${media} (min-width: ${val}px) and (max-width: ${next - 1}px)`;
    }
  });

  return media;
};

const layouts: any = {
  layout: {
    flexible: {
      display: 'flex',
      '> *': {
        flex: '1 0 auto'
      }
    },
    vertical: {
      flexDirection: 'column'
    },
    stretch: (attributes: any = '1-0-auto') => {
      attributes = attributes.split('-');
      if(!attributes[1]) attributes[1] = '0';
      if(!attributes[2]) attributes[2] = 'auto';
      return {
        flex: `${attributes[0]} ${attributes[1]} ${attributes[2]}`
      };
    }
  },
};

const texts: any = {
  text: {
    align: (dir: string = 'center') => ({
      textAlign: dir
    }),
  }
};

const widths: any = {
  width: {
    narrow: {
      width: '400px'
    },
    wide: {
      width: '800px',
      maxWidth: '100%'
    },
  },
};

type GBPComp = React.StatelessComponent<CSSProperties&ExtraGlamorousProps&React.HTMLProps<HTMLElement>&{
  layout?: string,
  text?: string,
  width?: string,
}>;

const specialProps: any = {
  ...layouts,
  ...texts,
  ...widths,
  generator: function(){
    let style = {};
    let args = arguments[0];
    let keys = Object.keys(args);
    keys.forEach((key: any) =>{
      if(!specialProps[key] || !args[key]) return;
      let vals = args[key].split(' ');
      vals.forEach((val: any) =>{
        val = val.split(':');
        let props = specialProps[key][val[0]];
        if(val[1] && typeof props === 'function') props = props(val[1]);
        else if(typeof props === 'function') props = props();
        style = {...style, ...props}
      });
    });

    return style;
  }
};

export const special = (glam: any, styles: object[]): GBPComp =>{
  return glam([styles as CSSStyleDeclaration[], specialProps.generator]);
};