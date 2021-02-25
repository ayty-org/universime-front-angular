import {User} from '@app/_models'
export interface Projetos {
  id?: number
  name: string
  description: string
  startDate: Date
  logo: string
  endDate: Date
  coordenators :User[]
}
