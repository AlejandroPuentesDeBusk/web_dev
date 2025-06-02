import mongoose from "mongoose";

const mongoUri = "mongodb://127.0.0.1:27017/users"; // 'users' es el nombre de la base de datos

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado a MongoDB local");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err);
    process.exit(1);
  }
};

