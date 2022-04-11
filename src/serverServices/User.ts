import {
    UserChangePasswordResponse,
    UserChangeUsernameResponse,
    UserGetDataFullFullResponse,
    UserGetDataResponse
} from '../interface/ServerResponse';
import Services from './Services';

class User extends Services {
    path = '/user'

    async getData(): Promise<UserGetDataResponse> {
        return this.onKnockServer(async () => {
            return await fetch(`${this.host}${this.path}/`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`
                }
            });
        });
    }

    async getFullData(): Promise<UserGetDataFullFullResponse> {
        return this.onKnockServer(async () => {
            return await fetch(`${this.host}${this.path}/full`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`
                }
            });
        });
    }

    async changePassword(password: string): Promise<UserChangePasswordResponse> {
        return this.onKnockServer(async () => {
            return await fetch(`${this.host}${this.path}/password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${this.getToken().token}`
                },
                body: JSON.stringify({
                    password
                })
            });
        });
    }

    async changeUsername(username: string): Promise<UserChangeUsernameResponse> {
        return this.onKnockServer(async () => {
            return await fetch(`${this.host}${this.path}/username/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${this.getToken().token}`
                },
                body: JSON.stringify({
                    username
                })
            })
        });
    }
}

export default User;