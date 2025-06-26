import axios from "axios";

export const login = async (email, password) => {
  const res = await axios.get(`http://localhost:3001/user?email=${email}`);
  const user = res.data[0];

  console.log("User login response:", user); 

  if (!user || user.password !== password) {
    throw new Error("Email atau password salah");
  }

  return user; 
};

