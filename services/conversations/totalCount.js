import { conversation } from 'models';

export const totalCount = ({ userId }) =>
  conversation.count({
    where: {
      users: {
        some: {
          userId
        }
      }
    }
  });
