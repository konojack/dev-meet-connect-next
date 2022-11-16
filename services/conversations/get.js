import { conversation } from 'models';

export const get = ({ id, userId }) => {
  console.log(id, userId);
  return conversation.findFirst({
    where: {
      id,
      users: {
        some: {
          userId
        }
      }
    },
    include: {
      users: {
        include: {
          user: true
        }
      },
      messages: {
        include: {
          user: true
        }
      }
    }
  });
};
