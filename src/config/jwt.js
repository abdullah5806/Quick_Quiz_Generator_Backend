const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: "7d",
};
localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.token));

export default jwtConfig;s