import { Deta } from 'deta'

const deta = Deta(process.env.DETA_PROJECT_KEY)

const db = deta.Base('pastes')

export default db
