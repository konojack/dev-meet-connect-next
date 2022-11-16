import { skill } from 'models';

export const getAllSkills = () => {
  return skill.findMany({
    select: {
      id: true,
      name: true
    },
    orderBy: {
      name: 'asc'
    }
  });
};
