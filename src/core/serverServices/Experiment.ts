import {
    ExperimentGetByIdResponse,
    ExperimentGetListResponse,
    ExperimentEdditTitleResponse,
    ExperimentEdditDescriptionResponse,
    ExperimentGetExcelBufferResponse
} from '../interface/ServerResponse';
import Services from './Services';

class Experiment extends Services {
    path = '/experiment'

    getById(id: string): Promise<ExperimentGetByIdResponse> {
        this.checkAuth();
        return this.onKnockServer(() => {
            return fetch(`${this.host}${this.path}/?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`
                }
            });
        });
    }

    getList(deviceName: string): Promise<ExperimentGetListResponse> {
        this.checkAuth();
        return this.onKnockServer(() => {
            return fetch(`${this.host}${this.path}/list/?name=${deviceName}`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`
                }
            });
        });
    }

    getExcelBuffer(experimentId: string): Promise<ExperimentGetExcelBufferResponse> {
        this.checkAuth();
        return this.onKnockServer(() => {
            return fetch(`${this.host}${this.path}/excel-buffer/?id=${experimentId}`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
        }, false);
    }

    edditTitle(id: string, title: string): Promise<ExperimentEdditTitleResponse> {
        this.checkAuth();
        return this.onKnockServer(() => {
            return fetch(`${this.host}${this.path}/title`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${this.getToken().token}`
                },
                body: JSON.stringify({
                    id,
                    title
                })
            });
        });
    }

    edditDescription(id: string, description: string): Promise<ExperimentEdditDescriptionResponse> {
        this.checkAuth();
        return this.onKnockServer(() => {
            return fetch(`${this.host}${this.path}/description`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${this.getToken().token}`
                },
                body: JSON.stringify({
                    id,
                    description
                })
            });
        });
    }
}

export default Experiment