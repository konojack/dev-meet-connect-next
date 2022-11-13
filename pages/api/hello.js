// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { user } from 'models';
export default async (req, res) => {
  try {
    await user.create({
      data: {
        email: 'dupadupa@op.pl',
        name: 'Andrzej',
        image: 'huhu.jpg'
      }
    });
    const allUsers = await user.findMany();
    res.statusCode = 200;
    res.json({ allUsers });
  } catch (err) {
    res.json({ err, status: 'sth wrong' });
  }
};
