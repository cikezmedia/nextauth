import dbConnect from '../../../utils/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  dbConnect().catch((error) =>
    res.json({ error: 'Connection failed' + error })
  );
  if (req.method == 'POST') {
    try {
      const { email } = req.body;
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        res.status(202).send();
      } else {
        await User.create(req.body);
        res.status(201).send();
      }
    } catch (error) {
      res.status(500).send();
    }
  } else {
    res.status(500).json({ message: 'Accepts only POST request' });
  }
}
