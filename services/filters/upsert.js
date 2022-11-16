import { filter } from 'models';

export const upsertFilter = ({ userId, payload }) => {
  const parsedPayload = JSON.parse(payload);
  return filter.upsert({
    where: {
      userId
    },
    update: {
      skill: parsedPayload.skill,
      timezone: parsedPayload.timezone,
      updatedAt: new Date()
    },
    create: {
      skill: parsedPayload.skill,
      timezone: parsedPayload.timezone,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
};
