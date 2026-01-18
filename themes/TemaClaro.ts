import { MD3LightTheme } from "react-native-paper"
import { colors } from "./colors"

export const temaClaro = {
    ...MD3LightTheme,
    dark: false,
    roundness: 12,
    colors: {
        ...MD3LightTheme.colors,
        background: colors.light.background,
        secondaryContainer: colors.light.primary,
        onSecondaryContainer: colors.light.primaryContent,
        onSurface: colors.light.surface,
        onSurfaceVariant: colors.light.surfaceVariant,
        elevation: colors.light.elevation,
    }
}
