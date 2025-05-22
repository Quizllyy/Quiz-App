const verificationSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, required: true },
  modelType: { type: String, enum: ['Quiz', 'ExcelQuiz'], required: true }, // Add this
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  accessCode: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});
