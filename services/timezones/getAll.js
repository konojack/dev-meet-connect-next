import { timezone } from 'models';

export const getAllTimezones = () => {
  return timezone.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      id: 'asc'
    }
  });
};
