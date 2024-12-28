import { useState } from 'react';
import { geminiService } from '../services/geminiService';

export const useGeminiAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState('');

  const getSummary = async (text) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const prompt = `Hãy tóm tắt nội dung sau đây một cách ngắn gọn và dễ hiểu:
      
      ${text}
      
      Tóm tắt nên bao gồm:
      1. Ý chính của văn bản
      2. Các điểm quan trọng
      3. Kết luận chính
      
      Hãy trình bày theo dạng văn bản có cấu trúc rõ ràng.`;

      const result = await geminiService.generateContent(prompt);
      setSummary(result);
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo tóm tắt. Vui lòng thử lại sau.');
      console.error('Error in getSummary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    summary,
    getSummary
  };
};
