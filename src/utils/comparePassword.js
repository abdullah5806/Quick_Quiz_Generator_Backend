import bcrypt from "bcryptjs";

const comparePassword = async (enteredPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);

  return isMatch;
};

export default comparePassword;