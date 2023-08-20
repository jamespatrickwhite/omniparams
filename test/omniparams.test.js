import tap from 'tap';
import { collectParams } from '../omniparams.js';

const testDefs = [
  { param_name: 'stringItem', env_name: 'STRING_ITEM', arg_name: 'stringItem', type: 'string' },
  { param_name: 'stringDefaultItem', env_name: 'STRING_DEFAULT_ITEM', arg_name: 'stringDefaultItem', type: 'string', default: 'value1' },
  { param_name: 'uintItem', env_name: 'UINT_ITEM', arg_name: 'uintItem', type: 'uint' },
  { param_name: 'uintDefaultItem', env_name: 'UINT_DEFAULT_ITEM', arg_name: 'uintDefaultItem', type: 'uint', default: 5 },
  { param_name: 'intItem', env_name: 'INT_ITEM', arg_name: 'intItem', type: 'int' },
  { param_name: 'intDefaultItem', env_name: 'INT_DEFAULT_ITEM', arg_name: 'intDefaultItem', type: 'int', default: -5 },
  { param_name: 'booleanItem', env_name: 'BOOLEAN_ITEM', arg_name: 'booleanItem', type: 'boolean' },
  { param_name: 'booleanDefaultItem', env_name: 'BOOLEAN_DEFAULT_ITEM', arg_name: 'booleanDefaultItem', type: 'boolean', default: true },
  { param_name: 'stringArrayItem', env_name: 'STRING_ARRAY_ITEM', arg_name: 'stringArrayItem', type: 'string[]' },
  { param_name: 'uintArrayItem', env_name: 'UINT_ARRAY_ITEM', arg_name: 'uintArrayItem', type: 'uint[]' },
  { param_name: 'intArrayItem', env_name: 'INT_ARRAY_ITEM', arg_name: 'intArrayItem', type: 'int[]' },
  { param_name: 'stringArrayDefaultItem', env_name: 'STRING_ARRAY_DEFAULT_ITEM', arg_name: 'stringArrayDefaultItem', type: 'string[]', default: ['hello', 'there'] },
  { param_name: 'uintArrayDefaultItem', env_name: 'UINT_ARRAY_DEFAULT_ITEM', arg_name: 'uintArrayDefaultItem', type: 'uint[]', default: [1, 3, 5] },
  { param_name: 'intArrayDefaultItem', env_name: 'INT_ARRAY_DEFAULT_ITEM', arg_name: 'intArrayDefaultItem', type: 'int[]', default: [-1, -3, -5] },
  { param_name: 'floatItem', env_name: 'FLOAT_ITEM', arg_name: 'floatItem', type: 'float' },
  { param_name: 'floatDefaultItem', env_name: 'FLOAT_DEFAULT_ITEM', arg_name: 'floatDefaaultItem', type: 'float', default: Math.PI },
  { param_name: 'floatArrayItem', env_name: 'FLOAT_ARRAY_ITEM', arg_name: 'floatArrayItem', type: 'float[]' },
  { param_name: 'floatArrayDefaultItem', env_name: 'FLOAT_ARRAY_DEFAULT_ITEM', arg_name: 'floatArrayDefaultItem', type: 'float[]', default: [1.1, 2.2, 3.3] },
  { param_name: 'jsonItem', env_name: 'JSON_ITEM', arg_name: 'jsonItem', type: 'json' },
  { param_name: 'jsonDefaultItem', env_name: 'JSON_DEFAULT_ITEM', arg_name: 'jsonDefaultItem', type: 'json', default: { greeting: "hello", count: 42 } },
  { param_name: 'invalidJSONItem', env_name: 'INVALID_JSON_ITEM', arg_name: 'invalidJSONItem', type: 'json' },
  { param_name: 'singleStringArrayItem', env_name: 'SINGLE_STRING_ARRAY_ITEM', arg_name:'singleStringArrayItem', type: 'string[]' },
  { param_name: 'urlItem', env_name: 'URL_ITEM', arg_name: 'urlItem', type: 'url' },
  { param_name: 'urlDefaultItem', env_name: 'URL_DEFAULT_ITEM', arg_name: 'urlDefaultItem', type: 'url', default: new URL('https://www.example.com/') },
  { param_name: 'invalidURLItem', env_name: 'INVALID_URL_ITEM', arg_name: 'invalidURLItem', type: 'url' },
  { param_name: 'urlArrayItem', env_name: 'URL_ARRAY_ITEM', arg_name: 'urlArrayItem', type: 'url[]' },
  { param_name: 'urlArrayDefaultItem', env_name: 'URL_ARRAY_DEFAULT_ITEM', arg_name: 'urlArrayDefaultItem', type: 'url[]', default: [new URL('https://www.example.com/'), new URL('https://demo.example.com/')] },
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
      FLOAT_ITEM: '42.42',
      FLOAT_ARRAY_ITEM_0: '2.2',
      FLOAT_ARRAY_ITEM_1: '4.4',
      FLOAT_ARRAY_ITEM_2: '6.6',
      JSON_ITEM: '{ "hello": "there" }',
      INVALID_JSON_ITEM: `{ bad: "json" }`,
      SINGLE_STRING_ARRAY_ITEM_0: 'yes',
      URL_ITEM: 'https://demo.example.com/',
      INVALID_URL_ITEM: 'bad.example.com',
      URL_ARRAY_ITEM_0: 'https://demo0.example.com/',
      URL_ARRAY_ITEM_1: 'https://demo1.example.com/',
    },
  });
  test.equal(params.stringItem, 'string0');
  test.equal(params.uintItem, 10);
  test.equal(params.intItem, -10);
  test.equal(params.booleanItem, false);
  test.same(params.stringArrayItem, ['first', 'second', 'third']);
  test.same(params.uintArrayItem, [2, 4, 8]);
  test.same(params.intArrayItem, [-2, -4, -8]);
  test.same(params.floatItem, 42.42);
  test.same(params.floatArrayItem, [2.2, 4.4, 6.6]);
  test.same(params.jsonItem, { hello: 'there' });
  test.same(params.invalidJSONItem, null);
  test.same(params.singleStringArrayItem, ['yes']);
  test.same(params.urlItem, new URL('https://demo.example.com/'));
  test.same(params.invalidURLItem, null);
  test.same(params.urlArrayItem, [ new URL('https://demo0.example.com/'), new URL('https://demo1.example.com/') ]);
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
      FLOAT_ITEM: '42.42',
      FLOAT_ARRAY_ITEM_0: '2.2',
      FLOAT_ARRAY_ITEM_1: '4.4',
      FLOAT_ARRAY_ITEM_2: '6.6',
      JSON_ITEM: '{ "hello": "there" }',
      INVALID_JSON_ITEM: `{ bad: "json" }`,
      SINGLE_STRING_ARRAY_ITEM_0: 'yes',
      URL_ITEM: 'https://demo.example.com/',
      INVALID_URL_ITEM: 'bad.example.com',
      URL_ARRAY_ITEM_0: 'https://demo0.example.com/',
      URL_ARRAY_ITEM_1: 'https://demo1.example.com/',
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
  test.same(params.floatItem, 42.42);
  test.same(params.floatArrayItem, [2.2, 4.4, 6.6]);
  test.same(params.floatDefaultItem, Math.PI);
  test.same(params.floatArrayDefaultItem, [1.1, 2.2, 3.3]);
  test.same(params.jsonItem, { hello: 'there' });
  test.same(params.jsonDefaultItem, { greeting: "hello", count: 42 });
  test.same(params.invalidJSONItem, null);
  test.same(params.singleStringArrayItem, ['yes']);
  test.same(params.urlItem, new URL('https://demo.example.com/'));
  test.same(params.urlDefaultItem, new URL('https://www.example.com/'));
  test.same(params.invalidURLItem, null);
  test.same(params.urlArrayItem, [ new URL('https://demo0.example.com/'), new URL('https://demo1.example.com/') ]);
  test.same(params.urlArrayDefaultItem, [ new URL('https://www.example.com/'), new URL('https://demo.example.com/') ]);
});

