import { gql } from 'mercurius-codegen'

const schema = gql`
  type Query {
    add(x: Int, y: Int): Int
  }
`

export default schema
