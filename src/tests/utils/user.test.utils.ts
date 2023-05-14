import { faker } from "@faker-js/faker";

export function generateUserPayload() {
  return {
    firstName: faker.person.firstName("female"),
    lastName: faker.person.lastName("female"),
    email: faker.internet.email(),
  };
}

export function generateUserData(overide = {}) {
  return {
    id: faker.number.int({ min: 1 }),
    firstName: faker.person.firstName("female"),
    lastName: faker.person.lastName("female"),
    email: faker.internet.email(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide,
  };
}

export function generateUsersData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUserData({ id: i, ...overide });
    }
  );
}
