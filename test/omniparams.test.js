import tap from 'tap';
import { collectParams } from '../omniparams.js';

const testDefs = [
  { param_name:'stringItem', env_name:'STRING_ITEM', arg_name:'string-item', type:'string' },
  { param_name:'stringDefaultItem', env_name:'STRING_DEFAULT_ITEM', arg_name:'string-default-item', type:'string', default:'value1' },
  { param_name:'uintItem', env_name:'UINT_ITEM', arg_name:'uint-item', type:'uint' },
  { param_name:'uintDefaultItem', env_name:'UINT_DEFAULT_ITEM', arg_name:'uint-default-item', type:'uint', default:5 },
  { param_name:'intItem', env_name:'INT_ITEM', arg_name:'int-item', type:'int' },
  { param_name:'intDefaultItem', env_name:'INT_DEFAULT_ITEM', arg_name:'int-default-item', type:'int', default:-5 },
  { param_name:'booleanItem', env_name:'BOOLEAN_ITEM', arg_name:'boolean-item', type:'boolean' },
  { param_name:'booleanDefaultItem', env_name:'BOOLEAN_DEFAULT_ITEM', arg_name:'boolean-default-item', type:'boolean', default:true },
  { param_name:'stringArrayItem', env_name:'STRING_ARRAY_ITEM', arg_name:'string-array-item', type:'string[]' },
  { param_name:'uintArrayItem', env_name:'UINT_ARRAY_ITEM', arg_name:'uint-array-item', type:'uint[]' },
  { param_name:'intArrayItem', env_name:'INT_ARRAY_ITEM', arg_name:'int-array-item', type:'int[]' },
  { param_name:'stringArrayDefaultItem', env_name:'STRING_ARRAY_DEFAULT_ITEM', arg_name:'string-array-default-item', type:'string[]', default:['hello', 'there'] },
  { param_name:'uintArrayDefaultItem', env_name:'UINT_ARRAY_DEFAULT_ITEM', arg_name:'uint-array-default-item', type:'uint[]', default:[1, 3, 5] },
  { param_name:'intArrayDefaultItem', env_name:'INT_ARRAY_DEFAULT_ITEM', arg_name:'int-array-default-item', type:'int[]', default:[-1, -3, -5] },
];

tap.test('Supports environment variables', async (test) => {
  const params = collectParams(testDefs, {
    env: {
      STRING_ITEM: 'string0',
      UINT_ITEM: '10',
      INT_ITEM: '-10',
      BOOLEAN_ITEM: 'false',
      STRING_ARRAY_ITEM_0: 'first',
      STRING_ARRAY_ITEM_1: 'second',
      STRING_ARRAY_ITEM_2: 'third',
      UINT_ARRAY_ITEM_0: '2',
      UINT_ARRAY_ITEM_1: '4',
      UINT_ARRAY_ITEM_2: '8',
      INT_ARRAY_ITEM_0: '-2',
      INT_ARRAY_ITEM_1: '-4',
      INT_ARRAY_ITEM_2: '-8',
    },
  });
  test.equal(params.stringItem, 'string0');
  test.equal(params.uintItem, 10);
  test.equal(params.intItem, -10);
  test.equal(params.booleanItem, false);
  test.same(params.stringArrayItem, ['first', 'second', 'third']);
  test.same(params.uintArrayItem, [2, 4, 8]);
  test.same(params.intArrayItem, [-2, -4, -8]);
});

tap.test('Supports environment variables with defaults', async (test) => {
  const params = collectParams(testDefs, {
    env: {
      STRING_ITEM: 'string0',
      UINT_ITEM: '10',
      INT_ITEM: '-10',
      BOOLEAN_ITEM: 'false',
      STRING_ARRAY_ITEM_0: 'first',
      STRING_ARRAY_ITEM_1: 'second',
      STRING_ARRAY_ITEM_2: 'third',
      UINT_ARRAY_ITEM_0: '2',
      UINT_ARRAY_ITEM_1: '4',
      UINT_ARRAY_ITEM_2: '8',
      INT_ARRAY_ITEM_0: '-2',
      INT_ARRAY_ITEM_1: '-4',
      INT_ARRAY_ITEM_2: '-8',
    },
  });
  test.equal(params.stringItem, 'string0');
  test.equal(params.stringDefaultItem, 'value1');
  test.equal(params.uintItem, 10);
  test.equal(params.uintDefaultItem, 5);
  test.equal(params.intItem, -10);
  test.equal(params.intDefaultItem, -5);
  test.equal(params.booleanItem, false);
  test.equal(params.booleanDefaultItem, true);
  test.same(params.stringArrayItem, ['first', 'second', 'third']);
  test.same(params.uintArrayItem, [2, 4, 8]);
  test.same(params.intArrayItem, [-2, -4, -8]);
  test.same(params.stringArrayDefaultItem, ['hello', 'there']);
  test.same(params.uintArrayDefaultItem, [1, 3, 5]);
  test.same(params.intArrayDefaultItem, [-1, -3, -5]);
});

