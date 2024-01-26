import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main (): Promise<void> {
  const branchs = await prisma.branch.createMany({
    data: [
      { title: 'Águas Claras' },
      { title: 'Anápolis' },
      { title: 'Araguaina' },
      { title: 'Asa Sul' },
      { title: 'Barra Do Garças' },
      { title: 'Belém' },
      { title: 'Belem Ananindeua' },
      { title: 'Boa Vista' },
      { title: 'Brasília' },
      { title: 'Asa Norte' },
      { title: 'Samambaia' },
      { title: 'Campina Grande' },
      { title: 'Campo Novo Do Parecis' },
      { title: 'Catalão' },
      { title: 'Ceilândia' },
      { title: 'Cuiabá' },
      { title: 'Fortaleza Dionisio Torres' },
      { title: 'Fortaleza Fátima' },
      { title: 'Fortaleza Meireles' },
      { title: 'Fortaleza Sul' },
      { title: 'Gama' },
      { title: 'Goiania Alto Da Gloria' },
      { title: 'Goiânia Eldorado' },
      { title: 'Goiania Garavelo' },
      { title: 'Goiania Itumbiara' },
      { title: 'Goiania Jardim América' },
      { title: 'Goiania Perimetral Norte' },
      { title: 'Goiânia Universitario' },
      { title: 'Guará' },
      { title: 'João Pessoa' },
      { title: 'Lago Sul' },
      { title: 'Macapá' },
      { title: 'Manaus' },
      { title: 'Mossoró' },
      { title: 'Natal Morro Branco' },
      { title: 'Natal Petropolis' },
      { title: 'Natal Ponta Negra' },
      { title: 'Natal Zona Norte' },
      { title: 'Nova Parnamirim' },
      { title: 'Palmas' },
      { title: 'Petrolina' },
      { title: 'Porto Velho' },
      { title: 'Recife Boa Viagem' },
      { title: 'Recife Caruaru' },
      { title: 'Recife Derby' },
      { title: 'Rio Verde' },
      { title: 'Rondonópolis' },
      { title: 'São Luis' },
      { title: 'Sao Luis Angelim' },
      { title: 'Senador Canedo' },
      { title: 'Sinop' },
      { title: 'Sobradinho' },
      { title: 'Sorriso' },
      { title: 'Sudoeste' },
      { title: 'Taguatinga' },
      { title: 'Teresina' }
    ]
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
      password: '123456',
      email: 'paulo.oinab@gmail.com',
      cellPhone: '61988585218',
      branchId: 55,
      levelId: 1,
      admin: true,
    }
  })

  const role1 = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Gerente'
    }
  })

  const role2 = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Supervisor'
    }
  })

  const role3 = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Vendedor'
    }
  })

  const role4 = await prisma.role.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'Operador'
    }
  })

  const cashier1 = await prisma.cashier.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Café Sophia'
    }
  })

  const userHasRole = await prisma.userHasRole.create({
    data: {
      userId: 1,
      roleId: 1,
      cashierId: 1
    }
  })

  const client1 = await prisma.client.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 1,
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

  const supplier1 = await prisma.supplier.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Mercado'
    }
  })

  const product1 = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Cerveja Heneiken',
      description: 'Melhor cerveja',
      price: 8,
      amount: 50,
      barCode: '7896045506873',
      supplierId: 1
    }
  })

  const product2 = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Cerveja Original',
      description: 'Melhor cerveja',
      price: 7,
      amount: 50,
      barCode: '7891991015493',
      supplierId: 1
    }
  })

  const product3 = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Cerveja Spaten',
      description: 'Melhor cerveja',
      price: 7,
      amount: 50,
      barCode: '7891991297424',
      supplierId: 1
    }
  })

  console.log({
    branchs,
    level1,
    level2,
    role1,
    role2,
    role3,
    role4,
    user1,
    client1,
    method1,
    method2,
    method3,
    method4,
    cashier1,
    supplier1,
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
