import {User} from '@app/_models'
export interface Projetos {
  id?: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  coordenators :User[]
}
