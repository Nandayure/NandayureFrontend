type RequestType = {
  [key: number]: string;
};

type RequestState = {
  [key: number]: string;
};

export const getRequestType = (typeId: number) => {
  const types: RequestType = {
    1: 'Vacaciones',
    2: 'Constancia salarial',
    3: 'Boletas de pago',
  };
  return types[typeId] || 'Desconocido';
};

export const getRequestState = (stateId: number) => {
  const states: RequestState = {
    1: 'Pendiente',
    2: 'Aprobada',
    3: 'Rechazada',
    4: 'Cancelada',
  };
  return states[stateId] || 'Desconocido';
};

export const getStatusColor = (stateId: number) => {
  switch (stateId) {
    case 1:
      return 'bg-golden-dream-500 text-white hover:bg-golden-dream-700';
    case 2:
      return 'bg-apple-500 text-white hover:bg-apple-700';
    case 3:
      return 'bg-red-500 text-white hover:bg-red-700';
    case 4:
      return 'bg-gray-500 text-white hover:bg-gray-700 line-through';
    default:
      return 'bg-gray-500 text-white hover:bg-gray-700';
  }
};
