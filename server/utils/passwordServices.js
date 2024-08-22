import bcrypt from 'bcrypt';

export const passwordEncryption = async (plainPassword) => {
  try {
    console.log('plainPassword :>> ', plainPassword);
    const saltRounds = 10; // 10 salts is an efficient standard, more salts takes exponentionally longer
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error encrypting password :>> ', error);
    throw new Error('Password encryption failed');
  }
};
