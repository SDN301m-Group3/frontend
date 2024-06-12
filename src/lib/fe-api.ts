import { siteConfig } from '@/config/site';
import axios from 'axios';

axios.defaults.baseURL = siteConfig.url;

export async function updateToken(accessToken: string, refreshToken: string) {
    return await axios
        .post(`/api/auth/update-token`, {
            accessToken,
            refreshToken,
        })
        .then(res => {
            return true;
        })
        .catch(error => {
            return false;
        });
}
