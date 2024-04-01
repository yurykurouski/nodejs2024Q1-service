import { PrismaClient } from '@prisma/client';
import { DEFAULT_FAV_ID } from '../src/constants';

const prisma = new PrismaClient();

async function main() {
  await prisma.favorites.upsert({
    where: { id: DEFAULT_FAV_ID },
    update: {},
    create: {},
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
