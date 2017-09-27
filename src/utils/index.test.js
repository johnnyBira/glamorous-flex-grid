import {
  getColumnWidth,
  getBreakpoints,
  breakpoint,
  configGrid,
} from './';

const columnCount = 12;
const rowWidth = 1200;
const gutterWidth = 20;

const breakpoints = {
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
};

const config = { breakpoints, rowWidth, columnCount, gutterWidth };

describe('getColumnWidth', () => {
  it('returns percentage based value by default', () => {
    expect(getColumnWidth(columnCount, rowWidth, 6)).toBe('50%');
  });
  it('returns a fixed unitless pixel value', () => {
    expect(getColumnWidth(columnCount, rowWidth, 6, true)).toBe('600');
  });
});

describe('getBreakpoints', () => {
  it('returns a map object with breakpoints as keys', () => {
    const bp = getBreakpoints(breakpoints, { m: 6, l: 3 }, size => ({
      width: `${getColumnWidth(columnCount, rowWidth, size)}`,
    }));
    expect(bp).toMatchObject(
      {
        '@media only screen and (min-width: 768px)': { width: '50%' },
        '@media only screen and (min-width: 992px)': { width: '25%' },
      },
    );
  });
});

describe('breakpoint', () => {
  it('returns an object of a max-width (mobile first) breakpoint', () => {
    const bp = breakpoint(768);
    expect(bp({
      width: `${getColumnWidth(columnCount, rowWidth, 6)}`,
    })).toMatchObject({
      '@media only screen and (min-width: 768px)': { width: '50%' },
    });
  });

  it('returns an object of a min-width (mobile last) breakpoint', () => {
    const bp = breakpoint(768, false);
    expect(bp({
      width: `${getColumnWidth(columnCount, rowWidth, 6)}`,
    })).toMatchObject({
      '@media only screen and (max-width: 768px)': { width: '50%' },
    });
  });
});

describe('configGrid', () => {
  const configObject = configGrid(config);

  it('wrapps the getBreakpoints and getColumnWidth util functions', () => {
    const bp = configObject.getBreakpoints({ m: 6, l: 3 }, size => ({
      width: `${configObject.getColumnWidth(size)}`,
    }));
    expect(bp).toMatchObject(
      {
        '@media only screen and (min-width: 768px)': { width: '50%' },
        '@media only screen and (min-width: 992px)': { width: '25%' },
      },
    );
  });

  it('stores the original config object', () => {
    expect(configObject.config).toMatchObject(config);
  });
});
