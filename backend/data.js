import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Chamodh',
      email: 'chamodh@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    }
  ]
};
export default data;
