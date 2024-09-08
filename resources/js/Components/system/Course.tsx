import React from 'react'
import { courses } from '@/lib/data'

export default function Course({course}:{course: string}) {
  return (
    <>
        {courses.map((map_course) => {
            if(course == map_course.value){
                return (
                    <span key={map_course.value}>{map_course.label}</span>
                )
            }
        })}
    </>
  )
}
