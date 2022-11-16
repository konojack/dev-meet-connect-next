import { onlyAuth } from 'middlewares/onlyAuth';
import { updateProfile } from 'services/profiles/update';
import { user as userModel } from 'models';

const userProfileApi = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const user = await userModel.findUnique({
        where: {
          id: req.currentUser.id
        },
        include: {
          filter: true
        }
      });

      res.status(200).json({ user });
      break;
    }
    case 'PUT': {
      try {
        const payload = req.body;
        const user = await updateProfile({ userId: req.currentUser.id, payload });

        res.status(200).json({ user });
      } catch (error) {
        console.log(`error`, error);
        res.status(422).json({ user: null, error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

export default onlyAuth(userProfileApi);
