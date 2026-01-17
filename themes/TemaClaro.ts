import { MD3LightTheme } from "react-native-paper"

export const temaClaro = {
    ...MD3LightTheme,
    roundness: 12,
    colors: {
        ...MD3LightTheme.colors,
        background: '#f6f7fb',
        secondaryContainer: '#e8ecff',
        onSecondaryContainer: '#2c2f6c',
        onSurface: '#1f1f28',
        onSurfaceVariant: '#6b6f8a',
        elevation: {
            level0: 'transparent',
            level1: '#FFFFFF',
            level2: '#f9faff',
            level3: '#eef1ff',
            level4: '#e6e9f5',
            level5: '#dee2f0',
        }
    }

}