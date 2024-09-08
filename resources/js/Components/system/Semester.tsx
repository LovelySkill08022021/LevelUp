import React from 'react'

export default function Semester({semester}:{semester: number}) {
  
    if(semester == 1){
        return (
            <span>1st Semester</span>
        )
    }

    if(semester == 2){
        return (
            <span>2nd Semester</span>
        )
    }

    if(semester == 3){
        return (
            <span>Mid Year</span>
        )
    }
}
