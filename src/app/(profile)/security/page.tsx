import ChangePasswordForm from "@/components/auth/change-password/change-password-form"
import Flag from "@/components/common/Flag"
import { titleFont } from "@/lib/fonts"
import { Card, CardContent } from "@/components/ui/card"

const SecurityPage = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 sm:p-8 border-b">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 border-4 border-white shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h1 className={`${titleFont.className} text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-left`}>
                  Seguridad
                </h1>
                <p className="text-gray-600 text-left max-w-2xl">Cambia tu contraseña para mantener tu cuenta segura</p>
                <div className="mt-2">
                  <Flag />
                </div>
              </div>
            </div>
          </div>

          {/* Form & Image Content */}
          <div className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Left: Form */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <ChangePasswordForm />
                  </CardContent>
                </Card>
              </div>
              {/* Right: Image */}
              <div className="hidden md:flex w-1/2 items-center justify-center ">
                <img
                  src="/security.jpg"
                  alt="Seguridad"
                  className="object-cover w-full h-full max-h-[420px] rounded-none"
                  style={{ maxWidth: "420px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityPage
