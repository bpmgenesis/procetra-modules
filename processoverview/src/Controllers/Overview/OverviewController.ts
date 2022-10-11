import { Bindable } from './Bindable';
import { MVIActivityBox } from './Views/ActivityBox';
import { int, Convert, TMath } from '@tuval/core';
import { TvChart } from '@realmocean/charts';
import { UIController, UIView, VStack, PositionTypes, Alignment, State, cTopLeading } from '@tuval/forms';
import { ActivitySection } from './Views/ActivitySection';
import { HappyPathSection } from './Views/HappyPathSection';
import { MetricsSection, MVIMetricSection } from './Views/MetricsSection';
import { MVIHappyPathDiagramItem } from './Views/HappyPathDiagram';
import { IProjectModel, MiningBrokerClient, Services, MIHappyPath } from '@procetra/common';

let data = [
    { x: new Date(2021, 1, 1), y: 532.2 }, { x: new Date(2021, 2, 1), y: 453.4 },
    { x: new Date(2021, 3, 1), y: 422.8 }, { x: new Date(2021, 4, 1), y: 531.6 },
    { x: new Date(2021, 5, 1), y: 642.3 }, { x: new Date(2021, 6, 1), y: 432.5 },
    { x: new Date(2021, 7, 1), y: 462.9 }, { x: new Date(2021, 8, 1), y: 445.8 },
    { x: new Date(2021, 9, 1), y: 561.4 }, { x: new Date(2021, 10, 1), y: 433.1 }
];


const testActivitySectionModel: MVIActivityBox[] = [
    {
        activityName: 'Activity 1',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 2',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 3',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 4',
        casePercentage: 14,
        eventCount: 40463
    },
    {
        activityName: 'Activity 5',
        casePercentage: 14,
        eventCount: 40463
    }
]

const happyPathDiagramModelTest: MVIHappyPathDiagramItem[] = [
    {
        name: 'Test 1'
    },
    {
        name: 'Test 1'
    },
    {
        name: 'Test 1'
    }
]


export class OverviewController extends UIController {

    private project: IProjectModel;

    @State()
    private metricSectionModel: MVIMetricSection;

    @State()
    private happyPathModel: MIHappyPath;

    @State()
    private activities: MVIActivityBox[];

    @State()
    private activitySectionModel: MVIActivityBox[];



    protected InitController(): void {
        // this.chart = new EventsOverTimeChart();

        const map = new Map<int, any>();

        // this.map = [];
        for (let i = 0; i < 100; i++) {
            map[i] = i;
        }

        // this.chart.SetChartData(map);

        this.activitySectionModel = testActivitySectionModel;




    }

    public BindRouterParams({project_id}) {
        MiningBrokerClient.GetProjectById(project_id).then(project => {
            this.project = project;
            const session_id = Services.StateService.GetSessionId();
            MiningBrokerClient.GetHappyPath( this.project.project_id).then((info: any) => {
                this.happyPathModel = info;
            });
            MiningBrokerClient.GetActivities( this.project.project_id, 'concept:name').then((info: any) => {
                console.log(info);
                this.activities = [];
                for (let key in info) {
                    this.activities.push({
                        activityName: key,
                        casePercentage: info[key]['case_rate'],
                        eventCount: info[key]['event_count']
                    });
                }
            });

            MiningBrokerClient.GetDailyCasesPerMonth( this.project.project_id).then((info: any) => {
                const result = [];
                for (let i = 0; i < info.daily_cases_per_month.length; i++) {
                    result.push({
                        x: new Date(info.daily_cases_per_month[i].year, info.daily_cases_per_month[i].month - 1, 1),
                        y: Math.round(info.daily_cases_per_month[i].case_rate)
                    });
                }
                this.metricSectionModel = {
                    metricBoxNodels: [
                        {
                            title: 'Cases per day',
                            value: TMath.round(info.case_per_day, 2).toString(),
                            subTitle: 'Total number of cases per day',
                            /*  showMenu: new Bindable(false, this), */
                            chart: {
                                dataSource: [
                                    { x: 1, xval: 'Jan', yval: 34 },
                                    { x: 2, xval: 'Feb', yval: 36 },
                                    { x: 3, xval: 'Mar', yval: 32 },
                                    { x: 4, xval: 'Apr', yval: 35 },
                                    { x: 5, xval: 'May', yval: 40 },
                                    { x: 6, xval: 'Jun', yval: 38 },
                                    { x: 7, xval: 'Jul', yval: 33 },
                                    { x: 8, xval: 'Aug', yval: 37 },
                                    { x: 9, xval: 'Sep', yval: 34 },
                                    { x: 10, xval: 'Oct', yval: 31 },
                                    { x: 11, xval: 'Nov', yval: 30 },
                                    { x: 12, xval: 'Dec', yval: 29 },
                                ],
                                xName: 'xval',
                                yName: 'yval',

                            }
                        },
                        {
                            title: 'Events per day',
                            value: TMath.round(info.event_per_day, 2).toString(),
                            subTitle: 'Total number of events per day',
                            /* showMenu: new Bindable(false, this), */
                            chart: {

                                dataSource: [
                                    { x: 1, xval: 'Jan', yval: 12 },
                                    { x: 2, xval: 'Feb', yval: 36 },
                                    { x: 3, xval: 'Mar', yval: 56 },
                                    { x: 4, xval: 'Apr', yval: 76 },
                                    { x: 5, xval: 'May', yval: 34 },
                                    { x: 6, xval: 'Jun', yval: 39 },
                                    { x: 7, xval: 'Jul', yval: 50 },
                                    { x: 8, xval: 'Aug', yval: 43 },
                                    { x: 9, xval: 'Sep', yval: 34 },
                                    { x: 10, xval: 'Oct', yval: 17 },
                                    { x: 11, xval: 'Nov', yval: 30 },
                                    { x: 12, xval: 'Dec', yval: 56 },
                                ],
                                xName: 'xval', yName: 'yval',

                            }
                        },
                        {
                            title: 'Throughput time',
                            value: '26 DAYS',
                            subTitle: 'Average case duration from process start to process end without extreme outliers',
                            /* showMenu: new Bindable(false, this), */
                            chart: {

                                dataSource: [
                                    { x: 1, xval: 'Jan', yval: 23 },
                                    { x: 2, xval: 'Feb', yval: 35 },
                                    { x: 3, xval: 'Mar', yval: 43 },
                                    { x: 4, xval: 'Apr', yval: 35 },
                                    { x: 5, xval: 'May', yval: 40 },
                                    { x: 6, xval: 'Jun', yval: 53 },
                                    { x: 7, xval: 'Jul', yval: 33 },
                                    { x: 8, xval: 'Aug', yval: 12 },
                                    { x: 9, xval: 'Sep', yval: 20 },
                                    { x: 10, xval: 'Oct', yval: 31 },
                                    { x: 11, xval: 'Nov', yval: 30 },
                                    { x: 12, xval: 'Dec', yval: 29 },
                                ],
                                xName: 'xval', yName: 'yval',

                            }
                        }
                    ],
                    data: result
                }
            });
        })


    }

    public LoadView(): UIView {
        return (
            VStack({ alignment: cTopLeading })(
                MetricsSection(this.metricSectionModel),
                HappyPathSection(this.happyPathModel),
                ActivitySection(this.activities)
            ).position(PositionTypes.Absolute)
        )
    }
}