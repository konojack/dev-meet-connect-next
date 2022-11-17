const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const initialSkills = [
  'Front-end Developer',
  'Back-end Developer',
  'Mobile Developer',
  'Data Scientist',
  'UI Designer',
  'UX Designer',
  'Tester',
  'Fullstack Developer',
  'Scrum Master',
  'Project Manager',
  'Product Owner',
  'Business Analyst',
  'Cyber Security Engineer'
];

const initialTimezones = [
  'GMT',
  'GMT+1:00',
  'GMT+2:00',
  'GMT+3:00',
  'GMT+4:00',
  'GMT+5:00',
  'GMT+6:00',
  'GMT+7:00',
  'GMT+8:00',
  'GMT+9:00',
  'GMT+10:00',
  'GMT+11:00',
  'GMT+12:00',
  'GMT-11:00',
  'GMT-10:00',
  'GMT-9:00',
  'GMT-8:00',
  'GMT-7:00',
  'GMT-6:00',
  'GMT-5:00',
  'GMT-4:00',
  'GMT-3:00',
  'GMT-2:00',
  'GMT-1:00'
];

const randomSkill = () => initialSkills[Math.floor(Math.random() * initialSkills.length)];

const randomTimezone = () => initialTimezones[Math.floor(Math.random() * initialTimezones.length)];

const createSkills = async () => {
  await prisma.skill.createMany({
    data: initialSkills.map((name) => ({ name }))
  });
};

const createTimezones = async () => {
  await prisma.timezone.createMany({
    data: initialTimezones.map((name) => ({ name }))
  });
};

const createUsers = async () => {
  const randomUsersResponse = await fetch('https://randomuser.me/api/?results=50');
  const randomUsers = await randomUsersResponse.json();

  await prisma.user.createMany({
    data: randomUsers.results.map((user) => ({
      email: user.email,
      name: `${user.name.first} ${user.name.last}`,
      emailVerified: new Date(),
      image: user.picture.large,
      skill: randomSkill(),
      timezone: randomTimezone()
    }))
  });
};

const createConversations = async (mainUserId) => {
  let userIds = await prisma.user.findMany({
    where: {
      NOT: { id: mainUserId }
    },
    select: { id: true }
  });
  userIds = userIds.map((el) => el.id);

  const chats = [];
  for (let i = 0; i < 35; i++) {
    const randomId = userIds[Math.floor(Math.random() * userIds.length)];
    chats.push(
      prisma.conversation.create({
        data: {
          users: {
            create: [
              {
                user: {
                  connect: {
                    id: randomId
                  }
                }
              },
              {
                user: {
                  connect: {
                    id: mainUserId
                  }
                }
              }
            ]
          },
          messages: {
            create: [
              {
                content: 'Hi how are you?',
                user: {
                  connect: {
                    id: randomId
                  }
                }
              },
              {
                content: 'Im fine thanks!',
                user: {
                  connect: {
                    id: mainUserId
                  }
                }
              }
            ]
          }
        }
      })
    );
  }

  await Promise.all(chats);
};

async function main() {
  await createUsers();
  await createSkills();
  await createTimezones();
  await createConversations('clak3ap6h0000vo2c91102zg4');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
