import axios from 'axios';
import { QuizDetail } from './interface';
import { axiosRequest } from '@/utils/axiosRequest';
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const factories = {
  requestQuizList: () => {
    return axios({
      method: 'get',
      url: `${url}quizs`,
    });
  },
  requestQuiz: (id: string) => {
    return axios({
      method: 'get',
      url: `${url}quizs/detail/${id}`,
    });
  },
  requestQuizAnswer: (id: string) => {
    return axios({
      method: 'get',
      url: `${url}quizs/answer/${id}`,
    });
  },
  sendPhoto: (data: any) => {
    return axiosRequest({
      method: 'post',
      url: `uploads`,
      data: data,
    });
  },
  postQuiz: async (quiz: Partial<QuizDetail>): Promise<QuizDetail> => {
    const data = (await axios.post(`${url}quizs`, quiz)).data;
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message);
  },
};
export default factories;
