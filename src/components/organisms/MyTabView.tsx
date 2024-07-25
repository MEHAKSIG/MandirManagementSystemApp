import { View, Text, TextBase } from 'react-native'
import React from 'react'
import { Tab, TabView } from '@rneui/themed';

export interface TabData {
    label: string;
    content: React.ReactElement;
}

interface MyTabViewProps {
    tabs: TabData[],
    activeTabIndex: number,
    setActiveTabIndex: any
}
export default function MyTabView(props: MyTabViewProps) {
    const { tabs, activeTabIndex, setActiveTabIndex } = props;

    return (
        <>
            <Tab
                value={activeTabIndex}
                onChange={(e) => setActiveTabIndex(e)}
                indicatorStyle={{
                    backgroundColor: '#fff',
                    // height: 3,
                }}
                variant="primary"
            >

                {tabs.map((tab, index) => (
                    <Tab.Item key={`${index}_tab`} title={tab.label}
                        titleStyle={{ fontSize: 13 }}
                    />
                ))}
            </Tab>

            <TabView value={activeTabIndex} onChange={setActiveTabIndex} animationType="spring">
                {tabs.map((tab, index) => (
                    // <Tab.Item key={index} title={tab.label}
                    //     titleStyle={{ fontSize: 12 }}
                    // />
                    <TabView.Item key={`${index}_view`} style={{ width: '100%' }}>
                        {tab.content}
                    </TabView.Item>
                ))}

            </TabView>
        </>

    )
}