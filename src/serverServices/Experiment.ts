import {
    ExperimentGetByIdResponse,
    ExperimentGetListResponse,
    ExperimentEdditTitleResponse,
    ExperimentEdditDescriptionResponse
} from '../interface/ServerResponse';
import Services from './Services';

class Experiment extends Services {
    path = '/experiment'

    async getById(id: string): Promise<ExperimentGetByIdResponse> {
        return await this.onKnockServer(async () => {
            return await fetch(`${this.host}/${this.path}/?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`
                }
            });
        });
    }

    async getList(deviceName: string): Promise<ExperimentGetListResponse> {
        return await this.onKnockServer(async () => {
            return await fetch(`${this.host}/${this.path}/list/?name=${deviceName}`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`
                }
            });
        });
    }

    async edditTitle(id: string, title: string): Promise<ExperimentEdditTitleResponse> {
        return await this.onKnockServer(async () => {
            await fetch(`${this.host}${this.path}/title`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${this.getToken().token}`
                },
                body: JSON.stringify({
                    id,
                    title
                })
            })
        });
    }

    async edditDescription(id: string, description: string): Promise<ExperimentEdditDescriptionResponse> {
        return await this.onKnockServer(async () => {
            await fetch(`${this.host}${this.path}/title`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${this.getToken().token}`
                },
                body: JSON.stringify({
                    id,
                    description
                })
            })
        });
    }
}

export default Experiment