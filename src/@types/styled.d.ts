import 'styled-components';
import theme from '../themes/default';

declare module 'styled-components' {
  type MyTheme = typeof theme;

  export interface DefaultTheme extends MyTheme { }
}