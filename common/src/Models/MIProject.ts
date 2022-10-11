import { int } from '@tuval/core';
export interface IProjectModel{
    project_id: string;
    project_name: string;
    admin: string;
    isPublic: boolean;
    diableCache: boolean;
    is_data_loaded: boolean;
    case_count:int;
    event_count: int;
}