import React from 'react'
import { connect } from 'react-redux'
import { VictoryVoronoiContainer, VictoryLine, VictoryScatter, VictoryTooltip, VictoryGroup, VictoryChart } from 'victory'

function UserTracker({ user }) {

    function diaryDatesArray() {
        return user.diary_cards.filter(dc => !!dc.diary_card_trackers[0] > 0).map(dc => {
            const dateObj = new Date(dc.entry_timestamp)
            const date = dateObj.toISOString().slice(0, 10)
            return {x: date, y: dc.diary_card_trackers[0].score}
        })
    }
    
    function renderVictoryGroups() {

        //Break entries into different arrays by date
        // https://stackoverflow.com/questions/14696326/break-array-of-objects-into-separate-arrays-based-on-a-property
        // https://www.google.com/search?ei=Qy83X-XhDYbEytMPyJKKgAQ&q=break+down+array+into+different+arrays+by+object+property&oq=break+down+array+into+different+arrays+by+object+property&gs_lcp=CgZwc3ktYWIQAzoECAAQRzoFCAAQzQJQ5bMDWPjBA2DewwNoA3AFeAGAAbEBiAHuB5IBBDE0LjGYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwilj67n_JvrAhUGonIEHUiJAkAQ4dUDCAw&uact=5

        //Map a master array of date scores to render victory groups
        console.log(user.diary_cards)
        console.log(diaryDatesArray())
    }

    function renderChart() {
        return <div className='chart'>
             <VictoryChart className='chart' style={{ parent: { maxWidth: '80%' } }} domain={{y: [0, 5]}}
                height={400} width={1000} containerComponent={<VictoryVoronoiContainer />}>
                            
            {/* Buffer date */}
            <VictoryGroup
                color="#c43a31" 
                labels={({ datum }) => `mood: ${datum.y}`}
                labelComponent={ <VictoryTooltip style={{ fontSize: 16 }}/> }
                data={[
                    { x: ' ', y: null },
                    // { x: '2020-08-03', y: 2 },
                    // { x: '2020-08-03', y: 4 },
                    // { x: '2020-08-03', y: 5 },
                    // { x: '2020-08-04', y: 3 },
                    // { x: '2020-08-04', y: 4 },
                    // { x: '2020-08-05', y: 2 },
                    // { x: '2020-08-05', y: 0 }
                    ]}
                    >
                <VictoryLine/>
                <VictoryScatter
                size={({ active }) => active ? 8 : 5}
                />
                </VictoryGroup>

            {/* One group per day */}    
            {renderVictoryGroups()}

            {/* One group per day */}
            <VictoryGroup
                color="#c43a31" 
                labels={({ datum }) => `mood: ${datum.y}`}
                labelComponent={ <VictoryTooltip style={{ fontSize: 16 }}/> }
                data={[
                    // { x: '2020-07-31', y: 0 },
                    { x: '2020-08-03', y: 2 },
                    { x: '2020-08-03', y: 4 },
                    { x: '2020-08-03', y: 5 },
                    // { x: '2020-08-04', y: 3 },
                    // { x: '2020-08-04', y: 4 },
                    // { x: '2020-08-05', y: 2 },
                    // { x: '2020-08-05', y: 1 }
                    ]}
                >
            <VictoryLine/>
            <VictoryScatter
            size={({ active }) => active ? 8 : 5}
            />
            </VictoryGroup>

            
            {/* One group per day */}
            <VictoryGroup
                color="#c43a31" 
                labels={({ datum }) => `mood: ${datum.y}`}
                labelComponent={ <VictoryTooltip style={{ fontSize: 16 }}/> }
                data={[
                    // { x: '2020-07-31', y: 0 },
                    // { x: '2020-08-03', y: 2 },
                    // { x: '2020-08-03', y: 4 },
                    // { x: '2020-08-03', y: 5 },
                    // { x: '2020-08-04', y: 3 },
                    // { x: '2020-08-04', y: 4 },
                    { x: '2020-08-05', y: 2 },
                    { x: '2020-08-05', y: 0 }
                    ]}
                    >
                <VictoryLine/>
                <VictoryScatter
                size={({ active }) => active ? 8 : 5}
                />
            </VictoryGroup>
        </VictoryChart>
    </div>
    }

    return (
        <div className="row">
            <div className="column1">
                <h2>{user.first_name}</h2>
                <p>{user.email}</p>
                <p>Number of Skills: {user.coping_skills.length}</p>
                <p>Number of Entries: {user.diary_cards.length}</p>
                <p>Number of Skills: {user.coping_skills.length}</p>
                <p>Number of Skills: {user.coping_skills.length}</p>
            </div>
            <div className="column2">
                {renderChart()}
            </div>
        </div>
    )
}

export default connect((state)=>({state}))(UserTracker)