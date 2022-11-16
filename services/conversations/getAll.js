import { conversation } from 'models';

export const getAll = ({ userId, page = 0, perPage = 7 }) =>
  conversation.findMany({
    where: {
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
    },
    orderBy: {
      id: 'desc'
    },
    skip: page * perPage,
    take: perPage
  });
