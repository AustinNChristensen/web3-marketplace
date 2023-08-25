import { ICourse } from "@/types"
import courses from "./index.json"

export const getAllCourses = async (): Promise<{
    data: ICourse[], courseMap: {
        [key: string]: ICourse & { index?: number }
}}> => {
    return {
        data: courses,
        courseMap: courses.reduce((a, c, i) => {
            a[c.id] = c
            a[c.id].index = i
            return a
        }, {} as { [key: string]: ICourse & { index?: number } })
    }
}