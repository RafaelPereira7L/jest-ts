import { IndividualCustomer, EnterpriseCustomer } from './customer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

afterEach(() => jest.clearAllMocks());

describe('Individual Customers', () => {
  it('should have firstName, lastName and cpf', () => {
    const sut = createIndividualCustomer('Rafael', 'Pereira', '123.456.789-00');
    expect(sut).toHaveProperty('firstName', 'Rafael');
    expect(sut).toHaveProperty('lastName', 'Pereira');
    expect(sut).toHaveProperty('cpf', '123.456.789-00');
  });

  it('should have methods getName and getIDN for Individual customers', () => {
    const sut = createIndividualCustomer('Rafael', 'Pereira', '123.456.789-00');
    expect(sut.getName()).toBe('Rafael Pereira');
    expect(sut.getIDN()).toBe('123.456.789-00');
  });
});

describe('Enterprise Customers', () => {
  it('should have name and cnpj', () => {
    const sut = createEnterpriseCustomer('RafaelEnterprise', '123.456.7800/00');
    expect(sut).toHaveProperty('name', 'RafaelEnterprise');
    expect(sut).toHaveProperty('cnpj', '123.456.7800/00');
  });

  it('should have methods getName and getIDN for Enterprise customers', () => {
    const sut = createEnterpriseCustomer('RafaelEnterprise', '123.456.7800/00');
    expect(sut.getName()).toBe('RafaelEnterprise');
    expect(sut.getIDN()).toBe('123.456.7800/00');
  });
});
