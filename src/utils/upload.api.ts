import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('files', file, file.name);
  const data = (await axios.post(`${BACKEND_URL}uploads`, formData)).data;
  if (data.success) {
    return data.data;
  }
  throw new Error(data.message);
};

export { uploadFile };
