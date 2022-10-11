import { TvChart } from '@realmocean/charts';
import { int } from '@tuval/core';
import {
    Alignment,
    ForEach,
    HDivider,
    HStack,
    Icon,
    Spacer,
    State,
    TApplication,
    Text,
    UIButton,
    UIController,
    UIScene,
    UIView,
    VStack,
    UIRouteOutlet
} from '@tuval/forms';

import { OverviewController } from './Overview/OverviewController';
import { ThroughputTimesController } from './ThroughputTimes/ThroughputTimesController';
import { cLeading, cTopLeading } from '@tuval/forms';
import { ActivityController } from './Activity/ActivityController';
import { MVIPortalSideMenuItem, PortalSideMenu } from '../Views/PortalSideMenu';
import { PageTitle } from '../Views/PageTitle';
import { IProjectModel, MiningBrokerClient, FormView } from '@procetra/common';


function getMax(array: any[]) {
    let max: int = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].data > max) {
            max = array[i].data;
        }
    }
    return max;
}

const sideMenu: MVIPortalSideMenuItem[] = [
    {
        name: 'Overview',
        icon: '\\d2de',
        controller: new OverviewController(),
        isVisible: () => true
    },
    {
        name: 'Throughput times',
        icon: '\\d36c',
        controller: new ThroughputTimesController(),
        isVisible: () => true
    },
    {
        name: 'Activities',
        icon: '\\d2fd',
        controller: new ActivityController(),
        isVisible: () => true
    }
]

export class ProcessOverviewController extends UIController {

    private project: IProjectModel;

    @State()
    private chart1: TvChart;

    @State()
    private chart2: TvChart;

    @State()
    private chart3: TvChart;

    @State()
    private chartData: Map<any, any>;

    @State()
    private map: any[] = [];


    @State()
    private refresh: string;

    @State()
    private selectedIndex: int;

    @State()
    private currentController: UIController;

    protected InitController(): void {

        this.Appearance.OverflowX = 'hidden';
        this.Appearance.OverflowY = 'auto';

        this.refresh = '1';


        this.chart1 = new TvChart();
        this.chart1.Appearance.Width = '100%';
        this.chart1.Appearance.Height = '100px';

        this.chart2 = new TvChart();
        this.chart2.Appearance.Width = '100%';
        this.chart2.Appearance.Height = '100px';

        this.chart3 = new TvChart();
        this.chart3.Appearance.Width = '100%';
        this.chart3.Appearance.Height = '100px';

    }

    public BindRouterParams({ project_id }) {
        MiningBrokerClient.GetProjectById(project_id).then(project => {
            this.project = project;
            // this.OnControllerChanged(0);
        })

    }

    private OnControllerChanged(index: int) {
        this.selectedIndex = index;
        const controller = this.currentController = sideMenu[index].controller;
        controller.Bind(this.project);

    }
    private view_Content() {
        return (
            UIScene(
                HStack(
                    PortalSideMenu(
                        {
                            items: sideMenu,
                            selectedAction: (index) => this.OnControllerChanged(index),
                            second: true
                        }
                    ),
                    VStack({ alignment: cTopLeading, spacing: 10 })(
                        HStack({ alignment: cLeading, spacing: 10 })(
                            PageTitle(sideMenu[0/* this.selectedIndex */].icon, sideMenu[0/* this.selectedIndex */].name),
                            Spacer(),

                            // View Buttons Overview, Throuthput Times
                            // Only Desktop
                            HStack({ spacing: 5 })(
                                ...ForEach(sideMenu)((item: MVIPortalSideMenuItem, index: int) =>
                                    UIButton(
                                        Icon(item.icon).size(14).foregroundColor('gray'),
                                        Text(item.name).paddingLeft('5px')
                                    )
                                        .action(() => this.OnControllerChanged(index))
                                        .border('solid 1px gray')
                                        .cornerRadius('10px')
                                        .padding('3px 10px 3px 10px')
                                        .background(this.selectedIndex === index ? 'rgb(120,120,120,20%)' : '')
                                )
                            )
                                .width() // auto width
                                .visible(TApplication.IsDesktop),

                            // Portal
                            HStack({ spacing: 30 })(
                                VStack(
                                    Text('traces').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                                    Text('0').foregroundColor('#999').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                                ),
                                VStack(
                                    Text('events').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                                    Text('0').foregroundColor('#2ca3c0').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                                ),
                                VStack(
                                    Text('variants').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                                    Text('0').foregroundColor('#b40404').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                                )
                            )
                                .width() //auto width
                                .visible(TApplication.IsPortal)

                        ).height(),
                        HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                        VStack({ alignment: cTopLeading })( // For scrolling
                            //this.currentController
                            UIRouteOutlet().width('100%').height('100%')

                        ).overflowX('hidden').overflowY('auto')
                    )
                        .padding(10)
                        .background(TApplication.IsPortal ? '#f1f1f1' : '')
                )
            )
        )
    }
    public LoadView(): UIView {
        return (
            FormView({
                content: this.view_Content()
            })
        )
    }
}