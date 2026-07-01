import supabase from "../config/supabase-js.js";

export async function createUser(req, res) {
  try {
    const { email, password, name } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name
        },
        emailRedirectTo: 'https://property-insights-1.onrender.com/login',
      }
    });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

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
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function passwordReset(req, res) {
  try {

    const { email } = req.body;

    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    const existing = users.some(u => u.email === email);


    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://property-insights-1.onrender.com/passwordreset',
    })

    if (error) {
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json({ message: "Password reset link sent. Valid for 24 hours." });


  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function logout(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No authentication token" });
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No authentication token" });
    }

    const { data: { user } } = await supabase.auth.getUser(token);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { email, password } = req.body;

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No authentication token" });
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No authentication token" });
    }

    const { data, error } = await supabase.auth.updateUser({
      password: 'new password'
    });

    if (error) {
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json({ message: "User updated successfully" });

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token required" });
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      return res.status(401).json({ error: "Token refresh failed" });
    }

    res.status(200).json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
