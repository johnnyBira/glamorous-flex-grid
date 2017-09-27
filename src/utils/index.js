// @flow

type Breakpoints = {
  [string]: number,
};

type GridConfig = {
  rowWidth: number,
  gutterWidth: number,
  columnCount: number,
  breakpoints: {
    [string]: number,
  },
}

export const getColumnWidth =
(columnCount: number, rowWidth: number, size: number, fixed: boolean = false): string => (
  fixed ? String((size / columnCount) * rowWidth) : `${(size / columnCount) * 100}%`
);

export const breakpoint = (width: number, mobileFirst: boolean = true) => (content: Object) => ({
  [`@media only screen and (${mobileFirst ? 'min' : 'max'}-width: ${width}px)`]: {
    ...content,
  },
});

export const getBreakpoints =
(breakpoints: Breakpoints, sizes: Breakpoints, fn: Function) => (
  Object.keys(sizes).reduce((acc, size) => (
    Object.assign({}, acc, breakpoint(breakpoints[size])(fn(sizes[size])))
  ), {})
);

export const configGrid = (config: GridConfig) => (
  {
    getBreakpoints: (sizes: Breakpoints, callback: Function) => (
      getBreakpoints(config.breakpoints, sizes, callback)
    ),
    getColumnWidth: (size: number) => (
      getColumnWidth(config.columnCount, config.rowWidth, size)
    ),
    config,
  }
);
