import React from 'react'
import { VictoryLine, VictoryScatter, VictoryTooltip, VictoryGroup } from 'victory'

export default function UserVictoryGroup({ data }) {

    console.log("USER VICTORY GROUP", data)

    // return <VictoryGroup
    //     color="#c43a31" 
    //     data={data}
    //     labels={({ datum }) => `mood: ${datum.y}`}
    //     labelComponent={ <VictoryTooltip style={{ fontSize: 16 }}/> }
    //     >
    //     <VictoryLine />
    //     <VictoryScatter size={({ active }) => active ? 8 : 5} />
    // </VictoryGroup>

    return <VictoryGroup
            color="#c43a31" 
            data={[
                // { x: ' ', y: null },
                { x: '2020-08-03', y: 2 },
                { x: '2020-08-03', y: 4 },
                { x: '2020-08-03', y: 5 },
                // { x: '2020-08-04', y: 3 },
                // { x: '2020-08-04', y: 4 },
                // { x: '2020-08-05', y: 2 },
                // { x: '2020-08-05', y: 0 }
                ]}
            labels={({ datum }) => `mood: ${datum.y}`}
            labelComponent={ <VictoryTooltip style={{ fontSize: 16 }}/> }
            >
            <VictoryLine/>
            <VictoryScatter size={({ active }) => active ? 8 : 5}/>
        </VictoryGroup>

}