tap.test('Supports commandline parameters', async (test) => {
  const params = collectParams(testDefs, {
    argv: [
      '--stringItem=string0',
      '--uintItem=10',
      '--intItem=-10',
      '--booleanItem=false',
      '--stringArrayItem=first',
      '--stringArrayItem=second',
      '--stringArrayItem=third',
      '--uintArrayItem=2',
      '--uintArrayItem=4',
      '--uintArrayItem=8',
      '--intArrayItem=-2',
      '--intArrayItem=-4',
      '--intArrayItem=-8',
      '--floatItem=42.42',
      '--floatArrayItem=2.2',
      '--floatArrayItem=4.4',
      '--floatArrayItem=6.6',
      '--jsonItem={ "hello": "there" }',
      '--invalidJSONItem={ bad: "json" }',
      '--singleStringArrayItem=yes',
      '--urlItem=https://demo.example.com/',
      '--invalidURLItem=bad.example.com',
      '--urlArrayItem=https://demo0.example.com/',
      '--urlArrayItem=https://demo1.example.com/',
    ],
  });
  test.equal(params.stringItem, 'string0');
  test.equal(params.uintItem, 10);
  test.equal(params.intItem, -10);
  test.equal(params.booleanItem, false);
  test.same(params.stringArrayItem, ['first', 'second', 'third']);
  test.same(params.uintArrayItem, [2, 4, 8]);
  test.same(params.intArrayItem, [-2, -4, -8]);
  test.same(params.floatItem, 42.42);
  test.same(params.floatArrayItem, [2.2, 4.4, 6.6]);
  test.same(params.jsonItem, { hello: 'there' });
  test.same(params.invalidJSONItem, null);
  test.same(params.singleStringArrayItem, ['yes']);
  test.same(params.urlItem, new URL('https://demo.example.com/'));
  test.same(params.urlDefaultItem, new URL('https://www.example.com/'));
  test.same(params.invalidURLItem, null);
  test.same(params.urlArrayItem, [ new URL('https://demo0.example.com/'), new URL('https://demo1.example.com/') ]);
  test.same(params.urlArrayDefaultItem, [ new URL('https://www.example.com/'), new URL('https://demo.example.com/') ]);
});

