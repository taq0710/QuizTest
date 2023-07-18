import axios from 'axios';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const userFactories = {
  getUser: () => {
    return axios({
      method: 'get',
      url: `${url}/proposal`,
    });
  },
};
export default userFactories;
