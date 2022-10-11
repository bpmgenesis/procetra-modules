import { VStack, cTopLeading, HStack, Icon, TextField, ScrollView, cTop, ForEach, bindState, Case, Spacer, UIContextMenu, cLeading, Text } from '@tuval/forms';
import { PageTitle } from './PageTitle';
import { is } from '@tuval/core';
import { Badge } from './Badge';
import { RegularText } from './RegularText';
import { IProjectModel } from '../Models/MIProject';

const menuItems = [
    {
        icon: '\\f091',
        title: 'Add to model',
        onClick: (item) => console.log(item)
    },
    {
        icon: '\\d2da',
        title: 'Tags',
        onClick: (item) => console.log(item)
    },
    {
        icon: '\\f06b',
        title: 'Help',
        onClick: (item) => console.log(item)
    }
]

interface MVINewAnalyseModelSelection {
    id: string;
    icon?: string;
    title: string;
    description?: string;
    badge?: string;
    link?: (project) => string;

}

const NewAnalyseTypes: MVINewAnalyseModelSelection[] = [
    {
        id: 'process_overview',
        icon: '\\d2dc',
        title: 'Process Overview',
        description: 'An overhead view of your process',
        link: (project: IProjectModel) => `/app(procetra)/project/${project.project_id}/modules/process-overview/overview`
    },
    {
        id: 'dashboard',
        icon: '\\d2db',
        title: 'Dashboard',
        description: 'A new dashboard waiting to be built.',
        // controller: new ProcessDashboardController(),
    },
    {
        id: 'process_discover',
        icon: '\\d320',
        title: 'Discover',
        description: 'To understand and analyze your business',
        //controller: new ProcessExplorerController(),
    },
    {
        id: 'monitoring',
        icon: '\\d2c9',
        title: 'Monitoring',
        badge: 'New',
        description: 'Follow the process indicators',
        // controller: new MonitoringController(),
    },
    {
        id: 'statistics',
        icon: '\\d31a',
        title: 'Statistics',
        badge: 'Updated',
        description: 'General statistics of the process',
        // controller: new ProcessStatisticController(),
    },
    {
        id: 'variant_explorer',
        icon: '\\d203',
        title: 'Variant Explorer',
        badge: 'New',
        // controller: new VariantExplorerController(),
    },
    {
        id: 'loops',
        icon: '\\e028',
        title: 'Loops',
        badge: 'Preview',
        //controller: new LoopsController(),
    },
    {
        id: 'automation',
        icon: '\\d271',
        title: 'Automation',
        // controller: new AutomationController(),
    },
    {
        id: 'case_explorer',
        icon: '\\d25b',
        title: 'Case Explorer',
        // controller: new CaseExplorerController(),
    },
    {
        id: 'difference_analyse',
        icon: '\\d2a7',
        title: 'Difference Analyse'
    },
    {
        id: 'benchmarking',
        icon: '\\d218',
        title: 'Benchmarking'
    },
    {
        id: 'lead_times',
        icon: '\\d36b',
        title: 'Lead Times'
    },
    {
        id: 'process_steps',
        icon: '\\efe4',
        title: 'Process Steps'
    },
    {
        id: 'complience_analysis',
        icon: '\\d219',
        title: 'Complience Analysis'
    },
    {
        id: 'comformance_check',
        icon: '\\d21a',
        title: 'Comformance Check'
    },
    {
        id: 'social',
        icon: '\\d21c',
        title: 'Social'
    },
    {
        id: 'process_ai',
        icon: '\\d273',
        title: 'Process AI'
    },
    {
        id: 'costs',
        icon: '\\d23c',
        title: 'Cost'
    },
    {
        id: 'forecast',
        icon: '\\d229',
        title: 'Forecast'
    },
    {
        id: '',
        icon: '\\d222',
        title: 'Mosts'
    },
    {
        id: 'bottlenecks',
        icon: '\\d246',
        title: 'Bottlenecks'
    },
    {
        id: 'durations',
        icon: '\\d207',
        title: 'Durations'
    },
    {
        id: 'breakdown',
        icon: '\\d210',
        title: 'Breakdown'
    },
    {
        id: 'distribution',
        icon: '\\d27c',
        title: 'Distribution'
    },
    {
        id: 'metrics',
        icon: '\\d290',
        title: 'Metrics'
    }
]

