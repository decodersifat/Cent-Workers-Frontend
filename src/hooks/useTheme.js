// Re-export the useTheme hook from ThemeProvider for consistency
export { useTheme } from '../contexts/ThemeProvider'

// Default export for backward compatibility
import { useTheme } from '../contexts/ThemeProvider'
export default useTheme
