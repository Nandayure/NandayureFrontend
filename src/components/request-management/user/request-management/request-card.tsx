import React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Calendar, FileText, DollarSign, Clock } from 'lucide-react'
import { getRequestState, getRequestType } from '../../request-helpers'
import SkeletonLoader from '@/components/ui/skeleton-loader'
import { RequestDetails } from '@/types/request-management/commonTypes'

const getRequestIcon = (typeId: number) => {
  switch (typeId) {
    case 1:
      return <Calendar className="h-6 w-6" />
    case 2:
      return <FileText className="h-6 w-6" />
    case 3:
      return <DollarSign className="h-6 w-6" />
    default:
      return <Clock className="h-6 w-6" />
  }
}

const getStatusColor = (stateId: number) => {
  switch (stateId) {
    case 1:
      return 'bg-golden-dream-500 text-white hover:bg-golden-dream-700'
    case 2:
      return 'bg-apple-500 text-white hover:bg-apple-700'
    case 3:
      return 'bg-red-500 text-white hover:bg-red-700'
    default:
      return 'bg-gray-500 text-white hover:bg-gray-700'
  }
}

const RequestCard = ({
  requests,
  isLoading,
  onClick,
}: {
  requests: RequestDetails[]
  isLoading: boolean
  onClick: (request: RequestDetails) => void
}) => (
  <>
    {isLoading
      ? Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      : requests.map((request) => (
          <Card
            key={request.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300 "
            onClick={() => onClick(request)}
          >
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
              <CardTitle className="text-base sm:text-lg font-medium text-gray-800">
                {getRequestType(request.RequestTypeId)}
              </CardTitle>
              <Badge className={`${getStatusColor(request.RequestStateId)} text-xs font-semibold px-3 py-1 rounded-full`}>
                {getRequestState(request.RequestStateId)}
              </Badge>
            </CardHeader>
            <CardContent className="pt-4 pb-2">
              <div className="flex items-center space-x-4">
                {getRequestIcon(request.RequestTypeId)}
                <div>
                  <p className="text-sm text-gray-500">
                    Fecha: <span className="font-medium">{formatDate(request.date)}</span>
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
              <p className="text-xs text-gray-400">
                Haga clic para ver detalles
              </p>
            </CardFooter>
          </Card>
        ))}
  </>
)

export default RequestCard

const SkeletonCard = () => (
  <Card className="animate-pulse">
    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
      <div className="bg-gray-300 h-5 w-2/3 sm:w-1/3 rounded"></div>
      <div className="bg-gray-300 h-5 w-24 sm:w-16 rounded-full"></div>
    </CardHeader>
    <CardContent className="pt-4 pb-2">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
        <div className="space-y-2">
          <div className="bg-gray-300 h-4 w-32 rounded"></div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="pt-2 pb-4">
      <div className="bg-gray-300 h-3 w-36 rounded"></div>
    </CardFooter>
  </Card>
)