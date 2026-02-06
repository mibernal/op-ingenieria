// src/components/ui/index.ts
// Re-exporta todos los componentes UI desde shadcn/ui

// Layout & Structure
export * from "./accordion"
export * from "./aspect-ratio"
export * from "./avatar"
export * from "./badge"
export * from "./breadcrumb"
export * from "./card"
export * from "./carousel"
export * from "./chart"
export * from "./collapsible"
export * from "./command"
export * from "./context-menu"
export * from "./dialog"
export * from "./drawer"
export * from "./dropdown-menu"
export * from "./hover-card"
export * from "./menubar"
export * from "./navigation-menu"
export * from "./pagination"
export * from "./popover"
export * from "./resizable"
export * from "./scroll-area"
export * from "./select"
export * from "./separator"
export * from "./sheet"
export * from "./sidebar"
export * from "./skeleton"
export * from "./slider"
export * from "./table"
export * from "./tabs"
export * from "./tooltip"

// Form & Input Components
export * from "./button"
export * from "./checkbox"
export * from "./form"
export * from "./input"
export * from "./input-otp"
export * from "./label"
export * from "./progress"
export * from "./radio-group"
export * from "./switch"
export * from "./textarea"
export * from "./toggle"
export * from "./toggle-group"

// Feedback Components
export * from "./alert"
export * from "./alert-dialog"
export * from "./calendar"
export * from "./sonner"
export * from "./toast"
export * from "./toaster"

// Hooks & Utilities
//export * from "./use-toast"

// Exportaciones individuales para componentes con problemas de re-export
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"

export {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./alert"

export {
  Calendar,
} from "./calendar"

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./form"

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"

export { Toaster } from "./toaster"
export { Sonner } from "./sonner"