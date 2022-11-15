import { onlyAuth } from 'middlewares/onlyAuth';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const hello = (req, res) => {
  res.statusCode = 200;
  res.json({ user: req.currentUser });
};

export default onlyAuth(hello);
