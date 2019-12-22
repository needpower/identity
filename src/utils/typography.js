import Typography from "typography"
import oceanBeachTheme from "typography-theme-ocean-beach"
oceanBeachTheme.overrideThemeStyles = ({ rythm }, options) => ({
  a: {
    backgroundImage: "none",
    color: "rgba(97, 98, 71, 1)",
    borderBottom: "1px solid rgba(97, 98, 71, 0.7)",
  },
  ["a:hover"]: {
    color: "rgba(25, 123, 189, 1)",
    borderBottomColor: "rgba(25, 123, 189, 0.7)",
  },
})
const typography = new Typography(oceanBeachTheme)
export const { scale, rhythm, options } = typography
export default typography
