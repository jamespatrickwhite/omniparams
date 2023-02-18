<a name="module_omniparams"></a>

## omniparams
The purpose of this module is to allow for quick and easy collection of parameters from one or more sources
for use within an application.
Environment variables are sourced if configured, with command line arguments also being an option.
Both environment variables and command line arguments may both be included, with the command line arguments
being able to act as override for what was set in an environment variable.


* [omniparams](#module_omniparams)
    * _static_
        * [.ParamType](#module_omniparams.ParamType) : <code>enum</code>
        * [.collectParams(definitions, options)](#module_omniparams.collectParams) ⇒ <code>Object</code>
    * _inner_
        * [~ParameterDefinition](#module_omniparams..ParameterDefinition) : <code>object</code>

<a name="module_omniparams.ParamType"></a>

### omniparams.ParamType : <code>enum</code>
Parameter definition types to convert found environment/command line values into:
String, StringArray, Int, IntArray, UnsignedInt, UnsignedIntArray, Float, FloatArray, Boolean, JSON
Boolean values that resolve to true (case-insensitive): 1, t, true, y, yes, on, enable, enabled.
Boolean values that resolve to false (case-insensitive): 0, f, false, n, no, off, disable, disabled.

**Kind**: static enum of [<code>omniparams</code>](#module_omniparams)  
<a name="module_omniparams.collectParams"></a>

### omniparams.collectParams(definitions, options) ⇒ <code>Object</code>
Perform the collection of values, given the parameter defintions. It returns an object with properties set
to any found (or default) values. Any properties not found and without a provided default value set will be omitted.

**Kind**: static method of [<code>omniparams</code>](#module_omniparams)  

| Param | Type | Description |
| --- | --- | --- |
| definitions | <code>Array.&lt;ParameterDefinition&gt;</code> | The array of parameter defintions to be sought out and collected |
| options | <code>Object</code> | Optional arguments to override default behavior |
| options.env | <code>Object</code> | The environment variable collection; defaults to process.env if not specified |
| options.argv | <code>Array.&lt;string&gt;</code> | The command line arguments to process; defaults to process.argv.slice(2) if not specified |

<a name="module_omniparams..ParameterDefinition"></a>

### omniparams~ParameterDefinition : <code>object</code>
**Kind**: inner typedef of [<code>omniparams</code>](#module_omniparams)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| param_name | <code>string</code> | The name under which the value(s) will be stored |
| env_name | <code>string</code> | The environment variable name to use when searching for a provided value |
| arg_name | <code>string</code> | The command line argument name to use when searching for a provided value |
| type | <code>ParamType</code> | The value type belonging to this definition |
| default | <code>\*</code> | The default value to use if no value is found; Non-array parameter types only |

**Example**  
```js
{
  param_name:'emailAddress',
  env_name:'EMAILADDRESS',
  arg_name:'emailaddress',
  type:'string',
  default:'username@example.com'
}
```
**Example**  
```js
{
  param_name:'smtpPort',
  env_name:'SMTP_PORT',
  arg_name:'smtp-port',
  type:'uint',
  default:25
}
```
**Example**  
```js
{ param_name:'mqttTopics', env_name:'MQTT_TOPICS', arg_name:'mqtt-topics', type:'string[]' }
Will collect environment variables MQTT_TOPICS_0, MQTT_TOPICS_1, ..., MQTT_TOPICS_N
and will also look for repeated use of the --mqtt-topics command line argument.
```
