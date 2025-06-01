"use client"

import ResetPasswordForm from "@/components/auth/reset-password/reset-password-form"
import { titleFont } from "@/lib/fonts"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import BackgroundDecoration from "@/components/auth/background-decoration"

export default function ResetPasswordTokenPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ResetPasswordTokenContent />
    </Suspense>
  )
}

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <Skeleton className="h-32 w-32 mx-auto rounded-lg" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </main>
  )
}

function ResetPasswordTokenContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  if (!token) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-destructive">Token no válido</CardTitle>
            <CardDescription>El enlace de recuperación de contraseña no es válido o ha expirado.</CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <BackgroundDecoration />

      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-32 h-32 relative">
            <Image
              src="/Fingerprint.svg"
              alt="Ilustración de seguridad con huella digital"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="space-y-2">
            <CardTitle className={`${titleFont.className} text-2xl font-bold text-slate-900`}>
              Recuperar contraseña
            </CardTitle>
            <CardDescription className="text-slate-600">
              Introduce tu nueva contraseña para completar la recuperación de tu cuenta.
            </CardDescription>
          </div>
          <Separator className="my-4" />
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>
    </main>
  )
}
