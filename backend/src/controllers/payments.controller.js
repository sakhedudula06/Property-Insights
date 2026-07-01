import supabase from "../config/supabase-js.js";

export async function getAllPayments(_, res) {
  try {
    const { data, error } = await supabase
      .from("payments").select("*, tenant_id(tenant_name), property_id(name)").order('id', { ascending: true});

    if (error) {
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function registerAPayment(req, res) {
  try {

    const { data: paymentData, error: paymentError } = await supabase
      .from("payments")
      .insert(req.body)
      .select();

    if (paymentError) {
      console.error("Supabase error:", paymentError);
      return res.status(502).json({ error: paymentError.message });
    }

    res.status(200).json(paymentData);
    
  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function updateAPayment(req, res) {
  try {
    const { id } = req.params;

    const { data: existing, error: checkError } = await supabase.from("payments").select("id").eq('id', id).single();

    if (!existing) {
      return res.status(400).json({ message: "Tenant doesn't exist!" });
    }

    const { data, error } = await supabase.from("payments").update(req.body).eq('id', id).select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(502).json({ error: error.message });
    }

    res.status(204).json(data);

  } catch (error) {
    console.error("Unexpected failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function uploadPaymentProof(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const fileName = `Payment_${Date.now()}-${req.file.originalname}`;
    
    const { data, error } = await supabase.storage
      .from("POP")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.error("Upload error:", error);
      return res.status(502).json({ error: error.message });
    }

    return res.status(200).json({  
      fileName: data.path 
    });

  } catch (error) {
    console.error("Upload failure:", error);
    return res.status(500).json({ error: "Server error" });
  }
}