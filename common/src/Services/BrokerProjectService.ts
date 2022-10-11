/* import { MIProject } from '@procetra/common';
import { IActivityInfo } from "../Bussiness/IActivityInfo";
import { IDataSet } from "../Bussiness/IDataSet";
import { IProject } from "../Bussiness/IProject";
import { Project } from "../Bussiness/Project"; */
import { ICreateProjectResponse, MiningBrokerClient } from "../BrokerClients/MiningBrokerClient";
import { IProjectModel } from "../Models/MIProject";
import { IProjectService } from "./IProjectService";
import { IMiningModelModel } from './../Models/MIMiningModel';
import { Services } from "./Services";

type IDataSet = any;
type IProject = any;
type IActivityInfo = any;
type IActivityInfoBag = any;
type MIProjectItem = any;

export class BrokerProjectService/*  implements IProjectService */ {
    public CreateProject(name: string, admin: string, isPublic: boolean = true, disableCache: boolean = false): Promise<IProjectModel> {
        return new Promise((resolve, reject) => {

            MiningBrokerClient.CreateProject(name, admin, isPublic, disableCache).then((project: ICreateProjectResponse) => {
                resolve({
                    project_id: project.project_id,
                    project_name: project.project_name,
                    admin: project.admin,
                    isPublic: project.is_public,
                    diableCache: project.disable_cache,
                    is_data_loaded: project.is_data_loaded,
                    case_count: 0,
                    event_count: 0
                });
            });
        });

    }

    AddDataSet(dataset: IDataSet): Promise<any> {
        throw new Error("Method not implemented.");
    }
    DataSetFromCvs(projectId: string, datasetId: string, datasetName: string,
        csv: string, case_column: string, activity_column: string, time_stamp: string,
        start_date: string, date_format: string): Promise<IDataSet> {
        return new Promise((resolve, reject) => {
            const datasetObject = {
                ProjectId: projectId,
                Id: datasetId
            }
            resolve(datasetObject as any);
        });
    }
    DataSetFromXes(projectId: string, datasetName: string, xes: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    CloneDataSet(projectId: string, datasetName: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetDatasetById(projectId: string, id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    SaveProject(projectId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetProjectListFromStorage(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    public LoadProject(name: string): Promise<IProject> {
        throw new Error("Method not implemented.");
    }
    CloseProject(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    ConvertCsvToJson(csv: string): Promise<string> {
        return new Promise((resolve, reject) => {
            /* const data = CvsToJson.Convert(csv, { parseNumbers: true }); */
            return resolve(null);
        });

    }
    GetDatasetAsData(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetDatasetEventCount(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    CasesStartedPerDay(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    ActivitiesStartedPerDay(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    ActivitiesPerCase(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetVariantsInfo(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetEventsOverTime(projectId: string, datasetId: string): Promise<any> {
        return new Promise((resolve, reject) => {

        });
    }
    GetStartEvents(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetEndEvents(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetTraceCount(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetEventCount(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetActivities(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetMedianCaseDuration(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetMeanCaseDuration(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetDatasetName(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    SetActivityInfo(projectId: string, datasetId: string, activityInfos: IActivityInfo[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetActivityInfo(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetAverageCostOfDataset(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GetTotalCostOfDataset(projectId: string, datasetId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    SetDatasetFilteredData(projectId: string, datasetId: string, filteredData: any[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
    SetDatasetCondition(projectId: string, datasetId: string, condition: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    //#region Project Methods
    public GetProjects(session_id: string): Promise<IProjectModel[]> {
        return MiningBrokerClient.GetProjects();
    }

    public GetProjectItems(project_id: string): Promise<MIProjectItem[]> {
        //return MiningBrokerClient.GetProjectItems(session_id, org_name, project_id);
        return new Promise((resolve, reject) => {
            resolve(
                [
                    {
                        project_item_id: '1',
                        name: 'Test Dataset 2',
                        type: 'Dataset'
                    },
                    {
                        project_item_id: '2',
                        name: 'İnsan kaynakları',
                        type: 'Dashboard'
                    }
                ]
            );
        });
    }

    public GetProjectById(project_id: string): Promise<any> {
        return MiningBrokerClient.GetProjectById(project_id);
    }
    //#endregion

    //#region Analyse Models
    public CreateAnalyseModel(project_id: string, analyse_model_name: string): Promise<IMiningModelModel> {
        return MiningBrokerClient.CreateAnalyseModel(project_id, analyse_model_name);
    }
    public GetAnalyseModels(project_id: string): Promise<IMiningModelModel[]> {
        return MiningBrokerClient.GetAnalyseModels(project_id);
    }
    //#endregion

    public CreateMapping(project_id: string, mapping_name: string, mapping_file_name: string, mapping_data: string): Promise<string> {
        return MiningBrokerClient.CreateMapping(project_id, mapping_name, mapping_file_name, mapping_data);
    }

}