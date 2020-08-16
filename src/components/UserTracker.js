import React from 'react'
import { connect } from 'react-redux'
import { VictoryVoronoiContainer, VictoryLine, VictoryScatter, VictoryTooltip, VictoryGroup, VictoryChart } from 'victory'

function UserTracker({ user }) {

    //Get array of objects where {x: date, y: score} from diary cards.
    const diaryDatesArray = user.diary_cards.filter(dc => !!dc.diary_card_trackers[0] > 0).map(dc => {
        const dateObj = new Date(dc.entry_timestamp)
        const date = dateObj.toISOString().slice(0, 10)
        return {x: date, y: dc.diary_card_trackers[0].score}
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
            color="#c43a31" 
            data={date}
            labels={({ datum }) => `mood: ${datum.y}`}
            labelComponent={<VictoryTooltip style={{ fontSize: 16 }} />}
            key={date[0].x}
            >
            <VictoryLine />
            <VictoryScatter size={({ active }) => active ? 8 : 5} />
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
                <VictoryChart className='chart' style={{ parent: { maxWidth: '80%' } }} domain={{y: [0, 5]}}
                    height={400} width={1000} containerComponent={<VictoryVoronoiContainer />}>
                    
                    {/* Create more space between first plot and y */}
                    {victoryGroups}
                    
                </VictoryChart>
            </div>
        </div>
    )
}

export default connect((state)=>({state}))(UserTracker)