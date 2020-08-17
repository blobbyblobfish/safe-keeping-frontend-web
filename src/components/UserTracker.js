import React from 'react'
import { connect } from 'react-redux'
import { VictoryVoronoiContainer, VictoryAxis, VictoryLabel, VictoryLine, VictoryScatter, VictoryTooltip, VictoryGroup, VictoryChart } from 'victory'

function UserTracker({ user }) {

    //Get array of objects where {x: date, y: score} from diary cards.
    const diaryDatesArray = user.diary_cards.filter(dc => !!dc.diary_card_trackers[0] > 0).map(dc => {
        const dateObj = new Date(dc.entry_timestamp)
        // const date = dateObj.toISOString().slice(0, 10)
        return {x: dateObj, y: dc.diary_card_trackers[0].score}
    })

    //Break entries into different arrays by date  
    const diaryDatesNestedArray = []
    diaryDatesArray.forEach((diaryCard) => {
        diaryDatesNestedArray.push(diaryDatesArray.filter((diary_card) => diary_card.x === diaryCard.x))
    })
    
    const groupedDatesObject = {}
    for (let i=0; i < diaryDatesArray.length; i++) {
        const date = diaryDatesArray[i].x
        if (!groupedDatesObject[date]) { groupedDatesObject[date] = [] }
        groupedDatesObject[date].push(diaryDatesArray[i])
    }
    
    const uniqueDatesNestedArray = Object.values(groupedDatesObject).sort((a, b) => a[0].x > b[0].x ? 1 : -1)

    //Render one victory group per date
    const victoryGroups = uniqueDatesNestedArray.map((date) => {
        console.log(date)

        return <VictoryGroup
                key={date[0].x} color="#c43a31" data={date}
                style={{
                        data: { fill: "#c43a31", fillOpacity: 0.6, stroke: "#c43a31", strokeWidth: 3 },
                        labels: { fontSize: 15, fill: "#c43a31", padding: 10 },
                    }} >
                                    
                <VictoryAxis />
                
                <VictoryScatter
                size={({ active }) => active ? 14 : 10} 
                style={{ labels: { fill: "c43a31", fontSize: 30 } }}
                labels={({ datum }) => `${datum.y}`}
                // labels={({ datum }) => `mood: ${datum.y} date: ${datum.x}`}
                />
            
            </VictoryGroup>
        }
    )

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
                <VictoryChart className='chart' domain={{ x: [new Date(user.diary_cards[0].entry_timestamp), new Date()], y: [0, 5] }} scale={{ x: "time" }}
                    style={{ parent: { border: "1px solid #ccc", maxWidth: '80%' }}} 
                    height={400} width={1000} containerComponent={<VictoryVoronoiContainer />}>
                    
                    {victoryGroups}
                    
                </VictoryChart>
            </div>
        </div>
    )
}

export default connect((state)=>({state}))(UserTracker)