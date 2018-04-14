export const screen = (s: string, minMax?: string): string => {
  const screens = [{ ps: 0 }, { p: 320 }, { pw: 480 }, { t: 768 }, { tw: 992 }, { d: 1200 }, { dw: 1366 }];

  let media = '@media only screen and';
  screens.map((val: any, i: number) => {
    let key: any = Object.keys(val)[0];
    val = val[key];
    let next: any = screens[i + 1];
    if (next) next = next[Object.keys(next)[0]];

    if (key === s) {
      if (i === 0) media = `${media} (max-width: ${next - 1}px)`;
      else if (i === screens.length - 1) media = `${media} (min-width: ${val}px)`;
      else if (minMax) media = `${media} (${minMax}-width: ${val - (minMax === 'max' ? 1 : 0)}px)`;
      else media = `${media} (min-width: ${val}px) and (max-width: ${next - 1}px)`;
    }
  });

  return media;
};
