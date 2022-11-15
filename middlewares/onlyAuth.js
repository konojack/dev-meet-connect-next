import { user } from 'models';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const onlyAuth = (handler) => {
  return async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to get access.'
      });
    }

    req.currentUser = await user.findUnique({
      where: {
        email: session.user.email
      }
    });

    return handler(req, res);
  };
};

export { onlyAuth };
