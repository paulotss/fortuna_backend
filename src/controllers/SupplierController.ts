import { Request, Response, NextFunction } from "express";
import SupplierService from "../services/SupplierService";

class SupplierController {
  private readonly request: Request
  private readonly response: Response
  private readonly next: NextFunction
  private readonly service: SupplierService

  constructor(req: Request, res: Response, next: NextFunction) {
    this.request = req
    this.response = res
    this.next = next
    this.service = new SupplierService()
  }

  public async getAll (): Promise<void> {
    try {
      const result = await this.service.getAll()
      this.response.status(200).json(result)
    } catch (error) {
      this.next(error)
    }
  }
}

export default SupplierController
