import { getBankAccount } from '.';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  white: '\x1b[37m',
};

const amount = 20;
const initialBalance = 100;
const customer_1 = getBankAccount(initialBalance);
const customer_2 = getBankAccount(initialBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const customer_1Balance = customer_1.getBalance();

    expect(customer_1Balance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawing = customer_1.getBalance() + amount;

    expect(() => {
      customer_1.withdraw(withdrawing);
    }).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    const transferring = customer_1.getBalance() + amount;

    expect(() => {
      customer_1.transfer(transferring, customer_2);
    }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      customer_1.transfer(amount, customer_1);
    }).toThrow();
  });

  test('should deposit money', () => {
    expect(customer_1.deposit(amount).getBalance()).toBe(
      initialBalance + amount,
    );
  });

  test('should withdraw money', () => {
    expect(customer_1.withdraw(amount).getBalance()).toBe(initialBalance);
  });

  test('should transfer money', () => {
    expect(customer_1.transfer(amount, customer_2).getBalance()).toBe(
      initialBalance - amount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.extend({
      toBeNumberOrNull(received) {
        const pass = typeof received === 'number' || received === null;
        const unless = `${colors.white}expect(${colors.reset}${colors.red}received${colors.reset}${colors.white}).${colors.reset}resolves${colors.white}.${colors.reset}toBeNumberOrNull${colors.white}(${colors.reset}${colors.white})${colors.reset}\n\nReceived: ${colors.red}${received}${colors.reset}`;
        const message = () => (pass ? 'Test is pass' : unless);

        return { message, pass };
      },
    });

    await expect(customer_1.fetchBalance()).resolves.toBeNumberOrNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    customer_1.fetchBalance = jest.fn().mockResolvedValueOnce(amount);

    await customer_1.synchronizeBalance();

    expect(customer_1.getBalance()).toBe(amount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    customer_1.fetchBalance = jest.fn().mockResolvedValueOnce(null);

    await expect(customer_1.synchronizeBalance()).rejects.toThrow();
  });
});
