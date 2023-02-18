import minimist from 'minimist';
import dotenv from 'dotenv';
dotenv.config();

/**
 * The purpose of this module is to allow for quick and easy collection of parameters from one or more sources
 * for use within an application.
 * Environment variables are sourced if configured, with command line arguments also being an option.
 * Both environment variables and command line arguments may both be included, with the command line arguments
 * being able to act as override for what was set in an environment variable.
 * @module omniparams
 */

/**
 * Parameter definition types to convert found environment/command line values into:
 * String, StringArray, Int, IntArray, UnsignedInt, UnsignedIntArray, Float, FloatArray, Boolean, JSON
 * Boolean values that resolve to true (case-insensitive): 1, t, true, y, yes, on, enable, enabled.
 * Boolean values that resolve to false (case-insensitive): 0, f, false, n, no, off, disable, disabled.
 * @enum {string}
 */
export const ParamType = {
  String: 'string',
  StringArray: 'string[]',
  Int: 'int',
  IntArray: 'int[]',
  UnsignedInt: 'uint',
  UnsignedIntArray: 'uint[]',
  Float: 'float',
  FloatArray: 'float[]',
  Boolean: 'boolean',
  JSON: 'json',
};

/**
 * @typedef ParameterDefinition
 * @type {object}
 * @property {string} param_name - The name under which the value(s) will be stored
 * @property {string} env_name - The environment variable name to use when searching for a provided value
 * @property {string} arg_name - The command line argument name to use when searching for a provided value
 * @property {ParamType} type - The value type belonging to this definition
 * @property {*} default - The default value to use if no value is found; Non-array parameter types only
 * @example {
 *   param_name:'emailAddress',
 *   env_name:'EMAILADDRESS',
 *   arg_name:'emailaddress',
 *   type:'string',
 *   default:'username@example.com'
 * }
 * @example {
 *   param_name:'smtpPort',
 *   env_name:'SMTP_PORT',
 *   arg_name:'smtp-port',
 *   type:'uint',
 *   default:25
 * }
 * @example { param_name:'mqttTopics', env_name:'MQTT_TOPICS', arg_name:'mqtt-topics', type:'string[]' }
 * Will collect environment variables MQTT_TOPICS_0, MQTT_TOPICS_1, ..., MQTT_TOPICS_N
 * and will also look for repeated use of the --mqtt-topics command line argument.
 */

function getBoolean(value) {
  if (value === true || value === false)
    return value;
  switch (String(value).toLowerCase()) {
    case '0':
    case 'f':
    case 'false':
    case 'n':
    case 'no':
    case 'off':
    case 'disable':
    case 'disabled':
      return false;
    case '1':
    case 't':
    case 'true':
    case 'y':
    case 'yes':
    case 'on':
    case 'enable':
    case 'enabled':
      return true;
  }
  return null;
}

function getString(value) {
  return value;  // value is already string
}

function getInt(value) {
  const num = parseInt(value, 10);
  if (isNaN(num))
    return null;
  return num;
}

function getUInt(value) {
  const num = getInt(value);
  if (num === null || num < 0)
    return null;
  return num;
}

function getFloat(value) {
  const num = parseFloat(value);
  if (isNaN(num))
    return null;
  return num;
}

function getJSON(value) {
  try {
    return JSON.parse(value);
  }
  catch(err) {
    return null;
  }
}

/**
 * Perform the collection of values, given the parameter defintions. It returns an object with properties set
 * to any found (or default) values. Any properties not found and without a provided default value set will be omitted.
 * @param {ParameterDefinition[]} definitions - The array of parameter defintions to be sought out and collected
 * @param {Object} options - Optional arguments to override default behavior
 * @param {Object} options.env - The environment variable collection; defaults to process.env if not specified
 * @param {string[]} options.argv - The command line arguments to process; defaults to process.argv.slice(2) if not specified
 * @returns {Object}
 */
export function collectParams(definitions, {
  env = process.env,
  argv = process.argv.slice(2),
} = {}) {
  const params = {};
  const margv = minimist(argv);
  for (let definition of definitions) {
    let value = null;
    let paramName = definition.param_name;
    if (!paramName)
      continue;
    if (!definition.type)
      definition.type = ParamType.String;
    if (definition.type.includes('[]')) {  // array type
      let idx = 0;
      let envKey = `${definition.env_name}_${idx}`;
      if (definition.env_name) {
        value = [];
        while (env[envKey] !== undefined) {
          value.push(env[envKey]);
          envKey = `${definition.env_name}_${++idx}`;
        }
      }
      if (definition.arg_name && margv[definition.arg_name] !== undefined) {
        value = value || [];
        const arg = margv[definition.arg_name];
        if (Array.isArray(arg))
          value = [...value, ...arg];
        else
          value = [...value, arg];
      }
      switch (definition.type) {
        case ParamType.StringArray:
          value = value.map(getString).filter(v => v !== null && v !== undefined);
          break;
        case ParamType.IntArray:
          value = value.map(getInt).filter(v => v !== null && v !== undefined);
          break;
        case ParamType.UnsignedIntArray:
          value = value.map(getUInt).filter(v => v !== null && v !== undefined);
          break;
        case ParamType.FloatArray:
          value = value.map(getFloat).filter(v => v !== null && v !== undefined);
          break;
      }
      if (value.length !== 0)
        params[paramName] = value;
      else if (definition.default !== undefined)
        params[paramName] = definition.default;
    }
    else {  // simple scalar type
      if (definition.env_name && env[definition.env_name]) {
        value = env[definition.env_name];
      }
      if (definition.arg_name && margv[definition.arg_name]) {
        value = margv[definition.arg_name];
      }
      switch (definition.type) {
        case ParamType.Int:
          value = getInt(value);
          break;
        case ParamType.UnsignedInt:
          value = getUInt(value);
          break;
        case ParamType.Float:
          value = getFloat(value);
          break;
        case Boolean:
        case ParamType.Boolean:
          value = getBoolean(value);
          break;
        case ParamType.JSON:
          value = getJSON(value);
          break;
        case String:
        case ParamType.String:
        default:
          value = getString(value);
          break;
      }
      if (value !== null)
        params[paramName] = value;
      else if (definition.default !== undefined)
        params[paramName] = definition.default;
    }
  }
  params.argv = Array.isArray(margv._) ? margv._ : [];
  return params;
}
