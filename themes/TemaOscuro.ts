import { MD3DarkTheme } from "react-native-paper"
import { colors } from "./colors"

export const TemaOscuro = {
    ...MD3DarkTheme,
    dark: true,
    roundness: 12,
    colors: {
        ...MD3DarkTheme.colors,
        background: colors.dark.background,
        secondaryContainer: colors.dark.primary,
        onSecondaryContainer: colors.dark.primaryContent,
        onSurface: colors.dark.surface,
        onSurfaceVariant: colors.dark.surfaceVariant,
        elevation: colors.dark.elevation,
    }
}
