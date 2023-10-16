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

  const function1 = await prisma.function.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Força Viva',
      acronym: 'FFVV'
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
      functionId: 1
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
      functionId: 1
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
      functionId: 1
    }
  })

  const seller1 = await prisma.seller.upsert({
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

  console.log({
    branch1,
    function1,
    user1,
    user2,
    user3,
    seller1,
    client1,
    client2,
    cashier1,
    product1,
    product2,
    product3
  })
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
