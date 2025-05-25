"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Loader2, AlertCircle } from "lucide-react"
import { titleFont } from "@/lib/fonts"
import usePostSendEmail from "@/hooks/auth/forgot-password/usePostSendEmail"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const { handleSubmit, onSubmit, register, mutation, emailSent, errors } = usePostSendEmail()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [emailValue, setEmailValue] = useState("")

  // Email validation
  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue.trim())
  }, [emailValue])

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setShowSuccess(false)
      setIsClosing(false)
      setEmailValue("")
    }
  }, [isOpen])

  // Handle success animation
  useEffect(() => {
    if (emailSent && !showSuccess) {
      setShowSuccess(true)
    }
  }, [emailSent, showSuccess])

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data)
      if (!errors.root) {
        // Auto close after 5 seconds
        setTimeout(() => {
          handleClose()
        }, 10000)
      }
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setShowSuccess(false)
      setIsClosing(false)
    }, 200)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={`sm:max-w-[425px] transition-all duration-300 ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}>
        <DialogHeader className="space-y-3">
          <DialogTitle className={`${titleFont.className} text-xl text-gray-900 flex items-center gap-2`}>
            <Mail className="w-5 h-5 text-[#34b1fd]" />
            Recuperar contraseña
          </DialogTitle>
          <DialogDescription id="forgot-password-description" className="text-sm text-gray-600 leading-relaxed">
            {!showSuccess
              ? "Introduce tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
              : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!showSuccess ? (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
              noValidate
              aria-label="Formulario de recuperación de contraseña"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  Correo electrónico
                </Label>
                <Input
                  type="email"
                  id="email"
                  {...register("Email")}
                  placeholder="ejemplo@correo.com"
                  className="w-full h-11 border-gray-300 focus:border-[#34b1fd] focus:ring-[#34b1fd] transition-all duration-200"
                  aria-invalid={errors.Email ? "true" : "false"}
                  aria-describedby={errors.Email ? "email-error" : undefined}
                  autoComplete="email"
                  onChange={(e) => {
                    setEmailValue(e.target.value)
                    register("Email").onChange(e)
                  }}
                />
                {errors.Email && (
                  <p
                    id="email-error"
                    className="text-red-500 text-sm flex items-center gap-1 animate-in slide-in-from-left-1 duration-200"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.Email.message}
                  </p>
                )}
              </div>

              {errors.root && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md animate-in slide-in-from-top-1 duration-200">
                  <p className="text-red-700 text-sm flex items-center gap-2" role="alert">
                    <AlertCircle className="w-4 h-4" />
                    {errors.root.message}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                  disabled={mutation.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#34b1fd] hover:bg-[#2d9fe6] transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={mutation.isPending || !isValidEmail}
                  aria-label="Enviar correo de recuperación"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar correo
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              {/* Success Animation */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in-0 duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse opacity-30"></div>
                    <svg
                      className="w-12 h-12 text-green-600 animate-in zoom-in-0 duration-700 delay-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                        className="animate-[draw_0.8s_ease-in-out_0.3s_forwards] opacity-0"
                        style={{
                          strokeDasharray: "20",
                          strokeDashoffset: "20",
                          animation: "draw 0.8s ease-in-out 0.3s forwards, pulse 2s ease-in-out 1.1s infinite",
                        }}
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-24 h-24 bg-green-300 rounded-full animate-ping opacity-20 animation-delay-500"></div>
                  <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ping opacity-10 animation-delay-700"></div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 animate-in slide-in-from-bottom-2 duration-500 delay-300">
                    ¡Correo enviado!
                  </h3>
                  <p className="text-sm text-gray-600 animate-in slide-in-from-bottom-2 duration-500 delay-400">
                    Hemos enviado las instrucciones a tu correo electrónico.
                  </p>
                </div>
              </div>

              <Separator className="animate-in fade-in-0 duration-500 delay-500" />

              {/* Instructions */}
              <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-500 delay-600">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Revisa tu bandeja de entrada
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Busca un correo de nuestro sistema</li>
                    <li>• Revisa también tu carpeta de spam</li>
                    <li>• El enlace expira en 24 horas</li>
                  </ul>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-3">
                    ¿No recibiste el correo? Verifica que la dirección sea correcta o{' '}
                    <a
                      href="mailto:jhernandez@nandayure.go.cr"
                      className="text-[#34b1fd] hover:text-[#2d9fe6] underline"
                    >
                      contacta a un administrador
                    </a>.
                  </p>
                  <Button
                    onClick={handleClose}
                    className="bg-[#34b1fd] hover:bg-[#2d9fe6] transition-all duration-200 transform hover:scale-[1.02]"
                    aria-label="Cerrar modal de recuperación de contraseña"
                  >
                    Entendido
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </Dialog>
  )
}

export default ForgotPasswordModal
