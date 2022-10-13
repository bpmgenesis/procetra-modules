import { UIController, UIView, VStack, cTopLeading, Text, UIChart, State, ScrollView, cVertical } from '@tuval/forms';
import { PageNavigate } from '../../Views/PageNavigate';
import { IProjectModel, MiningBrokerClient, Services, MIHappyPath, LoadingScreen } from '@procetra/common';

export class ActivityController extends UIController {
    @State()
    private activities: any[];

    @State()
    private activitiesTotalTime: any[];

    @State()
    private project: IProjectModel;

    public BindRouterParams({ project_id }) {
        MiningBrokerClient.GetProjectById(project_id).then(project => {
            this.BeginUpdate();

            this.project = project;

            Promise.all([
                MiningBrokerClient.GetActivitiesThroughputTimes(this.project.project_id, 'concept:name'),
                MiningBrokerClient.GetActivitiesCount(this.project.project_id, 'concept:name')

            ]).then(result => {
                const [time, count] = result;

                const countData = [];
                for (let item in count) {
                    countData.push({
                        x: item,
                        y: count[item]
                    })
                }

                this.activities = countData;

                const timeData = [];
                for (let item in time) {
                    timeData.push({
                        x: item,
                        y: time[item]
                    })
                }

                this.activities = countData;


                this.EndUpdate();
                this.activitiesTotalTime = timeData;


            })

        })
    }
    public LoadView(): UIView {
        return (
            this.project == null ? LoadingScreen() :
                VStack({ alignment: cTopLeading })(
                    PageNavigate(this.project?.project_id, 2, this.navigotor),
                    ScrollView({ axes: cVertical })(
                        VStack({ alignment: cTopLeading })(
                            UIChart().series([
                                {
                                    data: this.activities
                                }
                            ]).options({
                                legend: {
                                    show: false
                                },
                                chart: {
                                    height: 350,
                                    type: 'treemap'
                                },
                                title: {
                                    text: 'By count'
                                },
                                theme: {

                                    palette: 'palette7',

                                }
                            }).chartType('treemap'),
                            UIChart().series([
                                {
                                    data: this.activitiesTotalTime
                                }
                            ]).options({
                                legend: {
                                    show: false
                                },
                                chart: {
                                    height: 350,
                                    type: 'treemap'
                                },
                                title: {
                                    text: 'By hour'
                                },
                                theme: {

                                    palette: 'palette6',

                                }
                            }).chartType('treemap')
                        ).padding()
                    )
                )
        )
    }
}