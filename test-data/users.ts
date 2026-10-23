export const users = {     //Objekat user: svi nalozi za testove
    customer: {
        email: 'customer2@practicesoftwaretesting.com',
        password: process.env.CUSTOMER_PASSWORD!,
        fullName: 'Jack Howe',
    },
    notRegistered: {
        email: 'not.registered@test.com',
        password: 'WrongPassword1',
    },

};
