import { conversation as conversationModel, conversationMessage } from 'models';

export const create = async ({ userId, conversationId, content }) => {
  console.log(userId, conversationId, content);
  const conversation = await conversationModel.findFirst({
    where: {
      id: conversationId,
      users: {
        some: {
          userId
        }
      }
    }
  });

  if (!conversation) {
    throw new Error('conversation_not_found');
  }

  const msg = await conversationMessage.create({
    data: {
      conversation: {
        connect: {
          id: conversation.id
        }
      },
      user: {
        connect: {
          id: userId
        }
      },
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  return msg;
};
