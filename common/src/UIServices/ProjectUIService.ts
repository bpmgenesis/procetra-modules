import { CreateNewProjectDialog } from "../Dialogs/CreateNewProjectDialog/CreateNewProjectDialog";
import { OpenProjectDialog } from "../Dialogs/OpenProjectDialog";
import { IProjectModel } from "../Models/MIProject";


export class ProjectUIService {
    public static NewProject(): Promise<any> {
        return new Promise((resolve, reject) => {
            const npd = new CreateNewProjectDialog();
            npd.ShowDialogAsync().then(projectInfo => {
                //alert(JSON.stringify(projectInfo));
                resolve(projectInfo);
            })
        });

    }
    public static OpenProjectDialog(): Promise<any> {
        return new Promise((resolve, reject) => {
            const npd = new OpenProjectDialog();
            npd.ShowDialogAsync().then((project: any) => {
                resolve(project);
            })
        });
    }

    /* public static UploadDataDialog(project: IProjectModel): Promise<any> {
        return new Promise((resolve, reject) => {
            const npd = new UploadDataDialog();
            npd.SetProject(project);
            npd.ShowDialogAsync().then((project: any) => {
                resolve(project);
            })
        });
    }
    public static MapColumnSettingsDialog(): Promise<any> {
        return new Promise((resolve, reject) => {
            const npd = new MapColumnSettingsDialog();
            npd.ShowDialogAsync().then((project: any) => {
                resolve(project);
            })
        });
    } */

}