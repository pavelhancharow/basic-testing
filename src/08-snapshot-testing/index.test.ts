import { generateLinkedList } from './index';

const People = {
  Girl: '👧 - girl',
  Boy: '👦 - boy',
  Woman: '👩 - woman',
  Man: '👨 - man',
  Lady: '👵 - lady',
  Senior: '👴 - senior',
};

const man_array = [People.Boy, People.Man, People.Senior];
const man_tree = {
  value: People.Boy,
  next: {
    value: People.Man,
    next: {
      value: People.Senior,
      next: { value: null, next: null },
    },
  },
};
const fail_man_tree = {
  value: People.Boy,
  next: {
    value: People.Woman,
    next: {
      value: People.Senior,
      next: { value: null },
    },
  },
};

const woman_array = [People.Girl, People.Woman, People.Lady];
const woman_tree = {
  value: People.Girl,
  next: {
    value: People.Woman,
    next: {
      value: People.Lady,
      next: { value: null, next: null },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(man_array)).not.toStrictEqual(fail_man_tree);

    expect(generateLinkedList(man_array)).toStrictEqual(man_tree);

    expect(generateLinkedList([])).not.toStrictEqual(man_tree);

    expect(generateLinkedList([])).toStrictEqual(man_tree.next.next.next);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(woman_array)).toMatchSnapshot(woman_tree);
    expect(generateLinkedList([])).toMatchSnapshot(woman_tree.next.next.next);
  });
});
