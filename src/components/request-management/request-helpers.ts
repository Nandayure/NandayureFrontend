export const getRequestType = (typeId: number) => {
  const types = {
    1: 'Vacaciones',
    2: 'Constancia salarial',
    3: 'Boletas de pago',
  };
  return types[typeId as keyof typeof types] || 'Desconocido';
};

export const getRequestState = (stateId: number) => {
  const states = {
    1: 'Pendiente',
    2: 'Aprobada',
    3: 'Rechazada',
  };
  return states[stateId as keyof typeof states] || 'Desconocido';
};
