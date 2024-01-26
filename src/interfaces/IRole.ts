import User from "../domains/user/User"

interface IRole {
  id?: number,
  title: string,
  users?: User[],
}

export default IRole
