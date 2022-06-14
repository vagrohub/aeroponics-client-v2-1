import config from '../config/service';
import ResponseError from '../elementaryEntities/ResponseError';
import Token from '../elementaryEntities/Token';

class Services {
    host = config.HOST;

    checkAuth(): void {
        if (!localStorage.getItem('token')) {
            throw new Error('User not authorized');
        }
    }

    getToken(): Token {
        const tokenCondidate = localStorage.getItem('token');

        if (!tokenCondidate) {
            throw new Error('User not authorized');
        }

        return new Token(tokenCondidate);
    }

    async onKnockServer(getResponse: () => Promise<any>, isSerialize: boolean = true): Promise<any> {
        try {
            const response = await getResponse();

            if (isSerialize) {
                return await response.json();
            }

            return response;
        } catch (error: any) {
            return new ResponseError(error.message);
        }
    }
}

export default Services;