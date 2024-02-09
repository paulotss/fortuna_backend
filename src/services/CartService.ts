import Cart from "../domains/Cart";
import ICartCreateRequest from "../interfaces";
import ICart from "../interfaces/ICart";
import prisma from "../utils/prisma";
import { PrismaClient } from "@prisma/client";

class CartService {
  private prisma: PrismaClient
  
  constructor() {
    this.prisma = prisma
  }

  private createDomain(cart: ICart) {
    return new Cart(cart)
  }

  public async createOne (request: ICartCreateRequest): Promise<Cart> {
    const cartModel = await this.prisma.cart.create({
      data: {
        clientId: request.clientId,
        cashierId: request.cashierId,
        status: true,
        products: {
          create: request.productsIds.map((p) => ({
            product: { connect: { id: p.id } }, amount: p.amount
          }))
        }
      } 
    })
    const cart = this.createDomain(cartModel)
    return cart
  }

  public async getAllByCashierId (cashierId: number): Promise<Cart[]> {
    const cartsModels = await this.prisma.cart.findMany({
      where: { cashierId, status: true },
      include: {
        products: { include: {
          product: { include: { cashiers: true } }
        }},
        cashier: true,
        client: { include: { user: true } } }
    })
    const carts = cartsModels.map((c) => (this.createDomain({
      id: c.id,
      createdAt: c.createdAt,
      status: c.status,
      clientId: c.clientId,
      cashierId: c.cashierId,
      cashier: c.cashier,
      client: {
        id: c.client.id,
        name: c.client.user.name,
        cellPhone: c.client.user.cellPhone,
        email: c.client.user.email,
        admin: c.client.user.admin,
        balance: c.client.balance
      },
      products: c.products.map((p) => ({
        id: p.product.id,
        title: p.product.title,
        description: p.product.description,
        price: p.product.price,
        barCode: p.product.barCode,
        supplierId: p.product.supplierId,
        amount: p.product.cashiers.find((pc) => pc.cashierId === cashierId)?.amount,
        amountCheckout: p.amount
      }))
    })));
    return carts
  }

  public async getAllByClientId (clientId: number): Promise<Cart[]> {
    const cartsModels = await this.prisma.cart.findMany({
      where: { clientId, status: true },
      include: { products: { include: { product: true } }, cashier: true, client: { include: { user: true } } }
    })
    const carts = cartsModels.map((c) => (this.createDomain({
      id: c.id,
      createdAt: c.createdAt,
      status: c.status,
      clientId: c.clientId,
      cashierId: c.cashierId,
      cashier: c.cashier,
      client: {
        id: c.client.id,
        name: c.client.user.name,
        cellPhone: c.client.user.cellPhone,
        email: c.client.user.email,
        admin: c.client.user.admin,
        balance: c.client.balance
      },
      products: c.products.map((p) => ({...p.product, amount: p.amount}))
    })));
    return carts
  }

  public async finishStatus (cartId: number): Promise<Cart> {
    const cartModel = await this.prisma.cart.update({
      where: { id: cartId },
      data: { status: false }
    })
    const cart = this.createDomain(cartModel)
    return cart
  }
}

export default CartService
