// In `pages/api/protected-endpoint.js`
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.SECRET });

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ message: "This is protected data", user: token });
}