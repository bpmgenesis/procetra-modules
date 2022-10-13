import { HttpClient, int, Convert } from '@tuval/core';
import { IMiningModelModel } from '../Models/MIMiningModel';
import { IProjectModel } from '../Models/MIProject';
import { ConfigService } from '../Services/ConfigService';
import { GetAnalyseModelsResponse } from './Models/GetAnalyseModelsResponse';
import { RealmHttpClient } from '@tuval/forms';



export interface ICreateProjectResponse {
    project_id: string;
    project_name: string;
    admin: string;
    is_public: boolean;
    disable_cache: boolean;
    is_data_loaded: boolean;

}

const separators = [",", ";", "\t"];
function detectSeparator(csv) {
    var counts = {},
        sepMax;
    separators.forEach(function (sep, i) {
        var re = new RegExp(sep, 'g');
        counts[sep] = (csv.match(re) || []).length;
        sepMax = !sepMax || counts[sep] > counts[sepMax] ? sep : sepMax;
    });
    return sepMax;
}

export class MiningBrokerClient {
    public static async LoadCsv(csv: string,
        case_id: string,
        activity_key: string,
        timestamp_key: string,
        start_timestamp_key: string,
        resource_key: string,
        cost_key: string): Promise<any[]> {

        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('case_column_name', case_id);
            data.append('activity_column_name', activity_key);
            data.append('timestamp_key', timestamp_key);
            data.append('start_timestamp_key', start_timestamp_key);
            data.append('resource_key', resource_key);
            data.append('cost_key', cost_key);
            data.append('sep', detectSeparator(csv));


            var parts = [
                new Blob([csv], { type: 'text/plain' })
            ];
            var file = new File(parts, 'csv.txt')

            data.append('file', file, 'test.csv');

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'LoadCsv?token=', data, {
                headers: {
                    "Content-Encoding": "gzip"
                }
            })
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async ImportCsvFile(
        project_id: string,
        csv: string,
        case_column_name: string,
        activity_column_name: string,
        timestamp_key: string,
        start_timestamp_key: string,
        resource_key: string,
        cost_key: string): Promise<any[]> {

        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('project_id', project_id);
            data.append('case_column_name', case_column_name);
            data.append('activity_column_name', activity_column_name);
            data.append('timestamp_key', timestamp_key);
            data.append('start_timestamp_key', start_timestamp_key);
            data.append('resource_key', resource_key);
            data.append('cost_key', cost_key);
            data.append('sep', detectSeparator(csv));


            var parts = [
                new Blob([csv], { type: 'text/plain' })
            ];
            var file = new File(parts, 'csv.txt')

            data.append('file', file, 'test.csv');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'ImportCsvFile?token=', data, {
                headers: {
                    "Content-Encoding": "gzip"
                }
            })
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetStatistics(log_id: string, activity_name: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);
            form.append('activity_name', activity_name);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetStatistics?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetActivityOverview(log_id: string,): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetActivityStatistics?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetItemOverview(log_id: string, item_name: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);
            form.append('activity_name', item_name);
            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetStatistics?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetStartActivities(project_id: string,): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetStartActivities?token=', form)
                .then(response => {
                    resolve(response.data.startActivities);
                });
        });
    }

    public static async GetStartItems(log_id: string, item_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);
            form.append('item_name', item_name);
            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetStartItems', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetEndActivities(project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEndActivities?token=', form)
                .then(response => {
                    resolve(response.data.endActivities);
                });
        });
    }

    public static async GetEndItems(log_id: string, item_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);
            form.append('item_name', item_name);
            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEndItems?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetAllVariants( project_id: string, max_no_variants: int): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetAllVariants?token=', form)
                .then(response => {
                    resolve(response.data.variants);
                });
        });
    }

    public static async GetVariants(project_id: string, max_no_variants: int): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetVariants?token=', form)
                .then(response => {
                    resolve(response.data.variants);
                });
        });
    }
    public static async GetEventsPerTime(project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEventsPerTime?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetHappyPath( project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetHappyPath?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetActivities( project_id: string, activity_key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            form.append('activity_key', activity_key);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetActivities?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetActivitiesCount( project_id: string, activity_key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            form.append('activity_key', activity_key);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetActivitiesCount?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetThroughputTimes(project_id: string, activity_key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            form.append('activity_key', activity_key);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetThroughputTimes?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetActivitiesThroughputTimes(project_id: string, activity_key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            form.append('activity_key', activity_key);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetActivitiesThroughputTimes?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetLogSummary(project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetLogSummary?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetAllVariantsAndCases( project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetAllVariantsAndCases?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetAllPaths(project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetAllPaths?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetAttributeValues( project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetAttributeValues?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetDailyCasesPerMonth(project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetDailyCasesPerMonth?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProcessSchema( project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            // form.append('max_no_variants', '10');

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetProcessSchema?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetLog(log_id: string,): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetLog?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }



    public static async GetEventsOverTime(log_id: string,): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEventsOverTime?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetEventDataInfo(project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetEventDataInfo?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async LoadEventData( project_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'LoadEventData?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetResourceOverview(log_id: string,): Promise<ICreateProjectResponse> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('log_id', log_id);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetResourceOverview?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async Login(user: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('user', user);
            form.append('password', password);

            HttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'LoginService?token=', form)
                .then(response => {
                    resolve(response.data.sessionId);
                });
        });
    }

    public static async CreateProject(
        project_name: string,
        admin: string,
        is_public: boolean,
        disable_cache: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_name', project_name);
            form.append('admin', admin);
            form.append('is_public', is_public ? "true" : "false");
            form.append('disable_cache', disable_cache ? "true" : "false");

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'CreateProject?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProjects(): Promise<IProjectModel[]> {
        return new Promise((resolve, reject) => {

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetProjects?token=')
                .then(response => {
                    resolve(response.data.projects);
                });
        });
    }

    public static async GetProjectById(project_id: string): Promise<IProjectModel> {
        return new Promise((resolve, reject) => {
            const form = new FormData();

            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetProjectById?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async CreateProjectItem( project_id: string, model_id: string, item_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            form.append('model_id', model_id);
            form.append('item_id', item_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'CreateProjectItem?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetProjectItems( project_id: string, model_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            form.append('model_id', model_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetProjectItems?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    //#region Anayse Models
    public static async CreateAnalyseModel( project_id: string, analyse_model_name: string): Promise<IMiningModelModel> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            form.append('analyse_model_name', analyse_model_name);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'CreateAnalyseModel?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

     public static async GetAnalyseModelById( project_id: string, model_id: string): Promise<GetAnalyseModelsResponse> {
        return new Promise((resolve, reject) => {
            const form = new FormData();

            form.append('project_id', project_id);
            form.append('model_id', model_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetAnalyseModelById?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async DeleteAnalyseModelById( project_id: string, model_id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const form = new FormData();

            form.append('project_id', project_id);
            form.append('model_id', model_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'DeleteAnalyseModelById?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetAnalyseModels( project_id: string): Promise<GetAnalyseModelsResponse[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();

            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'GetAnalyseModels?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    //#endregion

    public static async CreateMapping( project_id: string, mapping_name: string, mapping_file_name: string, mapping_data: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);
            form.append('mapping_name', mapping_name);
            form.append('mapping_file_name', mapping_file_name);
            form.append('mapping_data', mapping_data);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'CreateMapping?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetCaseCount(project_id: string): Promise<int> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'metrics/GetCaseCount?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetEventCount( project_id: string): Promise<int> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('project_id', project_id);

            RealmHttpClient.Post(ConfigService.GetMiningBrokerUrl() + 'metrics/GetEventCount?token=', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

}