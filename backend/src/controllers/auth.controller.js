import supabase from "../config/supabase-js.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    const existing = await supabase.from("users").select(email);

    if (existing) {
      return res.status(400).json({ message: "user already exists!" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("Unexpected failure:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
