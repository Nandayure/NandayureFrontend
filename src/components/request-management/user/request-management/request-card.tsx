import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Calendar, FileText, DollarSign, Clock } from 'lucide-react';
import { getRequestState, getRequestType } from '../../request-helpers';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { RequestDetails } from '@/types/request-management/commonTypes';

const getRequestIcon = (typeId: number) => {
  switch (typeId) {
    case 1:
      return <Calendar className="h-6 w-6" />;
    case 2:
      return <FileText className="h-6 w-6" />;
    case 3:
      return <DollarSign className="h-6 w-6" />;
    default:
      return <Clock className="h-6 w-6" />;
  }
};

const getStatusColor = (stateId: number) => {
  switch (stateId) {
    case 1:
      return 'bg-golden-dream-500 text-white';
    case 2:
      return 'bg-apple-500 text-white';
    case 3:
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RequestCard = ({
  requests,
  isLoading,
  onClick,
}: {
  requests: RequestDetails[];
  isLoading: boolean;
  onClick: (request: RequestDetails) => void;
}) => (
  <>
    {isLoading
      ? Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      : requests.map((request) => (
          <Card
            key={request.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onClick(request)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {getRequestIcon(request.RequestTypeId)}
                  <span>{getRequestType(request.RequestTypeId)}</span>
                </div>
              </CardTitle>
              <Badge className={getStatusColor(request.RequestStateId)}>
                {getRequestState(request.RequestStateId)}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Fecha: {formatDate(request.date)}
              </p>
            </CardContent>
          </Card>
        ))}
  </>
);

export default RequestCard;

const SkeletonCard = () => (
  <Card className="animate-pulse">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      {/* Simula el título */}
      <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
      {/* Simula el estado */}
      <div className="bg-gray-300 h-6 w-16 rounded"></div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center space-x-4">
        {/* Simula el ícono */}
        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
        {/* Simula el tipo de solicitud */}
        <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
      </div>
    </CardContent>
    <CardFooter>
      {/* Simula la fecha */}
      <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
    </CardFooter>
  </Card>
);
