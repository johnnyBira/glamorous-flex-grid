declare module 'glamorous-flex-grid' {
  declare type Breakpoints = {
    [string]: number,
  };

  declare type GridConfig = {|
    rowWidth: number,
    gutterWidth: number,
    columnCount: number,
    breakpoints: Breakpoints,
  |}
}
