import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main (): Promise<void> {
  const branch1 = await prisma.branch.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Taguatinga'
    }
  })

  const branch2 = await prisma.branch.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Ceilândia'
    }
  })

  const level1 = await prisma.level.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Força Viva',
      acronym: 'FFVV'
    }
  })

  const level2 = await prisma.level.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Membro',
      acronym: 'MM'
    }
  })

  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Paulo de Tarso',
      code: '001',
      password: '123456',
      email: 'paulo.oinab@gmail.com',
      cellPhone: '61988585218',
      branchId: 1,
      levelId: 1
    }
  })

  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Raquel Álvares',
      code: '002',
      password: '123456',
      email: 'raquel.alvares@gmail.com',
      cellPhone: '61981285134',
      branchId: 1,
      levelId: 1
    }
  })

  const user3 = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Marco Aurélio',
      code: '003',
      password: '123456',
      email: 'marco.tf2@gmail.com',
      cellPhone: '61123456789',
      branchId: 1,
      levelId: 1
    }
  })

  const seller1 = await prisma.seller.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 1
    }
  })

  const manager1 = await prisma.manager.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 1
    }
  })

  const client1 = await prisma.client.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 2,
      cpf: '12345678910',
      balance: 50
    }
  })

  const client2 = await prisma.client.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: 3,
      cpf: '12345678910',
      balance: 100
    }
  })

  const method1 = await prisma.method.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Dinheiro'
    }
  })

  const method2 = await prisma.method.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Débito'
    }
  })

  const method3 = await prisma.method.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Crédito'
    }
  })

  const method4 = await prisma.method.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'PIX'
    }
  })

  const receipt1 = await prisma.receipts.upsert({
    where: { id: 1 },
    update: {},
    create: {
      amount: 50,
      clientId: 1,
      methodId: 1
    }
  })

  const receipt2 = await prisma.receipts.upsert({
    where: { id: 2 },
    update: {},
    create: {
      amount: 100,
      clientId: 2,
      methodId: 2
    }
  })

  const cashier1 = await prisma.cashier.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Café Sophia'
    }
  })

  const product1 = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Cerveja Heneiken',
      price: 8,
      amount: 50,
      barCode: '123456789'
    }
  })

  const product2 = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Cerveja Original',
      price: 7,
      amount: 80,
      barCode: '123456789'
    }
  })

  const product3 = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Cerveja Colorado',
      price: 10,
      amount: 30,
      barCode: '123456789'
    }
  })

  const expense1 = await prisma.expense.upsert({
    where: { id: 1 },
    update: {},
    create: {
      amount: 5,
      value: 15.60,
      launchDate: '2023-10-30T12:00:00.000Z',
      productId: 3
    }
  })

  const loss1 = await prisma.loss.upsert({
    where: { id: 1 },
    update: {},
    create: {
      amount: 5,
      description: 'Danificado',
      createAt: '2023-10-30T12:00:00.000Z',
      productId: 3
    }
  })

  console.log({
    branch1,
    branch2,
    level1,
    level2,
    user1,
    user2,
    user3,
    seller1,
    manager1,
    client1,
    client2,
    method1,
    method2,
    method3,
    method4,
    receipt1,
    receipt2,
    cashier1,
    product1,
    product2,
    product3,
    expense1,
    loss1
  })
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
