import supabase from "../config/supabase-js.js";
import bcrypt, { hash } from "bcrypt";

export async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    const existing = await supabase.from("auth.users").select(email);

    if (existing) {
      return res.status(400).json({ message: "user already exists!" });
    }

    const hash = bcrypt.hash(password, 10);

    const { data, error } = await supabase.auth.signUp({
      email,
      password: hash,
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

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const existing = await supabase.from("auth.user").select(email);
    const hashedPass = await supabase.from("auth.user").select(password);

    if (!existing) {
      return res.status(400).json({ message: "user does not exist" });
    }

    bcrypt.compare(password, hashedPass, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(400).json({ err: err.message });
      }

      if (result) {
        
        const { data, error } = supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Supabase error:", error);
          return res.status(502).json({ error: error.message });
        }

        res.status(200).json({ data });
      } else {
        console.error("Passwords do not match! Authentication failed.", err);
        return res.status(400).json({ err: err.message });
      }
    });

    const { data, error } = await supabase.auth.signInWithPassword({
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
