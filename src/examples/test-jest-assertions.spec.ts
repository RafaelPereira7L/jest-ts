describe('Primitive values', () => {
  it('should test jest assertions', () => {
    const number = 10;
    expect(number).toBe(10);
    expect(number).toEqual(10);

    expect(number).not.toBeNull();
    expect(number).toBeGreaterThan(9);

    expect(number).toBeGreaterThan(9);
    expect(number).toBeCloseTo(10.001);

    expect(number).toHaveProperty('toString');
  });
});

describe('Objects', () => {
  it('should test jest assertions with objects', () => {
    const person = { name: 'Rafael', age: 19 };
    const anotherPerson = { ...person };

    // expect(person).toBe(anotherPerson);
    expect(person).toEqual(anotherPerson);
    expect(person).toHaveProperty('age', 19);
    expect(person.name).toBe('Rafael');
  });
});