tap.test('Supports commandline parameters with defaults', async (test) => {
  const params = collectParams(testDefs, {
    argv: [
      '--stringItem=string0',
      '--uintItem=10',
      '--intItem=-10',
      '--booleanItem=false',
      '--stringArrayItem=first',
      '--stringArrayItem=second',
      '--stringArrayItem=third',
      '--uintArrayItem=2',
      '--uintArrayItem=4',
      '--uintArrayItem=8',
      '--intArrayItem=-2',
      '--intArrayItem=-4',
      '--intArrayItem=-8',
      '--floatItem=42.42',
      '--floatArrayItem=2.2',
      '--floatArrayItem=4.4',
      '--floatArrayItem=6.6',
      '--jsonItem={ "hello": "there" }',
      '--invalidJSONItem={ bad: "json" }',
      '--singleStringArrayItem=yes',
      '--urlItem=https://demo.example.com/',
      '--invalidURLItem=bad.example.com',
      '--urlArrayItem=https://demo0.example.com/',
      '--urlArrayItem=https://demo1.example.com/',
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
  test.same(params.floatItem, 42.42);
  test.same(params.floatArrayItem, [2.2, 4.4, 6.6]);
  test.same(params.floatDefaultItem, Math.PI);
  test.same(params.floatArrayDefaultItem, [1.1, 2.2, 3.3]);
  test.same(params.jsonItem, { hello: 'there' });
  test.same(params.jsonDefaultItem, { greeting: "hello", count: 42 });
  test.same(params.invalidJSONItem, null);
  test.same(params.singleStringArrayItem, ['yes']);
  test.same(params.urlItem, new URL('https://demo.example.com/'));
  test.same(params.urlDefaultItem, new URL('https://www.example.com/'));
  test.same(params.invalidURLItem, null);
  test.same(params.urlArrayItem, [ new URL('https://demo0.example.com/'), new URL('https://demo1.example.com/') ]);
  test.same(params.urlArrayDefaultItem, [ new URL('https://www.example.com/'), new URL('https://demo.example.com/') ]);
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
      JSON_ITEM: '{ "hello": "there" }',
      INVALID_JSON_ITEM: `{ bad: "json" }`,
      URL_ITEM: 'https://demo.example.com/',
    },
    argv: [
      '--stringItem=override-string0',
      '--uintItem=100',
      '--intItem=-100',
      '--booleanItem=true',
      '--stringArrayItem=override-first',
      '--stringArrayItem=override-second',
      '--stringArrayItem=override-third',
      '--uintArrayItem=20',
      '--uintArrayItem=40',
      '--uintArrayItem=80',
      '--intArrayItem=-20',
      '--intArrayItem=-40',
      '--intArrayItem=-80',
      '--floatItem=4242.42',
      '--floatArrayItem=20.2',
      '--floatArrayItem=40.4',
      '--floatArrayItem=60.6',
      '--jsonItem={ "goodbye": "later" }',
      '--singleStringArrayItem=yes',
      '--urlItem=https://new.example.com',
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
  test.same(params.floatItem, 4242.42);
  test.same(params.floatArrayItem, [20.2, 40.4, 60.6]);
  test.same(params.floatDefaultItem, Math.PI);
  test.same(params.floatArrayDefaultItem, [1.1, 2.2, 3.3]);
  test.same(params.jsonItem, { goodbye: 'later' });
  test.same(params.jsonDefaultItem, { greeting: "hello", count: 42 });
  test.same(params.invalidJSONItem, null);
  test.same(params.singleStringArrayItem, ['yes']);
  test.same(params.urlItem, new URL('https://new.example.com/'));
});
