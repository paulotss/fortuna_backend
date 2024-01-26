import { Request, Response, NextFunction } from "express";
import RoleService from "../services/RoleService";
import { IRoleUser } from "../interfaces";

class RoleController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: RoleService

  constructor(req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new RoleService()
  }

  public async getAll (): Promise<void> {
    try {
      const result = await this.service.getAll()
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async getRoleByUserId (): Promise<void> {
    try {
      const { userId } = this.request.params
      const result =  await this.service.getRolesByUserId(Number(userId))
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }

  public async addRoleToUser (): Promise<void> {
    try {
      const request: IRoleUser = this.request.body
      const result  = await this.service.addRoleToUser(request)
      this.response.status(201).json(result)
    } catch (error) {
      this.next(error);
    }
  }

  public async removeRoleToUser (): Promise<void> {
    try {
      const request: IRoleUser = this.request.body
      const result  = await this.service.removeRoleToUser(request)
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error);
    }
  }
}

export default RoleController