tap.test('Supports commandline parameters', async (test) => {
  const params = collectParams(testDefs, {
    argv: [
      '--string-item=string0',
      '--uint-item=10',
      '--int-item=-10',
      '--boolean-item=false',
      '--string-array-item=first',
      '--string-array-item=second',
      '--string-array-item=third',
      '--uint-array-item=2',
      '--uint-array-item=4',
      '--uint-array-item=8',
      '--int-array-item=-2',
      '--int-array-item=-4',
      '--int-array-item=-8',
    ],
  });
  test.equal(params.stringItem, 'string0');
  test.equal(params.uintItem, 10);
  test.equal(params.intItem, -10);
  test.equal(params.booleanItem, false);
  test.same(params.stringArrayItem, ['first', 'second', 'third']);
  test.same(params.uintArrayItem, [2, 4, 8]);
  test.same(params.intArrayItem, [-2, -4, -8]);
});

tap.test('Supports commandline parameters with defaults', async (test) => {
  const params = collectParams(testDefs, {
    argv: [
      '--string-item=string0',
      '--uint-item=10',
      '--int-item=-10',
      '--boolean-item=false',
      '--string-array-item=first',
      '--string-array-item=second',
      '--string-array-item=third',
      '--uint-array-item=2',
      '--uint-array-item=4',
      '--uint-array-item=8',
      '--int-array-item=-2',
      '--int-array-item=-4',
      '--int-array-item=-8',
    ],
  });
  test.equal(params.stringItem, 'string0');
  test.equal(params.stringDefaultItem, 'value1');
  test.equal(params.uintItem, 10);
  test.equal(params.uintDefaultItem, 5);
  test.equal(params.intItem, -10);
  test.equal(params.intDefaultItem, -5);
  test.equal(params.booleanItem, false);
  test.equal(params.booleanDefaultItem, true);
  test.same(params.stringArrayItem, ['first', 'second', 'third']);
  test.same(params.uintArrayItem, [2, 4, 8]);
  test.same(params.intArrayItem, [-2, -4, -8]);
  test.same(params.stringArrayDefaultItem, ['hello', 'there']);
  test.same(params.uintArrayDefaultItem, [1, 3, 5]);
  test.same(params.intArrayDefaultItem, [-1, -3, -5]);
});

tap.test('Supports commandline parameter override/combination of environment variables', async (test) => {
  const params = collectParams(testDefs, {
    env: {
      STRING_ITEM: 'string0',
      UINT_ITEM: '10',
      INT_ITEM: '-10',
      BOOLEAN_ITEM: 'false',
      STRING_ARRAY_ITEM_0: 'first',
      STRING_ARRAY_ITEM_1: 'second',
      STRING_ARRAY_ITEM_2: 'third',
      UINT_ARRAY_ITEM_0: '2',
      UINT_ARRAY_ITEM_1: '4',
      UINT_ARRAY_ITEM_2: '8',
      INT_ARRAY_ITEM_0: '-2',
      INT_ARRAY_ITEM_1: '-4',
      INT_ARRAY_ITEM_2: '-8',
    },
    argv: [
      '--string-item=override-string0',
      '--uint-item=100',
      '--int-item=-100',
      '--boolean-item=true',
      '--string-array-item=override-first',
      '--string-array-item=override-second',
      '--string-array-item=override-third',
      '--uint-array-item=20',
      '--uint-array-item=40',
      '--uint-array-item=80',
      '--int-array-item=-20',
      '--int-array-item=-40',
      '--int-array-item=-80',
    ],
  });
  test.equal(params.stringItem, 'override-string0');
  test.equal(params.stringDefaultItem, 'value1');
  test.equal(params.uintItem, 100);
  test.equal(params.uintDefaultItem, 5);
  test.equal(params.intItem, -100);
  test.equal(params.intDefaultItem, -5);
  test.equal(params.booleanItem, true);
  test.equal(params.booleanDefaultItem, true);
  test.same(params.stringArrayItem, ['first', 'second', 'third', 'override-first', 'override-second', 'override-third']);
  test.same(params.uintArrayItem, [2, 4, 8, 20, 40, 80]);
  test.same(params.intArrayItem, [-2, -4, -8, -20, -40, -80]);
  test.same(params.stringArrayDefaultItem, ['hello', 'there']);
  test.same(params.uintArrayDefaultItem, [1, 3, 5]);
  test.same(params.intArrayDefaultItem, [-1, -3, -5]);
});