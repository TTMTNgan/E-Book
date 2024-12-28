import axios from 'axios';
import { API_CONFIG } from '../config/api';

const geminiApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateSummary = async (text) => {
  try {
    const response = await geminiApi.post(
      `/${API_CONFIG.API_VERSION}/models/${API_CONFIG.MODEL_NAME}:generateContent`,
      {
        contents: [{
          parts: [{
            text: `Tóm tắt nội dung sau đây một cách ngắn gọn: ${text}`
          }]
        }]
      },
      {
        params: {
          key: API_CONFIG.GEMINI_API_KEY
        }
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    throw error;
  }
};
