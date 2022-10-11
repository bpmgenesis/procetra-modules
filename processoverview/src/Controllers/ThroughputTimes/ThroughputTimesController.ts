import { Services, MiningBrokerClient,IProjectModel } from '@procetra/common';
import { UIController, UIView, Text, VStack, PositionTypes, Alignment, cTopLeading, State } from '@tuval/forms';
import { BottleneckSection } from './View/BottleneckSection';
import { ThroughputTimeSection } from './View/ThroughputTimeSection';
import { int } from '@tuval/core';
import { BottleneckModel } from './Models/BottleneckModel';
import { SecondsToDay } from '../../utils/toDaysMinutesSeconds';
import { PageNavigate } from '../../Views/PageNavigate';

export class ThroughputTimesController extends UIController {

    private project: IProjectModel;

    @State()
    private throughputTimeData: any[];

    @State()
    private bottleneckData: BottleneckModel[];

    protected InitController(): void {

        const map = new Map<int, any>();

        // this.map = [];
        for (let i = 0; i < 100; i++) {
            map[i] = i;
        }
        // this.chart.SetChartData(map);
    }

    public BindRouterParams({project_id}) {
        MiningBrokerClient.GetProjectById(project_id).then(project => {

            this.project = project;
            const session_id = Services.StateService.GetSessionId();
            MiningBrokerClient.GetThroughputTimes(this.project.project_id, '').then((info: any) => {
                const result = [];
                for (let key in info) {
                    result.push({
                        x: key,
                        y: info[key]
                    });
                }
    
                this.throughputTimeData = result;
            });
    
            MiningBrokerClient.GetAllPaths(this.project.project_id).then(({ paths }: { paths: any[] }) => {
                console.log(paths);
                const result: BottleneckModel[] = [];
                for (let i = 0; i < paths.length; i++) {
                    const names = paths[i][0].split('@@');
                    result.push({
                        firtEvent: names[0],
                        secondEvent: names[1],
                        duration: SecondsToDay(paths[i][1])
                    })
                }
                this.bottleneckData = result;
                console.log(this.bottleneckData);
            });
            
        });
       

    }

    public LoadView(): UIView {
        return (
            VStack({ alignment: cTopLeading, spacing: 20 })(
                PageNavigate(this.project?.project_id,1,this.navigotor),
                ThroughputTimeSection(this.throughputTimeData),
                BottleneckSection(this.bottleneckData?.slice(0, 10)),
                /* HappyPathSection(),
                ActivitySection(['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4', 'Activity 5']) */
            ).position(PositionTypes.Absolute)
        )
    }
}