function searchBox({ onSearchTextChanged }): any {

    return (
        HStack(
            HStack(
                Icon('\\d22c')
                    .size(20)
                    .paddingRight('10px')
                    .paddingLeft('10px'),
                TextField().fontSize('1rem')
                    .backgroundColor('transparent')
                    .foregroundColor('#495057')
                    .onTextChange((text) => { setTimeout(() => onSearchTextChanged(text), 100) })
            )
                .width()
                .padding('0.50rem 0.50rem 0.50rem 0rem')
                .initial({ width: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }).animate({ width: '50%' }).focus({ width: '80%', backgroundColor: 'rgba(255,255,255,0.6)' })
                .paddingRight('5px')
                .overflow('hidden')
                .cornerRadius(20)
                .border({ default: '1px solid #ced4da', focus: 'solid 1px #6366F1' })
                .shadow({ default: '', focus: '0 0 0 0.2rem #c7d2fe' })
                //.transition('background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s')
                //.backgroundColor('rgba(255,255,255,0.3)')
                .height()
                .tabIndex(0)
        ).height()
    )
}

function NewAnalyseModelTitleBox(tag: string, project, { id, icon, title, description, link, badge }: MVINewAnalyseModelSelection) {
    return ({ controller }) => {
        return (
            VStack(
                // Menu stack
                HStack(
                    // Badge('New', '#22C55E99', '#ffffff66'),
                    Case(badge, {
                        'New': Badge(badge, 'white', '#22C55E99'),
                        'Updated': Badge(badge, 'white', '#3B82F699'),
                        'Preview': Badge(badge, 'white', '#F59E0B99')
                    }),
                    Spacer(),
                    UIContextMenu(
                        ...ForEach(menuItems)(item =>
                            HStack({ alignment: cLeading, spacing: 10 })(
                                Icon(item.icon).size(16),
                                Text(item.title)
                            ).onClick((e) => { item.onClick(null) })
                        )
                    )(
                        Icon('\\d2c6').size(20),
                    )
                        .cursor('pointer')
                        .border('solid 1px var(--sub-border-color)')
                        .transition('border .3s')
                        .cornerRadius(5)
                        .marginRight('10px')
                ).height(), //auto

                // Analysis Icon
                icon && Icon(icon).size(50).foregroundColor('var(--sub-icon-color)').marginBottom('10px'),
                // Analysis Name
                RegularText(title).fontSize('18px').searchWords([tag]),
                // Analysis Description
                description && RegularText(description).fontSize('12px')
            )

                .marginTop('10px')
                .marginRight('10px')
                .cornerRadius(10)
                .width(240).height(150)
                .backgroundColor('rgba(255,255,255,0.3)')
                .shadow('rgb(0 0 0 / 2%) 0px 1px 3px 0px, rgb(27 31 35 / 15%) 0px 0px 0px 1px')
                .initial({ opacity: 0 }).animate({ opacity: 1 })
                .onClick(() => controller.navigotor(link(project)))
                .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' })
                .variable('--sub-icon-color', { default: '#33333366', hover: '#2baab5' })
                .variable('--sub-icon-size', { default: '50px', hover: '60px' })
                .cursor('pointer')
        )
    }
}

export function SelectAnalysisView(project: IProjectModel) {
    const [searchText, setSearchText] = bindState('');

    return (
        VStack({ alignment: cTopLeading, spacing: 10 })(
            HStack(
                PageTitle('\\d27e', 'Mining Modules')
            ).height().paddingTop('20px'),
            searchBox({ onSearchTextChanged: (text) => setSearchText(text) }),
            ScrollView(
                HStack({ alignment: cTop, spacing: 10 })(
                    ...ForEach(NewAnalyseTypes)(item =>
                        (is.nullOrEmpty(searchText) ||
                            item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                        && NewAnalyseModelTitleBox(searchText, project, item) as any
                    )
                ).wrap('wrap').height().padding(10)
            )
        )
    )
}