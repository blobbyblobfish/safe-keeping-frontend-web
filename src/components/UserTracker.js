import React from 'react'
import { connect } from 'react-redux'
import { VictoryVoronoiContainer, VictoryAxis, VictoryTooltip, VictoryScatter, VictoryGroup, VictoryChart } from 'victory'

function UserTracker({ user }) {

    //Get array of objects where {x: date, y: score} from diary cards.
    const diaryDatesArray = user.diary_cards.filter(dc => !!dc.diary_card_trackers[0] > 0).map(dc => {
        const dateObj = new Date(dc.entry_timestamp)
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

    //Get date and time formatted from date object
    Date.prototype.datetimeString = function () {
        return `${this.getHours() > 12 ? this.getHours() - 12 : this.getHours()}:${this.getMinutes() < 10 ? 0 : ''}${this.getMinutes()} ${this.getHours() < 12 ? 'am' : 'pm'}`
    }

    //Render one victory group per date
    const victoryGroups = uniqueDatesNestedArray.map((date) => {

        return <VictoryGroup
                key={date[0].x} color="#2c2c34" data={date}
                style={{
                        data: { fill: "#2c2c34", fillOpacity: 0.6, stroke: "#2c2c34", strokeWidth: 1 },
                        labels: { fontSize: 15, fill: "#2c2c34", padding: 15 },
                    }} >
                                    
                <VictoryScatter
                size={({ active }) => active ? 14 : 10} 
                labels={({ datum }) => `${datum.x.datetimeString()}`}
                labelComponent={<VictoryTooltip style={{ fontSize: 12 }}/>}
                />
                
                <VictoryAxis />
                <VictoryAxis dependentAxis tickValues={[1, 2, 3, 4, 5]} />
            
            </VictoryGroup>
        }
    )

    return (
        <div className="row">
            
            <div className="column1">
                <h2>{user.first_name}</h2>
                <p>{user.email}</p>
            </div>

            <div className="column2">
                <VictoryChart className='chart' domainPadding={{ x: 30, y: 20 }} domain={{ x: [uniqueDatesNestedArray[0][0].x, new Date()], y: [1, 5] }} scale={{ x: "time" }}
                    style={{ parent: { border: "1px solid #ccc", maxWidth: '80%' }}} 
                    height={400} width={1000} containerComponent={<VictoryVoronoiContainer />}>
                    
                    {victoryGroups}
                    
                </VictoryChart>
            </div>
        </div>
    )
}

export default connect((state)=>({state}))(UserTracker)