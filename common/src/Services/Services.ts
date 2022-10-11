import { IProjectService } from "./IProjectService";
import { instance as container } from '@tuval/core';
import { BrokerProjectService } from './BrokerProjectService';

export class Services {
    public static get ProjectService(): BrokerProjectService/* IProjectService */ {
        try {
            return container.resolve<IProjectService>('IProjectService_Thread') as any;
        } catch {
            throw 'Project Service Not Found.';
        }
    }
    public static get StateService(): IStateService {
        try {
            return container.resolve<IStateService>('IStateService') as any;
        } catch {
            throw 'State Service Not Found.';
        }
    }
}

export interface IStateService {
    GetSessionId(): string;
    SetSessionId(value: string): void;
}

