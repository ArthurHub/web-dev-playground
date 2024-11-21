import { createInterface as $33tH0$createInterface } from 'readline/promises';

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

var $parcel$global = globalThis;

var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global['parcelRequire8566'];

if (parcelRequire == null) {
  parcelRequire = function (id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = { id: id, exports: {} };
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global['parcelRequire8566'] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister('6wSqq', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var __importStar =
    (this && this.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
  var _a;
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports.AzureOpenAI =
    exports.fileFromPath =
    exports.toFile =
    exports.UnprocessableEntityError =
    exports.PermissionDeniedError =
    exports.InternalServerError =
    exports.AuthenticationError =
    exports.BadRequestError =
    exports.RateLimitError =
    exports.ConflictError =
    exports.NotFoundError =
    exports.APIUserAbortError =
    exports.APIConnectionTimeoutError =
    exports.APIConnectionError =
    exports.APIError =
    exports.OpenAIError =
    exports.OpenAI =
      void 0;

  const qs = __importStar(parcelRequire('g5d4D'));

  const Core = __importStar(parcelRequire('25F7z'));

  const Errors = __importStar(parcelRequire('eK9Mf'));

  const Pagination = __importStar(parcelRequire('dUVgk'));

  const Uploads = __importStar(parcelRequire('lsd5d'));

  const API = __importStar(parcelRequire('9fe10'));

  var $alNbY = parcelRequire('alNbY');

  var $gQvO1 = parcelRequire('gQvO1');

  var $ffkCP = parcelRequire('ffkCP');

  var $1BL07 = parcelRequire('1BL07');

  var $k1sSL = parcelRequire('k1sSL');

  var $8BSUZ = parcelRequire('8BSUZ');

  var $jOINj = parcelRequire('jOINj');

  var $39Bre = parcelRequire('39Bre');

  var $45Rqn = parcelRequire('45Rqn');

  var $1FMoy = parcelRequire('1FMoy');

  var $8NS1E = parcelRequire('8NS1E');

  var $8GwEm = parcelRequire('8GwEm');
  /**
   * API Client for interfacing with the OpenAI API.
   */ class OpenAI extends Core.APIClient {
    /**
     * API Client for interfacing with the OpenAI API.
     *
     * @param {string | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? undefined]
     * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
     * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
     * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
     * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
     * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
     * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     */ constructor({
      baseURL = Core.readEnv('OPENAI_BASE_URL'),
      apiKey = Core.readEnv('OPENAI_API_KEY'),
      organization = Core.readEnv('OPENAI_ORG_ID') ?? null,
      project = Core.readEnv('OPENAI_PROJECT_ID') ?? null,
      ...opts
    } = {}) {
      if (apiKey === undefined)
        throw new Errors.OpenAIError(
          "The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).",
        );
      const options = {
        apiKey: apiKey,
        organization: organization,
        project: project,
        ...opts,
        baseURL: baseURL || `https://api.openai.com/v1`,
      };
      if (!options.dangerouslyAllowBrowser && Core.isRunningInBrowser())
        throw new Errors.OpenAIError(
          "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n",
        );
      super({
        baseURL: options.baseURL,
        timeout: options.timeout ?? 600000 /* 10 minutes */,
        httpAgent: options.httpAgent,
        maxRetries: options.maxRetries,
        fetch: options.fetch,
      });
      this.completions = new API.Completions(this);
      this.chat = new API.Chat(this);
      this.embeddings = new API.Embeddings(this);
      this.files = new API.Files(this);
      this.images = new API.Images(this);
      this.audio = new API.Audio(this);
      this.moderations = new API.Moderations(this);
      this.models = new API.Models(this);
      this.fineTuning = new API.FineTuning(this);
      this.beta = new API.Beta(this);
      this.batches = new API.Batches(this);
      this.uploads = new API.Uploads(this);
      this._options = options;
      this.apiKey = apiKey;
      this.organization = organization;
      this.project = project;
    }
    defaultQuery() {
      return this._options.defaultQuery;
    }
    defaultHeaders(opts) {
      return {
        ...super.defaultHeaders(opts),
        'OpenAI-Organization': this.organization,
        'OpenAI-Project': this.project,
        ...this._options.defaultHeaders,
      };
    }
    authHeaders(opts) {
      return {
        Authorization: `Bearer ${this.apiKey}`,
      };
    }
    stringifyQuery(query) {
      return qs.stringify(query, {
        arrayFormat: 'brackets',
      });
    }
  }
  exports.OpenAI = OpenAI;
  _a = OpenAI;
  OpenAI.OpenAI = _a;
  OpenAI.DEFAULT_TIMEOUT = 600000; // 10 minutes
  OpenAI.OpenAIError = Errors.OpenAIError;
  OpenAI.APIError = Errors.APIError;
  OpenAI.APIConnectionError = Errors.APIConnectionError;
  OpenAI.APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  OpenAI.APIUserAbortError = Errors.APIUserAbortError;
  OpenAI.NotFoundError = Errors.NotFoundError;
  OpenAI.ConflictError = Errors.ConflictError;
  OpenAI.RateLimitError = Errors.RateLimitError;
  OpenAI.BadRequestError = Errors.BadRequestError;
  OpenAI.AuthenticationError = Errors.AuthenticationError;
  OpenAI.InternalServerError = Errors.InternalServerError;
  OpenAI.PermissionDeniedError = Errors.PermissionDeniedError;
  OpenAI.UnprocessableEntityError = Errors.UnprocessableEntityError;
  OpenAI.toFile = Uploads.toFile;
  OpenAI.fileFromPath = Uploads.fileFromPath;

  Object.defineProperty(exports, 'OpenAIError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').OpenAIError;
    },
  });
  Object.defineProperty(exports, 'APIError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').APIError;
    },
  });
  Object.defineProperty(exports, 'APIConnectionError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').APIConnectionError;
    },
  });
  Object.defineProperty(exports, 'APIConnectionTimeoutError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').APIConnectionTimeoutError;
    },
  });
  Object.defineProperty(exports, 'APIUserAbortError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').APIUserAbortError;
    },
  });
  Object.defineProperty(exports, 'NotFoundError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').NotFoundError;
    },
  });
  Object.defineProperty(exports, 'ConflictError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').ConflictError;
    },
  });
  Object.defineProperty(exports, 'RateLimitError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').RateLimitError;
    },
  });
  Object.defineProperty(exports, 'BadRequestError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').BadRequestError;
    },
  });
  Object.defineProperty(exports, 'AuthenticationError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').AuthenticationError;
    },
  });
  Object.defineProperty(exports, 'InternalServerError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').InternalServerError;
    },
  });
  Object.defineProperty(exports, 'PermissionDeniedError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').PermissionDeniedError;
    },
  });
  Object.defineProperty(exports, 'UnprocessableEntityError', {
    enumerable: true,
    get: function () {
      return parcelRequire('eK9Mf').UnprocessableEntityError;
    },
  });
  exports.toFile = Uploads.toFile;
  exports.fileFromPath = Uploads.fileFromPath;
  OpenAI.Completions = $gQvO1.Completions;
  OpenAI.Chat = $1FMoy.Chat;
  OpenAI.Embeddings = $ffkCP.Embeddings;
  OpenAI.Files = $1BL07.Files;
  OpenAI.FileObjectsPage = $1BL07.FileObjectsPage;
  OpenAI.Images = $k1sSL.Images;
  OpenAI.Audio = $39Bre.Audio;
  OpenAI.Moderations = $jOINj.Moderations;
  OpenAI.Models = $8BSUZ.Models;
  OpenAI.ModelsPage = $8BSUZ.ModelsPage;
  OpenAI.FineTuning = $8NS1E.FineTuning;
  OpenAI.Beta = $45Rqn.Beta;
  OpenAI.Batches = $alNbY.Batches;
  OpenAI.BatchesPage = $alNbY.BatchesPage;
  OpenAI.Uploads = $8GwEm.Uploads;
  /** API Client for interfacing with the Azure OpenAI API. */ class AzureOpenAI extends OpenAI {
    /**
     * API Client for interfacing with the Azure OpenAI API.
     *
     * @param {string | undefined} [opts.apiVersion=process.env['OPENAI_API_VERSION'] ?? undefined]
     * @param {string | undefined} [opts.endpoint=process.env['AZURE_OPENAI_ENDPOINT'] ?? undefined] - Your Azure endpoint, including the resource, e.g. `https://example-resource.azure.openai.com/`
     * @param {string | undefined} [opts.apiKey=process.env['AZURE_OPENAI_API_KEY'] ?? undefined]
     * @param {string | undefined} opts.deployment - A model deployment, if given, sets the base client URL to include `/deployments/{deployment}`.
     * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
     * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL']] - Sets the base URL for the API, e.g. `https://example-resource.azure.openai.com/openai/`.
     * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
     * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
     * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     */ constructor({
      baseURL = Core.readEnv('OPENAI_BASE_URL'),
      apiKey = Core.readEnv('AZURE_OPENAI_API_KEY'),
      apiVersion = Core.readEnv('OPENAI_API_VERSION'),
      endpoint,
      deployment,
      azureADTokenProvider,
      dangerouslyAllowBrowser,
      ...opts
    } = {}) {
      if (!apiVersion)
        throw new Errors.OpenAIError(
          "The OPENAI_API_VERSION environment variable is missing or empty; either provide it, or instantiate the AzureOpenAI client with an apiVersion option, like new AzureOpenAI({ apiVersion: 'My API Version' }).",
        );
      if (typeof azureADTokenProvider === 'function') dangerouslyAllowBrowser = true;
      if (!azureADTokenProvider && !apiKey)
        throw new Errors.OpenAIError(
          'Missing credentials. Please pass one of `apiKey` and `azureADTokenProvider`, or set the `AZURE_OPENAI_API_KEY` environment variable.',
        );
      if (azureADTokenProvider && apiKey)
        throw new Errors.OpenAIError(
          'The `apiKey` and `azureADTokenProvider` arguments are mutually exclusive; only one can be passed at a time.',
        );
      // define a sentinel value to avoid any typing issues
      apiKey ?? (apiKey = API_KEY_SENTINEL);
      opts.defaultQuery = {
        ...opts.defaultQuery,
        'api-version': apiVersion,
      };
      if (!baseURL) {
        if (!endpoint) endpoint = process.env['AZURE_OPENAI_ENDPOINT'];
        if (!endpoint)
          throw new Errors.OpenAIError(
            'Must provide one of the `baseURL` or `endpoint` arguments, or the `AZURE_OPENAI_ENDPOINT` environment variable',
          );
        baseURL = `${endpoint}/openai`;
      } else {
        if (endpoint) throw new Errors.OpenAIError('baseURL and endpoint are mutually exclusive');
      }
      super({
        apiKey: apiKey,
        baseURL: baseURL,
        ...opts,
        ...(dangerouslyAllowBrowser !== undefined
          ? {
              dangerouslyAllowBrowser: dangerouslyAllowBrowser,
            }
          : {}),
      });
      this.apiVersion = '';
      this._azureADTokenProvider = azureADTokenProvider;
      this.apiVersion = apiVersion;
      this._deployment = deployment;
    }
    buildRequest(options) {
      if (
        _deployments_endpoints.has(options.path) &&
        options.method === 'post' &&
        options.body !== undefined
      ) {
        if (!Core.isObj(options.body)) throw new Error('Expected request body to be an object');
        const model = this._deployment || options.body['model'];
        if (model !== undefined && !this.baseURL.includes('/deployments'))
          options.path = `/deployments/${model}${options.path}`;
      }
      return super.buildRequest(options);
    }
    async _getAzureADToken() {
      if (typeof this._azureADTokenProvider === 'function') {
        const token = await this._azureADTokenProvider();
        if (!token || typeof token !== 'string')
          throw new Errors.OpenAIError(
            `Expected 'azureADTokenProvider' argument to return a string but it returned ${token}`,
          );
        return token;
      }
      return undefined;
    }
    authHeaders(opts) {
      return {};
    }
    async prepareOptions(opts) {
      /**
       * The user should provide a bearer token provider if they want
       * to use Azure AD authentication. The user shouldn't set the
       * Authorization header manually because the header is overwritten
       * with the Azure AD token if a bearer token provider is provided.
       */ if (opts.headers?.['api-key']) return super.prepareOptions(opts);
      const token = await this._getAzureADToken();
      opts.headers ?? (opts.headers = {});
      if (token) opts.headers['Authorization'] = `Bearer ${token}`;
      else if (this.apiKey !== API_KEY_SENTINEL) opts.headers['api-key'] = this.apiKey;
      else throw new Errors.OpenAIError('Unable to handle auth');
      return super.prepareOptions(opts);
    }
  }
  exports.AzureOpenAI = AzureOpenAI;
  const _deployments_endpoints = new Set([
    '/completions',
    '/chat/completions',
    '/embeddings',
    '/audio/transcriptions',
    '/audio/translations',
    '/audio/speech',
    '/images/generations',
  ]);
  const API_KEY_SENTINEL = '<Missing Key>';
  // ---------------------- End Azure ----------------------
  exports = module.exports = OpenAI;
  module.exports.AzureOpenAI = AzureOpenAI;
  exports.default = OpenAI;
});
parcelRegister('g5d4D', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.formats = module.exports.stringify = void 0;

  var $bgdqL = parcelRequire('bgdqL');
  const $bb57412b154900b8$var$formats = {
    formatters: $bgdqL.formatters,
    RFC1738: $bgdqL.RFC1738,
    RFC3986: $bgdqL.RFC3986,
    default: $bgdqL.default_format,
  };
  module.exports.formats = $bb57412b154900b8$var$formats;

  var $90n2T = parcelRequire('90n2T');
  Object.defineProperty(module.exports, 'stringify', {
    enumerable: true,
    get: function () {
      return $90n2T.stringify;
    },
  });
});
parcelRegister('bgdqL', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.RFC3986 =
    module.exports.RFC1738 =
    module.exports.formatters =
    module.exports.default_format =
      void 0;
  module.exports.default_format = 'RFC3986';
  module.exports.formatters = {
    RFC1738: (v) => String(v).replace(/%20/g, '+'),
    RFC3986: (v) => String(v),
  };
  module.exports.RFC1738 = 'RFC1738';
  module.exports.RFC3986 = 'RFC3986';
});

parcelRegister('90n2T', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.stringify = void 0;

  var $krGCk = parcelRequire('krGCk');

  var $bgdqL = parcelRequire('bgdqL');
  const $68e5fd8c1fe4e8a4$var$has = Object.prototype.hasOwnProperty;
  const $68e5fd8c1fe4e8a4$var$array_prefix_generators = {
    brackets(prefix) {
      return String(prefix) + '[]';
    },
    comma: 'comma',
    indices(prefix, key) {
      return String(prefix) + '[' + key + ']';
    },
    repeat(prefix) {
      return String(prefix);
    },
  };
  const $68e5fd8c1fe4e8a4$var$is_array = Array.isArray;
  const $68e5fd8c1fe4e8a4$var$push = Array.prototype.push;
  const $68e5fd8c1fe4e8a4$var$push_to_array = function (arr, value_or_array) {
    $68e5fd8c1fe4e8a4$var$push.apply(
      arr,
      $68e5fd8c1fe4e8a4$var$is_array(value_or_array) ? value_or_array : [value_or_array],
    );
  };
  const $68e5fd8c1fe4e8a4$var$to_ISO = Date.prototype.toISOString;
  const $68e5fd8c1fe4e8a4$var$defaults = {
    addQueryPrefix: false,
    allowDots: false,
    allowEmptyArrays: false,
    arrayFormat: 'indices',
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encodeDotInKeys: false,
    encoder: $krGCk.encode,
    encodeValuesOnly: false,
    format: $bgdqL.default_format,
    formatter: $bgdqL.formatters[$bgdqL.default_format],
    /** @deprecated */ indices: false,
    serializeDate(date) {
      return $68e5fd8c1fe4e8a4$var$to_ISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false,
  };
  function $68e5fd8c1fe4e8a4$var$is_non_nullish_primitive(v) {
    return (
      typeof v === 'string' ||
      typeof v === 'number' ||
      typeof v === 'boolean' ||
      typeof v === 'symbol' ||
      typeof v === 'bigint'
    );
  }
  const $68e5fd8c1fe4e8a4$var$sentinel = {};
  function $68e5fd8c1fe4e8a4$var$inner_stringify(
    object,
    prefix,
    generateArrayPrefix,
    commaRoundTrip,
    allowEmptyArrays,
    strictNullHandling,
    skipNulls,
    encodeDotInKeys,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel,
  ) {
    let obj = object;
    let tmp_sc = sideChannel;
    let step = 0;
    let find_flag = false;
    while ((tmp_sc = tmp_sc.get($68e5fd8c1fe4e8a4$var$sentinel)) !== void 0 && !find_flag) {
      // Where object last appeared in the ref tree
      const pos = tmp_sc.get(object);
      step += 1;
      if (typeof pos !== 'undefined') {
        if (pos === step) throw new RangeError('Cyclic object value');
        else find_flag = true; // Break while
      }
      if (typeof tmp_sc.get($68e5fd8c1fe4e8a4$var$sentinel) === 'undefined') step = 0;
    }
    if (typeof filter === 'function') obj = filter(prefix, obj);
    else if (obj instanceof Date) obj = serializeDate?.(obj);
    else if (generateArrayPrefix === 'comma' && $68e5fd8c1fe4e8a4$var$is_array(obj))
      obj = (0, $krGCk.maybe_map)(obj, function (value) {
        if (value instanceof Date) return serializeDate?.(value);
        return value;
      });
    if (obj === null) {
      if (strictNullHandling)
        return encoder && !encodeValuesOnly // @ts-expect-error
          ? encoder(prefix, $68e5fd8c1fe4e8a4$var$defaults.encoder, charset, 'key', format)
          : prefix;
      obj = '';
    }
    if ($68e5fd8c1fe4e8a4$var$is_non_nullish_primitive(obj) || (0, $krGCk.is_buffer)(obj)) {
      if (encoder) {
        const key_value = encodeValuesOnly
          ? prefix
          : encoder(prefix, $68e5fd8c1fe4e8a4$var$defaults.encoder, charset, 'key', format);
        return [
          formatter?.(key_value) +
            '=' + // @ts-expect-error
            formatter?.(
              encoder(obj, $68e5fd8c1fe4e8a4$var$defaults.encoder, charset, 'value', format),
            ),
        ];
      }
      return [formatter?.(prefix) + '=' + formatter?.(String(obj))];
    }
    const values = [];
    if (typeof obj === 'undefined') return values;
    let obj_keys;
    if (generateArrayPrefix === 'comma' && $68e5fd8c1fe4e8a4$var$is_array(obj)) {
      // we need to join elements in
      if (encodeValuesOnly && encoder)
        // @ts-expect-error values only
        obj = (0, $krGCk.maybe_map)(obj, encoder);
      obj_keys = [
        {
          value: obj.length > 0 ? obj.join(',') || null : void 0,
        },
      ];
    } else if ($68e5fd8c1fe4e8a4$var$is_array(filter)) obj_keys = filter;
    else {
      const keys = Object.keys(obj);
      obj_keys = sort ? keys.sort(sort) : keys;
    }
    const encoded_prefix = encodeDotInKeys ? String(prefix).replace(/\./g, '%2E') : String(prefix);
    const adjusted_prefix =
      commaRoundTrip && $68e5fd8c1fe4e8a4$var$is_array(obj) && obj.length === 1
        ? encoded_prefix + '[]'
        : encoded_prefix;
    if (allowEmptyArrays && $68e5fd8c1fe4e8a4$var$is_array(obj) && obj.length === 0)
      return adjusted_prefix + '[]';
    for (let j = 0; j < obj_keys.length; ++j) {
      const key = obj_keys[j];
      const value = // @ts-ignore
        typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];
      if (skipNulls && value === null) continue;
      // @ts-ignore
      const encoded_key = allowDots && encodeDotInKeys ? key.replace(/\./g, '%2E') : key;
      const key_prefix = $68e5fd8c1fe4e8a4$var$is_array(obj)
        ? typeof generateArrayPrefix === 'function'
          ? generateArrayPrefix(adjusted_prefix, encoded_key)
          : adjusted_prefix
        : adjusted_prefix + (allowDots ? '.' + encoded_key : '[' + encoded_key + ']');
      sideChannel.set(object, step);
      const valueSideChannel = new WeakMap();
      valueSideChannel.set($68e5fd8c1fe4e8a4$var$sentinel, sideChannel);
      $68e5fd8c1fe4e8a4$var$push_to_array(
        values,
        $68e5fd8c1fe4e8a4$var$inner_stringify(
          value,
          key_prefix,
          generateArrayPrefix,
          commaRoundTrip,
          allowEmptyArrays,
          strictNullHandling,
          skipNulls,
          encodeDotInKeys, // @ts-ignore
          generateArrayPrefix === 'comma' && encodeValuesOnly && $68e5fd8c1fe4e8a4$var$is_array(obj)
            ? null
            : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel,
        ),
      );
    }
    return values;
  }
  function $68e5fd8c1fe4e8a4$var$normalize_stringify_options(
    opts = $68e5fd8c1fe4e8a4$var$defaults,
  ) {
    if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean')
      throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
    if (typeof opts.encodeDotInKeys !== 'undefined' && typeof opts.encodeDotInKeys !== 'boolean')
      throw new TypeError('`encodeDotInKeys` option can only be `true` or `false`, when provided');
    if (
      opts.encoder !== null &&
      typeof opts.encoder !== 'undefined' &&
      typeof opts.encoder !== 'function'
    )
      throw new TypeError('Encoder has to be a function.');
    const charset = opts.charset || $68e5fd8c1fe4e8a4$var$defaults.charset;
    if (
      typeof opts.charset !== 'undefined' &&
      opts.charset !== 'utf-8' &&
      opts.charset !== 'iso-8859-1'
    )
      throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    let format = $bgdqL.default_format;
    if (typeof opts.format !== 'undefined') {
      if (!$68e5fd8c1fe4e8a4$var$has.call($bgdqL.formatters, opts.format))
        throw new TypeError('Unknown format option provided.');
      format = opts.format;
    }
    const formatter = $bgdqL.formatters[format];
    let filter = $68e5fd8c1fe4e8a4$var$defaults.filter;
    if (typeof opts.filter === 'function' || $68e5fd8c1fe4e8a4$var$is_array(opts.filter))
      filter = opts.filter;
    let arrayFormat;
    if (opts.arrayFormat && opts.arrayFormat in $68e5fd8c1fe4e8a4$var$array_prefix_generators)
      arrayFormat = opts.arrayFormat;
    else if ('indices' in opts) arrayFormat = opts.indices ? 'indices' : 'repeat';
    else arrayFormat = $68e5fd8c1fe4e8a4$var$defaults.arrayFormat;
    if ('commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean')
      throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    const allowDots =
      typeof opts.allowDots === 'undefined'
        ? !!opts.encodeDotInKeys === true
          ? true
          : $68e5fd8c1fe4e8a4$var$defaults.allowDots
        : !!opts.allowDots;
    return {
      addQueryPrefix:
        typeof opts.addQueryPrefix === 'boolean'
          ? opts.addQueryPrefix
          : $68e5fd8c1fe4e8a4$var$defaults.addQueryPrefix,
      // @ts-ignore
      allowDots: allowDots,
      allowEmptyArrays:
        typeof opts.allowEmptyArrays === 'boolean'
          ? !!opts.allowEmptyArrays
          : $68e5fd8c1fe4e8a4$var$defaults.allowEmptyArrays,
      arrayFormat: arrayFormat,
      charset: charset,
      charsetSentinel:
        typeof opts.charsetSentinel === 'boolean'
          ? opts.charsetSentinel
          : $68e5fd8c1fe4e8a4$var$defaults.charsetSentinel,
      commaRoundTrip: !!opts.commaRoundTrip,
      delimiter:
        typeof opts.delimiter === 'undefined'
          ? $68e5fd8c1fe4e8a4$var$defaults.delimiter
          : opts.delimiter,
      encode:
        typeof opts.encode === 'boolean' ? opts.encode : $68e5fd8c1fe4e8a4$var$defaults.encode,
      encodeDotInKeys:
        typeof opts.encodeDotInKeys === 'boolean'
          ? opts.encodeDotInKeys
          : $68e5fd8c1fe4e8a4$var$defaults.encodeDotInKeys,
      encoder:
        typeof opts.encoder === 'function' ? opts.encoder : $68e5fd8c1fe4e8a4$var$defaults.encoder,
      encodeValuesOnly:
        typeof opts.encodeValuesOnly === 'boolean'
          ? opts.encodeValuesOnly
          : $68e5fd8c1fe4e8a4$var$defaults.encodeValuesOnly,
      filter: filter,
      format: format,
      formatter: formatter,
      serializeDate:
        typeof opts.serializeDate === 'function'
          ? opts.serializeDate
          : $68e5fd8c1fe4e8a4$var$defaults.serializeDate,
      skipNulls:
        typeof opts.skipNulls === 'boolean'
          ? opts.skipNulls
          : $68e5fd8c1fe4e8a4$var$defaults.skipNulls,
      // @ts-ignore
      sort: typeof opts.sort === 'function' ? opts.sort : null,
      strictNullHandling:
        typeof opts.strictNullHandling === 'boolean'
          ? opts.strictNullHandling
          : $68e5fd8c1fe4e8a4$var$defaults.strictNullHandling,
    };
  }
  function $68e5fd8c1fe4e8a4$var$stringify(object, opts = {}) {
    let obj = object;
    const options = $68e5fd8c1fe4e8a4$var$normalize_stringify_options(opts);
    let obj_keys;
    let filter;
    if (typeof options.filter === 'function') {
      filter = options.filter;
      obj = filter('', obj);
    } else if ($68e5fd8c1fe4e8a4$var$is_array(options.filter)) {
      filter = options.filter;
      obj_keys = filter;
    }
    const keys = [];
    if (typeof obj !== 'object' || obj === null) return '';
    const generateArrayPrefix = $68e5fd8c1fe4e8a4$var$array_prefix_generators[options.arrayFormat];
    const commaRoundTrip = generateArrayPrefix === 'comma' && options.commaRoundTrip;
    if (!obj_keys) obj_keys = Object.keys(obj);
    if (options.sort) obj_keys.sort(options.sort);
    const sideChannel = new WeakMap();
    for (let i = 0; i < obj_keys.length; ++i) {
      const key = obj_keys[i];
      if (options.skipNulls && obj[key] === null) continue;
      $68e5fd8c1fe4e8a4$var$push_to_array(
        keys,
        $68e5fd8c1fe4e8a4$var$inner_stringify(
          obj[key],
          key, // @ts-expect-error
          generateArrayPrefix,
          commaRoundTrip,
          options.allowEmptyArrays,
          options.strictNullHandling,
          options.skipNulls,
          options.encodeDotInKeys,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel,
        ),
      );
    }
    const joined = keys.join(options.delimiter);
    let prefix = options.addQueryPrefix === true ? '?' : '';
    if (options.charsetSentinel) {
      if (options.charset === 'iso-8859-1')
        // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
        prefix += 'utf8=%26%2310003%3B&';
      // encodeURIComponent('✓')
      else prefix += 'utf8=%E2%9C%93&';
    }
    return joined.length > 0 ? prefix + joined : '';
  }
  module.exports.stringify = $68e5fd8c1fe4e8a4$var$stringify;
});
parcelRegister('krGCk', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.maybe_map =
    module.exports.combine =
    module.exports.is_buffer =
    module.exports.is_regexp =
    module.exports.compact =
    module.exports.encode =
    module.exports.decode =
    module.exports.assign_single_source =
    module.exports.merge =
      void 0;

  var $bgdqL = parcelRequire('bgdqL');
  const $ee2763247a96beca$var$has = Object.prototype.hasOwnProperty;
  const $ee2763247a96beca$var$is_array = Array.isArray;
  const $ee2763247a96beca$var$hex_table = (() => {
    const array = [];
    for (let i = 0; i < 256; ++i)
      array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    return array;
  })();
  function $ee2763247a96beca$var$compact_queue(queue) {
    while (queue.length > 1) {
      const item = queue.pop();
      if (!item) continue;
      const obj = item.obj[item.prop];
      if ($ee2763247a96beca$var$is_array(obj)) {
        const compacted = [];
        for (let j = 0; j < obj.length; ++j)
          if (typeof obj[j] !== 'undefined') compacted.push(obj[j]);
        // @ts-ignore
        item.obj[item.prop] = compacted;
      }
    }
  }
  function $ee2763247a96beca$var$array_to_object(source, options) {
    const obj = options && options.plainObjects ? Object.create(null) : {};
    for (let i = 0; i < source.length; ++i)
      if (typeof source[i] !== 'undefined') obj[i] = source[i];
    return obj;
  }
  function $ee2763247a96beca$var$merge(target, source, options = {}) {
    if (!source) return target;
    if (typeof source !== 'object') {
      if ($ee2763247a96beca$var$is_array(target)) target.push(source);
      else if (target && typeof target === 'object') {
        if (
          (options && (options.plainObjects || options.allowPrototypes)) ||
          !$ee2763247a96beca$var$has.call(Object.prototype, source)
        )
          target[source] = true;
      } else return [target, source];
      return target;
    }
    if (!target || typeof target !== 'object') return [target].concat(source);
    let mergeTarget = target;
    if ($ee2763247a96beca$var$is_array(target) && !$ee2763247a96beca$var$is_array(source))
      // @ts-ignore
      mergeTarget = $ee2763247a96beca$var$array_to_object(target, options);
    if ($ee2763247a96beca$var$is_array(target) && $ee2763247a96beca$var$is_array(source)) {
      source.forEach(function (item, i) {
        if ($ee2763247a96beca$var$has.call(target, i)) {
          const targetItem = target[i];
          if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object')
            target[i] = $ee2763247a96beca$var$merge(targetItem, item, options);
          else target.push(item);
        } else target[i] = item;
      });
      return target;
    }
    return Object.keys(source).reduce(function (acc, key) {
      const value = source[key];
      if ($ee2763247a96beca$var$has.call(acc, key))
        acc[key] = $ee2763247a96beca$var$merge(acc[key], value, options);
      else acc[key] = value;
      return acc;
    }, mergeTarget);
  }
  module.exports.merge = $ee2763247a96beca$var$merge;
  function $ee2763247a96beca$var$assign_single_source(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
      acc[key] = source[key];
      return acc;
    }, target);
  }
  module.exports.assign_single_source = $ee2763247a96beca$var$assign_single_source;
  function $ee2763247a96beca$var$decode(str, _, charset) {
    const strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1')
      // unescape never throws, no try...catch needed:
      return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    // utf-8
    try {
      return decodeURIComponent(strWithoutPlus);
    } catch (e) {
      return strWithoutPlus;
    }
  }
  module.exports.decode = $ee2763247a96beca$var$decode;
  const $ee2763247a96beca$var$limit = 1024;
  const $ee2763247a96beca$var$encode = (str, _defaultEncoder, charset, _kind, format) => {
    // This code was originally written by Brian White for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) return str;
    let string = str;
    if (typeof str === 'symbol') string = Symbol.prototype.toString.call(str);
    else if (typeof str !== 'string') string = String(str);
    if (charset === 'iso-8859-1')
      return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
        return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
      });
    let out = '';
    for (let j = 0; j < string.length; j += $ee2763247a96beca$var$limit) {
      const segment =
        string.length >= $ee2763247a96beca$var$limit
          ? string.slice(j, j + $ee2763247a96beca$var$limit)
          : string;
      const arr = [];
      for (let i = 0; i < segment.length; ++i) {
        let c = segment.charCodeAt(i);
        if (
          c === 0x2d || // -
          c === 0x2e || // .
          c === 0x5f || // _
          c === 0x7e || // ~
          (c >= 0x30 && c <= 0x39) || // 0-9
          (c >= 0x41 && c <= 0x5a) || // a-z
          (c >= 0x61 && c <= 0x7a) || // A-Z
          (format === $bgdqL.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
          arr[arr.length] = segment.charAt(i);
          continue;
        }
        if (c < 0x80) {
          arr[arr.length] = $ee2763247a96beca$var$hex_table[c];
          continue;
        }
        if (c < 0x800) {
          arr[arr.length] =
            $ee2763247a96beca$var$hex_table[0xc0 | (c >> 6)] +
            $ee2763247a96beca$var$hex_table[0x80 | (c & 0x3f)];
          continue;
        }
        if (c < 0xd800 || c >= 0xe000) {
          arr[arr.length] =
            $ee2763247a96beca$var$hex_table[0xe0 | (c >> 12)] +
            $ee2763247a96beca$var$hex_table[0x80 | ((c >> 6) & 0x3f)] +
            $ee2763247a96beca$var$hex_table[0x80 | (c & 0x3f)];
          continue;
        }
        i += 1;
        c = 0x10000 + (((c & 0x3ff) << 10) | (segment.charCodeAt(i) & 0x3ff));
        arr[arr.length] =
          $ee2763247a96beca$var$hex_table[0xf0 | (c >> 18)] +
          $ee2763247a96beca$var$hex_table[0x80 | ((c >> 12) & 0x3f)] +
          $ee2763247a96beca$var$hex_table[0x80 | ((c >> 6) & 0x3f)] +
          $ee2763247a96beca$var$hex_table[0x80 | (c & 0x3f)];
      }
      out += arr.join('');
    }
    return out;
  };
  module.exports.encode = $ee2763247a96beca$var$encode;
  function $ee2763247a96beca$var$compact(value) {
    const queue = [
      {
        obj: {
          o: value,
        },
        prop: 'o',
      },
    ];
    const refs = [];
    for (let i = 0; i < queue.length; ++i) {
      const item = queue[i];
      // @ts-ignore
      const obj = item.obj[item.prop];
      const keys = Object.keys(obj);
      for (let j = 0; j < keys.length; ++j) {
        const key = keys[j];
        const val = obj[key];
        if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
          queue.push({
            obj: obj,
            prop: key,
          });
          refs.push(val);
        }
      }
    }
    $ee2763247a96beca$var$compact_queue(queue);
    return value;
  }
  module.exports.compact = $ee2763247a96beca$var$compact;
  function $ee2763247a96beca$var$is_regexp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
  }
  module.exports.is_regexp = $ee2763247a96beca$var$is_regexp;
  function $ee2763247a96beca$var$is_buffer(obj) {
    if (!obj || typeof obj !== 'object') return false;
    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  }
  module.exports.is_buffer = $ee2763247a96beca$var$is_buffer;
  function $ee2763247a96beca$var$combine(a, b) {
    return [].concat(a, b);
  }
  module.exports.combine = $ee2763247a96beca$var$combine;
  function $ee2763247a96beca$var$maybe_map(val, fn) {
    if ($ee2763247a96beca$var$is_array(val)) {
      const mapped = [];
      for (let i = 0; i < val.length; i += 1) mapped.push(fn(val[i]));
      return mapped;
    }
    return fn(val);
  }
  module.exports.maybe_map = $ee2763247a96beca$var$maybe_map;
});

parcelRegister('25F7z', function (module, exports) {
  'use strict';
  var $185bf234c27985d4$var$__classPrivateFieldSet =
    (module.exports && module.exports.__classPrivateFieldSet) ||
    function (receiver, state, value, kind, f) {
      if (kind === 'm') throw new TypeError('Private method is not writable');
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot write private member to an object whose class did not declare it',
        );
      return (
        kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
        value
      );
    };
  var $185bf234c27985d4$var$__classPrivateFieldGet =
    (module.exports && module.exports.__classPrivateFieldGet) ||
    function (receiver, state, kind, f) {
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it',
        );
      return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
  var $185bf234c27985d4$var$_AbstractPage_client;
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.isObj =
    module.exports.toBase64 =
    module.exports.getHeader =
    module.exports.getRequiredHeader =
    module.exports.isHeadersProtocol =
    module.exports.isRunningInBrowser =
    module.exports.debug =
    module.exports.hasOwn =
    module.exports.isEmptyObj =
    module.exports.maybeCoerceBoolean =
    module.exports.maybeCoerceFloat =
    module.exports.maybeCoerceInteger =
    module.exports.coerceBoolean =
    module.exports.coerceFloat =
    module.exports.coerceInteger =
    module.exports.readEnv =
    module.exports.ensurePresent =
    module.exports.castToError =
    module.exports.sleep =
    module.exports.safeJSON =
    module.exports.isRequestOptions =
    module.exports.createResponseHeaders =
    module.exports.PagePromise =
    module.exports.AbstractPage =
    module.exports.APIClient =
    module.exports.APIPromise =
    module.exports.createForm =
    module.exports.multipartFormRequestOptions =
    module.exports.maybeMultipartFormRequestOptions =
      void 0;

  var $9PP4R = parcelRequire('9PP4R');

  var $9zADT = parcelRequire('9zADT');

  var $eK9Mf = parcelRequire('eK9Mf');

  var $7fnIa = parcelRequire('7fnIa');

  var $lsd5d = parcelRequire('lsd5d');

  var $lsd5d = parcelRequire('lsd5d');
  Object.defineProperty(module.exports, 'maybeMultipartFormRequestOptions', {
    enumerable: true,
    get: function () {
      return $lsd5d.maybeMultipartFormRequestOptions;
    },
  });
  Object.defineProperty(module.exports, 'multipartFormRequestOptions', {
    enumerable: true,
    get: function () {
      return $lsd5d.multipartFormRequestOptions;
    },
  });
  Object.defineProperty(module.exports, 'createForm', {
    enumerable: true,
    get: function () {
      return $lsd5d.createForm;
    },
  });
  async function $185bf234c27985d4$var$defaultParseResponse(props) {
    const { response: response } = props;
    if (props.options.stream) {
      $185bf234c27985d4$var$debug(
        'response',
        response.status,
        response.url,
        response.headers,
        response.body,
      );
      // Note: there is an invariant here that isn't represented in the type system
      // that if you set `stream: true` the response type must also be `Stream<T>`
      if (props.options.__streamClass)
        return props.options.__streamClass.fromSSEResponse(response, props.controller);
      return $9zADT.Stream.fromSSEResponse(response, props.controller);
    }
    // fetch refuses to read the body when the status code is 204.
    if (response.status === 204) return null;
    if (props.options.__binaryResponse) return response;
    const contentType = response.headers.get('content-type');
    const isJSON =
      contentType?.includes('application/json') ||
      contentType?.includes('application/vnd.api+json');
    if (isJSON) {
      const json = await response.json();
      $185bf234c27985d4$var$debug(
        'response',
        response.status,
        response.url,
        response.headers,
        json,
      );
      return $185bf234c27985d4$var$_addRequestID(json, response);
    }
    const text = await response.text();
    $185bf234c27985d4$var$debug('response', response.status, response.url, response.headers, text);
    // TODO handle blob, arraybuffer, other content types, etc.
    return text;
  }
  function $185bf234c27985d4$var$_addRequestID(value, response) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return value;
    return Object.defineProperty(value, '_request_id', {
      value: response.headers.get('x-request-id'),
      enumerable: false,
    });
  }
  /**
   * A subclass of `Promise` providing additional helper methods
   * for interacting with the SDK.
   */ class $185bf234c27985d4$var$APIPromise extends Promise {
    constructor(responsePromise, parseResponse = $185bf234c27985d4$var$defaultParseResponse) {
      super((resolve) => {
        // this is maybe a bit weird but this has to be a no-op to not implicitly
        // parse the response body; instead .then, .catch, .finally are overridden
        // to parse the response
        resolve(null);
      });
      this.responsePromise = responsePromise;
      this.parseResponse = parseResponse;
    }
    _thenUnwrap(transform) {
      return new $185bf234c27985d4$var$APIPromise(this.responsePromise, async (props) =>
        $185bf234c27985d4$var$_addRequestID(
          transform(await this.parseResponse(props), props),
          props.response,
        ),
      );
    }
    /**
     * Gets the raw `Response` instance instead of parsing the response
     * data.
     *
     * If you want to parse the response body but still get the `Response`
     * instance, you can use {@link withResponse()}.
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` if you can,
     * or add one of these imports before your first `import … from 'openai'`:
     * - `import 'openai/shims/node'` (if you're running on Node)
     * - `import 'openai/shims/web'` (otherwise)
     */ asResponse() {
      return this.responsePromise.then((p) => p.response);
    }
    /**
     * Gets the parsed response data, the raw `Response` instance and the ID of the request,
     * returned via the X-Request-ID header which is useful for debugging requests and reporting
     * issues to OpenAI.
     *
     * If you just want to get the raw `Response` instance without parsing it,
     * you can use {@link asResponse()}.
     *
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` if you can,
     * or add one of these imports before your first `import … from 'openai'`:
     * - `import 'openai/shims/node'` (if you're running on Node)
     * - `import 'openai/shims/web'` (otherwise)
     */ async withResponse() {
      const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
      return {
        data: data,
        response: response,
        request_id: response.headers.get('x-request-id'),
      };
    }
    parse() {
      if (!this.parsedPromise) this.parsedPromise = this.responsePromise.then(this.parseResponse);
      return this.parsedPromise;
    }
    then(onfulfilled, onrejected) {
      return this.parse().then(onfulfilled, onrejected);
    }
    catch(onrejected) {
      return this.parse().catch(onrejected);
    }
    finally(onfinally) {
      return this.parse().finally(onfinally);
    }
  }
  module.exports.APIPromise = $185bf234c27985d4$var$APIPromise;
  class $185bf234c27985d4$var$APIClient {
    constructor({
      baseURL: baseURL,
      maxRetries: maxRetries = 2,
      timeout: timeout = 600000,
      httpAgent: httpAgent,
      fetch: overridenFetch,
    }) {
      this.baseURL = baseURL;
      this.maxRetries = $185bf234c27985d4$var$validatePositiveInteger('maxRetries', maxRetries);
      this.timeout = $185bf234c27985d4$var$validatePositiveInteger('timeout', timeout);
      this.httpAgent = httpAgent;
      this.fetch = overridenFetch ?? $7fnIa.fetch;
    }
    authHeaders(opts) {
      return {};
    }
    /**
     * Override this to add your own default headers, for example:
     *
     *  {
     *    ...super.defaultHeaders(),
     *    Authorization: 'Bearer 123',
     *  }
     */ defaultHeaders(opts) {
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': this.getUserAgent(),
        ...$185bf234c27985d4$var$getPlatformHeaders(),
        ...this.authHeaders(opts),
      };
    }
    /**
     * Override this to add your own headers validation:
     */ validateHeaders(headers, customHeaders) {}
    defaultIdempotencyKey() {
      return `stainless-node-retry-${$185bf234c27985d4$var$uuid4()}`;
    }
    get(path, opts) {
      return this.methodRequest('get', path, opts);
    }
    post(path, opts) {
      return this.methodRequest('post', path, opts);
    }
    patch(path, opts) {
      return this.methodRequest('patch', path, opts);
    }
    put(path, opts) {
      return this.methodRequest('put', path, opts);
    }
    delete(path, opts) {
      return this.methodRequest('delete', path, opts);
    }
    methodRequest(method, path, opts) {
      return this.request(
        Promise.resolve(opts).then(async (opts) => {
          const body =
            opts && (0, $lsd5d.isBlobLike)(opts?.body)
              ? new DataView(await opts.body.arrayBuffer())
              : opts?.body instanceof DataView
                ? opts.body
                : opts?.body instanceof ArrayBuffer
                  ? new DataView(opts.body)
                  : opts && ArrayBuffer.isView(opts?.body)
                    ? new DataView(opts.body.buffer)
                    : opts?.body;
          return {
            method: method,
            path: path,
            ...opts,
            body: body,
          };
        }),
      );
    }
    getAPIList(path, Page, opts) {
      return this.requestAPIList(Page, {
        method: 'get',
        path: path,
        ...opts,
      });
    }
    calculateContentLength(body) {
      if (typeof body === 'string') {
        if (typeof Buffer !== 'undefined') return Buffer.byteLength(body, 'utf8').toString();
        if (typeof TextEncoder !== 'undefined') {
          const encoder = new TextEncoder();
          const encoded = encoder.encode(body);
          return encoded.length.toString();
        }
      } else if (ArrayBuffer.isView(body)) return body.byteLength.toString();
      return null;
    }
    buildRequest(options, { retryCount: retryCount = 0 } = {}) {
      const { method: method, path: path, query: query, headers: headers = {} } = options;
      const body =
        ArrayBuffer.isView(options.body) ||
        (options.__binaryRequest && typeof options.body === 'string')
          ? options.body
          : (0, $lsd5d.isMultipartBody)(options.body)
            ? options.body.body
            : options.body
              ? JSON.stringify(options.body, null, 2)
              : null;
      const contentLength = this.calculateContentLength(body);
      const url = this.buildURL(path, query);
      if ('timeout' in options)
        $185bf234c27985d4$var$validatePositiveInteger('timeout', options.timeout);
      const timeout = options.timeout ?? this.timeout;
      const httpAgent = options.httpAgent ?? this.httpAgent ?? (0, $7fnIa.getDefaultAgent)(url);
      const minAgentTimeout = timeout + 1000;
      if (
        typeof httpAgent?.options?.timeout === 'number' &&
        minAgentTimeout > (httpAgent.options.timeout ?? 0)
      )
        // Allow any given request to bump our agent active socket timeout.
        // This may seem strange, but leaking active sockets should be rare and not particularly problematic,
        // and without mutating agent we would need to create more of them.
        // This tradeoff optimizes for performance.
        httpAgent.options.timeout = minAgentTimeout;
      if (this.idempotencyHeader && method !== 'get') {
        if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
        headers[this.idempotencyHeader] = options.idempotencyKey;
      }
      const reqHeaders = this.buildHeaders({
        options: options,
        headers: headers,
        contentLength: contentLength,
        retryCount: retryCount,
      });
      const req = {
        method: method,
        ...(body && {
          body: body,
        }),
        headers: reqHeaders,
        ...(httpAgent && {
          agent: httpAgent,
        }),
        // @ts-ignore node-fetch uses a custom AbortSignal type that is
        // not compatible with standard web types
        signal: options.signal ?? null,
      };
      return {
        req: req,
        url: url,
        timeout: timeout,
      };
    }
    buildHeaders({
      options: options,
      headers: headers,
      contentLength: contentLength,
      retryCount: retryCount,
    }) {
      const reqHeaders = {};
      if (contentLength) reqHeaders['content-length'] = contentLength;
      const defaultHeaders = this.defaultHeaders(options);
      $185bf234c27985d4$var$applyHeadersMut(reqHeaders, defaultHeaders);
      $185bf234c27985d4$var$applyHeadersMut(reqHeaders, headers);
      // let builtin fetch set the Content-Type for multipart bodies
      if ((0, $lsd5d.isMultipartBody)(options.body) && $7fnIa.kind !== 'node')
        delete reqHeaders['content-type'];
      // Don't set the retry count header if it was already set or removed through default headers or by the
      // caller. We check `defaultHeaders` and `headers`, which can contain nulls, instead of `reqHeaders` to
      // account for the removal case.
      if (
        (0, module.exports.getHeader)(defaultHeaders, 'x-stainless-retry-count') === undefined &&
        (0, module.exports.getHeader)(headers, 'x-stainless-retry-count') === undefined
      )
        reqHeaders['x-stainless-retry-count'] = String(retryCount);
      this.validateHeaders(reqHeaders, headers);
      return reqHeaders;
    }
    /**
     * Used as a callback for mutating the given `FinalRequestOptions` object.
     */ async prepareOptions(options) {}
    /**
     * Used as a callback for mutating the given `RequestInit` object.
     *
     * This is useful for cases where you want to add certain headers based off of
     * the request properties, e.g. `method` or `url`.
     */ async prepareRequest(request, { url: url, options: options }) {}
    parseHeaders(headers) {
      return !headers
        ? {}
        : Symbol.iterator in headers
          ? Object.fromEntries(Array.from(headers).map((header) => [...header]))
          : {
              ...headers,
            };
    }
    makeStatusError(status, error, message, headers) {
      return $eK9Mf.APIError.generate(status, error, message, headers);
    }
    request(options, remainingRetries = null) {
      return new $185bf234c27985d4$var$APIPromise(this.makeRequest(options, remainingRetries));
    }
    async makeRequest(optionsInput, retriesRemaining) {
      const options = await optionsInput;
      const maxRetries = options.maxRetries ?? this.maxRetries;
      if (retriesRemaining == null) retriesRemaining = maxRetries;
      await this.prepareOptions(options);
      const {
        req: req,
        url: url,
        timeout: timeout,
      } = this.buildRequest(options, {
        retryCount: maxRetries - retriesRemaining,
      });
      await this.prepareRequest(req, {
        url: url,
        options: options,
      });
      $185bf234c27985d4$var$debug('request', url, options, req.headers);
      if (options.signal?.aborted) throw new $eK9Mf.APIUserAbortError();
      const controller = new AbortController();
      const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(
        module.exports.castToError,
      );
      if (response instanceof Error) {
        if (options.signal?.aborted) throw new $eK9Mf.APIUserAbortError();
        if (retriesRemaining) return this.retryRequest(options, retriesRemaining);
        if (response.name === 'AbortError') throw new $eK9Mf.APIConnectionTimeoutError();
        throw new $eK9Mf.APIConnectionError({
          cause: response,
        });
      }
      const responseHeaders = (0, module.exports.createResponseHeaders)(response.headers);
      if (!response.ok) {
        if (retriesRemaining && this.shouldRetry(response)) {
          const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
          $185bf234c27985d4$var$debug(
            `response (error; ${retryMessage})`,
            response.status,
            url,
            responseHeaders,
          );
          return this.retryRequest(options, retriesRemaining, responseHeaders);
        }
        const errText = await response
          .text()
          .catch((e) => (0, module.exports.castToError)(e).message);
        const errJSON = (0, module.exports.safeJSON)(errText);
        const errMessage = errJSON ? undefined : errText;
        const retryMessage = retriesRemaining
          ? `(error; no more retries left)`
          : `(error; not retryable)`;
        $185bf234c27985d4$var$debug(
          `response (error; ${retryMessage})`,
          response.status,
          url,
          responseHeaders,
          errMessage,
        );
        const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
        throw err;
      }
      return {
        response: response,
        options: options,
        controller: controller,
      };
    }
    requestAPIList(Page, options) {
      const request = this.makeRequest(options, null);
      return new $185bf234c27985d4$var$PagePromise(this, request, Page);
    }
    buildURL(path, query) {
      const url = $185bf234c27985d4$var$isAbsoluteURL(path)
        ? new URL(path)
        : new URL(
            this.baseURL +
              (this.baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path),
          );
      const defaultQuery = this.defaultQuery();
      if (!$185bf234c27985d4$var$isEmptyObj(defaultQuery))
        query = {
          ...defaultQuery,
          ...query,
        };
      if (typeof query === 'object' && query && !Array.isArray(query))
        url.search = this.stringifyQuery(query);
      return url.toString();
    }
    stringifyQuery(query) {
      return Object.entries(query)
        .filter(([_, value]) => typeof value !== 'undefined')
        .map(([key, value]) => {
          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          if (value === null) return `${encodeURIComponent(key)}=`;
          throw new $eK9Mf.OpenAIError(
            `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
          );
        })
        .join('&');
    }
    async fetchWithTimeout(url, init, ms, controller) {
      const { signal: signal, ...options } = init || {};
      if (signal) signal.addEventListener('abort', () => controller.abort());
      const timeout = setTimeout(() => controller.abort(), ms);
      return this.getRequestClient() // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
        .fetch.call(undefined, url, {
          signal: controller.signal,
          ...options,
        })
        .finally(() => {
          clearTimeout(timeout);
        });
    }
    getRequestClient() {
      return {
        fetch: this.fetch,
      };
    }
    shouldRetry(response) {
      // Note this is not a standard header.
      const shouldRetryHeader = response.headers.get('x-should-retry');
      // If the server explicitly says whether or not to retry, obey.
      if (shouldRetryHeader === 'true') return true;
      if (shouldRetryHeader === 'false') return false;
      // Retry on request timeouts.
      if (response.status === 408) return true;
      // Retry on lock timeouts.
      if (response.status === 409) return true;
      // Retry on rate limits.
      if (response.status === 429) return true;
      // Retry internal errors.
      if (response.status >= 500) return true;
      return false;
    }
    async retryRequest(options, retriesRemaining, responseHeaders) {
      let timeoutMillis;
      // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
      const retryAfterMillisHeader = responseHeaders?.['retry-after-ms'];
      if (retryAfterMillisHeader) {
        const timeoutMs = parseFloat(retryAfterMillisHeader);
        if (!Number.isNaN(timeoutMs)) timeoutMillis = timeoutMs;
      }
      // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
      const retryAfterHeader = responseHeaders?.['retry-after'];
      if (retryAfterHeader && !timeoutMillis) {
        const timeoutSeconds = parseFloat(retryAfterHeader);
        if (!Number.isNaN(timeoutSeconds)) timeoutMillis = timeoutSeconds * 1000;
        else timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
      // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
      // just do what it says, but otherwise calculate a default
      if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60000)) {
        const maxRetries = options.maxRetries ?? this.maxRetries;
        timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
      }
      await (0, module.exports.sleep)(timeoutMillis);
      return this.makeRequest(options, retriesRemaining - 1);
    }
    calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
      const initialRetryDelay = 0.5;
      const maxRetryDelay = 8.0;
      const numRetries = maxRetries - retriesRemaining;
      // Apply exponential backoff, but not more than the max.
      const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
      // Apply some jitter, take up to at most 25 percent of the retry time.
      const jitter = 1 - Math.random() * 0.25;
      return sleepSeconds * jitter * 1000;
    }
    getUserAgent() {
      return `${this.constructor.name}/JS ${$9PP4R.VERSION}`;
    }
  }
  module.exports.APIClient = $185bf234c27985d4$var$APIClient;
  class $185bf234c27985d4$var$AbstractPage {
    constructor(client, response, body, options) {
      $185bf234c27985d4$var$_AbstractPage_client.set(this, void 0);
      $185bf234c27985d4$var$__classPrivateFieldSet(
        this,
        $185bf234c27985d4$var$_AbstractPage_client,
        client,
        'f',
      );
      this.options = options;
      this.response = response;
      this.body = body;
    }
    hasNextPage() {
      const items = this.getPaginatedItems();
      if (!items.length) return false;
      return this.nextPageInfo() != null;
    }
    async getNextPage() {
      const nextInfo = this.nextPageInfo();
      if (!nextInfo)
        throw new $eK9Mf.OpenAIError(
          'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
        );
      const nextOptions = {
        ...this.options,
      };
      if ('params' in nextInfo && typeof nextOptions.query === 'object')
        nextOptions.query = {
          ...nextOptions.query,
          ...nextInfo.params,
        };
      else if ('url' in nextInfo) {
        const params = [
          ...Object.entries(nextOptions.query || {}),
          ...nextInfo.url.searchParams.entries(),
        ];
        for (const [key, value] of params) nextInfo.url.searchParams.set(key, value);
        nextOptions.query = undefined;
        nextOptions.path = nextInfo.url.toString();
      }
      return await $185bf234c27985d4$var$__classPrivateFieldGet(
        this,
        $185bf234c27985d4$var$_AbstractPage_client,
        'f',
      ).requestAPIList(this.constructor, nextOptions);
    }
    async *iterPages() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let page = this;
      yield page;
      while (page.hasNextPage()) {
        page = await page.getNextPage();
        yield page;
      }
    }
    async *[(($185bf234c27985d4$var$_AbstractPage_client = new WeakMap()),
    Symbol.asyncIterator)]() {
      for await (const page of this.iterPages())
        for (const item of page.getPaginatedItems()) yield item;
    }
  }
  module.exports.AbstractPage = $185bf234c27985d4$var$AbstractPage;
  /**
   * This subclass of Promise will resolve to an instantiated Page once the request completes.
   *
   * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */ class $185bf234c27985d4$var$PagePromise extends $185bf234c27985d4$var$APIPromise {
    constructor(client, request, Page) {
      super(
        request,
        async (props) =>
          new Page(
            client,
            props.response,
            await $185bf234c27985d4$var$defaultParseResponse(props),
            props.options,
          ),
      );
    }
    /**
     * Allow auto-paginating iteration on an unawaited list call, eg:
     *
     *    for await (const item of client.items.list()) {
     *      console.log(item)
     *    }
     */ async *[Symbol.asyncIterator]() {
      const page = await this;
      for await (const item of page) yield item;
    }
  }
  module.exports.PagePromise = $185bf234c27985d4$var$PagePromise;
  const $185bf234c27985d4$var$createResponseHeaders = (headers) => {
    return new Proxy(
      Object.fromEntries(
        // @ts-ignore
        headers.entries(),
      ),
      {
        get(target, name) {
          const key = name.toString();
          return target[key.toLowerCase()] || target[key];
        },
      },
    );
  };
  module.exports.createResponseHeaders = $185bf234c27985d4$var$createResponseHeaders;
  // This is required so that we can determine if a given object matches the RequestOptions
  // type at runtime. While this requires duplication, it is enforced by the TypeScript
  // compiler such that any missing / extraneous keys will cause an error.
  const $185bf234c27985d4$var$requestOptionsKeys = {
    method: true,
    path: true,
    query: true,
    body: true,
    headers: true,
    maxRetries: true,
    stream: true,
    timeout: true,
    httpAgent: true,
    signal: true,
    idempotencyKey: true,
    __binaryRequest: true,
    __binaryResponse: true,
    __streamClass: true,
  };
  const $185bf234c27985d4$var$isRequestOptions = (obj) => {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      !$185bf234c27985d4$var$isEmptyObj(obj) &&
      Object.keys(obj).every((k) =>
        $185bf234c27985d4$var$hasOwn($185bf234c27985d4$var$requestOptionsKeys, k),
      )
    );
  };
  module.exports.isRequestOptions = $185bf234c27985d4$var$isRequestOptions;
  const $185bf234c27985d4$var$getPlatformProperties = () => {
    if (typeof Deno !== 'undefined' && Deno.build != null)
      return {
        'X-Stainless-Lang': 'js',
        'X-Stainless-Package-Version': $9PP4R.VERSION,
        'X-Stainless-OS': $185bf234c27985d4$var$normalizePlatform(Deno.build.os),
        'X-Stainless-Arch': $185bf234c27985d4$var$normalizeArch(Deno.build.arch),
        'X-Stainless-Runtime': 'deno',
        'X-Stainless-Runtime-Version':
          typeof Deno.version === 'string' ? Deno.version : (Deno.version?.deno ?? 'unknown'),
      };
    if (typeof EdgeRuntime !== 'undefined')
      return {
        'X-Stainless-Lang': 'js',
        'X-Stainless-Package-Version': $9PP4R.VERSION,
        'X-Stainless-OS': 'Unknown',
        'X-Stainless-Arch': `other:${EdgeRuntime}`,
        'X-Stainless-Runtime': 'edge',
        'X-Stainless-Runtime-Version': process.version,
      };
    // Check if Node.js
    if (
      Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) ===
      '[object process]'
    )
      return {
        'X-Stainless-Lang': 'js',
        'X-Stainless-Package-Version': $9PP4R.VERSION,
        'X-Stainless-OS': $185bf234c27985d4$var$normalizePlatform(process.platform),
        'X-Stainless-Arch': $185bf234c27985d4$var$normalizeArch(process.arch),
        'X-Stainless-Runtime': 'node',
        'X-Stainless-Runtime-Version': process.version,
      };
    const browserInfo = $185bf234c27985d4$var$getBrowserInfo();
    if (browserInfo)
      return {
        'X-Stainless-Lang': 'js',
        'X-Stainless-Package-Version': $9PP4R.VERSION,
        'X-Stainless-OS': 'Unknown',
        'X-Stainless-Arch': 'unknown',
        'X-Stainless-Runtime': `browser:${browserInfo.browser}`,
        'X-Stainless-Runtime-Version': browserInfo.version,
      };
    // TODO add support for Cloudflare workers, etc.
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': $9PP4R.VERSION,
      'X-Stainless-OS': 'Unknown',
      'X-Stainless-Arch': 'unknown',
      'X-Stainless-Runtime': 'unknown',
      'X-Stainless-Runtime-Version': 'unknown',
    };
  };
  // Note: modified from https://github.com/JS-DevTools/host-environment/blob/b1ab79ecde37db5d6e163c050e54fe7d287d7c92/src/isomorphic.browser.ts
  function $185bf234c27985d4$var$getBrowserInfo() {
    if (typeof navigator === 'undefined' || !navigator) return null;
    // NOTE: The order matters here!
    const browserPatterns = [
      {
        key: 'edge',
        pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
      },
      {
        key: 'ie',
        pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
      },
      {
        key: 'ie',
        pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/,
      },
      {
        key: 'chrome',
        pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
      },
      {
        key: 'firefox',
        pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
      },
      {
        key: 'safari',
        pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/,
      },
    ];
    // Find the FIRST matching browser
    for (const { key: key, pattern: pattern } of browserPatterns) {
      const match = pattern.exec(navigator.userAgent);
      if (match) {
        const major = match[1] || 0;
        const minor = match[2] || 0;
        const patch = match[3] || 0;
        return {
          browser: key,
          version: `${major}.${minor}.${patch}`,
        };
      }
    }
    return null;
  }
  const $185bf234c27985d4$var$normalizeArch = (arch) => {
    // Node docs:
    // - https://nodejs.org/api/process.html#processarch
    // Deno docs:
    // - https://doc.deno.land/deno/stable/~/Deno.build
    if (arch === 'x32') return 'x32';
    if (arch === 'x86_64' || arch === 'x64') return 'x64';
    if (arch === 'arm') return 'arm';
    if (arch === 'aarch64' || arch === 'arm64') return 'arm64';
    if (arch) return `other:${arch}`;
    return 'unknown';
  };
  const $185bf234c27985d4$var$normalizePlatform = (platform) => {
    // Node platforms:
    // - https://nodejs.org/api/process.html#processplatform
    // Deno platforms:
    // - https://doc.deno.land/deno/stable/~/Deno.build
    // - https://github.com/denoland/deno/issues/14799
    platform = platform.toLowerCase();
    // NOTE: this iOS check is untested and may not work
    // Node does not work natively on IOS, there is a fork at
    // https://github.com/nodejs-mobile/nodejs-mobile
    // however it is unknown at the time of writing how to detect if it is running
    if (platform.includes('ios')) return 'iOS';
    if (platform === 'android') return 'Android';
    if (platform === 'darwin') return 'MacOS';
    if (platform === 'win32') return 'Windows';
    if (platform === 'freebsd') return 'FreeBSD';
    if (platform === 'openbsd') return 'OpenBSD';
    if (platform === 'linux') return 'Linux';
    if (platform) return `Other:${platform}`;
    return 'Unknown';
  };
  let $185bf234c27985d4$var$_platformHeaders;
  const $185bf234c27985d4$var$getPlatformHeaders = () => {
    return (
      $185bf234c27985d4$var$_platformHeaders ??
      ($185bf234c27985d4$var$_platformHeaders = $185bf234c27985d4$var$getPlatformProperties())
    );
  };
  const $185bf234c27985d4$var$safeJSON = (text) => {
    try {
      return JSON.parse(text);
    } catch (err) {
      return undefined;
    }
  };
  module.exports.safeJSON = $185bf234c27985d4$var$safeJSON;
  // https://stackoverflow.com/a/19709846
  const $185bf234c27985d4$var$startsWithSchemeRegexp = new RegExp('^(?:[a-z]+:)?//', 'i');
  const $185bf234c27985d4$var$isAbsoluteURL = (url) => {
    return $185bf234c27985d4$var$startsWithSchemeRegexp.test(url);
  };
  const $185bf234c27985d4$var$sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  module.exports.sleep = $185bf234c27985d4$var$sleep;
  const $185bf234c27985d4$var$validatePositiveInteger = (name, n) => {
    if (typeof n !== 'number' || !Number.isInteger(n))
      throw new $eK9Mf.OpenAIError(`${name} must be an integer`);
    if (n < 0) throw new $eK9Mf.OpenAIError(`${name} must be a positive integer`);
    return n;
  };
  const $185bf234c27985d4$var$castToError = (err) => {
    if (err instanceof Error) return err;
    if (typeof err === 'object' && err !== null)
      try {
        return new Error(JSON.stringify(err));
      } catch {}
    return new Error(err);
  };
  module.exports.castToError = $185bf234c27985d4$var$castToError;
  const $185bf234c27985d4$var$ensurePresent = (value) => {
    if (value == null)
      throw new $eK9Mf.OpenAIError(`Expected a value to be given but received ${value} instead.`);
    return value;
  };
  module.exports.ensurePresent = $185bf234c27985d4$var$ensurePresent;
  /**
   * Read an environment variable.
   *
   * Trims beginning and trailing whitespace.
   *
   * Will return undefined if the environment variable doesn't exist or cannot be accessed.
   */ const $185bf234c27985d4$var$readEnv = (env) => {
    if (typeof process !== 'undefined') return process.env?.[env]?.trim() ?? undefined;
    if (typeof Deno !== 'undefined') return Deno.env?.get?.(env)?.trim();
    return undefined;
  };
  module.exports.readEnv = $185bf234c27985d4$var$readEnv;
  const $185bf234c27985d4$var$coerceInteger = (value) => {
    if (typeof value === 'number') return Math.round(value);
    if (typeof value === 'string') return parseInt(value, 10);
    throw new $eK9Mf.OpenAIError(`Could not coerce ${value} (type: ${typeof value}) into a number`);
  };
  module.exports.coerceInteger = $185bf234c27985d4$var$coerceInteger;
  const $185bf234c27985d4$var$coerceFloat = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value);
    throw new $eK9Mf.OpenAIError(`Could not coerce ${value} (type: ${typeof value}) into a number`);
  };
  module.exports.coerceFloat = $185bf234c27985d4$var$coerceFloat;
  const $185bf234c27985d4$var$coerceBoolean = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true';
    return Boolean(value);
  };
  module.exports.coerceBoolean = $185bf234c27985d4$var$coerceBoolean;
  const $185bf234c27985d4$var$maybeCoerceInteger = (value) => {
    if (value === undefined) return undefined;
    return (0, module.exports.coerceInteger)(value);
  };
  module.exports.maybeCoerceInteger = $185bf234c27985d4$var$maybeCoerceInteger;
  const $185bf234c27985d4$var$maybeCoerceFloat = (value) => {
    if (value === undefined) return undefined;
    return (0, module.exports.coerceFloat)(value);
  };
  module.exports.maybeCoerceFloat = $185bf234c27985d4$var$maybeCoerceFloat;
  const $185bf234c27985d4$var$maybeCoerceBoolean = (value) => {
    if (value === undefined) return undefined;
    return (0, module.exports.coerceBoolean)(value);
  };
  module.exports.maybeCoerceBoolean = $185bf234c27985d4$var$maybeCoerceBoolean;
  // https://stackoverflow.com/a/34491287
  function $185bf234c27985d4$var$isEmptyObj(obj) {
    if (!obj) return true;
    for (const _k in obj) return false;
    return true;
  }
  module.exports.isEmptyObj = $185bf234c27985d4$var$isEmptyObj;
  // https://eslint.org/docs/latest/rules/no-prototype-builtins
  function $185bf234c27985d4$var$hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  module.exports.hasOwn = $185bf234c27985d4$var$hasOwn;
  /**
   * Copies headers from "newHeaders" onto "targetHeaders",
   * using lower-case for all properties,
   * ignoring any keys with undefined values,
   * and deleting any keys with null values.
   */ function $185bf234c27985d4$var$applyHeadersMut(targetHeaders, newHeaders) {
    for (const k in newHeaders) {
      if (!$185bf234c27985d4$var$hasOwn(newHeaders, k)) continue;
      const lowerKey = k.toLowerCase();
      if (!lowerKey) continue;
      const val = newHeaders[k];
      if (val === null) delete targetHeaders[lowerKey];
      else if (val !== undefined) targetHeaders[lowerKey] = val;
    }
  }
  function $185bf234c27985d4$var$debug(action, ...args) {
    if (typeof process !== 'undefined' && process?.env?.['DEBUG'] === 'true')
      console.log(`OpenAI:DEBUG:${action}`, ...args);
  }
  module.exports.debug = $185bf234c27985d4$var$debug;
  /**
   * https://stackoverflow.com/a/2117523
   */ const $185bf234c27985d4$var$uuid4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const $185bf234c27985d4$var$isRunningInBrowser = () => {
    return (
      // @ts-ignore
      typeof window !== 'undefined' && // @ts-ignore
      typeof window.document !== 'undefined' && // @ts-ignore
      typeof navigator !== 'undefined'
    );
  };
  module.exports.isRunningInBrowser = $185bf234c27985d4$var$isRunningInBrowser;
  const $185bf234c27985d4$var$isHeadersProtocol = (headers) => {
    return typeof headers?.get === 'function';
  };
  module.exports.isHeadersProtocol = $185bf234c27985d4$var$isHeadersProtocol;
  const $185bf234c27985d4$var$getRequiredHeader = (headers, header) => {
    const foundHeader = (0, module.exports.getHeader)(headers, header);
    if (foundHeader === undefined) throw new Error(`Could not find ${header} header`);
    return foundHeader;
  };
  module.exports.getRequiredHeader = $185bf234c27985d4$var$getRequiredHeader;
  const $185bf234c27985d4$var$getHeader = (headers, header) => {
    const lowerCasedHeader = header.toLowerCase();
    if ((0, module.exports.isHeadersProtocol)(headers)) {
      // to deal with the case where the header looks like Stainless-Event-Id
      const intercapsHeader =
        header[0]?.toUpperCase() +
        header.substring(1).replace(/([^\w])(\w)/g, (_m, g1, g2) => g1 + g2.toUpperCase());
      for (const key of [header, lowerCasedHeader, header.toUpperCase(), intercapsHeader]) {
        const value = headers.get(key);
        if (value) return value;
      }
    }
    for (const [key, value] of Object.entries(headers))
      if (key.toLowerCase() === lowerCasedHeader) {
        if (Array.isArray(value)) {
          if (value.length <= 1) return value[0];
          console.warn(
            `Received ${value.length} entries for the ${header} header, using the first entry.`,
          );
          return value[0];
        }
        return value;
      }
    return undefined;
  };
  module.exports.getHeader = $185bf234c27985d4$var$getHeader;
  /**
   * Encodes a string to Base64 format.
   */ const $185bf234c27985d4$var$toBase64 = (str) => {
    if (!str) return '';
    if (typeof Buffer !== 'undefined') return Buffer.from(str).toString('base64');
    if (typeof btoa !== 'undefined') return btoa(str);
    throw new $eK9Mf.OpenAIError(
      'Cannot generate b64 string; Expected `Buffer` or `btoa` to be defined',
    );
  };
  module.exports.toBase64 = $185bf234c27985d4$var$toBase64;
  function $185bf234c27985d4$var$isObj(obj) {
    return obj != null && typeof obj === 'object' && !Array.isArray(obj);
  }
  module.exports.isObj = $185bf234c27985d4$var$isObj;
});
parcelRegister('9PP4R', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.VERSION = void 0;
  module.exports.VERSION = '4.71.1'; // x-release-please-version
});

parcelRegister('9zADT', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.readableStreamAsyncIterable =
    module.exports._decodeChunks =
    module.exports._iterSSEMessages =
    module.exports.Stream =
      void 0;

  var $7fnIa = parcelRequire('7fnIa');

  var $eK9Mf = parcelRequire('eK9Mf');

  var $lhBrP = parcelRequire('lhBrP');

  var $eK9Mf = parcelRequire('eK9Mf');
  class $6f83ce5c32768f8f$var$Stream {
    constructor(iterator, controller) {
      this.iterator = iterator;
      this.controller = controller;
    }
    static fromSSEResponse(response, controller) {
      let consumed = false;
      async function* iterator() {
        if (consumed)
          throw new Error(
            'Cannot iterate over a consumed stream, use `.tee()` to split the stream.',
          );
        consumed = true;
        let done = false;
        try {
          for await (const sse of $6f83ce5c32768f8f$var$_iterSSEMessages(response, controller)) {
            if (done) continue;
            if (sse.data.startsWith('[DONE]')) {
              done = true;
              continue;
            }
            if (sse.event === null) {
              let data;
              try {
                data = JSON.parse(sse.data);
              } catch (e) {
                console.error(`Could not parse message into JSON:`, sse.data);
                console.error(`From chunk:`, sse.raw);
                throw e;
              }
              if (data && data.error)
                throw new $eK9Mf.APIError(undefined, data.error, undefined, undefined);
              yield data;
            } else {
              let data;
              try {
                data = JSON.parse(sse.data);
              } catch (e) {
                console.error(`Could not parse message into JSON:`, sse.data);
                console.error(`From chunk:`, sse.raw);
                throw e;
              }
              // TODO: Is this where the error should be thrown?
              if (sse.event == 'error')
                throw new $eK9Mf.APIError(undefined, data.error, data.message, undefined);
              yield {
                event: sse.event,
                data: data,
              };
            }
          }
          done = true;
        } catch (e) {
          // If the user calls `stream.controller.abort()`, we should exit without throwing.
          if (e instanceof Error && e.name === 'AbortError') return;
          throw e;
        } finally {
          // If the user `break`s, abort the ongoing request.
          if (!done) controller.abort();
        }
      }
      return new $6f83ce5c32768f8f$var$Stream(iterator, controller);
    }
    /**
     * Generates a Stream from a newline-separated ReadableStream
     * where each item is a JSON value.
     */ static fromReadableStream(readableStream, controller) {
      let consumed = false;
      async function* iterLines() {
        const lineDecoder = new $lhBrP.LineDecoder();
        const iter = $6f83ce5c32768f8f$var$readableStreamAsyncIterable(readableStream);
        for await (const chunk of iter) for (const line of lineDecoder.decode(chunk)) yield line;
        for (const line of lineDecoder.flush()) yield line;
      }
      async function* iterator() {
        if (consumed)
          throw new Error(
            'Cannot iterate over a consumed stream, use `.tee()` to split the stream.',
          );
        consumed = true;
        let done = false;
        try {
          for await (const line of iterLines()) {
            if (done) continue;
            if (line) yield JSON.parse(line);
          }
          done = true;
        } catch (e) {
          // If the user calls `stream.controller.abort()`, we should exit without throwing.
          if (e instanceof Error && e.name === 'AbortError') return;
          throw e;
        } finally {
          // If the user `break`s, abort the ongoing request.
          if (!done) controller.abort();
        }
      }
      return new $6f83ce5c32768f8f$var$Stream(iterator, controller);
    }
    [Symbol.asyncIterator]() {
      return this.iterator();
    }
    /**
     * Splits the stream into two streams which can be
     * independently read from at different speeds.
     */ tee() {
      const left = [];
      const right = [];
      const iterator = this.iterator();
      const teeIterator = (queue) => {
        return {
          next: () => {
            if (queue.length === 0) {
              const result = iterator.next();
              left.push(result);
              right.push(result);
            }
            return queue.shift();
          },
        };
      };
      return [
        new $6f83ce5c32768f8f$var$Stream(() => teeIterator(left), this.controller),
        new $6f83ce5c32768f8f$var$Stream(() => teeIterator(right), this.controller),
      ];
    }
    /**
     * Converts this stream to a newline-separated ReadableStream of
     * JSON stringified values in the stream
     * which can be turned back into a Stream with `Stream.fromReadableStream()`.
     */ toReadableStream() {
      const self = this;
      let iter;
      const encoder = new TextEncoder();
      return new $7fnIa.ReadableStream({
        async start() {
          iter = self[Symbol.asyncIterator]();
        },
        async pull(ctrl) {
          try {
            const { value: value, done: done } = await iter.next();
            if (done) return ctrl.close();
            const bytes = encoder.encode(JSON.stringify(value) + '\n');
            ctrl.enqueue(bytes);
          } catch (err) {
            ctrl.error(err);
          }
        },
        async cancel() {
          await iter.return?.();
        },
      });
    }
  }
  module.exports.Stream = $6f83ce5c32768f8f$var$Stream;
  async function* $6f83ce5c32768f8f$var$_iterSSEMessages(response, controller) {
    if (!response.body) {
      controller.abort();
      throw new $eK9Mf.OpenAIError(`Attempted to iterate over a response with no body`);
    }
    const sseDecoder = new $6f83ce5c32768f8f$var$SSEDecoder();
    const lineDecoder = new $lhBrP.LineDecoder();
    const iter = $6f83ce5c32768f8f$var$readableStreamAsyncIterable(response.body);
    for await (const sseChunk of $6f83ce5c32768f8f$var$iterSSEChunks(iter))
      for (const line of lineDecoder.decode(sseChunk)) {
        const sse = sseDecoder.decode(line);
        if (sse) yield sse;
      }
    for (const line of lineDecoder.flush()) {
      const sse = sseDecoder.decode(line);
      if (sse) yield sse;
    }
  }
  module.exports._iterSSEMessages = $6f83ce5c32768f8f$var$_iterSSEMessages;
  /**
   * Given an async iterable iterator, iterates over it and yields full
   * SSE chunks, i.e. yields when a double new-line is encountered.
   */ async function* $6f83ce5c32768f8f$var$iterSSEChunks(iterator) {
    let data = new Uint8Array();
    for await (const chunk of iterator) {
      if (chunk == null) continue;
      const binaryChunk =
        chunk instanceof ArrayBuffer
          ? new Uint8Array(chunk)
          : typeof chunk === 'string'
            ? new TextEncoder().encode(chunk)
            : chunk;
      let newData = new Uint8Array(data.length + binaryChunk.length);
      newData.set(data);
      newData.set(binaryChunk, data.length);
      data = newData;
      let patternIndex;
      while ((patternIndex = $6f83ce5c32768f8f$var$findDoubleNewlineIndex(data)) !== -1) {
        yield data.slice(0, patternIndex);
        data = data.slice(patternIndex);
      }
    }
    if (data.length > 0) yield data;
  }
  function $6f83ce5c32768f8f$var$findDoubleNewlineIndex(buffer) {
    // This function searches the buffer for the end patterns (\r\r, \n\n, \r\n\r\n)
    // and returns the index right after the first occurrence of any pattern,
    // or -1 if none of the patterns are found.
    const newline = 0x0a; // \n
    const carriage = 0x0d; // \r
    for (let i = 0; i < buffer.length - 2; i++) {
      if (buffer[i] === newline && buffer[i + 1] === newline)
        // \n\n
        return i + 2;
      if (buffer[i] === carriage && buffer[i + 1] === carriage)
        // \r\r
        return i + 2;
      if (
        buffer[i] === carriage &&
        buffer[i + 1] === newline &&
        i + 3 < buffer.length &&
        buffer[i + 2] === carriage &&
        buffer[i + 3] === newline
      )
        // \r\n\r\n
        return i + 4;
    }
    return -1;
  }
  class $6f83ce5c32768f8f$var$SSEDecoder {
    constructor() {
      this.event = null;
      this.data = [];
      this.chunks = [];
    }
    decode(line) {
      if (line.endsWith('\r')) line = line.substring(0, line.length - 1);
      if (!line) {
        // empty line and we didn't previously encounter any messages
        if (!this.event && !this.data.length) return null;
        const sse = {
          event: this.event,
          data: this.data.join('\n'),
          raw: this.chunks,
        };
        this.event = null;
        this.data = [];
        this.chunks = [];
        return sse;
      }
      this.chunks.push(line);
      if (line.startsWith(':')) return null;
      let [fieldname, _, value] = $6f83ce5c32768f8f$var$partition(line, ':');
      if (value.startsWith(' ')) value = value.substring(1);
      if (fieldname === 'event') this.event = value;
      else if (fieldname === 'data') this.data.push(value);
      return null;
    }
  }
  /** This is an internal helper function that's just used for testing */ function $6f83ce5c32768f8f$var$_decodeChunks(
    chunks,
  ) {
    const decoder = new $lhBrP.LineDecoder();
    const lines = [];
    for (const chunk of chunks) lines.push(...decoder.decode(chunk));
    return lines;
  }
  module.exports._decodeChunks = $6f83ce5c32768f8f$var$_decodeChunks;
  function $6f83ce5c32768f8f$var$partition(str, delimiter) {
    const index = str.indexOf(delimiter);
    if (index !== -1)
      return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
    return [str, '', ''];
  }
  /**
   * Most browsers don't yet have async iterable support for ReadableStream,
   * and Node has a very different way of reading bytes from its "ReadableStream".
   *
   * This polyfill was pulled from https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
   */ function $6f83ce5c32768f8f$var$readableStreamAsyncIterable(stream) {
    if (stream[Symbol.asyncIterator]) return stream;
    const reader = stream.getReader();
    return {
      async next() {
        try {
          const result = await reader.read();
          if (result?.done) reader.releaseLock(); // release lock when stream becomes closed
          return result;
        } catch (e) {
          reader.releaseLock(); // release lock when stream becomes errored
          throw e;
        }
      },
      async return() {
        const cancelPromise = reader.cancel();
        reader.releaseLock();
        await cancelPromise;
        return {
          done: true,
          value: undefined,
        };
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };
  }
  module.exports.readableStreamAsyncIterable = $6f83ce5c32768f8f$var$readableStreamAsyncIterable;
});
parcelRegister('7fnIa', function (module, exports) {
  /**
   * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
   */
  var $fqfNJ = parcelRequire('fqfNJ');

  var $ecrQB = parcelRequire('ecrQB');
  if (!$fqfNJ.kind)
    $fqfNJ.setShims($ecrQB.getRuntime(), {
      auto: true,
    });
  for (const property of Object.keys($fqfNJ))
    Object.defineProperty(module.exports, property, {
      get() {
        return $fqfNJ[property];
      },
    });
});
parcelRegister('fqfNJ', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.setShims =
    module.exports.isFsReadStream =
    module.exports.fileFromPath =
    module.exports.getDefaultAgent =
    module.exports.getMultipartRequestOptions =
    module.exports.ReadableStream =
    module.exports.File =
    module.exports.Blob =
    module.exports.FormData =
    module.exports.Headers =
    module.exports.Response =
    module.exports.Request =
    module.exports.fetch =
    module.exports.kind =
    module.exports.auto =
      void 0;
  module.exports.auto = false;
  module.exports.kind = undefined;
  module.exports.fetch = undefined;
  module.exports.Request = undefined;
  module.exports.Response = undefined;
  module.exports.Headers = undefined;
  module.exports.FormData = undefined;
  module.exports.Blob = undefined;
  module.exports.File = undefined;
  module.exports.ReadableStream = undefined;
  module.exports.getMultipartRequestOptions = undefined;
  module.exports.getDefaultAgent = undefined;
  module.exports.fileFromPath = undefined;
  module.exports.isFsReadStream = undefined;
  function $b3a58a79e1c7ffbc$var$setShims(
    shims,
    options = {
      auto: false,
    },
  ) {
    if (module.exports.auto)
      throw new Error(
        `you must \`import 'openai/shims/${shims.kind}'\` before importing anything else from openai`,
      );
    if (module.exports.kind)
      throw new Error(
        `can't \`import 'openai/shims/${shims.kind}'\` after \`import 'openai/shims/${module.exports.kind}'\``,
      );
    module.exports.auto = options.auto;
    module.exports.kind = shims.kind;
    module.exports.fetch = shims.fetch;
    module.exports.Request = shims.Request;
    module.exports.Response = shims.Response;
    module.exports.Headers = shims.Headers;
    module.exports.FormData = shims.FormData;
    module.exports.Blob = shims.Blob;
    module.exports.File = shims.File;
    module.exports.ReadableStream = shims.ReadableStream;
    module.exports.getMultipartRequestOptions = shims.getMultipartRequestOptions;
    module.exports.getDefaultAgent = shims.getDefaultAgent;
    module.exports.fileFromPath = shims.fileFromPath;
    module.exports.isFsReadStream = shims.isFsReadStream;
  }
  module.exports.setShims = $b3a58a79e1c7ffbc$var$setShims;
});

parcelRegister('ecrQB', function (module, exports) {
  'use strict';
  var $a567c997d0b8668f$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $a567c997d0b8668f$var$__exportStar =
    (module.exports && module.exports.__exportStar) ||
    function (m, exports1) {
      for (var p in m)
        if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports1, p))
          $a567c997d0b8668f$var$__createBinding(exports1, m, p);
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });

  /**
   * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
   */ $a567c997d0b8668f$var$__exportStar(parcelRequire('6betI'), module.exports);
});
parcelRegister('6betI', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.getRuntime = void 0;

  var $e6lUK = parcelRequire('e6lUK');
  function $47ff003da4306c83$var$getRuntime({ manuallyImported: manuallyImported } = {}) {
    const recommendation = manuallyImported
      ? `You may need to use polyfills`
      : `Add one of these imports before your first \`import \u{2026} from 'openai'\`:
- \`import 'openai/shims/node'\` (if you're running on Node)
- \`import 'openai/shims/web'\` (otherwise)
`;
    let _fetch, _Request, _Response, _Headers;
    try {
      // @ts-ignore
      _fetch = fetch;
      // @ts-ignore
      _Request = Request;
      // @ts-ignore
      _Response = Response;
      // @ts-ignore
      _Headers = Headers;
    } catch (error) {
      throw new Error(
        `this environment is missing the following Web Fetch API type: ${error.message}. ${recommendation}`,
      );
    }
    return {
      kind: 'web',
      fetch: _fetch,
      Request: _Request,
      Response: _Response,
      Headers: _Headers,
      // @ts-ignore
      FormData:
        typeof FormData !== 'undefined'
          ? FormData
          : class FormData1 {
              // @ts-ignore
              constructor() {
                throw new Error(
                  `file uploads aren't supported in this environment yet as 'FormData' is undefined. ${recommendation}`,
                );
              }
            },
      Blob:
        typeof Blob !== 'undefined'
          ? Blob
          : class Blob1 {
              constructor() {
                throw new Error(
                  `file uploads aren't supported in this environment yet as 'Blob' is undefined. ${recommendation}`,
                );
              }
            },
      // @ts-ignore
      File:
        typeof File !== 'undefined'
          ? File
          : class File1 {
              // @ts-ignore
              constructor() {
                throw new Error(
                  `file uploads aren't supported in this environment yet as 'File' is undefined. ${recommendation}`,
                );
              }
            },
      // @ts-ignore
      ReadableStream:
        typeof ReadableStream !== 'undefined'
          ? ReadableStream
          : class ReadableStream1 {
              // @ts-ignore
              constructor() {
                throw new Error(
                  `streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${recommendation}`,
                );
              }
            },
      getMultipartRequestOptions: async (
        // @ts-ignore
        form,
        opts,
      ) => ({
        ...opts,
        body: new $e6lUK.MultipartBody(form),
      }),
      getDefaultAgent: (url) => undefined,
      fileFromPath: () => {
        throw new Error(
          'The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads',
        );
      },
      isFsReadStream: (value) => false,
    };
  }
  module.exports.getRuntime = $47ff003da4306c83$var$getRuntime;
});
parcelRegister('e6lUK', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.MultipartBody = void 0;
  /**
   * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
   */ class $a4429ff71d2d9431$var$MultipartBody {
    constructor(body) {
      this.body = body;
    }
    get [Symbol.toStringTag]() {
      return 'MultipartBody';
    }
  }
  module.exports.MultipartBody = $a4429ff71d2d9431$var$MultipartBody;
});

parcelRegister('eK9Mf', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.ContentFilterFinishReasonError =
    module.exports.LengthFinishReasonError =
    module.exports.InternalServerError =
    module.exports.RateLimitError =
    module.exports.UnprocessableEntityError =
    module.exports.ConflictError =
    module.exports.NotFoundError =
    module.exports.PermissionDeniedError =
    module.exports.AuthenticationError =
    module.exports.BadRequestError =
    module.exports.APIConnectionTimeoutError =
    module.exports.APIConnectionError =
    module.exports.APIUserAbortError =
    module.exports.APIError =
    module.exports.OpenAIError =
      void 0;

  var $25F7z = parcelRequire('25F7z');
  class $abbcf21fd6ad6572$var$OpenAIError extends Error {}
  module.exports.OpenAIError = $abbcf21fd6ad6572$var$OpenAIError;
  class $abbcf21fd6ad6572$var$APIError extends $abbcf21fd6ad6572$var$OpenAIError {
    constructor(status, error, message, headers) {
      super(`${$abbcf21fd6ad6572$var$APIError.makeMessage(status, error, message)}`);
      this.status = status;
      this.headers = headers;
      this.request_id = headers?.['x-request-id'];
      const data = error;
      this.error = data;
      this.code = data?.['code'];
      this.param = data?.['param'];
      this.type = data?.['type'];
    }
    static makeMessage(status, error, message) {
      const msg = error?.message
        ? typeof error.message === 'string'
          ? error.message
          : JSON.stringify(error.message)
        : error
          ? JSON.stringify(error)
          : message;
      if (status && msg) return `${status} ${msg}`;
      if (status) return `${status} status code (no body)`;
      if (msg) return msg;
      return '(no status code or body)';
    }
    static generate(status, errorResponse, message, headers) {
      if (!status)
        return new $abbcf21fd6ad6572$var$APIConnectionError({
          message: message,
          cause: (0, $25F7z.castToError)(errorResponse),
        });
      const error = errorResponse?.['error'];
      if (status === 400)
        return new $abbcf21fd6ad6572$var$BadRequestError(status, error, message, headers);
      if (status === 401)
        return new $abbcf21fd6ad6572$var$AuthenticationError(status, error, message, headers);
      if (status === 403)
        return new $abbcf21fd6ad6572$var$PermissionDeniedError(status, error, message, headers);
      if (status === 404)
        return new $abbcf21fd6ad6572$var$NotFoundError(status, error, message, headers);
      if (status === 409)
        return new $abbcf21fd6ad6572$var$ConflictError(status, error, message, headers);
      if (status === 422)
        return new $abbcf21fd6ad6572$var$UnprocessableEntityError(status, error, message, headers);
      if (status === 429)
        return new $abbcf21fd6ad6572$var$RateLimitError(status, error, message, headers);
      if (status >= 500)
        return new $abbcf21fd6ad6572$var$InternalServerError(status, error, message, headers);
      return new $abbcf21fd6ad6572$var$APIError(status, error, message, headers);
    }
  }
  module.exports.APIError = $abbcf21fd6ad6572$var$APIError;
  class $abbcf21fd6ad6572$var$APIUserAbortError extends $abbcf21fd6ad6572$var$APIError {
    constructor({ message: message } = {}) {
      super(undefined, undefined, message || 'Request was aborted.', undefined);
      this.status = undefined;
    }
  }
  module.exports.APIUserAbortError = $abbcf21fd6ad6572$var$APIUserAbortError;
  class $abbcf21fd6ad6572$var$APIConnectionError extends $abbcf21fd6ad6572$var$APIError {
    constructor({ message: message, cause: cause }) {
      super(undefined, undefined, message || 'Connection error.', undefined);
      this.status = undefined;
      // in some environments the 'cause' property is already declared
      // @ts-ignore
      if (cause) this.cause = cause;
    }
  }
  module.exports.APIConnectionError = $abbcf21fd6ad6572$var$APIConnectionError;
  class $abbcf21fd6ad6572$var$APIConnectionTimeoutError extends $abbcf21fd6ad6572$var$APIConnectionError {
    constructor({ message: message } = {}) {
      super({
        message: message ?? 'Request timed out.',
      });
    }
  }
  module.exports.APIConnectionTimeoutError = $abbcf21fd6ad6572$var$APIConnectionTimeoutError;
  class $abbcf21fd6ad6572$var$BadRequestError extends $abbcf21fd6ad6572$var$APIError {
    constructor() {
      super(...arguments);
      this.status = 400;
    }
  }
  module.exports.BadRequestError = $abbcf21fd6ad6572$var$BadRequestError;
  class $abbcf21fd6ad6572$var$AuthenticationError extends $abbcf21fd6ad6572$var$APIError {
    constructor() {
      super(...arguments);
      this.status = 401;
    }
  }
  module.exports.AuthenticationError = $abbcf21fd6ad6572$var$AuthenticationError;
  class $abbcf21fd6ad6572$var$PermissionDeniedError extends $abbcf21fd6ad6572$var$APIError {
    constructor() {
      super(...arguments);
      this.status = 403;
    }
  }
  module.exports.PermissionDeniedError = $abbcf21fd6ad6572$var$PermissionDeniedError;
  class $abbcf21fd6ad6572$var$NotFoundError extends $abbcf21fd6ad6572$var$APIError {
    constructor() {
      super(...arguments);
      this.status = 404;
    }
  }
  module.exports.NotFoundError = $abbcf21fd6ad6572$var$NotFoundError;
  class $abbcf21fd6ad6572$var$ConflictError extends $abbcf21fd6ad6572$var$APIError {
    constructor() {
      super(...arguments);
      this.status = 409;
    }
  }
  module.exports.ConflictError = $abbcf21fd6ad6572$var$ConflictError;
  class $abbcf21fd6ad6572$var$UnprocessableEntityError extends $abbcf21fd6ad6572$var$APIError {
    constructor() {
      super(...arguments);
      this.status = 422;
    }
  }
  module.exports.UnprocessableEntityError = $abbcf21fd6ad6572$var$UnprocessableEntityError;
  class $abbcf21fd6ad6572$var$RateLimitError extends $abbcf21fd6ad6572$var$APIError {
    constructor() {
      super(...arguments);
      this.status = 429;
    }
  }
  module.exports.RateLimitError = $abbcf21fd6ad6572$var$RateLimitError;
  class $abbcf21fd6ad6572$var$InternalServerError extends $abbcf21fd6ad6572$var$APIError {}
  module.exports.InternalServerError = $abbcf21fd6ad6572$var$InternalServerError;
  class $abbcf21fd6ad6572$var$LengthFinishReasonError extends $abbcf21fd6ad6572$var$OpenAIError {
    constructor() {
      super(`Could not parse response content as the length limit was reached`);
    }
  }
  module.exports.LengthFinishReasonError = $abbcf21fd6ad6572$var$LengthFinishReasonError;
  class $abbcf21fd6ad6572$var$ContentFilterFinishReasonError extends $abbcf21fd6ad6572$var$OpenAIError {
    constructor() {
      super(`Could not parse response content as the request was rejected by the content filter`);
    }
  }
  module.exports.ContentFilterFinishReasonError =
    $abbcf21fd6ad6572$var$ContentFilterFinishReasonError;
});

parcelRegister('lhBrP', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.LineDecoder = void 0;

  var $eK9Mf = parcelRequire('eK9Mf');
  /**
   * A re-implementation of httpx's `LineDecoder` in Python that handles incrementally
   * reading lines from text.
   *
   * https://github.com/encode/httpx/blob/920333ea98118e9cf617f246905d7b202510941c/httpx/_decoders.py#L258
   */ class $f7e83bd86ab1c14e$var$LineDecoder {
    constructor() {
      this.buffer = [];
      this.trailingCR = false;
    }
    decode(chunk) {
      let text = this.decodeText(chunk);
      if (this.trailingCR) {
        text = '\r' + text;
        this.trailingCR = false;
      }
      if (text.endsWith('\r')) {
        this.trailingCR = true;
        text = text.slice(0, -1);
      }
      if (!text) return [];
      const trailingNewline = $f7e83bd86ab1c14e$var$LineDecoder.NEWLINE_CHARS.has(
        text[text.length - 1] || '',
      );
      let lines = text.split($f7e83bd86ab1c14e$var$LineDecoder.NEWLINE_REGEXP);
      // if there is a trailing new line then the last entry will be an empty
      // string which we don't care about
      if (trailingNewline) lines.pop();
      if (lines.length === 1 && !trailingNewline) {
        this.buffer.push(lines[0]);
        return [];
      }
      if (this.buffer.length > 0) {
        lines = [this.buffer.join('') + lines[0], ...lines.slice(1)];
        this.buffer = [];
      }
      if (!trailingNewline) this.buffer = [lines.pop() || ''];
      return lines;
    }
    decodeText(bytes) {
      if (bytes == null) return '';
      if (typeof bytes === 'string') return bytes;
      // Node:
      if (typeof Buffer !== 'undefined') {
        if (bytes instanceof Buffer) return bytes.toString();
        if (bytes instanceof Uint8Array) return Buffer.from(bytes).toString();
        throw new $eK9Mf.OpenAIError(
          `Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`,
        );
      }
      // Browser
      if (typeof TextDecoder !== 'undefined') {
        if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
          this.textDecoder ?? (this.textDecoder = new TextDecoder('utf8'));
          return this.textDecoder.decode(bytes);
        }
        throw new $eK9Mf.OpenAIError(
          `Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`,
        );
      }
      throw new $eK9Mf.OpenAIError(
        `Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`,
      );
    }
    flush() {
      if (!this.buffer.length && !this.trailingCR) return [];
      const lines = [this.buffer.join('')];
      this.buffer = [];
      this.trailingCR = false;
      return lines;
    }
  }
  module.exports.LineDecoder = $f7e83bd86ab1c14e$var$LineDecoder;
  // prettier-ignore
  $f7e83bd86ab1c14e$var$LineDecoder.NEWLINE_CHARS = new Set([
    "\n",
    "\r"
]);
  $f7e83bd86ab1c14e$var$LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
});

parcelRegister('lsd5d', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.createForm =
    module.exports.multipartFormRequestOptions =
    module.exports.maybeMultipartFormRequestOptions =
    module.exports.isMultipartBody =
    module.exports.toFile =
    module.exports.isUploadable =
    module.exports.isBlobLike =
    module.exports.isFileLike =
    module.exports.isResponseLike =
    module.exports.fileFromPath =
      void 0;

  var $7fnIa = parcelRequire('7fnIa');

  var $7fnIa = parcelRequire('7fnIa');
  Object.defineProperty(module.exports, 'fileFromPath', {
    enumerable: true,
    get: function () {
      return $7fnIa.fileFromPath;
    },
  });
  const $f9e65c87ffd0dc4e$var$isResponseLike = (value) =>
    value != null &&
    typeof value === 'object' &&
    typeof value.url === 'string' &&
    typeof value.blob === 'function';
  module.exports.isResponseLike = $f9e65c87ffd0dc4e$var$isResponseLike;
  const $f9e65c87ffd0dc4e$var$isFileLike = (value) =>
    value != null &&
    typeof value === 'object' &&
    typeof value.name === 'string' &&
    typeof value.lastModified === 'number' &&
    (0, module.exports.isBlobLike)(value);
  module.exports.isFileLike = $f9e65c87ffd0dc4e$var$isFileLike;
  /**
   * The BlobLike type omits arrayBuffer() because @types/node-fetch@^2.6.4 lacks it; but this check
   * adds the arrayBuffer() method type because it is available and used at runtime
   */ const $f9e65c87ffd0dc4e$var$isBlobLike = (value) =>
    value != null &&
    typeof value === 'object' &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.text === 'function' &&
    typeof value.slice === 'function' &&
    typeof value.arrayBuffer === 'function';
  module.exports.isBlobLike = $f9e65c87ffd0dc4e$var$isBlobLike;
  const $f9e65c87ffd0dc4e$var$isUploadable = (value) => {
    return (
      (0, module.exports.isFileLike)(value) ||
      (0, module.exports.isResponseLike)(value) ||
      (0, $7fnIa.isFsReadStream)(value)
    );
  };
  module.exports.isUploadable = $f9e65c87ffd0dc4e$var$isUploadable;
  /**
   * Helper for creating a {@link File} to pass to an SDK upload method from a variety of different data formats
   * @param value the raw content of the file.  Can be an {@link Uploadable}, {@link BlobLikePart}, or {@link AsyncIterable} of {@link BlobLikePart}s
   * @param {string=} name the name of the file. If omitted, toFile will try to determine a file name from bits if possible
   * @param {Object=} options additional properties
   * @param {string=} options.type the MIME type of the content
   * @param {number=} options.lastModified the last modified timestamp
   * @returns a {@link File} with the given properties
   */ async function $f9e65c87ffd0dc4e$var$toFile(value, name, options) {
    // If it's a promise, resolve it.
    value = await value;
    // If we've been given a `File` we don't need to do anything
    if ((0, module.exports.isFileLike)(value)) return value;
    if ((0, module.exports.isResponseLike)(value)) {
      const blob = await value.blob();
      name || (name = new URL(value.url).pathname.split(/[\\/]/).pop() ?? 'unknown_file');
      // we need to convert the `Blob` into an array buffer because the `Blob` class
      // that `node-fetch` defines is incompatible with the web standard which results
      // in `new File` interpreting it as a string instead of binary data.
      const data = (0, module.exports.isBlobLike)(blob) ? [await blob.arrayBuffer()] : [blob];
      return new $7fnIa.File(data, name, options);
    }
    const bits = await $f9e65c87ffd0dc4e$var$getBytes(value);
    name || (name = $f9e65c87ffd0dc4e$var$getName(value) ?? 'unknown_file');
    if (!options?.type) {
      const type = bits[0]?.type;
      if (typeof type === 'string')
        options = {
          ...options,
          type: type,
        };
    }
    return new $7fnIa.File(bits, name, options);
  }
  module.exports.toFile = $f9e65c87ffd0dc4e$var$toFile;
  async function $f9e65c87ffd0dc4e$var$getBytes(value) {
    let parts = [];
    if (
      typeof value === 'string' ||
      ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
      value instanceof ArrayBuffer
    )
      parts.push(value);
    else if ((0, module.exports.isBlobLike)(value)) parts.push(await value.arrayBuffer());
    else if (
      $f9e65c87ffd0dc4e$var$isAsyncIterableIterator(value) // includes Readable, ReadableStream, etc.
    )
      for await (const chunk of value) parts.push(chunk); // TODO, consider validating?
    else
      throw new Error(
        `Unexpected data type: ${typeof value}; constructor: ${value?.constructor?.name}; props: ${$f9e65c87ffd0dc4e$var$propsForError(value)}`,
      );
    return parts;
  }
  function $f9e65c87ffd0dc4e$var$propsForError(value) {
    const props = Object.getOwnPropertyNames(value);
    return `[${props.map((p) => `"${p}"`).join(', ')}]`;
  }
  function $f9e65c87ffd0dc4e$var$getName(value) {
    return (
      $f9e65c87ffd0dc4e$var$getStringFromMaybeBuffer(value.name) ||
      $f9e65c87ffd0dc4e$var$getStringFromMaybeBuffer(value.filename) || // For fs.ReadStream
      $f9e65c87ffd0dc4e$var$getStringFromMaybeBuffer(value.path)?.split(/[\\/]/).pop()
    );
  }
  const $f9e65c87ffd0dc4e$var$getStringFromMaybeBuffer = (x) => {
    if (typeof x === 'string') return x;
    if (typeof Buffer !== 'undefined' && x instanceof Buffer) return String(x);
    return undefined;
  };
  const $f9e65c87ffd0dc4e$var$isAsyncIterableIterator = (value) =>
    value != null && typeof value === 'object' && typeof value[Symbol.asyncIterator] === 'function';
  const $f9e65c87ffd0dc4e$var$isMultipartBody = (body) =>
    body && typeof body === 'object' && body.body && body[Symbol.toStringTag] === 'MultipartBody';
  module.exports.isMultipartBody = $f9e65c87ffd0dc4e$var$isMultipartBody;
  /**
   * Returns a multipart/form-data request if any part of the given request body contains a File / Blob value.
   * Otherwise returns the request as is.
   */ const $f9e65c87ffd0dc4e$var$maybeMultipartFormRequestOptions = async (opts) => {
    if (!$f9e65c87ffd0dc4e$var$hasUploadableValue(opts.body)) return opts;
    const form = await (0, module.exports.createForm)(opts.body);
    return (0, $7fnIa.getMultipartRequestOptions)(form, opts);
  };
  module.exports.maybeMultipartFormRequestOptions =
    $f9e65c87ffd0dc4e$var$maybeMultipartFormRequestOptions;
  const $f9e65c87ffd0dc4e$var$multipartFormRequestOptions = async (opts) => {
    const form = await (0, module.exports.createForm)(opts.body);
    return (0, $7fnIa.getMultipartRequestOptions)(form, opts);
  };
  module.exports.multipartFormRequestOptions = $f9e65c87ffd0dc4e$var$multipartFormRequestOptions;
  const $f9e65c87ffd0dc4e$var$createForm = async (body) => {
    const form = new $7fnIa.FormData();
    await Promise.all(
      Object.entries(body || {}).map(([key, value]) =>
        $f9e65c87ffd0dc4e$var$addFormValue(form, key, value),
      ),
    );
    return form;
  };
  module.exports.createForm = $f9e65c87ffd0dc4e$var$createForm;
  const $f9e65c87ffd0dc4e$var$hasUploadableValue = (value) => {
    if ((0, module.exports.isUploadable)(value)) return true;
    if (Array.isArray(value)) return value.some($f9e65c87ffd0dc4e$var$hasUploadableValue);
    if (value && typeof value === 'object')
      for (const k in value) {
        if ($f9e65c87ffd0dc4e$var$hasUploadableValue(value[k])) return true;
      }
    return false;
  };
  const $f9e65c87ffd0dc4e$var$addFormValue = async (form, key, value) => {
    if (value === undefined) return;
    if (value == null)
      throw new TypeError(
        `Received null for "${key}"; to pass null in FormData, you must use the string 'null'`,
      );
    // TODO: make nested formats configurable
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
      form.append(key, String(value));
    else if ((0, module.exports.isUploadable)(value)) {
      const file = await $f9e65c87ffd0dc4e$var$toFile(value);
      form.append(key, file);
    } else if (Array.isArray(value))
      await Promise.all(
        value.map((entry) => $f9e65c87ffd0dc4e$var$addFormValue(form, key + '[]', entry)),
      );
    else if (typeof value === 'object')
      await Promise.all(
        Object.entries(value).map(([name, prop]) =>
          $f9e65c87ffd0dc4e$var$addFormValue(form, `${key}[${name}]`, prop),
        ),
      );
    else
      throw new TypeError(
        `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`,
      );
  };
});

parcelRegister('dUVgk', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.CursorPage = module.exports.Page = void 0;

  var $25F7z = parcelRequire('25F7z');
  /**
   * Note: no pagination actually occurs yet, this is for forwards-compatibility.
   */ class $a21cec6cbbf1a9eb$var$Page extends $25F7z.AbstractPage {
    constructor(client, response, body, options) {
      super(client, response, body, options);
      this.data = body.data || [];
      this.object = body.object;
    }
    getPaginatedItems() {
      return this.data ?? [];
    }
    // @deprecated Please use `nextPageInfo()` instead
    /**
     * This page represents a response that isn't actually paginated at the API level
     * so there will never be any next page params.
     */ nextPageParams() {
      return null;
    }
    nextPageInfo() {
      return null;
    }
  }
  module.exports.Page = $a21cec6cbbf1a9eb$var$Page;
  class $a21cec6cbbf1a9eb$var$CursorPage extends $25F7z.AbstractPage {
    constructor(client, response, body, options) {
      super(client, response, body, options);
      this.data = body.data || [];
    }
    getPaginatedItems() {
      return this.data ?? [];
    }
    // @deprecated Please use `nextPageInfo()` instead
    nextPageParams() {
      const info = this.nextPageInfo();
      if (!info) return null;
      if ('params' in info) return info.params;
      const params = Object.fromEntries(info.url.searchParams);
      if (!Object.keys(params).length) return null;
      return params;
    }
    nextPageInfo() {
      const data = this.getPaginatedItems();
      if (!data.length) return null;
      const id = data[data.length - 1]?.id;
      if (!id) return null;
      return {
        params: {
          after: id,
        },
      };
    }
  }
  module.exports.CursorPage = $a21cec6cbbf1a9eb$var$CursorPage;
});

parcelRegister('9fe10', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $6bb062e9c1d33a3f$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $6bb062e9c1d33a3f$var$__exportStar =
    (module.exports && module.exports.__exportStar) ||
    function (m, exports1) {
      for (var p in m)
        if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports1, p))
          $6bb062e9c1d33a3f$var$__createBinding(exports1, m, p);
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Uploads =
    module.exports.Moderations =
    module.exports.Models =
    module.exports.ModelsPage =
    module.exports.Images =
    module.exports.FineTuning =
    module.exports.Files =
    module.exports.FileObjectsPage =
    module.exports.Embeddings =
    module.exports.Completions =
    module.exports.Beta =
    module.exports.Batches =
    module.exports.BatchesPage =
    module.exports.Audio =
      void 0;

  $6bb062e9c1d33a3f$var$__exportStar(parcelRequire('57kE0'), module.exports);

  $6bb062e9c1d33a3f$var$__exportStar(parcelRequire('kyFb1'), module.exports);

  var $39Bre = parcelRequire('39Bre');
  Object.defineProperty(module.exports, 'Audio', {
    enumerable: true,
    get: function () {
      return $39Bre.Audio;
    },
  });

  var $alNbY = parcelRequire('alNbY');
  Object.defineProperty(module.exports, 'BatchesPage', {
    enumerable: true,
    get: function () {
      return $alNbY.BatchesPage;
    },
  });
  Object.defineProperty(module.exports, 'Batches', {
    enumerable: true,
    get: function () {
      return $alNbY.Batches;
    },
  });

  var $45Rqn = parcelRequire('45Rqn');
  Object.defineProperty(module.exports, 'Beta', {
    enumerable: true,
    get: function () {
      return $45Rqn.Beta;
    },
  });

  var $gQvO1 = parcelRequire('gQvO1');
  Object.defineProperty(module.exports, 'Completions', {
    enumerable: true,
    get: function () {
      return $gQvO1.Completions;
    },
  });

  var $ffkCP = parcelRequire('ffkCP');
  Object.defineProperty(module.exports, 'Embeddings', {
    enumerable: true,
    get: function () {
      return $ffkCP.Embeddings;
    },
  });

  var $1BL07 = parcelRequire('1BL07');
  Object.defineProperty(module.exports, 'FileObjectsPage', {
    enumerable: true,
    get: function () {
      return $1BL07.FileObjectsPage;
    },
  });
  Object.defineProperty(module.exports, 'Files', {
    enumerable: true,
    get: function () {
      return $1BL07.Files;
    },
  });

  var $8NS1E = parcelRequire('8NS1E');
  Object.defineProperty(module.exports, 'FineTuning', {
    enumerable: true,
    get: function () {
      return $8NS1E.FineTuning;
    },
  });

  var $k1sSL = parcelRequire('k1sSL');
  Object.defineProperty(module.exports, 'Images', {
    enumerable: true,
    get: function () {
      return $k1sSL.Images;
    },
  });

  var $8BSUZ = parcelRequire('8BSUZ');
  Object.defineProperty(module.exports, 'ModelsPage', {
    enumerable: true,
    get: function () {
      return $8BSUZ.ModelsPage;
    },
  });
  Object.defineProperty(module.exports, 'Models', {
    enumerable: true,
    get: function () {
      return $8BSUZ.Models;
    },
  });

  var $jOINj = parcelRequire('jOINj');
  Object.defineProperty(module.exports, 'Moderations', {
    enumerable: true,
    get: function () {
      return $jOINj.Moderations;
    },
  });

  var $8GwEm = parcelRequire('8GwEm');
  Object.defineProperty(module.exports, 'Uploads', {
    enumerable: true,
    get: function () {
      return $8GwEm.Uploads;
    },
  });
});
parcelRegister('57kE0', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Completions = module.exports.Chat = void 0;

  var $1FMoy = parcelRequire('1FMoy');
  Object.defineProperty(module.exports, 'Chat', {
    enumerable: true,
    get: function () {
      return $1FMoy.Chat;
    },
  });

  var $60jra = parcelRequire('60jra');
  Object.defineProperty(module.exports, 'Completions', {
    enumerable: true,
    get: function () {
      return $60jra.Completions;
    },
  });
});
parcelRegister('1FMoy', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $137f2907597ebbde$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $137f2907597ebbde$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $137f2907597ebbde$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $137f2907597ebbde$var$__createBinding(result, mod, k);
      }
      $137f2907597ebbde$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Chat = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $137f2907597ebbde$var$CompletionsAPI = $137f2907597ebbde$var$__importStar(
    parcelRequire('60jra'),
  );

  class $137f2907597ebbde$var$Chat extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.completions = new $137f2907597ebbde$var$CompletionsAPI.Completions(this._client);
    }
  }
  module.exports.Chat = $137f2907597ebbde$var$Chat;
  $137f2907597ebbde$var$Chat.Completions = parcelRequire('60jra').Completions;
});
parcelRegister('dQuSh', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.APIResource = void 0;
  class $a14814be28a1aedd$var$APIResource {
    constructor(client) {
      this._client = client;
    }
  }
  module.exports.APIResource = $a14814be28a1aedd$var$APIResource;
});

parcelRegister('60jra', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Completions = void 0;

  var $dQuSh = parcelRequire('dQuSh');
  class $45f1d1febb913c48$var$Completions extends $dQuSh.APIResource {
    create(body, options) {
      return this._client.post('/chat/completions', {
        body: body,
        ...options,
        stream: body.stream ?? false,
      });
    }
  }
  module.exports.Completions = $45f1d1febb913c48$var$Completions;
});

parcelRegister('kyFb1', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
});

parcelRegister('39Bre', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $24bf40cc6abf2d9f$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $24bf40cc6abf2d9f$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $24bf40cc6abf2d9f$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $24bf40cc6abf2d9f$var$__createBinding(result, mod, k);
      }
      $24bf40cc6abf2d9f$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Audio = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $24bf40cc6abf2d9f$var$SpeechAPI = $24bf40cc6abf2d9f$var$__importStar(
    parcelRequire('4Zcp7'),
  );

  const $24bf40cc6abf2d9f$var$TranscriptionsAPI = $24bf40cc6abf2d9f$var$__importStar(
    parcelRequire('5emD7'),
  );

  const $24bf40cc6abf2d9f$var$TranslationsAPI = $24bf40cc6abf2d9f$var$__importStar(
    parcelRequire('loHq0'),
  );

  class $24bf40cc6abf2d9f$var$Audio extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.transcriptions = new $24bf40cc6abf2d9f$var$TranscriptionsAPI.Transcriptions(
        this._client,
      );
      this.translations = new $24bf40cc6abf2d9f$var$TranslationsAPI.Translations(this._client);
      this.speech = new $24bf40cc6abf2d9f$var$SpeechAPI.Speech(this._client);
    }
  }
  module.exports.Audio = $24bf40cc6abf2d9f$var$Audio;
  $24bf40cc6abf2d9f$var$Audio.Transcriptions = parcelRequire('5emD7').Transcriptions;
  $24bf40cc6abf2d9f$var$Audio.Translations = parcelRequire('loHq0').Translations;
  $24bf40cc6abf2d9f$var$Audio.Speech = parcelRequire('4Zcp7').Speech;
});
parcelRegister('4Zcp7', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Speech = void 0;

  var $dQuSh = parcelRequire('dQuSh');
  class $3a167b1f0a5f81d6$var$Speech extends $dQuSh.APIResource {
    /**
     * Generates audio from the input text.
     */ create(body, options) {
      return this._client.post('/audio/speech', {
        body: body,
        ...options,
        __binaryResponse: true,
      });
    }
  }
  module.exports.Speech = $3a167b1f0a5f81d6$var$Speech;
});

parcelRegister('5emD7', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $3cefd061c55e16c8$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $3cefd061c55e16c8$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $3cefd061c55e16c8$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $3cefd061c55e16c8$var$__createBinding(result, mod, k);
      }
      $3cefd061c55e16c8$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Transcriptions = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $3cefd061c55e16c8$var$Core = $3cefd061c55e16c8$var$__importStar(parcelRequire('25F7z'));
  class $3cefd061c55e16c8$var$Transcriptions extends $dQuSh.APIResource {
    create(body, options) {
      return this._client.post(
        '/audio/transcriptions',
        $3cefd061c55e16c8$var$Core.multipartFormRequestOptions({
          body: body,
          ...options,
        }),
      );
    }
  }
  module.exports.Transcriptions = $3cefd061c55e16c8$var$Transcriptions;
});

parcelRegister('loHq0', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $f93d84deb5b6abb7$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $f93d84deb5b6abb7$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $f93d84deb5b6abb7$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $f93d84deb5b6abb7$var$__createBinding(result, mod, k);
      }
      $f93d84deb5b6abb7$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Translations = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $f93d84deb5b6abb7$var$Core = $f93d84deb5b6abb7$var$__importStar(parcelRequire('25F7z'));
  class $f93d84deb5b6abb7$var$Translations extends $dQuSh.APIResource {
    create(body, options) {
      return this._client.post(
        '/audio/translations',
        $f93d84deb5b6abb7$var$Core.multipartFormRequestOptions({
          body: body,
          ...options,
        }),
      );
    }
  }
  module.exports.Translations = $f93d84deb5b6abb7$var$Translations;
});

parcelRegister('alNbY', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.BatchesPage = module.exports.Batches = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $dUVgk = parcelRequire('dUVgk');
  class $789206148fec6b8d$var$Batches extends $dQuSh.APIResource {
    /**
     * Creates and executes a batch from an uploaded file of requests
     */ create(body, options) {
      return this._client.post('/batches', {
        body: body,
        ...options,
      });
    }
    /**
     * Retrieves a batch.
     */ retrieve(batchId, options) {
      return this._client.get(`/batches/${batchId}`, options);
    }
    list(query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list({}, query);
      return this._client.getAPIList('/batches', $789206148fec6b8d$var$BatchesPage, {
        query: query,
        ...options,
      });
    }
    /**
     * Cancels an in-progress batch. The batch will be in status `cancelling` for up to
     * 10 minutes, before changing to `cancelled`, where it will have partial results
     * (if any) available in the output file.
     */ cancel(batchId, options) {
      return this._client.post(`/batches/${batchId}/cancel`, options);
    }
  }
  module.exports.Batches = $789206148fec6b8d$var$Batches;
  class $789206148fec6b8d$var$BatchesPage extends $dUVgk.CursorPage {}
  module.exports.BatchesPage = $789206148fec6b8d$var$BatchesPage;
  $789206148fec6b8d$var$Batches.BatchesPage = $789206148fec6b8d$var$BatchesPage;
});

parcelRegister('45Rqn', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $2fb11204f79f3093$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $2fb11204f79f3093$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $2fb11204f79f3093$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $2fb11204f79f3093$var$__createBinding(result, mod, k);
      }
      $2fb11204f79f3093$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Beta = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $2fb11204f79f3093$var$AssistantsAPI = $2fb11204f79f3093$var$__importStar(
    parcelRequire('8H2PX'),
  );

  const $2fb11204f79f3093$var$ChatAPI = $2fb11204f79f3093$var$__importStar(parcelRequire('dytP0'));

  const $2fb11204f79f3093$var$ThreadsAPI = $2fb11204f79f3093$var$__importStar(
    parcelRequire('4UuAG'),
  );

  const $2fb11204f79f3093$var$VectorStoresAPI = $2fb11204f79f3093$var$__importStar(
    parcelRequire('3XMqz'),
  );

  class $2fb11204f79f3093$var$Beta extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.vectorStores = new $2fb11204f79f3093$var$VectorStoresAPI.VectorStores(this._client);
      this.chat = new $2fb11204f79f3093$var$ChatAPI.Chat(this._client);
      this.assistants = new $2fb11204f79f3093$var$AssistantsAPI.Assistants(this._client);
      this.threads = new $2fb11204f79f3093$var$ThreadsAPI.Threads(this._client);
    }
  }
  module.exports.Beta = $2fb11204f79f3093$var$Beta;
  $2fb11204f79f3093$var$Beta.VectorStores = parcelRequire('3XMqz').VectorStores;
  $2fb11204f79f3093$var$Beta.VectorStoresPage = parcelRequire('3XMqz').VectorStoresPage;
  $2fb11204f79f3093$var$Beta.Assistants = parcelRequire('8H2PX').Assistants;
  $2fb11204f79f3093$var$Beta.AssistantsPage = parcelRequire('8H2PX').AssistantsPage;
  $2fb11204f79f3093$var$Beta.Threads = parcelRequire('4UuAG').Threads;
});
parcelRegister('8H2PX', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.AssistantsPage = module.exports.Assistants = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $dUVgk = parcelRequire('dUVgk');
  class $65448a45cce1f8f4$var$Assistants extends $dQuSh.APIResource {
    /**
     * Create an assistant with a model and instructions.
     */ create(body, options) {
      return this._client.post('/assistants', {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Retrieves an assistant.
     */ retrieve(assistantId, options) {
      return this._client.get(`/assistants/${assistantId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Modifies an assistant.
     */ update(assistantId, body, options) {
      return this._client.post(`/assistants/${assistantId}`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    list(query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list({}, query);
      return this._client.getAPIList('/assistants', $65448a45cce1f8f4$var$AssistantsPage, {
        query: query,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Delete an assistant.
     */ del(assistantId, options) {
      return this._client.delete(`/assistants/${assistantId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
  }
  module.exports.Assistants = $65448a45cce1f8f4$var$Assistants;
  class $65448a45cce1f8f4$var$AssistantsPage extends $dUVgk.CursorPage {}
  module.exports.AssistantsPage = $65448a45cce1f8f4$var$AssistantsPage;
  $65448a45cce1f8f4$var$Assistants.AssistantsPage = $65448a45cce1f8f4$var$AssistantsPage;
});

parcelRegister('dytP0', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $028bf605722fc52c$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $028bf605722fc52c$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $028bf605722fc52c$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $028bf605722fc52c$var$__createBinding(result, mod, k);
      }
      $028bf605722fc52c$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Chat = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $028bf605722fc52c$var$CompletionsAPI = $028bf605722fc52c$var$__importStar(
    parcelRequire('2s3lG'),
  );
  class $028bf605722fc52c$var$Chat extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.completions = new $028bf605722fc52c$var$CompletionsAPI.Completions(this._client);
    }
  }
  module.exports.Chat = $028bf605722fc52c$var$Chat;
  (function (Chat) {
    Chat.Completions = $028bf605722fc52c$var$CompletionsAPI.Completions;
  })(($028bf605722fc52c$var$Chat = module.exports.Chat || (module.exports.Chat = {})));
});
parcelRegister('2s3lG', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Completions =
    module.exports.ChatCompletionRunner =
    module.exports.ChatCompletionStream =
    module.exports.ParsingToolFunction =
    module.exports.ParsingFunction =
    module.exports.ChatCompletionStreamingRunner =
      void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $30nd9 = parcelRequire('30nd9');

  var $ajlBJ = parcelRequire('ajlBJ');

  var $elo0k = parcelRequire('elo0k');

  var $5sdCJ = parcelRequire('5sdCJ');

  var $ajlBJ = parcelRequire('ajlBJ');
  Object.defineProperty(module.exports, 'ChatCompletionStreamingRunner', {
    enumerable: true,
    get: function () {
      return $ajlBJ.ChatCompletionStreamingRunner;
    },
  });

  var $kTGvQ = parcelRequire('kTGvQ');
  Object.defineProperty(module.exports, 'ParsingFunction', {
    enumerable: true,
    get: function () {
      return $kTGvQ.ParsingFunction;
    },
  });
  Object.defineProperty(module.exports, 'ParsingToolFunction', {
    enumerable: true,
    get: function () {
      return $kTGvQ.ParsingToolFunction;
    },
  });

  var $elo0k = parcelRequire('elo0k');
  Object.defineProperty(module.exports, 'ChatCompletionStream', {
    enumerable: true,
    get: function () {
      return $elo0k.ChatCompletionStream;
    },
  });

  var $30nd9 = parcelRequire('30nd9');
  Object.defineProperty(module.exports, 'ChatCompletionRunner', {
    enumerable: true,
    get: function () {
      return $30nd9.ChatCompletionRunner;
    },
  });
  class $1c90cb4af26eaf26$var$Completions extends $dQuSh.APIResource {
    parse(body, options) {
      (0, $5sdCJ.validateInputTools)(body.tools);
      return this._client.chat.completions
        .create(body, {
          ...options,
          headers: {
            ...options?.headers,
            'X-Stainless-Helper-Method': 'beta.chat.completions.parse',
          },
        })
        ._thenUnwrap((completion) => (0, $5sdCJ.parseChatCompletion)(completion, body));
    }
    runFunctions(body, options) {
      if (body.stream)
        return $ajlBJ.ChatCompletionStreamingRunner.runFunctions(this._client, body, options);
      return $30nd9.ChatCompletionRunner.runFunctions(this._client, body, options);
    }
    runTools(body, options) {
      if (body.stream)
        return $ajlBJ.ChatCompletionStreamingRunner.runTools(this._client, body, options);
      return $30nd9.ChatCompletionRunner.runTools(this._client, body, options);
    }
    /**
     * Creates a chat completion stream
     */ stream(body, options) {
      return $elo0k.ChatCompletionStream.createChatCompletion(this._client, body, options);
    }
  }
  module.exports.Completions = $1c90cb4af26eaf26$var$Completions;
});
parcelRegister('30nd9', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.ChatCompletionRunner = void 0;

  var $4II4O = parcelRequire('4II4O');

  var $ehgTu = parcelRequire('ehgTu');
  class $23036067d026c53c$var$ChatCompletionRunner extends $4II4O.AbstractChatCompletionRunner {
    /** @deprecated - please use `runTools` instead. */ static runFunctions(
      client,
      params,
      options,
    ) {
      const runner = new $23036067d026c53c$var$ChatCompletionRunner();
      const opts = {
        ...options,
        headers: {
          ...options?.headers,
          'X-Stainless-Helper-Method': 'runFunctions',
        },
      };
      runner._run(() => runner._runFunctions(client, params, opts));
      return runner;
    }
    static runTools(client, params, options) {
      const runner = new $23036067d026c53c$var$ChatCompletionRunner();
      const opts = {
        ...options,
        headers: {
          ...options?.headers,
          'X-Stainless-Helper-Method': 'runTools',
        },
      };
      runner._run(() => runner._runTools(client, params, opts));
      return runner;
    }
    _addMessage(message, emit = true) {
      super._addMessage(message, emit);
      if ((0, $ehgTu.isAssistantMessage)(message) && message.content)
        this._emit('content', message.content);
    }
  }
  module.exports.ChatCompletionRunner = $23036067d026c53c$var$ChatCompletionRunner;
});
parcelRegister('4II4O', function (module, exports) {
  'use strict';
  var $36fd7633a39d2452$var$__classPrivateFieldGet =
    (module.exports && module.exports.__classPrivateFieldGet) ||
    function (receiver, state, kind, f) {
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it',
        );
      return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
  var $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
    $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalContent,
    $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalMessage,
    $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalFunctionCall,
    $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalFunctionCallResult,
    $36fd7633a39d2452$var$_AbstractChatCompletionRunner_calculateTotalUsage,
    $36fd7633a39d2452$var$_AbstractChatCompletionRunner_validateParams,
    $36fd7633a39d2452$var$_AbstractChatCompletionRunner_stringifyFunctionCallResult;
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.AbstractChatCompletionRunner = void 0;

  var $eK9Mf = parcelRequire('eK9Mf');

  var $kTGvQ = parcelRequire('kTGvQ');

  var $ehgTu = parcelRequire('ehgTu');

  var $7tW0Y = parcelRequire('7tW0Y');

  var $5sdCJ = parcelRequire('5sdCJ');
  const $36fd7633a39d2452$var$DEFAULT_MAX_CHAT_COMPLETIONS = 10;
  class $36fd7633a39d2452$var$AbstractChatCompletionRunner extends $7tW0Y.EventStream {
    constructor() {
      super(...arguments);
      $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances.add(this);
      this._chatCompletions = [];
      this.messages = [];
    }
    _addChatCompletion(chatCompletion) {
      this._chatCompletions.push(chatCompletion);
      this._emit('chatCompletion', chatCompletion);
      const message = chatCompletion.choices[0]?.message;
      if (message) this._addMessage(message);
      return chatCompletion;
    }
    _addMessage(message, emit = true) {
      if (!('content' in message)) message.content = null;
      this.messages.push(message);
      if (emit) {
        this._emit('message', message);
        if (
          ((0, $ehgTu.isFunctionMessage)(message) || (0, $ehgTu.isToolMessage)(message)) &&
          message.content
        )
          // Note, this assumes that {role: 'tool', content: …} is always the result of a call of tool of type=function.
          this._emit('functionCallResult', message.content);
        else if ((0, $ehgTu.isAssistantMessage)(message) && message.function_call)
          this._emit('functionCall', message.function_call);
        else if ((0, $ehgTu.isAssistantMessage)(message) && message.tool_calls) {
          for (const tool_call of message.tool_calls)
            if (tool_call.type === 'function') this._emit('functionCall', tool_call.function);
        }
      }
    }
    /**
     * @returns a promise that resolves with the final ChatCompletion, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
     */ async finalChatCompletion() {
      await this.done();
      const completion = this._chatCompletions[this._chatCompletions.length - 1];
      if (!completion)
        throw new $eK9Mf.OpenAIError('stream ended without producing a ChatCompletion');
      return completion;
    }
    /**
     * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */ async finalContent() {
      await this.done();
      return $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalContent,
      ).call(this);
    }
    /**
     * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
     * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */ async finalMessage() {
      await this.done();
      return $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalMessage,
      ).call(this);
    }
    /**
     * @returns a promise that resolves with the content of the final FunctionCall, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */ async finalFunctionCall() {
      await this.done();
      return $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalFunctionCall,
      ).call(this);
    }
    async finalFunctionCallResult() {
      await this.done();
      return $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalFunctionCallResult,
      ).call(this);
    }
    async totalUsage() {
      await this.done();
      return $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_calculateTotalUsage,
      ).call(this);
    }
    allChatCompletions() {
      return [...this._chatCompletions];
    }
    _emitFinal() {
      const completion = this._chatCompletions[this._chatCompletions.length - 1];
      if (completion) this._emit('finalChatCompletion', completion);
      const finalMessage = $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalMessage,
      ).call(this);
      if (finalMessage) this._emit('finalMessage', finalMessage);
      const finalContent = $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalContent,
      ).call(this);
      if (finalContent) this._emit('finalContent', finalContent);
      const finalFunctionCall = $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalFunctionCall,
      ).call(this);
      if (finalFunctionCall) this._emit('finalFunctionCall', finalFunctionCall);
      const finalFunctionCallResult = $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalFunctionCallResult,
      ).call(this);
      if (finalFunctionCallResult != null)
        this._emit('finalFunctionCallResult', finalFunctionCallResult);
      if (this._chatCompletions.some((c) => c.usage))
        this._emit(
          'totalUsage',
          $36fd7633a39d2452$var$__classPrivateFieldGet(
            this,
            $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
            'm',
            $36fd7633a39d2452$var$_AbstractChatCompletionRunner_calculateTotalUsage,
          ).call(this),
        );
    }
    async _createChatCompletion(client, params, options) {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted) this.controller.abort();
        signal.addEventListener('abort', () => this.controller.abort());
      }
      $36fd7633a39d2452$var$__classPrivateFieldGet(
        this,
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
        'm',
        $36fd7633a39d2452$var$_AbstractChatCompletionRunner_validateParams,
      ).call(this, params);
      const chatCompletion = await client.chat.completions.create(
        {
          ...params,
          stream: false,
        },
        {
          ...options,
          signal: this.controller.signal,
        },
      );
      this._connected();
      return this._addChatCompletion((0, $5sdCJ.parseChatCompletion)(chatCompletion, params));
    }
    async _runChatCompletion(client, params, options) {
      for (const message of params.messages) this._addMessage(message, false);
      return await this._createChatCompletion(client, params, options);
    }
    async _runFunctions(client, params, options) {
      const role = 'function';
      const { function_call: function_call = 'auto', stream: stream, ...restParams } = params;
      const singleFunctionToCall = typeof function_call !== 'string' && function_call?.name;
      const {
        maxChatCompletions: maxChatCompletions = $36fd7633a39d2452$var$DEFAULT_MAX_CHAT_COMPLETIONS,
      } = options || {};
      const functionsByName = {};
      for (const f of params.functions) functionsByName[f.name || f.function.name] = f;
      const functions = params.functions.map((f) => ({
        name: f.name || f.function.name,
        parameters: f.parameters,
        description: f.description,
      }));
      for (const message of params.messages) this._addMessage(message, false);
      for (let i = 0; i < maxChatCompletions; ++i) {
        const chatCompletion = await this._createChatCompletion(
          client,
          {
            ...restParams,
            function_call: function_call,
            functions: functions,
            messages: [...this.messages],
          },
          options,
        );
        const message = chatCompletion.choices[0]?.message;
        if (!message) throw new $eK9Mf.OpenAIError(`missing message in ChatCompletion response`);
        if (!message.function_call) return;
        const { name: name, arguments: args } = message.function_call;
        const fn = functionsByName[name];
        if (!fn) {
          const content = `Invalid function_call: ${JSON.stringify(name)}. Available options are: ${functions.map((f) => JSON.stringify(f.name)).join(', ')}. Please try again`;
          this._addMessage({
            role: role,
            name: name,
            content: content,
          });
          continue;
        } else if (singleFunctionToCall && singleFunctionToCall !== name) {
          const content = `Invalid function_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
          this._addMessage({
            role: role,
            name: name,
            content: content,
          });
          continue;
        }
        let parsed;
        try {
          parsed = (0, $kTGvQ.isRunnableFunctionWithParse)(fn) ? await fn.parse(args) : args;
        } catch (error) {
          this._addMessage({
            role: role,
            name: name,
            content: error instanceof Error ? error.message : String(error),
          });
          continue;
        }
        // @ts-expect-error it can't rule out `never` type.
        const rawContent = await fn.function(parsed, this);
        const content = $36fd7633a39d2452$var$__classPrivateFieldGet(
          this,
          $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
          'm',
          $36fd7633a39d2452$var$_AbstractChatCompletionRunner_stringifyFunctionCallResult,
        ).call(this, rawContent);
        this._addMessage({
          role: role,
          name: name,
          content: content,
        });
        if (singleFunctionToCall) return;
      }
    }
    async _runTools(client, params, options) {
      const role = 'tool';
      const { tool_choice: tool_choice = 'auto', stream: stream, ...restParams } = params;
      const singleFunctionToCall = typeof tool_choice !== 'string' && tool_choice?.function?.name;
      const {
        maxChatCompletions: maxChatCompletions = $36fd7633a39d2452$var$DEFAULT_MAX_CHAT_COMPLETIONS,
      } = options || {};
      // TODO(someday): clean this logic up
      const inputTools = params.tools.map((tool) => {
        if ((0, $5sdCJ.isAutoParsableTool)(tool)) {
          if (!tool.$callback)
            throw new $eK9Mf.OpenAIError(
              'Tool given to `.runTools()` that does not have an associated function',
            );
          return {
            type: 'function',
            function: {
              function: tool.$callback,
              name: tool.function.name,
              description: tool.function.description || '',
              parameters: tool.function.parameters,
              parse: tool.$parseRaw,
              strict: true,
            },
          };
        }
        return tool;
      });
      const functionsByName = {};
      for (const f of inputTools)
        if (f.type === 'function')
          functionsByName[f.function.name || f.function.function.name] = f.function;
      const tools =
        'tools' in params
          ? inputTools.map((t) =>
              t.type === 'function'
                ? {
                    type: 'function',
                    function: {
                      name: t.function.name || t.function.function.name,
                      parameters: t.function.parameters,
                      description: t.function.description,
                      strict: t.function.strict,
                    },
                  }
                : t,
            )
          : undefined;
      for (const message of params.messages) this._addMessage(message, false);
      for (let i = 0; i < maxChatCompletions; ++i) {
        const chatCompletion = await this._createChatCompletion(
          client,
          {
            ...restParams,
            tool_choice: tool_choice,
            tools: tools,
            messages: [...this.messages],
          },
          options,
        );
        const message = chatCompletion.choices[0]?.message;
        if (!message) throw new $eK9Mf.OpenAIError(`missing message in ChatCompletion response`);
        if (!message.tool_calls?.length) return;
        for (const tool_call of message.tool_calls) {
          if (tool_call.type !== 'function') continue;
          const tool_call_id = tool_call.id;
          const { name: name, arguments: args } = tool_call.function;
          const fn = functionsByName[name];
          if (!fn) {
            const content = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${Object.keys(
              functionsByName,
            )
              .map((name) => JSON.stringify(name))
              .join(', ')}. Please try again`;
            this._addMessage({
              role: role,
              tool_call_id: tool_call_id,
              content: content,
            });
            continue;
          } else if (singleFunctionToCall && singleFunctionToCall !== name) {
            const content = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
            this._addMessage({
              role: role,
              tool_call_id: tool_call_id,
              content: content,
            });
            continue;
          }
          let parsed;
          try {
            parsed = (0, $kTGvQ.isRunnableFunctionWithParse)(fn) ? await fn.parse(args) : args;
          } catch (error) {
            const content = error instanceof Error ? error.message : String(error);
            this._addMessage({
              role: role,
              tool_call_id: tool_call_id,
              content: content,
            });
            continue;
          }
          // @ts-expect-error it can't rule out `never` type.
          const rawContent = await fn.function(parsed, this);
          const content = $36fd7633a39d2452$var$__classPrivateFieldGet(
            this,
            $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
            'm',
            $36fd7633a39d2452$var$_AbstractChatCompletionRunner_stringifyFunctionCallResult,
          ).call(this, rawContent);
          this._addMessage({
            role: role,
            tool_call_id: tool_call_id,
            content: content,
          });
          if (singleFunctionToCall) return;
        }
      }
      return;
    }
  }
  module.exports.AbstractChatCompletionRunner = $36fd7633a39d2452$var$AbstractChatCompletionRunner;
  ($36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances = new WeakSet()),
    ($36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalContent =
      function _AbstractChatCompletionRunner_getFinalContent() {
        return (
          $36fd7633a39d2452$var$__classPrivateFieldGet(
            this,
            $36fd7633a39d2452$var$_AbstractChatCompletionRunner_instances,
            'm',
            $36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalMessage,
          ).call(this).content ?? null
        );
      }),
    ($36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalMessage =
      function _AbstractChatCompletionRunner_getFinalMessage() {
        let i = this.messages.length;
        while (i-- > 0) {
          const message = this.messages[i];
          if ((0, $ehgTu.isAssistantMessage)(message)) {
            const { function_call: function_call, ...rest } = message;
            // TODO: support audio here
            const ret = {
              ...rest,
              content: message.content ?? null,
              refusal: message.refusal ?? null,
            };
            if (function_call) ret.function_call = function_call;
            return ret;
          }
        }
        throw new $eK9Mf.OpenAIError(
          'stream ended without producing a ChatCompletionMessage with role=assistant',
        );
      }),
    ($36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalFunctionCall =
      function _AbstractChatCompletionRunner_getFinalFunctionCall() {
        for (let i = this.messages.length - 1; i >= 0; i--) {
          const message = this.messages[i];
          if ((0, $ehgTu.isAssistantMessage)(message) && message?.function_call)
            return message.function_call;
          if ((0, $ehgTu.isAssistantMessage)(message) && message?.tool_calls?.length)
            return message.tool_calls.at(-1)?.function;
        }
        return;
      }),
    ($36fd7633a39d2452$var$_AbstractChatCompletionRunner_getFinalFunctionCallResult =
      function _AbstractChatCompletionRunner_getFinalFunctionCallResult() {
        for (let i = this.messages.length - 1; i >= 0; i--) {
          const message = this.messages[i];
          if ((0, $ehgTu.isFunctionMessage)(message) && message.content != null)
            return message.content;
          if (
            (0, $ehgTu.isToolMessage)(message) &&
            message.content != null &&
            typeof message.content === 'string' &&
            this.messages.some(
              (x) =>
                x.role === 'assistant' &&
                x.tool_calls?.some((y) => y.type === 'function' && y.id === message.tool_call_id),
            )
          )
            return message.content;
        }
        return;
      }),
    ($36fd7633a39d2452$var$_AbstractChatCompletionRunner_calculateTotalUsage =
      function _AbstractChatCompletionRunner_calculateTotalUsage() {
        const total = {
          completion_tokens: 0,
          prompt_tokens: 0,
          total_tokens: 0,
        };
        for (const { usage: usage } of this._chatCompletions)
          if (usage) {
            total.completion_tokens += usage.completion_tokens;
            total.prompt_tokens += usage.prompt_tokens;
            total.total_tokens += usage.total_tokens;
          }
        return total;
      }),
    ($36fd7633a39d2452$var$_AbstractChatCompletionRunner_validateParams =
      function _AbstractChatCompletionRunner_validateParams(params) {
        if (params.n != null && params.n > 1)
          throw new $eK9Mf.OpenAIError(
            'ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.',
          );
      }),
    ($36fd7633a39d2452$var$_AbstractChatCompletionRunner_stringifyFunctionCallResult =
      function _AbstractChatCompletionRunner_stringifyFunctionCallResult(rawContent) {
        return typeof rawContent === 'string'
          ? rawContent
          : rawContent === undefined
            ? 'undefined'
            : JSON.stringify(rawContent);
      });
});
parcelRegister('kTGvQ', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.ParsingToolFunction =
    module.exports.ParsingFunction =
    module.exports.isRunnableFunctionWithParse =
      void 0;
  function $f369ebcded834037$var$isRunnableFunctionWithParse(fn) {
    return typeof fn.parse === 'function';
  }
  module.exports.isRunnableFunctionWithParse = $f369ebcded834037$var$isRunnableFunctionWithParse;
  /**
   * This is helper class for passing a `function` and `parse` where the `function`
   * argument type matches the `parse` return type.
   *
   * @deprecated - please use ParsingToolFunction instead.
   */ class $f369ebcded834037$var$ParsingFunction {
    constructor(input) {
      this.function = input.function;
      this.parse = input.parse;
      this.parameters = input.parameters;
      this.description = input.description;
      this.name = input.name;
    }
  }
  module.exports.ParsingFunction = $f369ebcded834037$var$ParsingFunction;
  /**
   * This is helper class for passing a `function` and `parse` where the `function`
   * argument type matches the `parse` return type.
   */ class $f369ebcded834037$var$ParsingToolFunction {
    constructor(input) {
      this.type = 'function';
      this.function = input;
    }
  }
  module.exports.ParsingToolFunction = $f369ebcded834037$var$ParsingToolFunction;
});

parcelRegister('ehgTu', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.isPresent =
    module.exports.isToolMessage =
    module.exports.isFunctionMessage =
    module.exports.isAssistantMessage =
      void 0;
  const $a64fc1fe8b145395$var$isAssistantMessage = (message) => {
    return message?.role === 'assistant';
  };
  module.exports.isAssistantMessage = $a64fc1fe8b145395$var$isAssistantMessage;
  const $a64fc1fe8b145395$var$isFunctionMessage = (message) => {
    return message?.role === 'function';
  };
  module.exports.isFunctionMessage = $a64fc1fe8b145395$var$isFunctionMessage;
  const $a64fc1fe8b145395$var$isToolMessage = (message) => {
    return message?.role === 'tool';
  };
  module.exports.isToolMessage = $a64fc1fe8b145395$var$isToolMessage;
  function $a64fc1fe8b145395$var$isPresent(obj) {
    return obj != null;
  }
  module.exports.isPresent = $a64fc1fe8b145395$var$isPresent;
});

parcelRegister('7tW0Y', function (module, exports) {
  'use strict';
  var $57283e5fbe9cf52d$var$__classPrivateFieldSet =
    (module.exports && module.exports.__classPrivateFieldSet) ||
    function (receiver, state, value, kind, f) {
      if (kind === 'm') throw new TypeError('Private method is not writable');
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot write private member to an object whose class did not declare it',
        );
      return (
        kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
        value
      );
    };
  var $57283e5fbe9cf52d$var$__classPrivateFieldGet =
    (module.exports && module.exports.__classPrivateFieldGet) ||
    function (receiver, state, kind, f) {
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it',
        );
      return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
  var $57283e5fbe9cf52d$var$_EventStream_instances,
    $57283e5fbe9cf52d$var$_EventStream_connectedPromise,
    $57283e5fbe9cf52d$var$_EventStream_resolveConnectedPromise,
    $57283e5fbe9cf52d$var$_EventStream_rejectConnectedPromise,
    $57283e5fbe9cf52d$var$_EventStream_endPromise,
    $57283e5fbe9cf52d$var$_EventStream_resolveEndPromise,
    $57283e5fbe9cf52d$var$_EventStream_rejectEndPromise,
    $57283e5fbe9cf52d$var$_EventStream_listeners,
    $57283e5fbe9cf52d$var$_EventStream_ended,
    $57283e5fbe9cf52d$var$_EventStream_errored,
    $57283e5fbe9cf52d$var$_EventStream_aborted,
    $57283e5fbe9cf52d$var$_EventStream_catchingPromiseCreated,
    $57283e5fbe9cf52d$var$_EventStream_handleError;
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.EventStream = void 0;

  var $eK9Mf = parcelRequire('eK9Mf');
  class $57283e5fbe9cf52d$var$EventStream {
    constructor() {
      $57283e5fbe9cf52d$var$_EventStream_instances.add(this);
      this.controller = new AbortController();
      $57283e5fbe9cf52d$var$_EventStream_connectedPromise.set(this, void 0);
      $57283e5fbe9cf52d$var$_EventStream_resolveConnectedPromise.set(this, () => {});
      $57283e5fbe9cf52d$var$_EventStream_rejectConnectedPromise.set(this, () => {});
      $57283e5fbe9cf52d$var$_EventStream_endPromise.set(this, void 0);
      $57283e5fbe9cf52d$var$_EventStream_resolveEndPromise.set(this, () => {});
      $57283e5fbe9cf52d$var$_EventStream_rejectEndPromise.set(this, () => {});
      $57283e5fbe9cf52d$var$_EventStream_listeners.set(this, {});
      $57283e5fbe9cf52d$var$_EventStream_ended.set(this, false);
      $57283e5fbe9cf52d$var$_EventStream_errored.set(this, false);
      $57283e5fbe9cf52d$var$_EventStream_aborted.set(this, false);
      $57283e5fbe9cf52d$var$_EventStream_catchingPromiseCreated.set(this, false);
      $57283e5fbe9cf52d$var$__classPrivateFieldSet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_connectedPromise,
        new Promise((resolve, reject) => {
          $57283e5fbe9cf52d$var$__classPrivateFieldSet(
            this,
            $57283e5fbe9cf52d$var$_EventStream_resolveConnectedPromise,
            resolve,
            'f',
          );
          $57283e5fbe9cf52d$var$__classPrivateFieldSet(
            this,
            $57283e5fbe9cf52d$var$_EventStream_rejectConnectedPromise,
            reject,
            'f',
          );
        }),
        'f',
      );
      $57283e5fbe9cf52d$var$__classPrivateFieldSet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_endPromise,
        new Promise((resolve, reject) => {
          $57283e5fbe9cf52d$var$__classPrivateFieldSet(
            this,
            $57283e5fbe9cf52d$var$_EventStream_resolveEndPromise,
            resolve,
            'f',
          );
          $57283e5fbe9cf52d$var$__classPrivateFieldSet(
            this,
            $57283e5fbe9cf52d$var$_EventStream_rejectEndPromise,
            reject,
            'f',
          );
        }),
        'f',
      );
      // Don't let these promises cause unhandled rejection errors.
      // we will manually cause an unhandled rejection error later
      // if the user hasn't registered any error listener or called
      // any promise-returning method.
      $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_connectedPromise,
        'f',
      ).catch(() => {});
      $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_endPromise,
        'f',
      ).catch(() => {});
    }
    _run(executor) {
      // Unfortunately if we call `executor()` immediately we get runtime errors about
      // references to `this` before the `super()` constructor call returns.
      setTimeout(() => {
        executor().then(
          () => {
            this._emitFinal();
            this._emit('end');
          },
          $57283e5fbe9cf52d$var$__classPrivateFieldGet(
            this,
            $57283e5fbe9cf52d$var$_EventStream_instances,
            'm',
            $57283e5fbe9cf52d$var$_EventStream_handleError,
          ).bind(this),
        );
      }, 0);
    }
    _connected() {
      if (this.ended) return;
      $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_resolveConnectedPromise,
        'f',
      ).call(this);
      this._emit('connect');
    }
    get ended() {
      return $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_ended,
        'f',
      );
    }
    get errored() {
      return $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_errored,
        'f',
      );
    }
    get aborted() {
      return $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_aborted,
        'f',
      );
    }
    abort() {
      this.controller.abort();
    }
    /**
     * Adds the listener function to the end of the listeners array for the event.
     * No checks are made to see if the listener has already been added. Multiple calls passing
     * the same combination of event and listener will result in the listener being added, and
     * called, multiple times.
     * @returns this ChatCompletionStream, so that calls can be chained
     */ on(event, listener) {
      const listeners =
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_listeners,
          'f',
        )[event] ||
        ($57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_listeners,
          'f',
        )[event] = []);
      listeners.push({
        listener: listener,
      });
      return this;
    }
    /**
     * Removes the specified listener from the listener array for the event.
     * off() will remove, at most, one instance of a listener from the listener array. If any single
     * listener has been added multiple times to the listener array for the specified event, then
     * off() must be called multiple times to remove each instance.
     * @returns this ChatCompletionStream, so that calls can be chained
     */ off(event, listener) {
      const listeners = $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_listeners,
        'f',
      )[event];
      if (!listeners) return this;
      const index = listeners.findIndex((l) => l.listener === listener);
      if (index >= 0) listeners.splice(index, 1);
      return this;
    }
    /**
     * Adds a one-time listener function for the event. The next time the event is triggered,
     * this listener is removed and then invoked.
     * @returns this ChatCompletionStream, so that calls can be chained
     */ once(event, listener) {
      const listeners =
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_listeners,
          'f',
        )[event] ||
        ($57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_listeners,
          'f',
        )[event] = []);
      listeners.push({
        listener: listener,
        once: true,
      });
      return this;
    }
    /**
     * This is similar to `.once()`, but returns a Promise that resolves the next time
     * the event is triggered, instead of calling a listener callback.
     * @returns a Promise that resolves the next time given event is triggered,
     * or rejects if an error is emitted.  (If you request the 'error' event,
     * returns a promise that resolves with the error).
     *
     * Example:
     *
     *   const message = await stream.emitted('message') // rejects if the stream errors
     */ emitted(event) {
      return new Promise((resolve, reject) => {
        $57283e5fbe9cf52d$var$__classPrivateFieldSet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_catchingPromiseCreated,
          true,
          'f',
        );
        if (event !== 'error') this.once('error', reject);
        this.once(event, resolve);
      });
    }
    async done() {
      $57283e5fbe9cf52d$var$__classPrivateFieldSet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_catchingPromiseCreated,
        true,
        'f',
      );
      await $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_endPromise,
        'f',
      );
    }
    _emit(event, ...args) {
      // make sure we don't emit any events after end
      if (
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_ended,
          'f',
        )
      )
        return;
      if (event === 'end') {
        $57283e5fbe9cf52d$var$__classPrivateFieldSet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_ended,
          true,
          'f',
        );
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_resolveEndPromise,
          'f',
        ).call(this);
      }
      const listeners = $57283e5fbe9cf52d$var$__classPrivateFieldGet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_listeners,
        'f',
      )[event];
      if (listeners) {
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_listeners,
          'f',
        )[event] = listeners.filter((l) => !l.once);
        listeners.forEach(({ listener: listener }) => listener(...args));
      }
      if (event === 'abort') {
        const error = args[0];
        if (
          !$57283e5fbe9cf52d$var$__classPrivateFieldGet(
            this,
            $57283e5fbe9cf52d$var$_EventStream_catchingPromiseCreated,
            'f',
          ) &&
          !listeners?.length
        )
          Promise.reject(error);
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_rejectConnectedPromise,
          'f',
        ).call(this, error);
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_rejectEndPromise,
          'f',
        ).call(this, error);
        this._emit('end');
        return;
      }
      if (event === 'error') {
        // NOTE: _emit('error', error) should only be called from #handleError().
        const error = args[0];
        if (
          !$57283e5fbe9cf52d$var$__classPrivateFieldGet(
            this,
            $57283e5fbe9cf52d$var$_EventStream_catchingPromiseCreated,
            'f',
          ) &&
          !listeners?.length
        )
          // Trigger an unhandled rejection if the user hasn't registered any error handlers.
          // If you are seeing stack traces here, make sure to handle errors via either:
          // - runner.on('error', () => ...)
          // - await runner.done()
          // - await runner.finalChatCompletion()
          // - etc.
          Promise.reject(error);
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_rejectConnectedPromise,
          'f',
        ).call(this, error);
        $57283e5fbe9cf52d$var$__classPrivateFieldGet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_rejectEndPromise,
          'f',
        ).call(this, error);
        this._emit('end');
      }
    }
    _emitFinal() {}
  }
  module.exports.EventStream = $57283e5fbe9cf52d$var$EventStream;
  ($57283e5fbe9cf52d$var$_EventStream_connectedPromise = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_resolveConnectedPromise = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_rejectConnectedPromise = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_endPromise = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_resolveEndPromise = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_rejectEndPromise = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_listeners = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_ended = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_errored = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_aborted = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_catchingPromiseCreated = new WeakMap()),
    ($57283e5fbe9cf52d$var$_EventStream_instances = new WeakSet()),
    ($57283e5fbe9cf52d$var$_EventStream_handleError = function _EventStream_handleError(error) {
      $57283e5fbe9cf52d$var$__classPrivateFieldSet(
        this,
        $57283e5fbe9cf52d$var$_EventStream_errored,
        true,
        'f',
      );
      if (error instanceof Error && error.name === 'AbortError')
        error = new $eK9Mf.APIUserAbortError();
      if (error instanceof $eK9Mf.APIUserAbortError) {
        $57283e5fbe9cf52d$var$__classPrivateFieldSet(
          this,
          $57283e5fbe9cf52d$var$_EventStream_aborted,
          true,
          'f',
        );
        return this._emit('abort', error);
      }
      if (error instanceof $eK9Mf.OpenAIError) return this._emit('error', error);
      if (error instanceof Error) {
        const openAIError = new $eK9Mf.OpenAIError(error.message);
        // @ts-ignore
        openAIError.cause = error;
        return this._emit('error', openAIError);
      }
      return this._emit('error', new $eK9Mf.OpenAIError(String(error)));
    });
});

parcelRegister('5sdCJ', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.validateInputTools =
    module.exports.hasAutoParseableInput =
    module.exports.shouldParseToolCall =
    module.exports.parseChatCompletion =
    module.exports.maybeParseChatCompletion =
    module.exports.isAutoParsableTool =
    module.exports.makeParseableTool =
    module.exports.isAutoParsableResponseFormat =
    module.exports.makeParseableResponseFormat =
      void 0;

  var $eK9Mf = parcelRequire('eK9Mf');
  function $3f8a22a9a07b787b$var$makeParseableResponseFormat(response_format, parser) {
    const obj = {
      ...response_format,
    };
    Object.defineProperties(obj, {
      $brand: {
        value: 'auto-parseable-response-format',
        enumerable: false,
      },
      $parseRaw: {
        value: parser,
        enumerable: false,
      },
    });
    return obj;
  }
  module.exports.makeParseableResponseFormat = $3f8a22a9a07b787b$var$makeParseableResponseFormat;
  function $3f8a22a9a07b787b$var$isAutoParsableResponseFormat(response_format) {
    return response_format?.['$brand'] === 'auto-parseable-response-format';
  }
  module.exports.isAutoParsableResponseFormat = $3f8a22a9a07b787b$var$isAutoParsableResponseFormat;
  function $3f8a22a9a07b787b$var$makeParseableTool(tool, { parser: parser, callback: callback }) {
    const obj = {
      ...tool,
    };
    Object.defineProperties(obj, {
      $brand: {
        value: 'auto-parseable-tool',
        enumerable: false,
      },
      $parseRaw: {
        value: parser,
        enumerable: false,
      },
      $callback: {
        value: callback,
        enumerable: false,
      },
    });
    return obj;
  }
  module.exports.makeParseableTool = $3f8a22a9a07b787b$var$makeParseableTool;
  function $3f8a22a9a07b787b$var$isAutoParsableTool(tool) {
    return tool?.['$brand'] === 'auto-parseable-tool';
  }
  module.exports.isAutoParsableTool = $3f8a22a9a07b787b$var$isAutoParsableTool;
  function $3f8a22a9a07b787b$var$maybeParseChatCompletion(completion, params) {
    if (!params || !$3f8a22a9a07b787b$var$hasAutoParseableInput(params))
      return {
        ...completion,
        choices: completion.choices.map((choice) => ({
          ...choice,
          message: {
            ...choice.message,
            parsed: null,
            tool_calls: choice.message.tool_calls ?? [],
          },
        })),
      };
    return $3f8a22a9a07b787b$var$parseChatCompletion(completion, params);
  }
  module.exports.maybeParseChatCompletion = $3f8a22a9a07b787b$var$maybeParseChatCompletion;
  function $3f8a22a9a07b787b$var$parseChatCompletion(completion, params) {
    const choices = completion.choices.map((choice) => {
      if (choice.finish_reason === 'length') throw new $eK9Mf.LengthFinishReasonError();
      if (choice.finish_reason === 'content_filter')
        throw new $eK9Mf.ContentFilterFinishReasonError();
      return {
        ...choice,
        message: {
          ...choice.message,
          tool_calls:
            choice.message.tool_calls?.map((toolCall) =>
              $3f8a22a9a07b787b$var$parseToolCall(params, toolCall),
            ) ?? [],
          parsed:
            choice.message.content && !choice.message.refusal
              ? $3f8a22a9a07b787b$var$parseResponseFormat(params, choice.message.content)
              : null,
        },
      };
    });
    return {
      ...completion,
      choices: choices,
    };
  }
  module.exports.parseChatCompletion = $3f8a22a9a07b787b$var$parseChatCompletion;
  function $3f8a22a9a07b787b$var$parseResponseFormat(params, content) {
    if (params.response_format?.type !== 'json_schema') return null;
    if (params.response_format?.type === 'json_schema') {
      if ('$parseRaw' in params.response_format) {
        const response_format = params.response_format;
        return response_format.$parseRaw(content);
      }
      return JSON.parse(content);
    }
    return null;
  }
  function $3f8a22a9a07b787b$var$parseToolCall(params, toolCall) {
    const inputTool = params.tools?.find(
      (inputTool) => inputTool.function?.name === toolCall.function.name,
    );
    return {
      ...toolCall,
      function: {
        ...toolCall.function,
        parsed_arguments: $3f8a22a9a07b787b$var$isAutoParsableTool(inputTool)
          ? inputTool.$parseRaw(toolCall.function.arguments)
          : inputTool?.function.strict
            ? JSON.parse(toolCall.function.arguments)
            : null,
      },
    };
  }
  function $3f8a22a9a07b787b$var$shouldParseToolCall(params, toolCall) {
    if (!params) return false;
    const inputTool = params.tools?.find(
      (inputTool) => inputTool.function?.name === toolCall.function.name,
    );
    return (
      $3f8a22a9a07b787b$var$isAutoParsableTool(inputTool) || inputTool?.function.strict || false
    );
  }
  module.exports.shouldParseToolCall = $3f8a22a9a07b787b$var$shouldParseToolCall;
  function $3f8a22a9a07b787b$var$hasAutoParseableInput(params) {
    if ($3f8a22a9a07b787b$var$isAutoParsableResponseFormat(params.response_format)) return true;
    return (
      params.tools?.some(
        (t) =>
          $3f8a22a9a07b787b$var$isAutoParsableTool(t) ||
          (t.type === 'function' && t.function.strict === true),
      ) ?? false
    );
  }
  module.exports.hasAutoParseableInput = $3f8a22a9a07b787b$var$hasAutoParseableInput;
  function $3f8a22a9a07b787b$var$validateInputTools(tools) {
    for (const tool of tools ?? []) {
      if (tool.type !== 'function')
        throw new $eK9Mf.OpenAIError(
          `Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``,
        );
      if (tool.function.strict !== true)
        throw new $eK9Mf.OpenAIError(
          `The \`${tool.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`,
        );
    }
  }
  module.exports.validateInputTools = $3f8a22a9a07b787b$var$validateInputTools;
});

parcelRegister('ajlBJ', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.ChatCompletionStreamingRunner = void 0;

  var $elo0k = parcelRequire('elo0k');
  class $781c7087a4b7844b$var$ChatCompletionStreamingRunner extends $elo0k.ChatCompletionStream {
    static fromReadableStream(stream) {
      const runner = new $781c7087a4b7844b$var$ChatCompletionStreamingRunner(null);
      runner._run(() => runner._fromReadableStream(stream));
      return runner;
    }
    /** @deprecated - please use `runTools` instead. */ static runFunctions(
      client,
      params,
      options,
    ) {
      const runner = new $781c7087a4b7844b$var$ChatCompletionStreamingRunner(null);
      const opts = {
        ...options,
        headers: {
          ...options?.headers,
          'X-Stainless-Helper-Method': 'runFunctions',
        },
      };
      runner._run(() => runner._runFunctions(client, params, opts));
      return runner;
    }
    static runTools(client, params, options) {
      const runner = new $781c7087a4b7844b$var$ChatCompletionStreamingRunner(params); // @ts-expect-error TODO these types are incompatible
      const opts = {
        ...options,
        headers: {
          ...options?.headers,
          'X-Stainless-Helper-Method': 'runTools',
        },
      };
      runner._run(() => runner._runTools(client, params, opts));
      return runner;
    }
  }
  module.exports.ChatCompletionStreamingRunner =
    $781c7087a4b7844b$var$ChatCompletionStreamingRunner;
});
parcelRegister('elo0k', function (module, exports) {
  'use strict';
  var $a715a59d020828a5$var$__classPrivateFieldSet =
    (module.exports && module.exports.__classPrivateFieldSet) ||
    function (receiver, state, value, kind, f) {
      if (kind === 'm') throw new TypeError('Private method is not writable');
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot write private member to an object whose class did not declare it',
        );
      return (
        kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
        value
      );
    };
  var $a715a59d020828a5$var$__classPrivateFieldGet =
    (module.exports && module.exports.__classPrivateFieldGet) ||
    function (receiver, state, kind, f) {
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it',
        );
      return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
  var $a715a59d020828a5$var$_ChatCompletionStream_instances,
    $a715a59d020828a5$var$_ChatCompletionStream_params,
    $a715a59d020828a5$var$_ChatCompletionStream_choiceEventStates,
    $a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot,
    $a715a59d020828a5$var$_ChatCompletionStream_beginRequest,
    $a715a59d020828a5$var$_ChatCompletionStream_getChoiceEventState,
    $a715a59d020828a5$var$_ChatCompletionStream_addChunk,
    $a715a59d020828a5$var$_ChatCompletionStream_emitToolCallDoneEvent,
    $a715a59d020828a5$var$_ChatCompletionStream_emitContentDoneEvents,
    $a715a59d020828a5$var$_ChatCompletionStream_endRequest,
    $a715a59d020828a5$var$_ChatCompletionStream_getAutoParseableResponseFormat,
    $a715a59d020828a5$var$_ChatCompletionStream_accumulateChatCompletion;
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.ChatCompletionStream = void 0;

  var $eK9Mf = parcelRequire('eK9Mf');

  var $4II4O = parcelRequire('4II4O');

  var $9zADT = parcelRequire('9zADT');

  var $5sdCJ = parcelRequire('5sdCJ');

  var $dcUDn = parcelRequire('dcUDn');
  class $a715a59d020828a5$var$ChatCompletionStream extends $4II4O.AbstractChatCompletionRunner {
    constructor(params) {
      super();
      $a715a59d020828a5$var$_ChatCompletionStream_instances.add(this);
      $a715a59d020828a5$var$_ChatCompletionStream_params.set(this, void 0);
      $a715a59d020828a5$var$_ChatCompletionStream_choiceEventStates.set(this, void 0);
      $a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot.set(this, void 0);
      $a715a59d020828a5$var$__classPrivateFieldSet(
        this,
        $a715a59d020828a5$var$_ChatCompletionStream_params,
        params,
        'f',
      );
      $a715a59d020828a5$var$__classPrivateFieldSet(
        this,
        $a715a59d020828a5$var$_ChatCompletionStream_choiceEventStates,
        [],
        'f',
      );
    }
    get currentChatCompletionSnapshot() {
      return $a715a59d020828a5$var$__classPrivateFieldGet(
        this,
        $a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot,
        'f',
      );
    }
    /**
     * Intended for use on the frontend, consuming a stream produced with
     * `.toReadableStream()` on the backend.
     *
     * Note that messages sent to the model do not appear in `.on('message')`
     * in this context.
     */ static fromReadableStream(stream) {
      const runner = new $a715a59d020828a5$var$ChatCompletionStream(null);
      runner._run(() => runner._fromReadableStream(stream));
      return runner;
    }
    static createChatCompletion(client, params, options) {
      const runner = new $a715a59d020828a5$var$ChatCompletionStream(params);
      runner._run(() =>
        runner._runChatCompletion(
          client,
          {
            ...params,
            stream: true,
          },
          {
            ...options,
            headers: {
              ...options?.headers,
              'X-Stainless-Helper-Method': 'stream',
            },
          },
        ),
      );
      return runner;
    }
    async _createChatCompletion(client, params, options) {
      super._createChatCompletion;
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted) this.controller.abort();
        signal.addEventListener('abort', () => this.controller.abort());
      }
      $a715a59d020828a5$var$__classPrivateFieldGet(
        this,
        $a715a59d020828a5$var$_ChatCompletionStream_instances,
        'm',
        $a715a59d020828a5$var$_ChatCompletionStream_beginRequest,
      ).call(this);
      const stream = await client.chat.completions.create(
        {
          ...params,
          stream: true,
        },
        {
          ...options,
          signal: this.controller.signal,
        },
      );
      this._connected();
      for await (const chunk of stream)
        $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_instances,
          'm',
          $a715a59d020828a5$var$_ChatCompletionStream_addChunk,
        ).call(this, chunk);
      if (stream.controller.signal?.aborted) throw new $eK9Mf.APIUserAbortError();
      return this._addChatCompletion(
        $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_instances,
          'm',
          $a715a59d020828a5$var$_ChatCompletionStream_endRequest,
        ).call(this),
      );
    }
    async _fromReadableStream(readableStream, options) {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted) this.controller.abort();
        signal.addEventListener('abort', () => this.controller.abort());
      }
      $a715a59d020828a5$var$__classPrivateFieldGet(
        this,
        $a715a59d020828a5$var$_ChatCompletionStream_instances,
        'm',
        $a715a59d020828a5$var$_ChatCompletionStream_beginRequest,
      ).call(this);
      this._connected();
      const stream = $9zADT.Stream.fromReadableStream(readableStream, this.controller);
      let chatId;
      for await (const chunk of stream) {
        if (chatId && chatId !== chunk.id)
          // A new request has been made.
          this._addChatCompletion(
            $a715a59d020828a5$var$__classPrivateFieldGet(
              this,
              $a715a59d020828a5$var$_ChatCompletionStream_instances,
              'm',
              $a715a59d020828a5$var$_ChatCompletionStream_endRequest,
            ).call(this),
          );
        $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_instances,
          'm',
          $a715a59d020828a5$var$_ChatCompletionStream_addChunk,
        ).call(this, chunk);
        chatId = chunk.id;
      }
      if (stream.controller.signal?.aborted) throw new $eK9Mf.APIUserAbortError();
      return this._addChatCompletion(
        $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_instances,
          'm',
          $a715a59d020828a5$var$_ChatCompletionStream_endRequest,
        ).call(this),
      );
    }
    [(($a715a59d020828a5$var$_ChatCompletionStream_params = new WeakMap()),
    ($a715a59d020828a5$var$_ChatCompletionStream_choiceEventStates = new WeakMap()),
    ($a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot = new WeakMap()),
    ($a715a59d020828a5$var$_ChatCompletionStream_instances = new WeakSet()),
    ($a715a59d020828a5$var$_ChatCompletionStream_beginRequest =
      function _ChatCompletionStream_beginRequest() {
        if (this.ended) return;
        $a715a59d020828a5$var$__classPrivateFieldSet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot,
          undefined,
          'f',
        );
      }),
    ($a715a59d020828a5$var$_ChatCompletionStream_getChoiceEventState =
      function _ChatCompletionStream_getChoiceEventState(choice) {
        let state = $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_choiceEventStates,
          'f',
        )[choice.index];
        if (state) return state;
        state = {
          content_done: false,
          refusal_done: false,
          logprobs_content_done: false,
          logprobs_refusal_done: false,
          done_tool_calls: new Set(),
          current_tool_call_index: null,
        };
        $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_choiceEventStates,
          'f',
        )[choice.index] = state;
        return state;
      }),
    ($a715a59d020828a5$var$_ChatCompletionStream_addChunk = function _ChatCompletionStream_addChunk(
      chunk,
    ) {
      if (this.ended) return;
      const completion = $a715a59d020828a5$var$__classPrivateFieldGet(
        this,
        $a715a59d020828a5$var$_ChatCompletionStream_instances,
        'm',
        $a715a59d020828a5$var$_ChatCompletionStream_accumulateChatCompletion,
      ).call(this, chunk);
      this._emit('chunk', chunk, completion);
      for (const choice of chunk.choices) {
        const choiceSnapshot = completion.choices[choice.index];
        if (
          choice.delta.content != null &&
          choiceSnapshot.message?.role === 'assistant' &&
          choiceSnapshot.message?.content
        ) {
          this._emit('content', choice.delta.content, choiceSnapshot.message.content);
          this._emit('content.delta', {
            delta: choice.delta.content,
            snapshot: choiceSnapshot.message.content,
            parsed: choiceSnapshot.message.parsed,
          });
        }
        if (
          choice.delta.refusal != null &&
          choiceSnapshot.message?.role === 'assistant' &&
          choiceSnapshot.message?.refusal
        )
          this._emit('refusal.delta', {
            delta: choice.delta.refusal,
            snapshot: choiceSnapshot.message.refusal,
          });
        if (choice.logprobs?.content != null && choiceSnapshot.message?.role === 'assistant')
          this._emit('logprobs.content.delta', {
            content: choice.logprobs?.content,
            snapshot: choiceSnapshot.logprobs?.content ?? [],
          });
        if (choice.logprobs?.refusal != null && choiceSnapshot.message?.role === 'assistant')
          this._emit('logprobs.refusal.delta', {
            refusal: choice.logprobs?.refusal,
            snapshot: choiceSnapshot.logprobs?.refusal ?? [],
          });
        const state = $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_instances,
          'm',
          $a715a59d020828a5$var$_ChatCompletionStream_getChoiceEventState,
        ).call(this, choiceSnapshot);
        if (choiceSnapshot.finish_reason) {
          $a715a59d020828a5$var$__classPrivateFieldGet(
            this,
            $a715a59d020828a5$var$_ChatCompletionStream_instances,
            'm',
            $a715a59d020828a5$var$_ChatCompletionStream_emitContentDoneEvents,
          ).call(this, choiceSnapshot);
          if (state.current_tool_call_index != null)
            $a715a59d020828a5$var$__classPrivateFieldGet(
              this,
              $a715a59d020828a5$var$_ChatCompletionStream_instances,
              'm',
              $a715a59d020828a5$var$_ChatCompletionStream_emitToolCallDoneEvent,
            ).call(this, choiceSnapshot, state.current_tool_call_index);
        }
        for (const toolCall of choice.delta.tool_calls ?? []) {
          if (state.current_tool_call_index !== toolCall.index) {
            $a715a59d020828a5$var$__classPrivateFieldGet(
              this,
              $a715a59d020828a5$var$_ChatCompletionStream_instances,
              'm',
              $a715a59d020828a5$var$_ChatCompletionStream_emitContentDoneEvents,
            ).call(this, choiceSnapshot);
            // new tool call started, the previous one is done
            if (state.current_tool_call_index != null)
              $a715a59d020828a5$var$__classPrivateFieldGet(
                this,
                $a715a59d020828a5$var$_ChatCompletionStream_instances,
                'm',
                $a715a59d020828a5$var$_ChatCompletionStream_emitToolCallDoneEvent,
              ).call(this, choiceSnapshot, state.current_tool_call_index);
          }
          state.current_tool_call_index = toolCall.index;
        }
        for (const toolCallDelta of choice.delta.tool_calls ?? []) {
          const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallDelta.index];
          if (!toolCallSnapshot?.type) continue;
          if (toolCallSnapshot?.type === 'function')
            this._emit('tool_calls.function.arguments.delta', {
              name: toolCallSnapshot.function?.name,
              index: toolCallDelta.index,
              arguments: toolCallSnapshot.function.arguments,
              parsed_arguments: toolCallSnapshot.function.parsed_arguments,
              arguments_delta: toolCallDelta.function?.arguments ?? '',
            });
          else $a715a59d020828a5$var$assertNever(toolCallSnapshot?.type);
        }
      }
    }),
    ($a715a59d020828a5$var$_ChatCompletionStream_emitToolCallDoneEvent =
      function _ChatCompletionStream_emitToolCallDoneEvent(choiceSnapshot, toolCallIndex) {
        const state = $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_instances,
          'm',
          $a715a59d020828a5$var$_ChatCompletionStream_getChoiceEventState,
        ).call(this, choiceSnapshot);
        if (state.done_tool_calls.has(toolCallIndex))
          // we've already fired the done event
          return;
        const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallIndex];
        if (!toolCallSnapshot) throw new Error('no tool call snapshot');
        if (!toolCallSnapshot.type) throw new Error('tool call snapshot missing `type`');
        if (toolCallSnapshot.type === 'function') {
          const inputTool = $a715a59d020828a5$var$__classPrivateFieldGet(
            this,
            $a715a59d020828a5$var$_ChatCompletionStream_params,
            'f',
          )?.tools?.find(
            (tool) =>
              tool.type === 'function' && tool.function.name === toolCallSnapshot.function.name,
          );
          this._emit('tool_calls.function.arguments.done', {
            name: toolCallSnapshot.function.name,
            index: toolCallIndex,
            arguments: toolCallSnapshot.function.arguments,
            parsed_arguments: (0, $5sdCJ.isAutoParsableTool)(inputTool)
              ? inputTool.$parseRaw(toolCallSnapshot.function.arguments)
              : inputTool?.function.strict
                ? JSON.parse(toolCallSnapshot.function.arguments)
                : null,
          });
        } else $a715a59d020828a5$var$assertNever(toolCallSnapshot.type);
      }),
    ($a715a59d020828a5$var$_ChatCompletionStream_emitContentDoneEvents =
      function _ChatCompletionStream_emitContentDoneEvents(choiceSnapshot) {
        const state = $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_instances,
          'm',
          $a715a59d020828a5$var$_ChatCompletionStream_getChoiceEventState,
        ).call(this, choiceSnapshot);
        if (choiceSnapshot.message.content && !state.content_done) {
          state.content_done = true;
          const responseFormat = $a715a59d020828a5$var$__classPrivateFieldGet(
            this,
            $a715a59d020828a5$var$_ChatCompletionStream_instances,
            'm',
            $a715a59d020828a5$var$_ChatCompletionStream_getAutoParseableResponseFormat,
          ).call(this);
          this._emit('content.done', {
            content: choiceSnapshot.message.content,
            parsed: responseFormat
              ? responseFormat.$parseRaw(choiceSnapshot.message.content)
              : null,
          });
        }
        if (choiceSnapshot.message.refusal && !state.refusal_done) {
          state.refusal_done = true;
          this._emit('refusal.done', {
            refusal: choiceSnapshot.message.refusal,
          });
        }
        if (choiceSnapshot.logprobs?.content && !state.logprobs_content_done) {
          state.logprobs_content_done = true;
          this._emit('logprobs.content.done', {
            content: choiceSnapshot.logprobs.content,
          });
        }
        if (choiceSnapshot.logprobs?.refusal && !state.logprobs_refusal_done) {
          state.logprobs_refusal_done = true;
          this._emit('logprobs.refusal.done', {
            refusal: choiceSnapshot.logprobs.refusal,
          });
        }
      }),
    ($a715a59d020828a5$var$_ChatCompletionStream_endRequest =
      function _ChatCompletionStream_endRequest() {
        if (this.ended) throw new $eK9Mf.OpenAIError(`stream has ended, this shouldn't happen`);
        const snapshot = $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot,
          'f',
        );
        if (!snapshot) throw new $eK9Mf.OpenAIError(`request ended without sending any chunks`);
        $a715a59d020828a5$var$__classPrivateFieldSet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot,
          undefined,
          'f',
        );
        $a715a59d020828a5$var$__classPrivateFieldSet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_choiceEventStates,
          [],
          'f',
        );
        return $a715a59d020828a5$var$finalizeChatCompletion(
          snapshot,
          $a715a59d020828a5$var$__classPrivateFieldGet(
            this,
            $a715a59d020828a5$var$_ChatCompletionStream_params,
            'f',
          ),
        );
      }),
    ($a715a59d020828a5$var$_ChatCompletionStream_getAutoParseableResponseFormat =
      function _ChatCompletionStream_getAutoParseableResponseFormat() {
        const responseFormat = $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_params,
          'f',
        )?.response_format;
        if ((0, $5sdCJ.isAutoParsableResponseFormat)(responseFormat)) return responseFormat;
        return null;
      }),
    ($a715a59d020828a5$var$_ChatCompletionStream_accumulateChatCompletion =
      function _ChatCompletionStream_accumulateChatCompletion(chunk) {
        var _a, _b, _c, _d;
        let snapshot = $a715a59d020828a5$var$__classPrivateFieldGet(
          this,
          $a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot,
          'f',
        );
        const { choices: choices, ...rest } = chunk;
        if (!snapshot)
          snapshot = $a715a59d020828a5$var$__classPrivateFieldSet(
            this,
            $a715a59d020828a5$var$_ChatCompletionStream_currentChatCompletionSnapshot,
            {
              ...rest,
              choices: [],
            },
            'f',
          );
        else Object.assign(snapshot, rest);
        for (const {
          delta: delta,
          finish_reason: finish_reason,
          index: index,
          logprobs: logprobs = null,
          ...other
        } of chunk.choices) {
          let choice = snapshot.choices[index];
          if (!choice)
            choice = snapshot.choices[index] = {
              finish_reason: finish_reason,
              index: index,
              message: {},
              logprobs: logprobs,
              ...other,
            };
          if (logprobs) {
            if (!choice.logprobs) choice.logprobs = Object.assign({}, logprobs);
            else {
              const { content: content, refusal: refusal, ...rest } = logprobs;
              $a715a59d020828a5$var$assertIsEmpty(rest);
              Object.assign(choice.logprobs, rest);
              if (content) {
                (_a = choice.logprobs).content ?? (_a.content = []);
                choice.logprobs.content.push(...content);
              }
              if (refusal) {
                (_b = choice.logprobs).refusal ?? (_b.refusal = []);
                choice.logprobs.refusal.push(...refusal);
              }
            }
          }
          if (finish_reason) {
            choice.finish_reason = finish_reason;
            if (
              $a715a59d020828a5$var$__classPrivateFieldGet(
                this,
                $a715a59d020828a5$var$_ChatCompletionStream_params,
                'f',
              ) &&
              (0, $5sdCJ.hasAutoParseableInput)(
                $a715a59d020828a5$var$__classPrivateFieldGet(
                  this,
                  $a715a59d020828a5$var$_ChatCompletionStream_params,
                  'f',
                ),
              )
            ) {
              if (finish_reason === 'length') throw new $eK9Mf.LengthFinishReasonError();
              if (finish_reason === 'content_filter')
                throw new $eK9Mf.ContentFilterFinishReasonError();
            }
          }
          Object.assign(choice, other);
          if (!delta) continue; // Shouldn't happen; just in case.
          const {
            content: content,
            refusal: refusal,
            function_call: function_call,
            role: role,
            tool_calls: tool_calls,
            ...rest
          } = delta;
          $a715a59d020828a5$var$assertIsEmpty(rest);
          Object.assign(choice.message, rest);
          if (refusal) choice.message.refusal = (choice.message.refusal || '') + refusal;
          if (role) choice.message.role = role;
          if (function_call) {
            if (!choice.message.function_call) choice.message.function_call = function_call;
            else {
              if (function_call.name) choice.message.function_call.name = function_call.name;
              if (function_call.arguments) {
                (_c = choice.message.function_call).arguments ?? (_c.arguments = '');
                choice.message.function_call.arguments += function_call.arguments;
              }
            }
          }
          if (content) {
            choice.message.content = (choice.message.content || '') + content;
            if (
              !choice.message.refusal &&
              $a715a59d020828a5$var$__classPrivateFieldGet(
                this,
                $a715a59d020828a5$var$_ChatCompletionStream_instances,
                'm',
                $a715a59d020828a5$var$_ChatCompletionStream_getAutoParseableResponseFormat,
              ).call(this)
            )
              choice.message.parsed = (0, $dcUDn.partialParse)(choice.message.content);
          }
          if (tool_calls) {
            if (!choice.message.tool_calls) choice.message.tool_calls = [];
            for (const { index: index, id: id, type: type, function: fn, ...rest } of tool_calls) {
              const tool_call = (_d = choice.message.tool_calls)[index] ?? (_d[index] = {});
              Object.assign(tool_call, rest);
              if (id) tool_call.id = id;
              if (type) tool_call.type = type;
              if (fn)
                tool_call.function ??
                  (tool_call.function = {
                    name: fn.name ?? '',
                    arguments: '',
                  });
              if (fn?.name) tool_call.function.name = fn.name;
              if (fn?.arguments) {
                tool_call.function.arguments += fn.arguments;
                if (
                  (0, $5sdCJ.shouldParseToolCall)(
                    $a715a59d020828a5$var$__classPrivateFieldGet(
                      this,
                      $a715a59d020828a5$var$_ChatCompletionStream_params,
                      'f',
                    ),
                    tool_call,
                  )
                )
                  tool_call.function.parsed_arguments = (0, $dcUDn.partialParse)(
                    tool_call.function.arguments,
                  );
              }
            }
          }
        }
        return snapshot;
      }),
    Symbol.asyncIterator)]() {
      const pushQueue = [];
      const readQueue = [];
      let done = false;
      this.on('chunk', (chunk) => {
        const reader = readQueue.shift();
        if (reader) reader.resolve(chunk);
        else pushQueue.push(chunk);
      });
      this.on('end', () => {
        done = true;
        for (const reader of readQueue) reader.resolve(undefined);
        readQueue.length = 0;
      });
      this.on('abort', (err) => {
        done = true;
        for (const reader of readQueue) reader.reject(err);
        readQueue.length = 0;
      });
      this.on('error', (err) => {
        done = true;
        for (const reader of readQueue) reader.reject(err);
        readQueue.length = 0;
      });
      return {
        next: async () => {
          if (!pushQueue.length) {
            if (done)
              return {
                value: undefined,
                done: true,
              };
            return new Promise((resolve, reject) =>
              readQueue.push({
                resolve: resolve,
                reject: reject,
              }),
            ).then((chunk) =>
              chunk
                ? {
                    value: chunk,
                    done: false,
                  }
                : {
                    value: undefined,
                    done: true,
                  },
            );
          }
          const chunk = pushQueue.shift();
          return {
            value: chunk,
            done: false,
          };
        },
        return: async () => {
          this.abort();
          return {
            value: undefined,
            done: true,
          };
        },
      };
    }
    toReadableStream() {
      const stream = new $9zADT.Stream(this[Symbol.asyncIterator].bind(this), this.controller);
      return stream.toReadableStream();
    }
  }
  module.exports.ChatCompletionStream = $a715a59d020828a5$var$ChatCompletionStream;
  function $a715a59d020828a5$var$finalizeChatCompletion(snapshot, params) {
    const {
      id: id,
      choices: choices,
      created: created,
      model: model,
      system_fingerprint: system_fingerprint,
      ...rest
    } = snapshot;
    const completion = {
      ...rest,
      id: id,
      choices: choices.map(
        ({
          message: message,
          finish_reason: finish_reason,
          index: index,
          logprobs: logprobs,
          ...choiceRest
        }) => {
          if (!finish_reason)
            throw new $eK9Mf.OpenAIError(`missing finish_reason for choice ${index}`);
          const {
            content: content = null,
            function_call: function_call,
            tool_calls: tool_calls,
            ...messageRest
          } = message;
          const role = message.role; // this is what we expect; in theory it could be different which would make our types a slight lie but would be fine.
          if (!role) throw new $eK9Mf.OpenAIError(`missing role for choice ${index}`);
          if (function_call) {
            const { arguments: args, name: name } = function_call;
            if (args == null)
              throw new $eK9Mf.OpenAIError(`missing function_call.arguments for choice ${index}`);
            if (!name)
              throw new $eK9Mf.OpenAIError(`missing function_call.name for choice ${index}`);
            return {
              ...choiceRest,
              message: {
                content: content,
                function_call: {
                  arguments: args,
                  name: name,
                },
                role: role,
                refusal: message.refusal ?? null,
              },
              finish_reason: finish_reason,
              index: index,
              logprobs: logprobs,
            };
          }
          if (tool_calls)
            return {
              ...choiceRest,
              index: index,
              finish_reason: finish_reason,
              logprobs: logprobs,
              message: {
                ...messageRest,
                role: role,
                content: content,
                refusal: message.refusal ?? null,
                tool_calls: tool_calls.map((tool_call, i) => {
                  const { function: fn, type: type, id: id, ...toolRest } = tool_call;
                  const { arguments: args, name: name, ...fnRest } = fn || {};
                  if (id == null)
                    throw new $eK9Mf.OpenAIError(
                      `missing choices[${index}].tool_calls[${i}].id\n${$a715a59d020828a5$var$str(snapshot)}`,
                    );
                  if (type == null)
                    throw new $eK9Mf.OpenAIError(
                      `missing choices[${index}].tool_calls[${i}].type\n${$a715a59d020828a5$var$str(snapshot)}`,
                    );
                  if (name == null)
                    throw new $eK9Mf.OpenAIError(
                      `missing choices[${index}].tool_calls[${i}].function.name\n${$a715a59d020828a5$var$str(snapshot)}`,
                    );
                  if (args == null)
                    throw new $eK9Mf.OpenAIError(
                      `missing choices[${index}].tool_calls[${i}].function.arguments\n${$a715a59d020828a5$var$str(snapshot)}`,
                    );
                  return {
                    ...toolRest,
                    id: id,
                    type: type,
                    function: {
                      ...fnRest,
                      name: name,
                      arguments: args,
                    },
                  };
                }),
              },
            };
          return {
            ...choiceRest,
            message: {
              ...messageRest,
              content: content,
              role: role,
              refusal: message.refusal ?? null,
            },
            finish_reason: finish_reason,
            index: index,
            logprobs: logprobs,
          };
        },
      ),
      created: created,
      model: model,
      object: 'chat.completion',
      ...(system_fingerprint
        ? {
            system_fingerprint: system_fingerprint,
          }
        : {}),
    };
    return (0, $5sdCJ.maybeParseChatCompletion)(completion, params);
  }
  function $a715a59d020828a5$var$str(x) {
    return JSON.stringify(x);
  }
  /**
   * Ensures the given argument is an empty object, useful for
   * asserting that all known properties on an object have been
   * destructured.
   */ function $a715a59d020828a5$var$assertIsEmpty(obj) {
    return;
  }
  function $a715a59d020828a5$var$assertNever(_x) {}
});
parcelRegister('dcUDn', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.MalformedJSON = module.exports.PartialJSON = module.exports.partialParse = void 0;
  const $99d853b34be6f92f$var$STR = 1;
  const $99d853b34be6f92f$var$NUM = 2;
  const $99d853b34be6f92f$var$ARR = 4;
  const $99d853b34be6f92f$var$OBJ = 8;
  const $99d853b34be6f92f$var$NULL = 16;
  const $99d853b34be6f92f$var$BOOL = 32;
  const $99d853b34be6f92f$var$NAN = 64;
  const $99d853b34be6f92f$var$INFINITY = 128;
  const $99d853b34be6f92f$var$MINUS_INFINITY = 256;
  const $99d853b34be6f92f$var$INF =
    $99d853b34be6f92f$var$INFINITY | $99d853b34be6f92f$var$MINUS_INFINITY;
  const $99d853b34be6f92f$var$SPECIAL =
    $99d853b34be6f92f$var$NULL |
    $99d853b34be6f92f$var$BOOL |
    $99d853b34be6f92f$var$INF |
    $99d853b34be6f92f$var$NAN;
  const $99d853b34be6f92f$var$ATOM =
    $99d853b34be6f92f$var$STR | $99d853b34be6f92f$var$NUM | $99d853b34be6f92f$var$SPECIAL;
  const $99d853b34be6f92f$var$COLLECTION = $99d853b34be6f92f$var$ARR | $99d853b34be6f92f$var$OBJ;
  const $99d853b34be6f92f$var$ALL = $99d853b34be6f92f$var$ATOM | $99d853b34be6f92f$var$COLLECTION;
  const $99d853b34be6f92f$var$Allow = {
    STR: $99d853b34be6f92f$var$STR,
    NUM: $99d853b34be6f92f$var$NUM,
    ARR: $99d853b34be6f92f$var$ARR,
    OBJ: $99d853b34be6f92f$var$OBJ,
    NULL: $99d853b34be6f92f$var$NULL,
    BOOL: $99d853b34be6f92f$var$BOOL,
    NAN: $99d853b34be6f92f$var$NAN,
    INFINITY: $99d853b34be6f92f$var$INFINITY,
    MINUS_INFINITY: $99d853b34be6f92f$var$MINUS_INFINITY,
    INF: $99d853b34be6f92f$var$INF,
    SPECIAL: $99d853b34be6f92f$var$SPECIAL,
    ATOM: $99d853b34be6f92f$var$ATOM,
    COLLECTION: $99d853b34be6f92f$var$COLLECTION,
    ALL: $99d853b34be6f92f$var$ALL,
  };
  // The JSON string segment was unable to be parsed completely
  class $99d853b34be6f92f$var$PartialJSON extends Error {}
  module.exports.PartialJSON = $99d853b34be6f92f$var$PartialJSON;
  class $99d853b34be6f92f$var$MalformedJSON extends Error {}
  module.exports.MalformedJSON = $99d853b34be6f92f$var$MalformedJSON;
  /**
   * Parse incomplete JSON
   * @param {string} jsonString Partial JSON to be parsed
   * @param {number} allowPartial Specify what types are allowed to be partial, see {@link Allow} for details
   * @returns The parsed JSON
   * @throws {PartialJSON} If the JSON is incomplete (related to the `allow` parameter)
   * @throws {MalformedJSON} If the JSON is malformed
   */ function $99d853b34be6f92f$var$parseJSON(
    jsonString,
    allowPartial = $99d853b34be6f92f$var$Allow.ALL,
  ) {
    if (typeof jsonString !== 'string')
      throw new TypeError(`expecting str, got ${typeof jsonString}`);
    if (!jsonString.trim()) throw new Error(`${jsonString} is empty`);
    return $99d853b34be6f92f$var$_parseJSON(jsonString.trim(), allowPartial);
  }
  const $99d853b34be6f92f$var$_parseJSON = (jsonString, allow) => {
    const length = jsonString.length;
    let index = 0;
    const markPartialJSON = (msg) => {
      throw new $99d853b34be6f92f$var$PartialJSON(`${msg} at position ${index}`);
    };
    const throwMalformedError = (msg) => {
      throw new $99d853b34be6f92f$var$MalformedJSON(`${msg} at position ${index}`);
    };
    const parseAny = () => {
      skipBlank();
      if (index >= length) markPartialJSON('Unexpected end of input');
      if (jsonString[index] === '"') return parseStr();
      if (jsonString[index] === '{') return parseObj();
      if (jsonString[index] === '[') return parseArr();
      if (
        jsonString.substring(index, index + 4) === 'null' ||
        ($99d853b34be6f92f$var$Allow.NULL & allow &&
          length - index < 4 &&
          'null'.startsWith(jsonString.substring(index)))
      ) {
        index += 4;
        return null;
      }
      if (
        jsonString.substring(index, index + 4) === 'true' ||
        ($99d853b34be6f92f$var$Allow.BOOL & allow &&
          length - index < 4 &&
          'true'.startsWith(jsonString.substring(index)))
      ) {
        index += 4;
        return true;
      }
      if (
        jsonString.substring(index, index + 5) === 'false' ||
        ($99d853b34be6f92f$var$Allow.BOOL & allow &&
          length - index < 5 &&
          'false'.startsWith(jsonString.substring(index)))
      ) {
        index += 5;
        return false;
      }
      if (
        jsonString.substring(index, index + 8) === 'Infinity' ||
        ($99d853b34be6f92f$var$Allow.INFINITY & allow &&
          length - index < 8 &&
          'Infinity'.startsWith(jsonString.substring(index)))
      ) {
        index += 8;
        return Infinity;
      }
      if (
        jsonString.substring(index, index + 9) === '-Infinity' ||
        ($99d853b34be6f92f$var$Allow.MINUS_INFINITY & allow &&
          1 < length - index &&
          length - index < 9 &&
          '-Infinity'.startsWith(jsonString.substring(index)))
      ) {
        index += 9;
        return -Infinity;
      }
      if (
        jsonString.substring(index, index + 3) === 'NaN' ||
        ($99d853b34be6f92f$var$Allow.NAN & allow &&
          length - index < 3 &&
          'NaN'.startsWith(jsonString.substring(index)))
      ) {
        index += 3;
        return NaN;
      }
      return parseNum();
    };
    const parseStr = () => {
      const start = index;
      let escape = false;
      index++; // skip initial quote
      while (
        index < length &&
        (jsonString[index] !== '"' || (escape && jsonString[index - 1] === '\\'))
      ) {
        escape = jsonString[index] === '\\' ? !escape : false;
        index++;
      }
      if (jsonString.charAt(index) == '"')
        try {
          return JSON.parse(jsonString.substring(start, ++index - Number(escape)));
        } catch (e) {
          throwMalformedError(String(e));
        }
      else if ($99d853b34be6f92f$var$Allow.STR & allow)
        try {
          return JSON.parse(jsonString.substring(start, index - Number(escape)) + '"');
        } catch (e) {
          // SyntaxError: Invalid escape sequence
          return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf('\\')) + '"');
        }
      markPartialJSON('Unterminated string literal');
    };
    const parseObj = () => {
      index++; // skip initial brace
      skipBlank();
      const obj = {};
      try {
        while (jsonString[index] !== '}') {
          skipBlank();
          if (index >= length && $99d853b34be6f92f$var$Allow.OBJ & allow) return obj;
          const key = parseStr();
          skipBlank();
          index++; // skip colon
          try {
            const value = parseAny();
            Object.defineProperty(obj, key, {
              value: value,
              writable: true,
              enumerable: true,
              configurable: true,
            });
          } catch (e) {
            if ($99d853b34be6f92f$var$Allow.OBJ & allow) return obj;
            else throw e;
          }
          skipBlank();
          if (jsonString[index] === ',') index++; // skip comma
        }
      } catch (e) {
        if ($99d853b34be6f92f$var$Allow.OBJ & allow) return obj;
        else markPartialJSON("Expected '}' at end of object");
      }
      index++; // skip final brace
      return obj;
    };
    const parseArr = () => {
      index++; // skip initial bracket
      const arr = [];
      try {
        while (jsonString[index] !== ']') {
          arr.push(parseAny());
          skipBlank();
          if (jsonString[index] === ',') index++; // skip comma
        }
      } catch (e) {
        if ($99d853b34be6f92f$var$Allow.ARR & allow) return arr;
        markPartialJSON("Expected ']' at end of array");
      }
      index++; // skip final bracket
      return arr;
    };
    const parseNum = () => {
      if (index === 0) {
        if (jsonString === '-' && $99d853b34be6f92f$var$Allow.NUM & allow)
          markPartialJSON("Not sure what '-' is");
        try {
          return JSON.parse(jsonString);
        } catch (e) {
          if ($99d853b34be6f92f$var$Allow.NUM & allow)
            try {
              if ('.' === jsonString[jsonString.length - 1])
                return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf('.')));
              return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf('e')));
            } catch (e) {}
          throwMalformedError(String(e));
        }
      }
      const start = index;
      if (jsonString[index] === '-') index++;
      while (jsonString[index] && !',]}'.includes(jsonString[index])) index++;
      if (index == length && !($99d853b34be6f92f$var$Allow.NUM & allow))
        markPartialJSON('Unterminated number literal');
      try {
        return JSON.parse(jsonString.substring(start, index));
      } catch (e) {
        if (jsonString.substring(start, index) === '-' && $99d853b34be6f92f$var$Allow.NUM & allow)
          markPartialJSON("Not sure what '-' is");
        try {
          return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf('e')));
        } catch (e) {
          throwMalformedError(String(e));
        }
      }
    };
    const skipBlank = () => {
      while (index < length && ' \n\r	'.includes(jsonString[index])) index++;
    };
    return parseAny();
  };
  // using this function with malformed JSON is undefined behavior
  const $99d853b34be6f92f$var$partialParse = (input) =>
    $99d853b34be6f92f$var$parseJSON(
      input,
      $99d853b34be6f92f$var$Allow.ALL ^ $99d853b34be6f92f$var$Allow.NUM,
    );
  module.exports.partialParse = $99d853b34be6f92f$var$partialParse;
});

parcelRegister('4UuAG', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $39341f09452b3385$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $39341f09452b3385$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $39341f09452b3385$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $39341f09452b3385$var$__createBinding(result, mod, k);
      }
      $39341f09452b3385$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Threads = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $bERsK = parcelRequire('bERsK');

  const $39341f09452b3385$var$MessagesAPI = $39341f09452b3385$var$__importStar(
    parcelRequire('2CRVw'),
  );

  const $39341f09452b3385$var$RunsAPI = $39341f09452b3385$var$__importStar(parcelRequire('lCXPx'));

  class $39341f09452b3385$var$Threads extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.runs = new $39341f09452b3385$var$RunsAPI.Runs(this._client);
      this.messages = new $39341f09452b3385$var$MessagesAPI.Messages(this._client);
    }
    create(body = {}, options) {
      if ((0, $25F7z.isRequestOptions)(body)) return this.create({}, body);
      return this._client.post('/threads', {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Retrieves a thread.
     */ retrieve(threadId, options) {
      return this._client.get(`/threads/${threadId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Modifies a thread.
     */ update(threadId, body, options) {
      return this._client.post(`/threads/${threadId}`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Delete a thread.
     */ del(threadId, options) {
      return this._client.delete(`/threads/${threadId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    createAndRun(body, options) {
      return this._client.post('/threads/runs', {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
        stream: body.stream ?? false,
      });
    }
    /**
     * A helper to create a thread, start a run and then poll for a terminal state.
     * More information on Run lifecycles can be found here:
     * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
     */ async createAndRunPoll(body, options) {
      const run = await this.createAndRun(body, options);
      return await this.runs.poll(run.thread_id, run.id, options);
    }
    /**
     * Create a thread and stream the run back
     */ createAndRunStream(body, options) {
      return $bERsK.AssistantStream.createThreadAssistantStream(
        body,
        this._client.beta.threads,
        options,
      );
    }
  }
  module.exports.Threads = $39341f09452b3385$var$Threads;
  $39341f09452b3385$var$Threads.Runs = parcelRequire('lCXPx').Runs;
  $39341f09452b3385$var$Threads.RunsPage = parcelRequire('lCXPx').RunsPage;
  $39341f09452b3385$var$Threads.Messages = parcelRequire('2CRVw').Messages;
  $39341f09452b3385$var$Threads.MessagesPage = parcelRequire('2CRVw').MessagesPage;
});
parcelRegister('bERsK', function (module, exports) {
  'use strict';
  var $87cce6b238037c0d$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $87cce6b238037c0d$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $87cce6b238037c0d$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $87cce6b238037c0d$var$__createBinding(result, mod, k);
      }
      $87cce6b238037c0d$var$__setModuleDefault(result, mod);
      return result;
    };
  var $87cce6b238037c0d$var$__classPrivateFieldGet =
    (module.exports && module.exports.__classPrivateFieldGet) ||
    function (receiver, state, kind, f) {
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it',
        );
      return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
  var $87cce6b238037c0d$var$__classPrivateFieldSet =
    (module.exports && module.exports.__classPrivateFieldSet) ||
    function (receiver, state, value, kind, f) {
      if (kind === 'm') throw new TypeError('Private method is not writable');
      if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
      if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError(
          'Cannot write private member to an object whose class did not declare it',
        );
      return (
        kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
        value
      );
    };
  var $87cce6b238037c0d$var$_AssistantStream_instances,
    $87cce6b238037c0d$var$_AssistantStream_events,
    $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
    $87cce6b238037c0d$var$_AssistantStream_messageSnapshots,
    $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
    $87cce6b238037c0d$var$_AssistantStream_finalRun,
    $87cce6b238037c0d$var$_AssistantStream_currentContentIndex,
    $87cce6b238037c0d$var$_AssistantStream_currentContent,
    $87cce6b238037c0d$var$_AssistantStream_currentToolCallIndex,
    $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
    $87cce6b238037c0d$var$_AssistantStream_currentEvent,
    $87cce6b238037c0d$var$_AssistantStream_currentRunSnapshot,
    $87cce6b238037c0d$var$_AssistantStream_currentRunStepSnapshot,
    $87cce6b238037c0d$var$_AssistantStream_addEvent,
    $87cce6b238037c0d$var$_AssistantStream_endRequest,
    $87cce6b238037c0d$var$_AssistantStream_handleMessage,
    $87cce6b238037c0d$var$_AssistantStream_handleRunStep,
    $87cce6b238037c0d$var$_AssistantStream_handleEvent,
    $87cce6b238037c0d$var$_AssistantStream_accumulateRunStep,
    $87cce6b238037c0d$var$_AssistantStream_accumulateMessage,
    $87cce6b238037c0d$var$_AssistantStream_accumulateContent,
    $87cce6b238037c0d$var$_AssistantStream_handleRun;
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.AssistantStream = void 0;

  const $87cce6b238037c0d$var$Core = $87cce6b238037c0d$var$__importStar(parcelRequire('25F7z'));

  var $9zADT = parcelRequire('9zADT');

  var $eK9Mf = parcelRequire('eK9Mf');

  var $7tW0Y = parcelRequire('7tW0Y');
  class $87cce6b238037c0d$var$AssistantStream extends $7tW0Y.EventStream {
    constructor() {
      super(...arguments);
      $87cce6b238037c0d$var$_AssistantStream_instances.add(this);
      //Track all events in a single list for reference
      $87cce6b238037c0d$var$_AssistantStream_events.set(this, []);
      //Used to accumulate deltas
      //We are accumulating many types so the value here is not strict
      $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots.set(this, {});
      $87cce6b238037c0d$var$_AssistantStream_messageSnapshots.set(this, {});
      $87cce6b238037c0d$var$_AssistantStream_messageSnapshot.set(this, void 0);
      $87cce6b238037c0d$var$_AssistantStream_finalRun.set(this, void 0);
      $87cce6b238037c0d$var$_AssistantStream_currentContentIndex.set(this, void 0);
      $87cce6b238037c0d$var$_AssistantStream_currentContent.set(this, void 0);
      $87cce6b238037c0d$var$_AssistantStream_currentToolCallIndex.set(this, void 0);
      $87cce6b238037c0d$var$_AssistantStream_currentToolCall.set(this, void 0);
      //For current snapshot methods
      $87cce6b238037c0d$var$_AssistantStream_currentEvent.set(this, void 0);
      $87cce6b238037c0d$var$_AssistantStream_currentRunSnapshot.set(this, void 0);
      $87cce6b238037c0d$var$_AssistantStream_currentRunStepSnapshot.set(this, void 0);
    }
    [(($87cce6b238037c0d$var$_AssistantStream_events = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_runStepSnapshots = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_messageSnapshots = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_messageSnapshot = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_finalRun = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_currentContentIndex = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_currentContent = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_currentToolCallIndex = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_currentToolCall = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_currentEvent = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_currentRunSnapshot = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_currentRunStepSnapshot = new WeakMap()),
    ($87cce6b238037c0d$var$_AssistantStream_instances = new WeakSet()),
    Symbol.asyncIterator)]() {
      const pushQueue = [];
      const readQueue = [];
      let done = false;
      //Catch all for passing along all events
      this.on('event', (event) => {
        const reader = readQueue.shift();
        if (reader) reader.resolve(event);
        else pushQueue.push(event);
      });
      this.on('end', () => {
        done = true;
        for (const reader of readQueue) reader.resolve(undefined);
        readQueue.length = 0;
      });
      this.on('abort', (err) => {
        done = true;
        for (const reader of readQueue) reader.reject(err);
        readQueue.length = 0;
      });
      this.on('error', (err) => {
        done = true;
        for (const reader of readQueue) reader.reject(err);
        readQueue.length = 0;
      });
      return {
        next: async () => {
          if (!pushQueue.length) {
            if (done)
              return {
                value: undefined,
                done: true,
              };
            return new Promise((resolve, reject) =>
              readQueue.push({
                resolve: resolve,
                reject: reject,
              }),
            ).then((chunk) =>
              chunk
                ? {
                    value: chunk,
                    done: false,
                  }
                : {
                    value: undefined,
                    done: true,
                  },
            );
          }
          const chunk = pushQueue.shift();
          return {
            value: chunk,
            done: false,
          };
        },
        return: async () => {
          this.abort();
          return {
            value: undefined,
            done: true,
          };
        },
      };
    }
    static fromReadableStream(stream) {
      const runner = new $87cce6b238037c0d$var$AssistantStream();
      runner._run(() => runner._fromReadableStream(stream));
      return runner;
    }
    async _fromReadableStream(readableStream, options) {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted) this.controller.abort();
        signal.addEventListener('abort', () => this.controller.abort());
      }
      this._connected();
      const stream = $9zADT.Stream.fromReadableStream(readableStream, this.controller);
      for await (const event of stream)
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_addEvent,
        ).call(this, event);
      if (stream.controller.signal?.aborted) throw new $eK9Mf.APIUserAbortError();
      return this._addRun(
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_endRequest,
        ).call(this),
      );
    }
    toReadableStream() {
      const stream = new $9zADT.Stream(this[Symbol.asyncIterator].bind(this), this.controller);
      return stream.toReadableStream();
    }
    static createToolAssistantStream(threadId, runId, runs, params, options) {
      const runner = new $87cce6b238037c0d$var$AssistantStream();
      runner._run(() =>
        runner._runToolAssistantStream(threadId, runId, runs, params, {
          ...options,
          headers: {
            ...options?.headers,
            'X-Stainless-Helper-Method': 'stream',
          },
        }),
      );
      return runner;
    }
    async _createToolAssistantStream(run, threadId, runId, params, options) {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted) this.controller.abort();
        signal.addEventListener('abort', () => this.controller.abort());
      }
      const body = {
        ...params,
        stream: true,
      };
      const stream = await run.submitToolOutputs(threadId, runId, body, {
        ...options,
        signal: this.controller.signal,
      });
      this._connected();
      for await (const event of stream)
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_addEvent,
        ).call(this, event);
      if (stream.controller.signal?.aborted) throw new $eK9Mf.APIUserAbortError();
      return this._addRun(
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_endRequest,
        ).call(this),
      );
    }
    static createThreadAssistantStream(params, thread, options) {
      const runner = new $87cce6b238037c0d$var$AssistantStream();
      runner._run(() =>
        runner._threadAssistantStream(params, thread, {
          ...options,
          headers: {
            ...options?.headers,
            'X-Stainless-Helper-Method': 'stream',
          },
        }),
      );
      return runner;
    }
    static createAssistantStream(threadId, runs, params, options) {
      const runner = new $87cce6b238037c0d$var$AssistantStream();
      runner._run(() =>
        runner._runAssistantStream(threadId, runs, params, {
          ...options,
          headers: {
            ...options?.headers,
            'X-Stainless-Helper-Method': 'stream',
          },
        }),
      );
      return runner;
    }
    currentEvent() {
      return $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_currentEvent,
        'f',
      );
    }
    currentRun() {
      return $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_currentRunSnapshot,
        'f',
      );
    }
    currentMessageSnapshot() {
      return $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
        'f',
      );
    }
    currentRunStepSnapshot() {
      return $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_currentRunStepSnapshot,
        'f',
      );
    }
    async finalRunSteps() {
      await this.done();
      return Object.values(
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
          'f',
        ),
      );
    }
    async finalMessages() {
      await this.done();
      return Object.values(
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_messageSnapshots,
          'f',
        ),
      );
    }
    async finalRun() {
      await this.done();
      if (
        !$87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_finalRun,
          'f',
        )
      )
        throw Error('Final run was not received.');
      return $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_finalRun,
        'f',
      );
    }
    async _createThreadAssistantStream(thread, params, options) {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted) this.controller.abort();
        signal.addEventListener('abort', () => this.controller.abort());
      }
      const body = {
        ...params,
        stream: true,
      };
      const stream = await thread.createAndRun(body, {
        ...options,
        signal: this.controller.signal,
      });
      this._connected();
      for await (const event of stream)
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_addEvent,
        ).call(this, event);
      if (stream.controller.signal?.aborted) throw new $eK9Mf.APIUserAbortError();
      return this._addRun(
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_endRequest,
        ).call(this),
      );
    }
    async _createAssistantStream(run, threadId, params, options) {
      const signal = options?.signal;
      if (signal) {
        if (signal.aborted) this.controller.abort();
        signal.addEventListener('abort', () => this.controller.abort());
      }
      const body = {
        ...params,
        stream: true,
      };
      const stream = await run.create(threadId, body, {
        ...options,
        signal: this.controller.signal,
      });
      this._connected();
      for await (const event of stream)
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_addEvent,
        ).call(this, event);
      if (stream.controller.signal?.aborted) throw new $eK9Mf.APIUserAbortError();
      return this._addRun(
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_endRequest,
        ).call(this),
      );
    }
    static accumulateDelta(acc, delta) {
      for (const [key, deltaValue] of Object.entries(delta)) {
        if (!acc.hasOwnProperty(key)) {
          acc[key] = deltaValue;
          continue;
        }
        let accValue = acc[key];
        if (accValue === null || accValue === undefined) {
          acc[key] = deltaValue;
          continue;
        }
        // We don't accumulate these special properties
        if (key === 'index' || key === 'type') {
          acc[key] = deltaValue;
          continue;
        }
        // Type-specific accumulation logic
        if (typeof accValue === 'string' && typeof deltaValue === 'string') accValue += deltaValue;
        else if (typeof accValue === 'number' && typeof deltaValue === 'number')
          accValue += deltaValue;
        else if (
          $87cce6b238037c0d$var$Core.isObj(accValue) &&
          $87cce6b238037c0d$var$Core.isObj(deltaValue)
        )
          accValue = this.accumulateDelta(accValue, deltaValue);
        else if (Array.isArray(accValue) && Array.isArray(deltaValue)) {
          if (accValue.every((x) => typeof x === 'string' || typeof x === 'number')) {
            accValue.push(...deltaValue); // Use spread syntax for efficient addition
            continue;
          }
          for (const deltaEntry of deltaValue) {
            if (!$87cce6b238037c0d$var$Core.isObj(deltaEntry))
              throw new Error(`Expected array delta entry to be an object but got: ${deltaEntry}`);
            const index = deltaEntry['index'];
            if (index == null) {
              console.error(deltaEntry);
              throw new Error('Expected array delta entry to have an `index` property');
            }
            if (typeof index !== 'number')
              throw new Error(
                `Expected array delta entry \`index\` property to be a number but got ${index}`,
              );
            const accEntry = accValue[index];
            if (accEntry == null) accValue.push(deltaEntry);
            else accValue[index] = this.accumulateDelta(accEntry, deltaEntry);
          }
          continue;
        } else
          throw Error(
            `Unhandled record type: ${key}, deltaValue: ${deltaValue}, accValue: ${accValue}`,
          );
        acc[key] = accValue;
      }
      return acc;
    }
    _addRun(run) {
      return run;
    }
    async _threadAssistantStream(params, thread, options) {
      return await this._createThreadAssistantStream(thread, params, options);
    }
    async _runAssistantStream(threadId, runs, params, options) {
      return await this._createAssistantStream(runs, threadId, params, options);
    }
    async _runToolAssistantStream(threadId, runId, runs, params, options) {
      return await this._createToolAssistantStream(runs, threadId, runId, params, options);
    }
  }
  module.exports.AssistantStream = $87cce6b238037c0d$var$AssistantStream;
  ($87cce6b238037c0d$var$_AssistantStream_addEvent = function _AssistantStream_addEvent(event) {
    if (this.ended) return;
    $87cce6b238037c0d$var$__classPrivateFieldSet(
      this,
      $87cce6b238037c0d$var$_AssistantStream_currentEvent,
      event,
      'f',
    );
    $87cce6b238037c0d$var$__classPrivateFieldGet(
      this,
      $87cce6b238037c0d$var$_AssistantStream_instances,
      'm',
      $87cce6b238037c0d$var$_AssistantStream_handleEvent,
    ).call(this, event);
    switch (event.event) {
      case 'thread.created':
        break;
      case 'thread.run.created':
      case 'thread.run.queued':
      case 'thread.run.in_progress':
      case 'thread.run.requires_action':
      case 'thread.run.completed':
      case 'thread.run.failed':
      case 'thread.run.cancelling':
      case 'thread.run.cancelled':
      case 'thread.run.expired':
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_handleRun,
        ).call(this, event);
        break;
      case 'thread.run.step.created':
      case 'thread.run.step.in_progress':
      case 'thread.run.step.delta':
      case 'thread.run.step.completed':
      case 'thread.run.step.failed':
      case 'thread.run.step.cancelled':
      case 'thread.run.step.expired':
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_handleRunStep,
        ).call(this, event);
        break;
      case 'thread.message.created':
      case 'thread.message.in_progress':
      case 'thread.message.delta':
      case 'thread.message.completed':
      case 'thread.message.incomplete':
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_instances,
          'm',
          $87cce6b238037c0d$var$_AssistantStream_handleMessage,
        ).call(this, event);
        break;
      case 'error':
        //This is included for completeness, but errors are processed in the SSE event processing so this should not occur
        throw new Error(
          'Encountered an error event in event processing - errors should be processed earlier',
        );
    }
  }),
    ($87cce6b238037c0d$var$_AssistantStream_endRequest = function _AssistantStream_endRequest() {
      if (this.ended) throw new $eK9Mf.OpenAIError(`stream has ended, this shouldn't happen`);
      if (
        !$87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_finalRun,
          'f',
        )
      )
        throw Error('Final run has not been received');
      return $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_finalRun,
        'f',
      );
    }),
    ($87cce6b238037c0d$var$_AssistantStream_handleMessage = function _AssistantStream_handleMessage(
      event,
    ) {
      const [accumulatedMessage, newContent] = $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_instances,
        'm',
        $87cce6b238037c0d$var$_AssistantStream_accumulateMessage,
      ).call(
        this,
        event,
        $87cce6b238037c0d$var$__classPrivateFieldGet(
          this,
          $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
          'f',
        ),
      );
      $87cce6b238037c0d$var$__classPrivateFieldSet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
        accumulatedMessage,
        'f',
      );
      $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_messageSnapshots,
        'f',
      )[accumulatedMessage.id] = accumulatedMessage;
      for (const content of newContent) {
        const snapshotContent = accumulatedMessage.content[content.index];
        if (snapshotContent?.type == 'text') this._emit('textCreated', snapshotContent.text);
      }
      switch (event.event) {
        case 'thread.message.created':
          this._emit('messageCreated', event.data);
          break;
        case 'thread.message.in_progress':
          break;
        case 'thread.message.delta':
          this._emit('messageDelta', event.data.delta, accumulatedMessage);
          if (event.data.delta.content)
            for (const content of event.data.delta.content) {
              //If it is text delta, emit a text delta event
              if (content.type == 'text' && content.text) {
                let textDelta = content.text;
                let snapshot = accumulatedMessage.content[content.index];
                if (snapshot && snapshot.type == 'text')
                  this._emit('textDelta', textDelta, snapshot.text);
                else
                  throw Error(
                    'The snapshot associated with this text delta is not text or missing',
                  );
              }
              if (
                content.index !=
                $87cce6b238037c0d$var$__classPrivateFieldGet(
                  this,
                  $87cce6b238037c0d$var$_AssistantStream_currentContentIndex,
                  'f',
                )
              ) {
                //See if we have in progress content
                if (
                  $87cce6b238037c0d$var$__classPrivateFieldGet(
                    this,
                    $87cce6b238037c0d$var$_AssistantStream_currentContent,
                    'f',
                  )
                )
                  switch (
                    $87cce6b238037c0d$var$__classPrivateFieldGet(
                      this,
                      $87cce6b238037c0d$var$_AssistantStream_currentContent,
                      'f',
                    ).type
                  ) {
                    case 'text':
                      this._emit(
                        'textDone',
                        $87cce6b238037c0d$var$__classPrivateFieldGet(
                          this,
                          $87cce6b238037c0d$var$_AssistantStream_currentContent,
                          'f',
                        ).text,
                        $87cce6b238037c0d$var$__classPrivateFieldGet(
                          this,
                          $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
                          'f',
                        ),
                      );
                      break;
                    case 'image_file':
                      this._emit(
                        'imageFileDone',
                        $87cce6b238037c0d$var$__classPrivateFieldGet(
                          this,
                          $87cce6b238037c0d$var$_AssistantStream_currentContent,
                          'f',
                        ).image_file,
                        $87cce6b238037c0d$var$__classPrivateFieldGet(
                          this,
                          $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
                          'f',
                        ),
                      );
                      break;
                  }
                $87cce6b238037c0d$var$__classPrivateFieldSet(
                  this,
                  $87cce6b238037c0d$var$_AssistantStream_currentContentIndex,
                  content.index,
                  'f',
                );
              }
              $87cce6b238037c0d$var$__classPrivateFieldSet(
                this,
                $87cce6b238037c0d$var$_AssistantStream_currentContent,
                accumulatedMessage.content[content.index],
                'f',
              );
            }
          break;
        case 'thread.message.completed':
        case 'thread.message.incomplete':
          //We emit the latest content we were working on on completion (including incomplete)
          if (
            $87cce6b238037c0d$var$__classPrivateFieldGet(
              this,
              $87cce6b238037c0d$var$_AssistantStream_currentContentIndex,
              'f',
            ) !== undefined
          ) {
            const currentContent =
              event.data.content[
                $87cce6b238037c0d$var$__classPrivateFieldGet(
                  this,
                  $87cce6b238037c0d$var$_AssistantStream_currentContentIndex,
                  'f',
                )
              ];
            if (currentContent)
              switch (currentContent.type) {
                case 'image_file':
                  this._emit(
                    'imageFileDone',
                    currentContent.image_file,
                    $87cce6b238037c0d$var$__classPrivateFieldGet(
                      this,
                      $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
                      'f',
                    ),
                  );
                  break;
                case 'text':
                  this._emit(
                    'textDone',
                    currentContent.text,
                    $87cce6b238037c0d$var$__classPrivateFieldGet(
                      this,
                      $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
                      'f',
                    ),
                  );
                  break;
              }
          }
          if (
            $87cce6b238037c0d$var$__classPrivateFieldGet(
              this,
              $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
              'f',
            )
          )
            this._emit('messageDone', event.data);
          $87cce6b238037c0d$var$__classPrivateFieldSet(
            this,
            $87cce6b238037c0d$var$_AssistantStream_messageSnapshot,
            undefined,
            'f',
          );
      }
    }),
    ($87cce6b238037c0d$var$_AssistantStream_handleRunStep = function _AssistantStream_handleRunStep(
      event,
    ) {
      const accumulatedRunStep = $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_instances,
        'm',
        $87cce6b238037c0d$var$_AssistantStream_accumulateRunStep,
      ).call(this, event);
      $87cce6b238037c0d$var$__classPrivateFieldSet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_currentRunStepSnapshot,
        accumulatedRunStep,
        'f',
      );
      switch (event.event) {
        case 'thread.run.step.created':
          this._emit('runStepCreated', event.data);
          break;
        case 'thread.run.step.delta':
          const delta = event.data.delta;
          if (
            delta.step_details &&
            delta.step_details.type == 'tool_calls' &&
            delta.step_details.tool_calls &&
            accumulatedRunStep.step_details.type == 'tool_calls'
          ) {
            for (const toolCall of delta.step_details.tool_calls)
              if (
                toolCall.index ==
                $87cce6b238037c0d$var$__classPrivateFieldGet(
                  this,
                  $87cce6b238037c0d$var$_AssistantStream_currentToolCallIndex,
                  'f',
                )
              )
                this._emit(
                  'toolCallDelta',
                  toolCall,
                  accumulatedRunStep.step_details.tool_calls[toolCall.index],
                );
              else {
                if (
                  $87cce6b238037c0d$var$__classPrivateFieldGet(
                    this,
                    $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                    'f',
                  )
                )
                  this._emit(
                    'toolCallDone',
                    $87cce6b238037c0d$var$__classPrivateFieldGet(
                      this,
                      $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                      'f',
                    ),
                  );
                $87cce6b238037c0d$var$__classPrivateFieldSet(
                  this,
                  $87cce6b238037c0d$var$_AssistantStream_currentToolCallIndex,
                  toolCall.index,
                  'f',
                );
                $87cce6b238037c0d$var$__classPrivateFieldSet(
                  this,
                  $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                  accumulatedRunStep.step_details.tool_calls[toolCall.index],
                  'f',
                );
                if (
                  $87cce6b238037c0d$var$__classPrivateFieldGet(
                    this,
                    $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                    'f',
                  )
                )
                  this._emit(
                    'toolCallCreated',
                    $87cce6b238037c0d$var$__classPrivateFieldGet(
                      this,
                      $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                      'f',
                    ),
                  );
              }
          }
          this._emit('runStepDelta', event.data.delta, accumulatedRunStep);
          break;
        case 'thread.run.step.completed':
        case 'thread.run.step.failed':
        case 'thread.run.step.cancelled':
        case 'thread.run.step.expired':
          $87cce6b238037c0d$var$__classPrivateFieldSet(
            this,
            $87cce6b238037c0d$var$_AssistantStream_currentRunStepSnapshot,
            undefined,
            'f',
          );
          const details = event.data.step_details;
          if (details.type == 'tool_calls') {
            if (
              $87cce6b238037c0d$var$__classPrivateFieldGet(
                this,
                $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                'f',
              )
            ) {
              this._emit(
                'toolCallDone',
                $87cce6b238037c0d$var$__classPrivateFieldGet(
                  this,
                  $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                  'f',
                ),
              );
              $87cce6b238037c0d$var$__classPrivateFieldSet(
                this,
                $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                undefined,
                'f',
              );
            }
          }
          this._emit('runStepDone', event.data, accumulatedRunStep);
          break;
        case 'thread.run.step.in_progress':
          break;
      }
    }),
    ($87cce6b238037c0d$var$_AssistantStream_handleEvent = function _AssistantStream_handleEvent(
      event,
    ) {
      $87cce6b238037c0d$var$__classPrivateFieldGet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_events,
        'f',
      ).push(event);
      this._emit('event', event);
    }),
    ($87cce6b238037c0d$var$_AssistantStream_accumulateRunStep =
      function _AssistantStream_accumulateRunStep(event) {
        switch (event.event) {
          case 'thread.run.step.created':
            $87cce6b238037c0d$var$__classPrivateFieldGet(
              this,
              $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
              'f',
            )[event.data.id] = event.data;
            return event.data;
          case 'thread.run.step.delta':
            let snapshot = $87cce6b238037c0d$var$__classPrivateFieldGet(
              this,
              $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
              'f',
            )[event.data.id];
            if (!snapshot) throw Error('Received a RunStepDelta before creation of a snapshot');
            let data = event.data;
            if (data.delta) {
              const accumulated = $87cce6b238037c0d$var$AssistantStream.accumulateDelta(
                snapshot,
                data.delta,
              );
              $87cce6b238037c0d$var$__classPrivateFieldGet(
                this,
                $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
                'f',
              )[event.data.id] = accumulated;
            }
            return $87cce6b238037c0d$var$__classPrivateFieldGet(
              this,
              $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
              'f',
            )[event.data.id];
          case 'thread.run.step.completed':
          case 'thread.run.step.failed':
          case 'thread.run.step.cancelled':
          case 'thread.run.step.expired':
          case 'thread.run.step.in_progress':
            $87cce6b238037c0d$var$__classPrivateFieldGet(
              this,
              $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
              'f',
            )[event.data.id] = event.data;
            break;
        }
        if (
          $87cce6b238037c0d$var$__classPrivateFieldGet(
            this,
            $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
            'f',
          )[event.data.id]
        )
          return $87cce6b238037c0d$var$__classPrivateFieldGet(
            this,
            $87cce6b238037c0d$var$_AssistantStream_runStepSnapshots,
            'f',
          )[event.data.id];
        throw new Error('No snapshot available');
      }),
    ($87cce6b238037c0d$var$_AssistantStream_accumulateMessage =
      function _AssistantStream_accumulateMessage(event, snapshot) {
        let newContent = [];
        switch (event.event) {
          case 'thread.message.created':
            //On creation the snapshot is just the initial message
            return [event.data, newContent];
          case 'thread.message.delta':
            if (!snapshot)
              throw Error(
                'Received a delta with no existing snapshot (there should be one from message creation)',
              );
            let data = event.data;
            //If this delta does not have content, nothing to process
            if (data.delta.content) {
              for (const contentElement of data.delta.content)
                if (contentElement.index in snapshot.content) {
                  let currentContent = snapshot.content[contentElement.index];
                  snapshot.content[contentElement.index] =
                    $87cce6b238037c0d$var$__classPrivateFieldGet(
                      this,
                      $87cce6b238037c0d$var$_AssistantStream_instances,
                      'm',
                      $87cce6b238037c0d$var$_AssistantStream_accumulateContent,
                    ).call(this, contentElement, currentContent);
                } else {
                  snapshot.content[contentElement.index] = contentElement;
                  // This is a new element
                  newContent.push(contentElement);
                }
            }
            return [snapshot, newContent];
          case 'thread.message.in_progress':
          case 'thread.message.completed':
          case 'thread.message.incomplete':
            //No changes on other thread events
            if (snapshot) return [snapshot, newContent];
            else throw Error('Received thread message event with no existing snapshot');
        }
        throw Error('Tried to accumulate a non-message event');
      }),
    ($87cce6b238037c0d$var$_AssistantStream_accumulateContent =
      function _AssistantStream_accumulateContent(contentElement, currentContent) {
        return $87cce6b238037c0d$var$AssistantStream.accumulateDelta(
          currentContent,
          contentElement,
        );
      }),
    ($87cce6b238037c0d$var$_AssistantStream_handleRun = function _AssistantStream_handleRun(event) {
      $87cce6b238037c0d$var$__classPrivateFieldSet(
        this,
        $87cce6b238037c0d$var$_AssistantStream_currentRunSnapshot,
        event.data,
        'f',
      );
      switch (event.event) {
        case 'thread.run.created':
          break;
        case 'thread.run.queued':
          break;
        case 'thread.run.in_progress':
          break;
        case 'thread.run.requires_action':
        case 'thread.run.cancelled':
        case 'thread.run.failed':
        case 'thread.run.completed':
        case 'thread.run.expired':
          $87cce6b238037c0d$var$__classPrivateFieldSet(
            this,
            $87cce6b238037c0d$var$_AssistantStream_finalRun,
            event.data,
            'f',
          );
          if (
            $87cce6b238037c0d$var$__classPrivateFieldGet(
              this,
              $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
              'f',
            )
          ) {
            this._emit(
              'toolCallDone',
              $87cce6b238037c0d$var$__classPrivateFieldGet(
                this,
                $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
                'f',
              ),
            );
            $87cce6b238037c0d$var$__classPrivateFieldSet(
              this,
              $87cce6b238037c0d$var$_AssistantStream_currentToolCall,
              undefined,
              'f',
            );
          }
          break;
        case 'thread.run.cancelling':
          break;
      }
    });
});

parcelRegister('2CRVw', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.MessagesPage = module.exports.Messages = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $dUVgk = parcelRequire('dUVgk');
  class $1e98f620f163d7e2$var$Messages extends $dQuSh.APIResource {
    /**
     * Create a message.
     */ create(threadId, body, options) {
      return this._client.post(`/threads/${threadId}/messages`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Retrieve a message.
     */ retrieve(threadId, messageId, options) {
      return this._client.get(`/threads/${threadId}/messages/${messageId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Modifies a message.
     */ update(threadId, messageId, body, options) {
      return this._client.post(`/threads/${threadId}/messages/${messageId}`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    list(threadId, query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list(threadId, {}, query);
      return this._client.getAPIList(
        `/threads/${threadId}/messages`,
        $1e98f620f163d7e2$var$MessagesPage,
        {
          query: query,
          ...options,
          headers: {
            'OpenAI-Beta': 'assistants=v2',
            ...options?.headers,
          },
        },
      );
    }
    /**
     * Deletes a message.
     */ del(threadId, messageId, options) {
      return this._client.delete(`/threads/${threadId}/messages/${messageId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
  }
  module.exports.Messages = $1e98f620f163d7e2$var$Messages;
  class $1e98f620f163d7e2$var$MessagesPage extends $dUVgk.CursorPage {}
  module.exports.MessagesPage = $1e98f620f163d7e2$var$MessagesPage;
  $1e98f620f163d7e2$var$Messages.MessagesPage = $1e98f620f163d7e2$var$MessagesPage;
});

parcelRegister('lCXPx', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $fbeb8ea20753d3bf$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $fbeb8ea20753d3bf$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $fbeb8ea20753d3bf$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $fbeb8ea20753d3bf$var$__createBinding(result, mod, k);
      }
      $fbeb8ea20753d3bf$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.RunsPage = module.exports.Runs = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $bERsK = parcelRequire('bERsK');

  var $25F7z = parcelRequire('25F7z');

  const $fbeb8ea20753d3bf$var$StepsAPI = $fbeb8ea20753d3bf$var$__importStar(parcelRequire('8LyWV'));

  var $dUVgk = parcelRequire('dUVgk');
  class $fbeb8ea20753d3bf$var$Runs extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.steps = new $fbeb8ea20753d3bf$var$StepsAPI.Steps(this._client);
    }
    create(threadId, params, options) {
      const { include: include, ...body } = params;
      return this._client.post(`/threads/${threadId}/runs`, {
        query: {
          include: include,
        },
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
        stream: params.stream ?? false,
      });
    }
    /**
     * Retrieves a run.
     */ retrieve(threadId, runId, options) {
      return this._client.get(`/threads/${threadId}/runs/${runId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Modifies a run.
     */ update(threadId, runId, body, options) {
      return this._client.post(`/threads/${threadId}/runs/${runId}`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    list(threadId, query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list(threadId, {}, query);
      return this._client.getAPIList(`/threads/${threadId}/runs`, $fbeb8ea20753d3bf$var$RunsPage, {
        query: query,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Cancels a run that is `in_progress`.
     */ cancel(threadId, runId, options) {
      return this._client.post(`/threads/${threadId}/runs/${runId}/cancel`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * A helper to create a run an poll for a terminal state. More information on Run
     * lifecycles can be found here:
     * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
     */ async createAndPoll(threadId, body, options) {
      const run = await this.create(threadId, body, options);
      return await this.poll(threadId, run.id, options);
    }
    /**
     * Create a Run stream
     *
     * @deprecated use `stream` instead
     */ createAndStream(threadId, body, options) {
      return $bERsK.AssistantStream.createAssistantStream(
        threadId,
        this._client.beta.threads.runs,
        body,
        options,
      );
    }
    /**
     * A helper to poll a run status until it reaches a terminal state. More
     * information on Run lifecycles can be found here:
     * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
     */ async poll(threadId, runId, options) {
      const headers = {
        ...options?.headers,
        'X-Stainless-Poll-Helper': 'true',
      };
      if (options?.pollIntervalMs)
        headers['X-Stainless-Custom-Poll-Interval'] = options.pollIntervalMs.toString();
      while (true) {
        const { data: run, response: response } = await this.retrieve(threadId, runId, {
          ...options,
          headers: {
            ...options?.headers,
            ...headers,
          },
        }).withResponse();
        switch (run.status) {
          //If we are in any sort of intermediate state we poll
          case 'queued':
          case 'in_progress':
          case 'cancelling':
            let sleepInterval = 5000;
            if (options?.pollIntervalMs) sleepInterval = options.pollIntervalMs;
            else {
              const headerInterval = response.headers.get('openai-poll-after-ms');
              if (headerInterval) {
                const headerIntervalMs = parseInt(headerInterval);
                if (!isNaN(headerIntervalMs)) sleepInterval = headerIntervalMs;
              }
            }
            await (0, $25F7z.sleep)(sleepInterval);
            break;
          //We return the run in any terminal state.
          case 'requires_action':
          case 'incomplete':
          case 'cancelled':
          case 'completed':
          case 'failed':
          case 'expired':
            return run;
        }
      }
    }
    /**
     * Create a Run stream
     */ stream(threadId, body, options) {
      return $bERsK.AssistantStream.createAssistantStream(
        threadId,
        this._client.beta.threads.runs,
        body,
        options,
      );
    }
    submitToolOutputs(threadId, runId, body, options) {
      return this._client.post(`/threads/${threadId}/runs/${runId}/submit_tool_outputs`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
        stream: body.stream ?? false,
      });
    }
    /**
     * A helper to submit a tool output to a run and poll for a terminal run state.
     * More information on Run lifecycles can be found here:
     * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
     */ async submitToolOutputsAndPoll(threadId, runId, body, options) {
      const run = await this.submitToolOutputs(threadId, runId, body, options);
      return await this.poll(threadId, run.id, options);
    }
    /**
     * Submit the tool outputs from a previous run and stream the run to a terminal
     * state. More information on Run lifecycles can be found here:
     * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
     */ submitToolOutputsStream(threadId, runId, body, options) {
      return $bERsK.AssistantStream.createToolAssistantStream(
        threadId,
        runId,
        this._client.beta.threads.runs,
        body,
        options,
      );
    }
  }
  module.exports.Runs = $fbeb8ea20753d3bf$var$Runs;
  class $fbeb8ea20753d3bf$var$RunsPage extends $dUVgk.CursorPage {}
  module.exports.RunsPage = $fbeb8ea20753d3bf$var$RunsPage;
  $fbeb8ea20753d3bf$var$Runs.RunsPage = $fbeb8ea20753d3bf$var$RunsPage;
  $fbeb8ea20753d3bf$var$Runs.Steps = parcelRequire('8LyWV').Steps;
  $fbeb8ea20753d3bf$var$Runs.RunStepsPage = parcelRequire('8LyWV').RunStepsPage;
});
parcelRegister('8LyWV', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.RunStepsPage = module.exports.Steps = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $dUVgk = parcelRequire('dUVgk');
  class $661dd2c19e00eb05$var$Steps extends $dQuSh.APIResource {
    retrieve(threadId, runId, stepId, query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query))
        return this.retrieve(threadId, runId, stepId, {}, query);
      return this._client.get(`/threads/${threadId}/runs/${runId}/steps/${stepId}`, {
        query: query,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    list(threadId, runId, query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list(threadId, runId, {}, query);
      return this._client.getAPIList(
        `/threads/${threadId}/runs/${runId}/steps`,
        $661dd2c19e00eb05$var$RunStepsPage,
        {
          query: query,
          ...options,
          headers: {
            'OpenAI-Beta': 'assistants=v2',
            ...options?.headers,
          },
        },
      );
    }
  }
  module.exports.Steps = $661dd2c19e00eb05$var$Steps;
  class $661dd2c19e00eb05$var$RunStepsPage extends $dUVgk.CursorPage {}
  module.exports.RunStepsPage = $661dd2c19e00eb05$var$RunStepsPage;
  $661dd2c19e00eb05$var$Steps.RunStepsPage = $661dd2c19e00eb05$var$RunStepsPage;
});

parcelRegister('3XMqz', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $2e2c7277863a2122$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $2e2c7277863a2122$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $2e2c7277863a2122$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $2e2c7277863a2122$var$__createBinding(result, mod, k);
      }
      $2e2c7277863a2122$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.VectorStoresPage = module.exports.VectorStores = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  const $2e2c7277863a2122$var$FileBatchesAPI = $2e2c7277863a2122$var$__importStar(
    parcelRequire('l8t6R'),
  );

  const $2e2c7277863a2122$var$FilesAPI = $2e2c7277863a2122$var$__importStar(parcelRequire('kPJFU'));

  var $dUVgk = parcelRequire('dUVgk');
  class $2e2c7277863a2122$var$VectorStores extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.files = new $2e2c7277863a2122$var$FilesAPI.Files(this._client);
      this.fileBatches = new $2e2c7277863a2122$var$FileBatchesAPI.FileBatches(this._client);
    }
    /**
     * Create a vector store.
     */ create(body, options) {
      return this._client.post('/vector_stores', {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Retrieves a vector store.
     */ retrieve(vectorStoreId, options) {
      return this._client.get(`/vector_stores/${vectorStoreId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Modifies a vector store.
     */ update(vectorStoreId, body, options) {
      return this._client.post(`/vector_stores/${vectorStoreId}`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    list(query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list({}, query);
      return this._client.getAPIList('/vector_stores', $2e2c7277863a2122$var$VectorStoresPage, {
        query: query,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Delete a vector store.
     */ del(vectorStoreId, options) {
      return this._client.delete(`/vector_stores/${vectorStoreId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
  }
  module.exports.VectorStores = $2e2c7277863a2122$var$VectorStores;
  class $2e2c7277863a2122$var$VectorStoresPage extends $dUVgk.CursorPage {}
  module.exports.VectorStoresPage = $2e2c7277863a2122$var$VectorStoresPage;
  $2e2c7277863a2122$var$VectorStores.VectorStoresPage = $2e2c7277863a2122$var$VectorStoresPage;
  $2e2c7277863a2122$var$VectorStores.Files = parcelRequire('kPJFU').Files;
  $2e2c7277863a2122$var$VectorStores.VectorStoreFilesPage =
    parcelRequire('kPJFU').VectorStoreFilesPage;
  $2e2c7277863a2122$var$VectorStores.FileBatches = parcelRequire('l8t6R').FileBatches;
});
parcelRegister('l8t6R', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.VectorStoreFilesPage = module.exports.FileBatches = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $25F7z = parcelRequire('25F7z');

  var $dRbqH = parcelRequire('dRbqH');

  var $kPJFU = parcelRequire('kPJFU');
  Object.defineProperty(module.exports, 'VectorStoreFilesPage', {
    enumerable: true,
    get: function () {
      return $kPJFU.VectorStoreFilesPage;
    },
  });
  class $f630ece2ce911e35$var$FileBatches extends $dQuSh.APIResource {
    /**
     * Create a vector store file batch.
     */ create(vectorStoreId, body, options) {
      return this._client.post(`/vector_stores/${vectorStoreId}/file_batches`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Retrieves a vector store file batch.
     */ retrieve(vectorStoreId, batchId, options) {
      return this._client.get(`/vector_stores/${vectorStoreId}/file_batches/${batchId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Cancel a vector store file batch. This attempts to cancel the processing of
     * files in this batch as soon as possible.
     */ cancel(vectorStoreId, batchId, options) {
      return this._client.post(`/vector_stores/${vectorStoreId}/file_batches/${batchId}/cancel`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Create a vector store batch and poll until all files have been processed.
     */ async createAndPoll(vectorStoreId, body, options) {
      const batch = await this.create(vectorStoreId, body);
      return await this.poll(vectorStoreId, batch.id, options);
    }
    listFiles(vectorStoreId, batchId, query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query))
        return this.listFiles(vectorStoreId, batchId, {}, query);
      return this._client.getAPIList(
        `/vector_stores/${vectorStoreId}/file_batches/${batchId}/files`,
        $kPJFU.VectorStoreFilesPage,
        {
          query: query,
          ...options,
          headers: {
            'OpenAI-Beta': 'assistants=v2',
            ...options?.headers,
          },
        },
      );
    }
    /**
     * Wait for the given file batch to be processed.
     *
     * Note: this will return even if one of the files failed to process, you need to
     * check batch.file_counts.failed_count to handle this case.
     */ async poll(vectorStoreId, batchId, options) {
      const headers = {
        ...options?.headers,
        'X-Stainless-Poll-Helper': 'true',
      };
      if (options?.pollIntervalMs)
        headers['X-Stainless-Custom-Poll-Interval'] = options.pollIntervalMs.toString();
      while (true) {
        const { data: batch, response: response } = await this.retrieve(vectorStoreId, batchId, {
          ...options,
          headers: headers,
        }).withResponse();
        switch (batch.status) {
          case 'in_progress':
            let sleepInterval = 5000;
            if (options?.pollIntervalMs) sleepInterval = options.pollIntervalMs;
            else {
              const headerInterval = response.headers.get('openai-poll-after-ms');
              if (headerInterval) {
                const headerIntervalMs = parseInt(headerInterval);
                if (!isNaN(headerIntervalMs)) sleepInterval = headerIntervalMs;
              }
            }
            await (0, $25F7z.sleep)(sleepInterval);
            break;
          case 'failed':
          case 'cancelled':
          case 'completed':
            return batch;
        }
      }
    }
    /**
     * Uploads the given files concurrently and then creates a vector store file batch.
     *
     * The concurrency limit is configurable using the `maxConcurrency` parameter.
     */ async uploadAndPoll(vectorStoreId, { files: files, fileIds: fileIds = [] }, options) {
      if (files == null || files.length == 0)
        throw new Error(
          `No \`files\` provided to process. If you've already uploaded files you should use \`.createAndPoll()\` instead`,
        );
      const configuredConcurrency = options?.maxConcurrency ?? 5;
      // We cap the number of workers at the number of files (so we don't start any unnecessary workers)
      const concurrencyLimit = Math.min(configuredConcurrency, files.length);
      const client = this._client;
      const fileIterator = files.values();
      const allFileIds = [...fileIds];
      // This code is based on this design. The libraries don't accommodate our environment limits.
      // https://stackoverflow.com/questions/40639432/what-is-the-best-way-to-limit-concurrency-when-using-es6s-promise-all
      async function processFiles(iterator) {
        for (let item of iterator) {
          const fileObj = await client.files.create(
            {
              file: item,
              purpose: 'assistants',
            },
            options,
          );
          allFileIds.push(fileObj.id);
        }
      }
      // Start workers to process results
      const workers = Array(concurrencyLimit).fill(fileIterator).map(processFiles);
      // Wait for all processing to complete.
      await (0, $dRbqH.allSettledWithThrow)(workers);
      return await this.createAndPoll(vectorStoreId, {
        file_ids: allFileIds,
      });
    }
  }
  module.exports.FileBatches = $f630ece2ce911e35$var$FileBatches;
});
parcelRegister('dRbqH', function (module, exports) {
  'use strict';
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.allSettledWithThrow = void 0;
  /**
   * Like `Promise.allSettled()` but throws an error if any promises are rejected.
   */ const $a169174ff5bc64b8$var$allSettledWithThrow = async (promises) => {
    const results = await Promise.allSettled(promises);
    const rejected = results.filter((result) => result.status === 'rejected');
    if (rejected.length) {
      for (const result of rejected) console.error(result.reason);
      throw new Error(`${rejected.length} promise(s) failed - see the above errors`);
    }
    // Note: TS was complaining about using `.filter().map()` here for some reason
    const values = [];
    for (const result of results) if (result.status === 'fulfilled') values.push(result.value);
    return values;
  };
  module.exports.allSettledWithThrow = $a169174ff5bc64b8$var$allSettledWithThrow;
});

parcelRegister('kPJFU', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.VectorStoreFilesPage = module.exports.Files = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $dUVgk = parcelRequire('dUVgk');
  class $f2ac002bc13fa65c$var$Files extends $dQuSh.APIResource {
    /**
     * Create a vector store file by attaching a
     * [File](https://platform.openai.com/docs/api-reference/files) to a
     * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
     */ create(vectorStoreId, body, options) {
      return this._client.post(`/vector_stores/${vectorStoreId}/files`, {
        body: body,
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Retrieves a vector store file.
     */ retrieve(vectorStoreId, fileId, options) {
      return this._client.get(`/vector_stores/${vectorStoreId}/files/${fileId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    list(vectorStoreId, query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list(vectorStoreId, {}, query);
      return this._client.getAPIList(
        `/vector_stores/${vectorStoreId}/files`,
        $f2ac002bc13fa65c$var$VectorStoreFilesPage,
        {
          query: query,
          ...options,
          headers: {
            'OpenAI-Beta': 'assistants=v2',
            ...options?.headers,
          },
        },
      );
    }
    /**
     * Delete a vector store file. This will remove the file from the vector store but
     * the file itself will not be deleted. To delete the file, use the
     * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
     * endpoint.
     */ del(vectorStoreId, fileId, options) {
      return this._client.delete(`/vector_stores/${vectorStoreId}/files/${fileId}`, {
        ...options,
        headers: {
          'OpenAI-Beta': 'assistants=v2',
          ...options?.headers,
        },
      });
    }
    /**
     * Attach a file to the given vector store and wait for it to be processed.
     */ async createAndPoll(vectorStoreId, body, options) {
      const file = await this.create(vectorStoreId, body, options);
      return await this.poll(vectorStoreId, file.id, options);
    }
    /**
     * Wait for the vector store file to finish processing.
     *
     * Note: this will return even if the file failed to process, you need to check
     * file.last_error and file.status to handle these cases
     */ async poll(vectorStoreId, fileId, options) {
      const headers = {
        ...options?.headers,
        'X-Stainless-Poll-Helper': 'true',
      };
      if (options?.pollIntervalMs)
        headers['X-Stainless-Custom-Poll-Interval'] = options.pollIntervalMs.toString();
      while (true) {
        const fileResponse = await this.retrieve(vectorStoreId, fileId, {
          ...options,
          headers: headers,
        }).withResponse();
        const file = fileResponse.data;
        switch (file.status) {
          case 'in_progress':
            let sleepInterval = 5000;
            if (options?.pollIntervalMs) sleepInterval = options.pollIntervalMs;
            else {
              const headerInterval = fileResponse.response.headers.get('openai-poll-after-ms');
              if (headerInterval) {
                const headerIntervalMs = parseInt(headerInterval);
                if (!isNaN(headerIntervalMs)) sleepInterval = headerIntervalMs;
              }
            }
            await (0, $25F7z.sleep)(sleepInterval);
            break;
          case 'failed':
          case 'completed':
            return file;
        }
      }
    }
    /**
     * Upload a file to the `files` API and then attach it to the given vector store.
     *
     * Note the file will be asynchronously processed (you can use the alternative
     * polling helper method to wait for processing to complete).
     */ async upload(vectorStoreId, file, options) {
      const fileInfo = await this._client.files.create(
        {
          file: file,
          purpose: 'assistants',
        },
        options,
      );
      return this.create(
        vectorStoreId,
        {
          file_id: fileInfo.id,
        },
        options,
      );
    }
    /**
     * Add a file to a vector store and poll until processing is complete.
     */ async uploadAndPoll(vectorStoreId, file, options) {
      const fileInfo = await this.upload(vectorStoreId, file, options);
      return await this.poll(vectorStoreId, fileInfo.id, options);
    }
  }
  module.exports.Files = $f2ac002bc13fa65c$var$Files;
  class $f2ac002bc13fa65c$var$VectorStoreFilesPage extends $dUVgk.CursorPage {}
  module.exports.VectorStoreFilesPage = $f2ac002bc13fa65c$var$VectorStoreFilesPage;
  $f2ac002bc13fa65c$var$Files.VectorStoreFilesPage = $f2ac002bc13fa65c$var$VectorStoreFilesPage;
});

parcelRegister('gQvO1', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Completions = void 0;

  var $dQuSh = parcelRequire('dQuSh');
  class $c43a2ca2fe38770f$var$Completions extends $dQuSh.APIResource {
    create(body, options) {
      return this._client.post('/completions', {
        body: body,
        ...options,
        stream: body.stream ?? false,
      });
    }
  }
  module.exports.Completions = $c43a2ca2fe38770f$var$Completions;
});

parcelRegister('ffkCP', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Embeddings = void 0;

  var $dQuSh = parcelRequire('dQuSh');
  class $b198417dacbe9824$var$Embeddings extends $dQuSh.APIResource {
    /**
     * Creates an embedding vector representing the input text.
     */ create(body, options) {
      return this._client.post('/embeddings', {
        body: body,
        ...options,
      });
    }
  }
  module.exports.Embeddings = $b198417dacbe9824$var$Embeddings;
});

parcelRegister('1BL07', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $12bdb48cc4f506e0$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $12bdb48cc4f506e0$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $12bdb48cc4f506e0$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $12bdb48cc4f506e0$var$__createBinding(result, mod, k);
      }
      $12bdb48cc4f506e0$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.FileObjectsPage = module.exports.Files = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $eK9Mf = parcelRequire('eK9Mf');

  const $12bdb48cc4f506e0$var$Core = $12bdb48cc4f506e0$var$__importStar(parcelRequire('25F7z'));

  var $dUVgk = parcelRequire('dUVgk');
  class $12bdb48cc4f506e0$var$Files extends $dQuSh.APIResource {
    /**
     * Upload a file that can be used across various endpoints. Individual files can be
     * up to 512 MB, and the size of all files uploaded by one organization can be up
     * to 100 GB.
     *
     * The Assistants API supports files up to 2 million tokens and of specific file
     * types. See the
     * [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools) for
     * details.
     *
     * The Fine-tuning API only supports `.jsonl` files. The input also has certain
     * required formats for fine-tuning
     * [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input) or
     * [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input)
     * models.
     *
     * The Batch API only supports `.jsonl` files up to 100 MB in size. The input also
     * has a specific required
     * [format](https://platform.openai.com/docs/api-reference/batch/request-input).
     *
     * Please [contact us](https://help.openai.com/) if you need to increase these
     * storage limits.
     */ create(body, options) {
      return this._client.post(
        '/files',
        $12bdb48cc4f506e0$var$Core.multipartFormRequestOptions({
          body: body,
          ...options,
        }),
      );
    }
    /**
     * Returns information about a specific file.
     */ retrieve(fileId, options) {
      return this._client.get(`/files/${fileId}`, options);
    }
    list(query = {}, options) {
      if ((0, parcelRequire('25F7z').isRequestOptions)(query)) return this.list({}, query);
      return this._client.getAPIList('/files', $12bdb48cc4f506e0$var$FileObjectsPage, {
        query: query,
        ...options,
      });
    }
    /**
     * Delete a file.
     */ del(fileId, options) {
      return this._client.delete(`/files/${fileId}`, options);
    }
    /**
     * Returns the contents of the specified file.
     */ content(fileId, options) {
      return this._client.get(`/files/${fileId}/content`, {
        ...options,
        __binaryResponse: true,
      });
    }
    /**
     * Returns the contents of the specified file.
     *
     * @deprecated The `.content()` method should be used instead
     */ retrieveContent(fileId, options) {
      return this._client.get(`/files/${fileId}/content`, {
        ...options,
        headers: {
          Accept: 'application/json',
          ...options?.headers,
        },
      });
    }
    /**
     * Waits for the given file to be processed, default timeout is 30 mins.
     */ async waitForProcessing(
      id,
      { pollInterval: pollInterval = 5000, maxWait: maxWait = 1800000 } = {},
    ) {
      const TERMINAL_STATES = new Set(['processed', 'error', 'deleted']);
      const start = Date.now();
      let file = await this.retrieve(id);
      while (!file.status || !TERMINAL_STATES.has(file.status)) {
        await (0, parcelRequire('25F7z').sleep)(pollInterval);
        file = await this.retrieve(id);
        if (Date.now() - start > maxWait)
          throw new $eK9Mf.APIConnectionTimeoutError({
            message: `Giving up on waiting for file ${id} to finish processing after ${maxWait} milliseconds.`,
          });
      }
      return file;
    }
  }
  module.exports.Files = $12bdb48cc4f506e0$var$Files;
  class $12bdb48cc4f506e0$var$FileObjectsPage extends $dUVgk.CursorPage {}
  module.exports.FileObjectsPage = $12bdb48cc4f506e0$var$FileObjectsPage;
  $12bdb48cc4f506e0$var$Files.FileObjectsPage = $12bdb48cc4f506e0$var$FileObjectsPage;
});

parcelRegister('8NS1E', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $668cceb311513214$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $668cceb311513214$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $668cceb311513214$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $668cceb311513214$var$__createBinding(result, mod, k);
      }
      $668cceb311513214$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.FineTuning = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $668cceb311513214$var$JobsAPI = $668cceb311513214$var$__importStar(parcelRequire('cB42p'));

  class $668cceb311513214$var$FineTuning extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.jobs = new $668cceb311513214$var$JobsAPI.Jobs(this._client);
    }
  }
  module.exports.FineTuning = $668cceb311513214$var$FineTuning;
  $668cceb311513214$var$FineTuning.Jobs = parcelRequire('cB42p').Jobs;
  $668cceb311513214$var$FineTuning.FineTuningJobsPage = parcelRequire('cB42p').FineTuningJobsPage;
  $668cceb311513214$var$FineTuning.FineTuningJobEventsPage =
    parcelRequire('cB42p').FineTuningJobEventsPage;
});
parcelRegister('cB42p', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $92bc1291e2258b8d$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $92bc1291e2258b8d$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $92bc1291e2258b8d$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $92bc1291e2258b8d$var$__createBinding(result, mod, k);
      }
      $92bc1291e2258b8d$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.FineTuningJobEventsPage =
    module.exports.FineTuningJobsPage =
    module.exports.Jobs =
      void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  const $92bc1291e2258b8d$var$CheckpointsAPI = $92bc1291e2258b8d$var$__importStar(
    parcelRequire('01pKw'),
  );

  var $dUVgk = parcelRequire('dUVgk');
  class $92bc1291e2258b8d$var$Jobs extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.checkpoints = new $92bc1291e2258b8d$var$CheckpointsAPI.Checkpoints(this._client);
    }
    /**
     * Creates a fine-tuning job which begins the process of creating a new model from
     * a given dataset.
     *
     * Response includes details of the enqueued job including job status and the name
     * of the fine-tuned models once complete.
     *
     * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
     */ create(body, options) {
      return this._client.post('/fine_tuning/jobs', {
        body: body,
        ...options,
      });
    }
    /**
     * Get info about a fine-tuning job.
     *
     * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
     */ retrieve(fineTuningJobId, options) {
      return this._client.get(`/fine_tuning/jobs/${fineTuningJobId}`, options);
    }
    list(query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list({}, query);
      return this._client.getAPIList(
        '/fine_tuning/jobs',
        $92bc1291e2258b8d$var$FineTuningJobsPage,
        {
          query: query,
          ...options,
        },
      );
    }
    /**
     * Immediately cancel a fine-tune job.
     */ cancel(fineTuningJobId, options) {
      return this._client.post(`/fine_tuning/jobs/${fineTuningJobId}/cancel`, options);
    }
    listEvents(fineTuningJobId, query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.listEvents(fineTuningJobId, {}, query);
      return this._client.getAPIList(
        `/fine_tuning/jobs/${fineTuningJobId}/events`,
        $92bc1291e2258b8d$var$FineTuningJobEventsPage,
        {
          query: query,
          ...options,
        },
      );
    }
  }
  module.exports.Jobs = $92bc1291e2258b8d$var$Jobs;
  class $92bc1291e2258b8d$var$FineTuningJobsPage extends $dUVgk.CursorPage {}
  module.exports.FineTuningJobsPage = $92bc1291e2258b8d$var$FineTuningJobsPage;
  class $92bc1291e2258b8d$var$FineTuningJobEventsPage extends $dUVgk.CursorPage {}
  module.exports.FineTuningJobEventsPage = $92bc1291e2258b8d$var$FineTuningJobEventsPage;
  $92bc1291e2258b8d$var$Jobs.FineTuningJobsPage = $92bc1291e2258b8d$var$FineTuningJobsPage;
  $92bc1291e2258b8d$var$Jobs.FineTuningJobEventsPage =
    $92bc1291e2258b8d$var$FineTuningJobEventsPage;
  $92bc1291e2258b8d$var$Jobs.Checkpoints = parcelRequire('01pKw').Checkpoints;
  $92bc1291e2258b8d$var$Jobs.FineTuningJobCheckpointsPage =
    parcelRequire('01pKw').FineTuningJobCheckpointsPage;
});
parcelRegister('01pKw', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.FineTuningJobCheckpointsPage = module.exports.Checkpoints = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $25F7z = parcelRequire('25F7z');

  var $dUVgk = parcelRequire('dUVgk');
  class $00441161b18af9db$var$Checkpoints extends $dQuSh.APIResource {
    list(fineTuningJobId, query = {}, options) {
      if ((0, $25F7z.isRequestOptions)(query)) return this.list(fineTuningJobId, {}, query);
      return this._client.getAPIList(
        `/fine_tuning/jobs/${fineTuningJobId}/checkpoints`,
        $00441161b18af9db$var$FineTuningJobCheckpointsPage,
        {
          query: query,
          ...options,
        },
      );
    }
  }
  module.exports.Checkpoints = $00441161b18af9db$var$Checkpoints;
  class $00441161b18af9db$var$FineTuningJobCheckpointsPage extends $dUVgk.CursorPage {}
  module.exports.FineTuningJobCheckpointsPage = $00441161b18af9db$var$FineTuningJobCheckpointsPage;
  $00441161b18af9db$var$Checkpoints.FineTuningJobCheckpointsPage =
    $00441161b18af9db$var$FineTuningJobCheckpointsPage;
});

parcelRegister('k1sSL', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $e93a4e0dbf310376$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $e93a4e0dbf310376$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $e93a4e0dbf310376$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $e93a4e0dbf310376$var$__createBinding(result, mod, k);
      }
      $e93a4e0dbf310376$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Images = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $e93a4e0dbf310376$var$Core = $e93a4e0dbf310376$var$__importStar(parcelRequire('25F7z'));
  class $e93a4e0dbf310376$var$Images extends $dQuSh.APIResource {
    /**
     * Creates a variation of a given image.
     */ createVariation(body, options) {
      return this._client.post(
        '/images/variations',
        $e93a4e0dbf310376$var$Core.multipartFormRequestOptions({
          body: body,
          ...options,
        }),
      );
    }
    /**
     * Creates an edited or extended image given an original image and a prompt.
     */ edit(body, options) {
      return this._client.post(
        '/images/edits',
        $e93a4e0dbf310376$var$Core.multipartFormRequestOptions({
          body: body,
          ...options,
        }),
      );
    }
    /**
     * Creates an image given a prompt.
     */ generate(body, options) {
      return this._client.post('/images/generations', {
        body: body,
        ...options,
      });
    }
  }
  module.exports.Images = $e93a4e0dbf310376$var$Images;
});

parcelRegister('8BSUZ', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.ModelsPage = module.exports.Models = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  var $dUVgk = parcelRequire('dUVgk');
  class $644c610ef0eeb19f$var$Models extends $dQuSh.APIResource {
    /**
     * Retrieves a model instance, providing basic information about the model such as
     * the owner and permissioning.
     */ retrieve(model, options) {
      return this._client.get(`/models/${model}`, options);
    }
    /**
     * Lists the currently available models, and provides basic information about each
     * one such as the owner and availability.
     */ list(options) {
      return this._client.getAPIList('/models', $644c610ef0eeb19f$var$ModelsPage, options);
    }
    /**
     * Delete a fine-tuned model. You must have the Owner role in your organization to
     * delete a model.
     */ del(model, options) {
      return this._client.delete(`/models/${model}`, options);
    }
  }
  module.exports.Models = $644c610ef0eeb19f$var$Models;
  /**
   * Note: no pagination actually occurs yet, this is for forwards-compatibility.
   */ class $644c610ef0eeb19f$var$ModelsPage extends $dUVgk.Page {}
  module.exports.ModelsPage = $644c610ef0eeb19f$var$ModelsPage;
  $644c610ef0eeb19f$var$Models.ModelsPage = $644c610ef0eeb19f$var$ModelsPage;
});

parcelRegister('jOINj', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Moderations = void 0;

  var $dQuSh = parcelRequire('dQuSh');
  class $e6d56f10a98edac2$var$Moderations extends $dQuSh.APIResource {
    /**
     * Classifies if text and/or image inputs are potentially harmful. Learn more in
     * the [moderation guide](https://platform.openai.com/docs/guides/moderation).
     */ create(body, options) {
      return this._client.post('/moderations', {
        body: body,
        ...options,
      });
    }
  }
  module.exports.Moderations = $e6d56f10a98edac2$var$Moderations;
});

parcelRegister('8GwEm', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $652b929027abc918$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $652b929027abc918$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $652b929027abc918$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $652b929027abc918$var$__createBinding(result, mod, k);
      }
      $652b929027abc918$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Uploads = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $652b929027abc918$var$PartsAPI = $652b929027abc918$var$__importStar(parcelRequire('iwONh'));

  class $652b929027abc918$var$Uploads extends $dQuSh.APIResource {
    constructor() {
      super(...arguments);
      this.parts = new $652b929027abc918$var$PartsAPI.Parts(this._client);
    }
    /**
     * Creates an intermediate
     * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object
     * that you can add
     * [Parts](https://platform.openai.com/docs/api-reference/uploads/part-object) to.
     * Currently, an Upload can accept at most 8 GB in total and expires after an hour
     * after you create it.
     *
     * Once you complete the Upload, we will create a
     * [File](https://platform.openai.com/docs/api-reference/files/object) object that
     * contains all the parts you uploaded. This File is usable in the rest of our
     * platform as a regular File object.
     *
     * For certain `purpose`s, the correct `mime_type` must be specified. Please refer
     * to documentation for the supported MIME types for your use case:
     *
     * - [Assistants](https://platform.openai.com/docs/assistants/tools/file-search#supported-files)
     *
     * For guidance on the proper filename extensions for each purpose, please follow
     * the documentation on
     * [creating a File](https://platform.openai.com/docs/api-reference/files/create).
     */ create(body, options) {
      return this._client.post('/uploads', {
        body: body,
        ...options,
      });
    }
    /**
     * Cancels the Upload. No Parts may be added after an Upload is cancelled.
     */ cancel(uploadId, options) {
      return this._client.post(`/uploads/${uploadId}/cancel`, options);
    }
    /**
     * Completes the
     * [Upload](https://platform.openai.com/docs/api-reference/uploads/object).
     *
     * Within the returned Upload object, there is a nested
     * [File](https://platform.openai.com/docs/api-reference/files/object) object that
     * is ready to use in the rest of the platform.
     *
     * You can specify the order of the Parts by passing in an ordered list of the Part
     * IDs.
     *
     * The number of bytes uploaded upon completion must match the number of bytes
     * initially specified when creating the Upload object. No Parts may be added after
     * an Upload is completed.
     */ complete(uploadId, body, options) {
      return this._client.post(`/uploads/${uploadId}/complete`, {
        body: body,
        ...options,
      });
    }
  }
  module.exports.Uploads = $652b929027abc918$var$Uploads;
  $652b929027abc918$var$Uploads.Parts = parcelRequire('iwONh').Parts;
});
parcelRegister('iwONh', function (module, exports) {
  'use strict';
  // File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
  var $d7d29dc47e795fdd$var$__createBinding =
    (module.exports && module.exports.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var $d7d29dc47e795fdd$var$__setModuleDefault =
    (module.exports && module.exports.__setModuleDefault) ||
    (Object.create
      ? function (o, v) {
          Object.defineProperty(o, 'default', {
            enumerable: true,
            value: v,
          });
        }
      : function (o, v) {
          o['default'] = v;
        });
  var $d7d29dc47e795fdd$var$__importStar =
    (module.exports && module.exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
            $d7d29dc47e795fdd$var$__createBinding(result, mod, k);
      }
      $d7d29dc47e795fdd$var$__setModuleDefault(result, mod);
      return result;
    };
  Object.defineProperty(module.exports, '__esModule', {
    value: true,
  });
  module.exports.Parts = void 0;

  var $dQuSh = parcelRequire('dQuSh');

  const $d7d29dc47e795fdd$var$Core = $d7d29dc47e795fdd$var$__importStar(parcelRequire('25F7z'));
  class $d7d29dc47e795fdd$var$Parts extends $dQuSh.APIResource {
    /**
     * Adds a
     * [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an
     * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object.
     * A Part represents a chunk of bytes from the file you are trying to upload.
     *
     * Each Part can be at most 64 MB, and you can add Parts until you hit the Upload
     * maximum of 8 GB.
     *
     * It is possible to add multiple Parts in parallel. You can decide the intended
     * order of the Parts when you
     * [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).
     */ create(uploadId, body, options) {
      return this._client.post(
        `/uploads/${uploadId}/parts`,
        $d7d29dc47e795fdd$var$Core.multipartFormRequestOptions({
          body: body,
          ...options,
        }),
      );
    }
  }
  module.exports.Parts = $d7d29dc47e795fdd$var$Parts;
});

/** Entity for use data required for the flow */ var $f1166f8071591982$export$f59d481d71dc7795;
(function (ThreadActor) {
  /** Context info for AI assistant */ ThreadActor['System'] = 'system';
  /** The human patient */ ThreadActor['User'] = 'user';
  /** AI assistant */ ThreadActor['Assistant'] = 'assistant';
})($f1166f8071591982$export$f59d481d71dc7795 || ($f1166f8071591982$export$f59d481d71dc7795 = {}));

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
const $e64aa2a0c4d24f94$export$a4ad2735b021c132 = '4.71.1'; // x-release-please-version

/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */ let $03f88873f2eb1182$export$dfb5619354ba860 = false;
let $03f88873f2eb1182$export$78062f36b16ed2f8 = undefined;
let $03f88873f2eb1182$export$e7aa7bc5c1b3cfb3 = undefined;
let $03f88873f2eb1182$export$7fa6c5b6f8193917 = undefined;
let $03f88873f2eb1182$export$9f633d56d7ec90d3 = undefined;
let $03f88873f2eb1182$export$79b704688b15c0f4 = undefined;
let $03f88873f2eb1182$export$3963aa24c930693c = undefined;
let $03f88873f2eb1182$export$3b660928c86ff55c = undefined;
let $03f88873f2eb1182$export$b6afa8811b7e644e = undefined;
let $03f88873f2eb1182$export$5d3e1e5268af5f76 = undefined;
let $03f88873f2eb1182$export$2dd6502ab973289e = undefined;
let $03f88873f2eb1182$export$4430d10c2e71ce6c = undefined;
let $03f88873f2eb1182$export$b7b708b1f2c8118a = undefined;
let $03f88873f2eb1182$export$bb863823a5a2fbbe = undefined;
function $03f88873f2eb1182$export$12c9a8e00b0aa2d3(
  shims,
  options = {
    auto: false,
  },
) {
  if ($03f88873f2eb1182$export$dfb5619354ba860)
    throw new Error(
      `you must \`import 'openai/shims/${shims.kind}'\` before importing anything else from openai`,
    );
  if ($03f88873f2eb1182$export$78062f36b16ed2f8)
    throw new Error(
      `can't \`import 'openai/shims/${shims.kind}'\` after \`import 'openai/shims/${$03f88873f2eb1182$export$78062f36b16ed2f8}'\``,
    );
  $03f88873f2eb1182$export$dfb5619354ba860 = options.auto;
  $03f88873f2eb1182$export$78062f36b16ed2f8 = shims.kind;
  $03f88873f2eb1182$export$e7aa7bc5c1b3cfb3 = shims.fetch;
  $03f88873f2eb1182$export$7fa6c5b6f8193917 = shims.Request;
  $03f88873f2eb1182$export$9f633d56d7ec90d3 = shims.Response;
  $03f88873f2eb1182$export$79b704688b15c0f4 = shims.Headers;
  $03f88873f2eb1182$export$3963aa24c930693c = shims.FormData;
  $03f88873f2eb1182$export$3b660928c86ff55c = shims.Blob;
  $03f88873f2eb1182$export$b6afa8811b7e644e = shims.File;
  $03f88873f2eb1182$export$5d3e1e5268af5f76 = shims.ReadableStream;
  $03f88873f2eb1182$export$2dd6502ab973289e = shims.getMultipartRequestOptions;
  $03f88873f2eb1182$export$4430d10c2e71ce6c = shims.getDefaultAgent;
  $03f88873f2eb1182$export$b7b708b1f2c8118a = shims.fileFromPath;
  $03f88873f2eb1182$export$bb863823a5a2fbbe = shims.isFsReadStream;
}

/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */ class $fd416cd0f2fd147a$export$c41756c00d9b480d {
  constructor(body) {
    this.body = body;
  }
  get [Symbol.toStringTag]() {
    return 'MultipartBody';
  }
}

function $5c3619e301880096$export$5fcd68b67c93ed4a({ manuallyImported: manuallyImported } = {}) {
  const recommendation = manuallyImported
    ? `You may need to use polyfills`
    : `Add one of these imports before your first \`import \u{2026} from 'openai'\`:
- \`import 'openai/shims/node'\` (if you're running on Node)
- \`import 'openai/shims/web'\` (otherwise)
`;
  let _fetch, _Request, _Response, _Headers;
  try {
    // @ts-ignore
    _fetch = fetch;
    // @ts-ignore
    _Request = Request;
    // @ts-ignore
    _Response = Response;
    // @ts-ignore
    _Headers = Headers;
  } catch (error) {
    throw new Error(
      `this environment is missing the following Web Fetch API type: ${error.message}. ${recommendation}`,
    );
  }
  return {
    kind: 'web',
    fetch: _fetch,
    Request: _Request,
    Response: _Response,
    Headers: _Headers,
    // @ts-ignore
    FormData:
      typeof FormData !== 'undefined'
        ? FormData
        : class FormData1 {
            // @ts-ignore
            constructor() {
              throw new Error(
                `file uploads aren't supported in this environment yet as 'FormData' is undefined. ${recommendation}`,
              );
            }
          },
    Blob:
      typeof Blob !== 'undefined'
        ? Blob
        : class Blob1 {
            constructor() {
              throw new Error(
                `file uploads aren't supported in this environment yet as 'Blob' is undefined. ${recommendation}`,
              );
            }
          },
    // @ts-ignore
    File:
      typeof File !== 'undefined'
        ? File
        : class File1 {
            // @ts-ignore
            constructor() {
              throw new Error(
                `file uploads aren't supported in this environment yet as 'File' is undefined. ${recommendation}`,
              );
            }
          },
    // @ts-ignore
    ReadableStream:
      typeof ReadableStream !== 'undefined'
        ? ReadableStream
        : class ReadableStream1 {
            // @ts-ignore
            constructor() {
              throw new Error(
                `streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${recommendation}`,
              );
            }
          },
    getMultipartRequestOptions: async (
      // @ts-ignore
      form,
      opts,
    ) => ({
      ...opts,
      body: new (0, $fd416cd0f2fd147a$export$c41756c00d9b480d)(form),
    }),
    getDefaultAgent: (url) => undefined,
    fileFromPath: () => {
      throw new Error(
        'The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads',
      );
    },
    isFsReadStream: (value) => false,
  };
}

if (!$03f88873f2eb1182$export$78062f36b16ed2f8)
  $03f88873f2eb1182$export$12c9a8e00b0aa2d3($5c3619e301880096$export$5fcd68b67c93ed4a(), {
    auto: true,
  });

class $15833e56ae61e84b$export$e74e3e334b3894e3 {
  constructor() {
    this.buffer = [];
    this.trailingCR = false;
  }
  decode(chunk) {
    let text = this.decodeText(chunk);
    if (this.trailingCR) {
      text = '\r' + text;
      this.trailingCR = false;
    }
    if (text.endsWith('\r')) {
      this.trailingCR = true;
      text = text.slice(0, -1);
    }
    if (!text) return [];
    const trailingNewline = $15833e56ae61e84b$export$e74e3e334b3894e3.NEWLINE_CHARS.has(
      text[text.length - 1] || '',
    );
    let lines = text.split($15833e56ae61e84b$export$e74e3e334b3894e3.NEWLINE_REGEXP);
    // if there is a trailing new line then the last entry will be an empty
    // string which we don't care about
    if (trailingNewline) lines.pop();
    if (lines.length === 1 && !trailingNewline) {
      this.buffer.push(lines[0]);
      return [];
    }
    if (this.buffer.length > 0) {
      lines = [this.buffer.join('') + lines[0], ...lines.slice(1)];
      this.buffer = [];
    }
    if (!trailingNewline) this.buffer = [lines.pop() || ''];
    return lines;
  }
  decodeText(bytes) {
    if (bytes == null) return '';
    if (typeof bytes === 'string') return bytes;
    // Node:
    if (typeof Buffer !== 'undefined') {
      if (bytes instanceof Buffer) return bytes.toString();
      if (bytes instanceof Uint8Array) return Buffer.from(bytes).toString();
      throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
        `Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`,
      );
    }
    // Browser
    if (typeof TextDecoder !== 'undefined') {
      if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
        this.textDecoder ?? (this.textDecoder = new TextDecoder('utf8'));
        return this.textDecoder.decode(bytes);
      }
      throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
        `Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`,
      );
    }
    throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
      `Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`,
    );
  }
  flush() {
    if (!this.buffer.length && !this.trailingCR) return [];
    const lines = [this.buffer.join('')];
    this.buffer = [];
    this.trailingCR = false;
    return lines;
  }
}
// prettier-ignore
$15833e56ae61e84b$export$e74e3e334b3894e3.NEWLINE_CHARS = new Set([
    "\n",
    "\r"
]);
$15833e56ae61e84b$export$e74e3e334b3894e3.NEWLINE_REGEXP = /\r\n|[\n\r]/g;

class $c4a70f48b7b88780$export$6a4eb2e7fc9e8903 {
  constructor(iterator, controller) {
    this.iterator = iterator;
    this.controller = controller;
  }
  static fromSSEResponse(response, controller) {
    let consumed = false;
    async function* iterator() {
      if (consumed)
        throw new Error('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
      consumed = true;
      let done = false;
      try {
        for await (const sse of $c4a70f48b7b88780$export$de202fb52edf78c0(response, controller)) {
          if (done) continue;
          if (sse.data.startsWith('[DONE]')) {
            done = true;
            continue;
          }
          if (sse.event === null) {
            let data;
            try {
              data = JSON.parse(sse.data);
            } catch (e) {
              console.error(`Could not parse message into JSON:`, sse.data);
              console.error(`From chunk:`, sse.raw);
              throw e;
            }
            if (data && data.error)
              throw new (0, $35a995371031c9b0$export$3e5b797e39668f84)(
                undefined,
                data.error,
                undefined,
                undefined,
              );
            yield data;
          } else {
            let data;
            try {
              data = JSON.parse(sse.data);
            } catch (e) {
              console.error(`Could not parse message into JSON:`, sse.data);
              console.error(`From chunk:`, sse.raw);
              throw e;
            }
            // TODO: Is this where the error should be thrown?
            if (sse.event == 'error')
              throw new (0, $35a995371031c9b0$export$3e5b797e39668f84)(
                undefined,
                data.error,
                data.message,
                undefined,
              );
            yield {
              event: sse.event,
              data: data,
            };
          }
        }
        done = true;
      } catch (e) {
        // If the user calls `stream.controller.abort()`, we should exit without throwing.
        if (e instanceof Error && e.name === 'AbortError') return;
        throw e;
      } finally {
        // If the user `break`s, abort the ongoing request.
        if (!done) controller.abort();
      }
    }
    return new $c4a70f48b7b88780$export$6a4eb2e7fc9e8903(iterator, controller);
  }
  /**
   * Generates a Stream from a newline-separated ReadableStream
   * where each item is a JSON value.
   */ static fromReadableStream(readableStream, controller) {
    let consumed = false;
    async function* iterLines() {
      const lineDecoder = new (0, $15833e56ae61e84b$export$e74e3e334b3894e3)();
      const iter = $c4a70f48b7b88780$export$5ac880445c73c5f8(readableStream);
      for await (const chunk of iter) for (const line of lineDecoder.decode(chunk)) yield line;
      for (const line of lineDecoder.flush()) yield line;
    }
    async function* iterator() {
      if (consumed)
        throw new Error('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
      consumed = true;
      let done = false;
      try {
        for await (const line of iterLines()) {
          if (done) continue;
          if (line) yield JSON.parse(line);
        }
        done = true;
      } catch (e) {
        // If the user calls `stream.controller.abort()`, we should exit without throwing.
        if (e instanceof Error && e.name === 'AbortError') return;
        throw e;
      } finally {
        // If the user `break`s, abort the ongoing request.
        if (!done) controller.abort();
      }
    }
    return new $c4a70f48b7b88780$export$6a4eb2e7fc9e8903(iterator, controller);
  }
  [Symbol.asyncIterator]() {
    return this.iterator();
  }
  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */ tee() {
    const left = [];
    const right = [];
    const iterator = this.iterator();
    const teeIterator = (queue) => {
      return {
        next: () => {
          if (queue.length === 0) {
            const result = iterator.next();
            left.push(result);
            right.push(result);
          }
          return queue.shift();
        },
      };
    };
    return [
      new $c4a70f48b7b88780$export$6a4eb2e7fc9e8903(() => teeIterator(left), this.controller),
      new $c4a70f48b7b88780$export$6a4eb2e7fc9e8903(() => teeIterator(right), this.controller),
    ];
  }
  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream
   * which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */ toReadableStream() {
    const self = this;
    let iter;
    const encoder = new TextEncoder();
    return new (0, $03f88873f2eb1182$export$5d3e1e5268af5f76)({
      async start() {
        iter = self[Symbol.asyncIterator]();
      },
      async pull(ctrl) {
        try {
          const { value: value, done: done } = await iter.next();
          if (done) return ctrl.close();
          const bytes = encoder.encode(JSON.stringify(value) + '\n');
          ctrl.enqueue(bytes);
        } catch (err) {
          ctrl.error(err);
        }
      },
      async cancel() {
        await iter.return?.();
      },
    });
  }
}
async function* $c4a70f48b7b88780$export$de202fb52edf78c0(response, controller) {
  if (!response.body) {
    controller.abort();
    throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
      `Attempted to iterate over a response with no body`,
    );
  }
  const sseDecoder = new $c4a70f48b7b88780$var$SSEDecoder();
  const lineDecoder = new (0, $15833e56ae61e84b$export$e74e3e334b3894e3)();
  const iter = $c4a70f48b7b88780$export$5ac880445c73c5f8(response.body);
  for await (const sseChunk of $c4a70f48b7b88780$var$iterSSEChunks(iter))
    for (const line of lineDecoder.decode(sseChunk)) {
      const sse = sseDecoder.decode(line);
      if (sse) yield sse;
    }
  for (const line of lineDecoder.flush()) {
    const sse = sseDecoder.decode(line);
    if (sse) yield sse;
  }
}
/**
 * Given an async iterable iterator, iterates over it and yields full
 * SSE chunks, i.e. yields when a double new-line is encountered.
 */ async function* $c4a70f48b7b88780$var$iterSSEChunks(iterator) {
  let data = new Uint8Array();
  for await (const chunk of iterator) {
    if (chunk == null) continue;
    const binaryChunk =
      chunk instanceof ArrayBuffer
        ? new Uint8Array(chunk)
        : typeof chunk === 'string'
          ? new TextEncoder().encode(chunk)
          : chunk;
    let newData = new Uint8Array(data.length + binaryChunk.length);
    newData.set(data);
    newData.set(binaryChunk, data.length);
    data = newData;
    let patternIndex;
    while ((patternIndex = $c4a70f48b7b88780$var$findDoubleNewlineIndex(data)) !== -1) {
      yield data.slice(0, patternIndex);
      data = data.slice(patternIndex);
    }
  }
  if (data.length > 0) yield data;
}
function $c4a70f48b7b88780$var$findDoubleNewlineIndex(buffer) {
  // This function searches the buffer for the end patterns (\r\r, \n\n, \r\n\r\n)
  // and returns the index right after the first occurrence of any pattern,
  // or -1 if none of the patterns are found.
  const newline = 0x0a; // \n
  const carriage = 0x0d; // \r
  for (let i = 0; i < buffer.length - 2; i++) {
    if (buffer[i] === newline && buffer[i + 1] === newline)
      // \n\n
      return i + 2;
    if (buffer[i] === carriage && buffer[i + 1] === carriage)
      // \r\r
      return i + 2;
    if (
      buffer[i] === carriage &&
      buffer[i + 1] === newline &&
      i + 3 < buffer.length &&
      buffer[i + 2] === carriage &&
      buffer[i + 3] === newline
    )
      // \r\n\r\n
      return i + 4;
  }
  return -1;
}
class $c4a70f48b7b88780$var$SSEDecoder {
  constructor() {
    this.event = null;
    this.data = [];
    this.chunks = [];
  }
  decode(line) {
    if (line.endsWith('\r')) line = line.substring(0, line.length - 1);
    if (!line) {
      // empty line and we didn't previously encounter any messages
      if (!this.event && !this.data.length) return null;
      const sse = {
        event: this.event,
        data: this.data.join('\n'),
        raw: this.chunks,
      };
      this.event = null;
      this.data = [];
      this.chunks = [];
      return sse;
    }
    this.chunks.push(line);
    if (line.startsWith(':')) return null;
    let [fieldname, _, value] = $c4a70f48b7b88780$var$partition(line, ':');
    if (value.startsWith(' ')) value = value.substring(1);
    if (fieldname === 'event') this.event = value;
    else if (fieldname === 'data') this.data.push(value);
    return null;
  }
}
function $c4a70f48b7b88780$export$f277b811aa936137(chunks) {
  const decoder = new (0, $15833e56ae61e84b$export$e74e3e334b3894e3)();
  const lines = [];
  for (const chunk of chunks) lines.push(...decoder.decode(chunk));
  return lines;
}
function $c4a70f48b7b88780$var$partition(str, delimiter) {
  const index = str.indexOf(delimiter);
  if (index !== -1)
    return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
  return [str, '', ''];
}
function $c4a70f48b7b88780$export$5ac880445c73c5f8(stream) {
  if (stream[Symbol.asyncIterator]) return stream;
  const reader = stream.getReader();
  return {
    async next() {
      try {
        const result = await reader.read();
        if (result?.done) reader.releaseLock(); // release lock when stream becomes closed
        return result;
      } catch (e) {
        reader.releaseLock(); // release lock when stream becomes errored
        throw e;
      }
    },
    async return() {
      const cancelPromise = reader.cancel();
      reader.releaseLock();
      await cancelPromise;
      return {
        done: true,
        value: undefined,
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

const $26f22d17388f03c8$export$db1b38f0e0e0d735 = (value) =>
  value != null &&
  typeof value === 'object' &&
  typeof value.url === 'string' &&
  typeof value.blob === 'function';
const $26f22d17388f03c8$export$f523b67034c5a6de = (value) =>
  value != null &&
  typeof value === 'object' &&
  typeof value.name === 'string' &&
  typeof value.lastModified === 'number' &&
  $26f22d17388f03c8$export$5c3b3b90b547c112(value);
const $26f22d17388f03c8$export$5c3b3b90b547c112 = (value) =>
  value != null &&
  typeof value === 'object' &&
  typeof value.size === 'number' &&
  typeof value.type === 'string' &&
  typeof value.text === 'function' &&
  typeof value.slice === 'function' &&
  typeof value.arrayBuffer === 'function';
const $26f22d17388f03c8$export$291c899f7ea4e64e = (value) => {
  return (
    $26f22d17388f03c8$export$f523b67034c5a6de(value) ||
    $26f22d17388f03c8$export$db1b38f0e0e0d735(value) ||
    (0, $03f88873f2eb1182$export$bb863823a5a2fbbe)(value)
  );
};
async function $26f22d17388f03c8$export$535467f7dab2a044(value, name, options) {
  // If it's a promise, resolve it.
  value = await value;
  // If we've been given a `File` we don't need to do anything
  if ($26f22d17388f03c8$export$f523b67034c5a6de(value)) return value;
  if ($26f22d17388f03c8$export$db1b38f0e0e0d735(value)) {
    const blob = await value.blob();
    name || (name = new URL(value.url).pathname.split(/[\\/]/).pop() ?? 'unknown_file');
    // we need to convert the `Blob` into an array buffer because the `Blob` class
    // that `node-fetch` defines is incompatible with the web standard which results
    // in `new File` interpreting it as a string instead of binary data.
    const data = $26f22d17388f03c8$export$5c3b3b90b547c112(blob)
      ? [await blob.arrayBuffer()]
      : [blob];
    return new (0, $03f88873f2eb1182$export$b6afa8811b7e644e)(data, name, options);
  }
  const bits = await $26f22d17388f03c8$var$getBytes(value);
  name || (name = $26f22d17388f03c8$var$getName(value) ?? 'unknown_file');
  if (!options?.type) {
    const type = bits[0]?.type;
    if (typeof type === 'string')
      options = {
        ...options,
        type: type,
      };
  }
  return new (0, $03f88873f2eb1182$export$b6afa8811b7e644e)(bits, name, options);
}
async function $26f22d17388f03c8$var$getBytes(value) {
  let parts = [];
  if (
    typeof value === 'string' ||
    ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
    value instanceof ArrayBuffer
  )
    parts.push(value);
  else if ($26f22d17388f03c8$export$5c3b3b90b547c112(value)) parts.push(await value.arrayBuffer());
  else if (
    $26f22d17388f03c8$var$isAsyncIterableIterator(value) // includes Readable, ReadableStream, etc.
  )
    for await (const chunk of value) parts.push(chunk); // TODO, consider validating?
  else
    throw new Error(
      `Unexpected data type: ${typeof value}; constructor: ${value?.constructor?.name}; props: ${$26f22d17388f03c8$var$propsForError(value)}`,
    );
  return parts;
}
function $26f22d17388f03c8$var$propsForError(value) {
  const props = Object.getOwnPropertyNames(value);
  return `[${props.map((p) => `"${p}"`).join(', ')}]`;
}
function $26f22d17388f03c8$var$getName(value) {
  return (
    $26f22d17388f03c8$var$getStringFromMaybeBuffer(value.name) ||
    $26f22d17388f03c8$var$getStringFromMaybeBuffer(value.filename) || // For fs.ReadStream
    $26f22d17388f03c8$var$getStringFromMaybeBuffer(value.path)?.split(/[\\/]/).pop()
  );
}
const $26f22d17388f03c8$var$getStringFromMaybeBuffer = (x) => {
  if (typeof x === 'string') return x;
  if (typeof Buffer !== 'undefined' && x instanceof Buffer) return String(x);
  return undefined;
};
const $26f22d17388f03c8$var$isAsyncIterableIterator = (value) =>
  value != null && typeof value === 'object' && typeof value[Symbol.asyncIterator] === 'function';
const $26f22d17388f03c8$export$669ddb8d269579e7 = (body) =>
  body && typeof body === 'object' && body.body && body[Symbol.toStringTag] === 'MultipartBody';
const $26f22d17388f03c8$export$614988603be7a5f4 = async (opts) => {
  if (!$26f22d17388f03c8$var$hasUploadableValue(opts.body)) return opts;
  const form = await $26f22d17388f03c8$export$f681a8129d2e9d28(opts.body);
  return (0, $03f88873f2eb1182$export$2dd6502ab973289e)(form, opts);
};
const $26f22d17388f03c8$export$6da4f64143a11f47 = async (opts) => {
  const form = await $26f22d17388f03c8$export$f681a8129d2e9d28(opts.body);
  return (0, $03f88873f2eb1182$export$2dd6502ab973289e)(form, opts);
};
const $26f22d17388f03c8$export$f681a8129d2e9d28 = async (body) => {
  const form = new (0, $03f88873f2eb1182$export$3963aa24c930693c)();
  await Promise.all(
    Object.entries(body || {}).map(([key, value]) =>
      $26f22d17388f03c8$var$addFormValue(form, key, value),
    ),
  );
  return form;
};
const $26f22d17388f03c8$var$hasUploadableValue = (value) => {
  if ($26f22d17388f03c8$export$291c899f7ea4e64e(value)) return true;
  if (Array.isArray(value)) return value.some($26f22d17388f03c8$var$hasUploadableValue);
  if (value && typeof value === 'object')
    for (const k in value) {
      if ($26f22d17388f03c8$var$hasUploadableValue(value[k])) return true;
    }
  return false;
};
const $26f22d17388f03c8$var$addFormValue = async (form, key, value) => {
  if (value === undefined) return;
  if (value == null)
    throw new TypeError(
      `Received null for "${key}"; to pass null in FormData, you must use the string 'null'`,
    );
  // TODO: make nested formats configurable
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
    form.append(key, String(value));
  else if ($26f22d17388f03c8$export$291c899f7ea4e64e(value)) {
    const file = await $26f22d17388f03c8$export$535467f7dab2a044(value);
    form.append(key, file);
  } else if (Array.isArray(value))
    await Promise.all(
      value.map((entry) => $26f22d17388f03c8$var$addFormValue(form, key + '[]', entry)),
    );
  else if (typeof value === 'object')
    await Promise.all(
      Object.entries(value).map(([name, prop]) =>
        $26f22d17388f03c8$var$addFormValue(form, `${key}[${name}]`, prop),
      ),
    );
  else
    throw new TypeError(
      `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`,
    );
};

var $80331b378f26e884$var$__classPrivateFieldSet =
  (undefined && undefined.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === 'm') throw new TypeError('Private method is not writable');
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError(
        'Cannot write private member to an object whose class did not declare it',
      );
    return (
      kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
      value
    );
  };
var $80331b378f26e884$var$__classPrivateFieldGet =
  (undefined && undefined.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError(
        'Cannot read private member from an object whose class did not declare it',
      );
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
var $80331b378f26e884$var$_AbstractPage_client;
async function $80331b378f26e884$var$defaultParseResponse(props) {
  const { response: response } = props;
  if (props.options.stream) {
    $80331b378f26e884$export$1c9f709888824e05(
      'response',
      response.status,
      response.url,
      response.headers,
      response.body,
    );
    // Note: there is an invariant here that isn't represented in the type system
    // that if you set `stream: true` the response type must also be `Stream<T>`
    if (props.options.__streamClass)
      return props.options.__streamClass.fromSSEResponse(response, props.controller);
    return (0, $c4a70f48b7b88780$export$6a4eb2e7fc9e8903).fromSSEResponse(
      response,
      props.controller,
    );
  }
  // fetch refuses to read the body when the status code is 204.
  if (response.status === 204) return null;
  if (props.options.__binaryResponse) return response;
  const contentType = response.headers.get('content-type');
  const isJSON =
    contentType?.includes('application/json') || contentType?.includes('application/vnd.api+json');
  if (isJSON) {
    const json = await response.json();
    $80331b378f26e884$export$1c9f709888824e05(
      'response',
      response.status,
      response.url,
      response.headers,
      json,
    );
    return $80331b378f26e884$var$_addRequestID(json, response);
  }
  const text = await response.text();
  $80331b378f26e884$export$1c9f709888824e05(
    'response',
    response.status,
    response.url,
    response.headers,
    text,
  );
  // TODO handle blob, arraybuffer, other content types, etc.
  return text;
}
function $80331b378f26e884$var$_addRequestID(value, response) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value;
  return Object.defineProperty(value, '_request_id', {
    value: response.headers.get('x-request-id'),
    enumerable: false,
  });
}
class $80331b378f26e884$export$6d81b1be6cb81bf2 extends Promise {
  constructor(responsePromise, parseResponse = $80331b378f26e884$var$defaultParseResponse) {
    super((resolve) => {
      // this is maybe a bit weird but this has to be a no-op to not implicitly
      // parse the response body; instead .then, .catch, .finally are overridden
      // to parse the response
      resolve(null);
    });
    this.responsePromise = responsePromise;
    this.parseResponse = parseResponse;
  }
  _thenUnwrap(transform) {
    return new $80331b378f26e884$export$6d81b1be6cb81bf2(this.responsePromise, async (props) =>
      $80331b378f26e884$var$_addRequestID(
        transform(await this.parseResponse(props), props),
        props.response,
      ),
    );
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'openai'`:
   * - `import 'openai/shims/node'` (if you're running on Node)
   * - `import 'openai/shims/web'` (otherwise)
   */ asResponse() {
    return this.responsePromise.then((p) => p.response);
  }
  /**
   * Gets the parsed response data, the raw `Response` instance and the ID of the request,
   * returned via the X-Request-ID header which is useful for debugging requests and reporting
   * issues to OpenAI.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'openai'`:
   * - `import 'openai/shims/node'` (if you're running on Node)
   * - `import 'openai/shims/web'` (otherwise)
   */ async withResponse() {
    const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
    return {
      data: data,
      response: response,
      request_id: response.headers.get('x-request-id'),
    };
  }
  parse() {
    if (!this.parsedPromise) this.parsedPromise = this.responsePromise.then(this.parseResponse);
    return this.parsedPromise;
  }
  then(onfulfilled, onrejected) {
    return this.parse().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.parse().catch(onrejected);
  }
  finally(onfinally) {
    return this.parse().finally(onfinally);
  }
}
class $80331b378f26e884$export$90436f47e91435f2 {
  constructor({
    baseURL: baseURL,
    maxRetries: maxRetries = 2,
    timeout: timeout = 600000,
    httpAgent: httpAgent,
    fetch: overridenFetch,
  }) {
    this.baseURL = baseURL;
    this.maxRetries = $80331b378f26e884$var$validatePositiveInteger('maxRetries', maxRetries);
    this.timeout = $80331b378f26e884$var$validatePositiveInteger('timeout', timeout);
    this.httpAgent = httpAgent;
    this.fetch = overridenFetch ?? (0, $03f88873f2eb1182$export$e7aa7bc5c1b3cfb3);
  }
  authHeaders(opts) {
    return {};
  }
  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */ defaultHeaders(opts) {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': this.getUserAgent(),
      ...$80331b378f26e884$var$getPlatformHeaders(),
      ...this.authHeaders(opts),
    };
  }
  /**
   * Override this to add your own headers validation:
   */ validateHeaders(headers, customHeaders) {}
  defaultIdempotencyKey() {
    return `stainless-node-retry-${$80331b378f26e884$var$uuid4()}`;
  }
  get(path, opts) {
    return this.methodRequest('get', path, opts);
  }
  post(path, opts) {
    return this.methodRequest('post', path, opts);
  }
  patch(path, opts) {
    return this.methodRequest('patch', path, opts);
  }
  put(path, opts) {
    return this.methodRequest('put', path, opts);
  }
  delete(path, opts) {
    return this.methodRequest('delete', path, opts);
  }
  methodRequest(method, path, opts) {
    return this.request(
      Promise.resolve(opts).then(async (opts) => {
        const body =
          opts && (0, $26f22d17388f03c8$export$5c3b3b90b547c112)(opts?.body)
            ? new DataView(await opts.body.arrayBuffer())
            : opts?.body instanceof DataView
              ? opts.body
              : opts?.body instanceof ArrayBuffer
                ? new DataView(opts.body)
                : opts && ArrayBuffer.isView(opts?.body)
                  ? new DataView(opts.body.buffer)
                  : opts?.body;
        return {
          method: method,
          path: path,
          ...opts,
          body: body,
        };
      }),
    );
  }
  getAPIList(path, Page, opts) {
    return this.requestAPIList(Page, {
      method: 'get',
      path: path,
      ...opts,
    });
  }
  calculateContentLength(body) {
    if (typeof body === 'string') {
      if (typeof Buffer !== 'undefined') return Buffer.byteLength(body, 'utf8').toString();
      if (typeof TextEncoder !== 'undefined') {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(body);
        return encoded.length.toString();
      }
    } else if (ArrayBuffer.isView(body)) return body.byteLength.toString();
    return null;
  }
  buildRequest(options, { retryCount: retryCount = 0 } = {}) {
    const { method: method, path: path, query: query, headers: headers = {} } = options;
    const body =
      ArrayBuffer.isView(options.body) ||
      (options.__binaryRequest && typeof options.body === 'string')
        ? options.body
        : (0, $26f22d17388f03c8$export$669ddb8d269579e7)(options.body)
          ? options.body.body
          : options.body
            ? JSON.stringify(options.body, null, 2)
            : null;
    const contentLength = this.calculateContentLength(body);
    const url = this.buildURL(path, query);
    if ('timeout' in options)
      $80331b378f26e884$var$validatePositiveInteger('timeout', options.timeout);
    const timeout = options.timeout ?? this.timeout;
    const httpAgent =
      options.httpAgent ?? this.httpAgent ?? (0, $03f88873f2eb1182$export$4430d10c2e71ce6c)(url);
    const minAgentTimeout = timeout + 1000;
    if (
      typeof httpAgent?.options?.timeout === 'number' &&
      minAgentTimeout > (httpAgent.options.timeout ?? 0)
    )
      // Allow any given request to bump our agent active socket timeout.
      // This may seem strange, but leaking active sockets should be rare and not particularly problematic,
      // and without mutating agent we would need to create more of them.
      // This tradeoff optimizes for performance.
      httpAgent.options.timeout = minAgentTimeout;
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      headers[this.idempotencyHeader] = options.idempotencyKey;
    }
    const reqHeaders = this.buildHeaders({
      options: options,
      headers: headers,
      contentLength: contentLength,
      retryCount: retryCount,
    });
    const req = {
      method: method,
      ...(body && {
        body: body,
      }),
      headers: reqHeaders,
      ...(httpAgent && {
        agent: httpAgent,
      }),
      // @ts-ignore node-fetch uses a custom AbortSignal type that is
      // not compatible with standard web types
      signal: options.signal ?? null,
    };
    return {
      req: req,
      url: url,
      timeout: timeout,
    };
  }
  buildHeaders({
    options: options,
    headers: headers,
    contentLength: contentLength,
    retryCount: retryCount,
  }) {
    const reqHeaders = {};
    if (contentLength) reqHeaders['content-length'] = contentLength;
    const defaultHeaders = this.defaultHeaders(options);
    $80331b378f26e884$var$applyHeadersMut(reqHeaders, defaultHeaders);
    $80331b378f26e884$var$applyHeadersMut(reqHeaders, headers);
    // let builtin fetch set the Content-Type for multipart bodies
    if (
      (0, $26f22d17388f03c8$export$669ddb8d269579e7)(options.body) &&
      (0, $03f88873f2eb1182$export$78062f36b16ed2f8) !== 'node'
    )
      delete reqHeaders['content-type'];
    // Don't set the retry count header if it was already set or removed through default headers or by the
    // caller. We check `defaultHeaders` and `headers`, which can contain nulls, instead of `reqHeaders` to
    // account for the removal case.
    if (
      $80331b378f26e884$export$47ed31abc613cf55(defaultHeaders, 'x-stainless-retry-count') ===
        undefined &&
      $80331b378f26e884$export$47ed31abc613cf55(headers, 'x-stainless-retry-count') === undefined
    )
      reqHeaders['x-stainless-retry-count'] = String(retryCount);
    this.validateHeaders(reqHeaders, headers);
    return reqHeaders;
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */ async prepareOptions(options) {}
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */ async prepareRequest(request, { url: url, options: options }) {}
  parseHeaders(headers) {
    return !headers
      ? {}
      : Symbol.iterator in headers
        ? Object.fromEntries(Array.from(headers).map((header) => [...header]))
        : {
            ...headers,
          };
  }
  makeStatusError(status, error, message, headers) {
    return (0, $35a995371031c9b0$export$3e5b797e39668f84).generate(status, error, message, headers);
  }
  request(options, remainingRetries = null) {
    return new $80331b378f26e884$export$6d81b1be6cb81bf2(
      this.makeRequest(options, remainingRetries),
    );
  }
  async makeRequest(optionsInput, retriesRemaining) {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) retriesRemaining = maxRetries;
    await this.prepareOptions(options);
    const {
      req: req,
      url: url,
      timeout: timeout,
    } = this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });
    await this.prepareRequest(req, {
      url: url,
      options: options,
    });
    $80331b378f26e884$export$1c9f709888824e05('request', url, options, req.headers);
    if (options.signal?.aborted) throw new (0, $35a995371031c9b0$export$2a26fd236aba7348)();
    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(
      $80331b378f26e884$export$b2c0dd4e7376122b,
    );
    if (response instanceof Error) {
      if (options.signal?.aborted) throw new (0, $35a995371031c9b0$export$2a26fd236aba7348)();
      if (retriesRemaining) return this.retryRequest(options, retriesRemaining);
      if (response.name === 'AbortError')
        throw new (0, $35a995371031c9b0$export$51181302f6f4bef3)();
      throw new (0, $35a995371031c9b0$export$74b830ad1c700a9b)({
        cause: response,
      });
    }
    const responseHeaders = $80331b378f26e884$export$eda8ebdd36f248ed(response.headers);
    if (!response.ok) {
      if (retriesRemaining && this.shouldRetry(response)) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
        $80331b378f26e884$export$1c9f709888824e05(
          `response (error; ${retryMessage})`,
          response.status,
          url,
          responseHeaders,
        );
        return this.retryRequest(options, retriesRemaining, responseHeaders);
      }
      const errText = await response
        .text()
        .catch((e) => $80331b378f26e884$export$b2c0dd4e7376122b(e).message);
      const errJSON = $80331b378f26e884$export$7c9c6fb6298d9204(errText);
      const errMessage = errJSON ? undefined : errText;
      const retryMessage = retriesRemaining
        ? `(error; no more retries left)`
        : `(error; not retryable)`;
      $80331b378f26e884$export$1c9f709888824e05(
        `response (error; ${retryMessage})`,
        response.status,
        url,
        responseHeaders,
        errMessage,
      );
      const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
      throw err;
    }
    return {
      response: response,
      options: options,
      controller: controller,
    };
  }
  requestAPIList(Page, options) {
    const request = this.makeRequest(options, null);
    return new $80331b378f26e884$export$838875a2a6347bb(this, request, Page);
  }
  buildURL(path, query) {
    const url = $80331b378f26e884$var$isAbsoluteURL(path)
      ? new URL(path)
      : new URL(
          this.baseURL +
            (this.baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path),
        );
    const defaultQuery = this.defaultQuery();
    if (!$80331b378f26e884$export$4a2fbc025e4a4a37(defaultQuery))
      query = {
        ...defaultQuery,
        ...query,
      };
    if (typeof query === 'object' && query && !Array.isArray(query))
      url.search = this.stringifyQuery(query);
    return url.toString();
  }
  stringifyQuery(query) {
    return Object.entries(query)
      .filter(([_, value]) => typeof value !== 'undefined')
      .map(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        if (value === null) return `${encodeURIComponent(key)}=`;
        throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
          `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
        );
      })
      .join('&');
  }
  async fetchWithTimeout(url, init, ms, controller) {
    const { signal: signal, ...options } = init || {};
    if (signal) signal.addEventListener('abort', () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms);
    return this.getRequestClient() // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      .fetch.call(undefined, url, {
        signal: controller.signal,
        ...options,
      })
      .finally(() => {
        clearTimeout(timeout);
      });
  }
  getRequestClient() {
    return {
      fetch: this.fetch,
    };
  }
  shouldRetry(response) {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');
    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;
    // Retry on request timeouts.
    if (response.status === 408) return true;
    // Retry on lock timeouts.
    if (response.status === 409) return true;
    // Retry on rate limits.
    if (response.status === 429) return true;
    // Retry internal errors.
    if (response.status >= 500) return true;
    return false;
  }
  async retryRequest(options, retriesRemaining, responseHeaders) {
    let timeoutMillis;
    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.['retry-after-ms'];
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) timeoutMillis = timeoutMs;
    }
    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.['retry-after'];
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) timeoutMillis = timeoutSeconds * 1000;
      else timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
    }
    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await $80331b378f26e884$export$e772c8ff12451969(timeoutMillis);
    return this.makeRequest(options, retriesRemaining - 1);
  }
  calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;
    const numRetries = maxRetries - retriesRemaining;
    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;
    return sleepSeconds * jitter * 1000;
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${(0, $e64aa2a0c4d24f94$export$a4ad2735b021c132)}`;
  }
}
class $80331b378f26e884$export$bc4ec43eb76c64ae {
  constructor(client, response, body, options) {
    $80331b378f26e884$var$_AbstractPage_client.set(this, void 0);
    $80331b378f26e884$var$__classPrivateFieldSet(
      this,
      $80331b378f26e884$var$_AbstractPage_client,
      client,
      'f',
    );
    this.options = options;
    this.response = response;
    this.body = body;
  }
  hasNextPage() {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageInfo() != null;
  }
  async getNextPage() {
    const nextInfo = this.nextPageInfo();
    if (!nextInfo)
      throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    const nextOptions = {
      ...this.options,
    };
    if ('params' in nextInfo && typeof nextOptions.query === 'object')
      nextOptions.query = {
        ...nextOptions.query,
        ...nextInfo.params,
      };
    else if ('url' in nextInfo) {
      const params = [
        ...Object.entries(nextOptions.query || {}),
        ...nextInfo.url.searchParams.entries(),
      ];
      for (const [key, value] of params) nextInfo.url.searchParams.set(key, value);
      nextOptions.query = undefined;
      nextOptions.path = nextInfo.url.toString();
    }
    return await $80331b378f26e884$var$__classPrivateFieldGet(
      this,
      $80331b378f26e884$var$_AbstractPage_client,
      'f',
    ).requestAPIList(this.constructor, nextOptions);
  }
  async *iterPages() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let page = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }
  async *[(($80331b378f26e884$var$_AbstractPage_client = new WeakMap()), Symbol.asyncIterator)]() {
    for await (const page of this.iterPages())
      for (const item of page.getPaginatedItems()) yield item;
  }
}
class $80331b378f26e884$export$838875a2a6347bb extends $80331b378f26e884$export$6d81b1be6cb81bf2 {
  constructor(client, request, Page) {
    super(
      request,
      async (props) =>
        new Page(
          client,
          props.response,
          await $80331b378f26e884$var$defaultParseResponse(props),
          props.options,
        ),
    );
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */ async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) yield item;
  }
}
const $80331b378f26e884$export$eda8ebdd36f248ed = (headers) => {
  return new Proxy(
    Object.fromEntries(
      // @ts-ignore
      headers.entries(),
    ),
    {
      get(target, name) {
        const key = name.toString();
        return target[key.toLowerCase()] || target[key];
      },
    },
  );
};
// This is required so that we can determine if a given object matches the RequestOptions
// type at runtime. While this requires duplication, it is enforced by the TypeScript
// compiler such that any missing / extraneous keys will cause an error.
const $80331b378f26e884$var$requestOptionsKeys = {
  method: true,
  path: true,
  query: true,
  body: true,
  headers: true,
  maxRetries: true,
  stream: true,
  timeout: true,
  httpAgent: true,
  signal: true,
  idempotencyKey: true,
  __binaryRequest: true,
  __binaryResponse: true,
  __streamClass: true,
};
const $80331b378f26e884$export$3a8c02e2928a14fc = (obj) => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !$80331b378f26e884$export$4a2fbc025e4a4a37(obj) &&
    Object.keys(obj).every((k) =>
      $80331b378f26e884$export$b5a638e9b3fff9f3($80331b378f26e884$var$requestOptionsKeys, k),
    )
  );
};
const $80331b378f26e884$var$getPlatformProperties = () => {
  if (typeof Deno !== 'undefined' && Deno.build != null)
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': (0, $e64aa2a0c4d24f94$export$a4ad2735b021c132),
      'X-Stainless-OS': $80331b378f26e884$var$normalizePlatform(Deno.build.os),
      'X-Stainless-Arch': $80331b378f26e884$var$normalizeArch(Deno.build.arch),
      'X-Stainless-Runtime': 'deno',
      'X-Stainless-Runtime-Version':
        typeof Deno.version === 'string' ? Deno.version : (Deno.version?.deno ?? 'unknown'),
    };
  if (typeof EdgeRuntime !== 'undefined')
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': (0, $e64aa2a0c4d24f94$export$a4ad2735b021c132),
      'X-Stainless-OS': 'Unknown',
      'X-Stainless-Arch': `other:${EdgeRuntime}`,
      'X-Stainless-Runtime': 'edge',
      'X-Stainless-Runtime-Version': process.version,
    };
  // Check if Node.js
  if (
    Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) ===
    '[object process]'
  )
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': (0, $e64aa2a0c4d24f94$export$a4ad2735b021c132),
      'X-Stainless-OS': $80331b378f26e884$var$normalizePlatform(process.platform),
      'X-Stainless-Arch': $80331b378f26e884$var$normalizeArch(process.arch),
      'X-Stainless-Runtime': 'node',
      'X-Stainless-Runtime-Version': process.version,
    };
  const browserInfo = $80331b378f26e884$var$getBrowserInfo();
  if (browserInfo)
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': (0, $e64aa2a0c4d24f94$export$a4ad2735b021c132),
      'X-Stainless-OS': 'Unknown',
      'X-Stainless-Arch': 'unknown',
      'X-Stainless-Runtime': `browser:${browserInfo.browser}`,
      'X-Stainless-Runtime-Version': browserInfo.version,
    };
  // TODO add support for Cloudflare workers, etc.
  return {
    'X-Stainless-Lang': 'js',
    'X-Stainless-Package-Version': (0, $e64aa2a0c4d24f94$export$a4ad2735b021c132),
    'X-Stainless-OS': 'Unknown',
    'X-Stainless-Arch': 'unknown',
    'X-Stainless-Runtime': 'unknown',
    'X-Stainless-Runtime-Version': 'unknown',
  };
};
// Note: modified from https://github.com/JS-DevTools/host-environment/blob/b1ab79ecde37db5d6e163c050e54fe7d287d7c92/src/isomorphic.browser.ts
function $80331b378f26e884$var$getBrowserInfo() {
  if (typeof navigator === 'undefined' || !navigator) return null;
  // NOTE: The order matters here!
  const browserPatterns = [
    {
      key: 'edge',
      pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
    },
    {
      key: 'ie',
      pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
    },
    {
      key: 'ie',
      pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/,
    },
    {
      key: 'chrome',
      pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
    },
    {
      key: 'firefox',
      pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/,
    },
    {
      key: 'safari',
      pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/,
    },
  ];
  // Find the FIRST matching browser
  for (const { key: key, pattern: pattern } of browserPatterns) {
    const match = pattern.exec(navigator.userAgent);
    if (match) {
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;
      return {
        browser: key,
        version: `${major}.${minor}.${patch}`,
      };
    }
  }
  return null;
}
const $80331b378f26e884$var$normalizeArch = (arch) => {
  // Node docs:
  // - https://nodejs.org/api/process.html#processarch
  // Deno docs:
  // - https://doc.deno.land/deno/stable/~/Deno.build
  if (arch === 'x32') return 'x32';
  if (arch === 'x86_64' || arch === 'x64') return 'x64';
  if (arch === 'arm') return 'arm';
  if (arch === 'aarch64' || arch === 'arm64') return 'arm64';
  if (arch) return `other:${arch}`;
  return 'unknown';
};
const $80331b378f26e884$var$normalizePlatform = (platform) => {
  // Node platforms:
  // - https://nodejs.org/api/process.html#processplatform
  // Deno platforms:
  // - https://doc.deno.land/deno/stable/~/Deno.build
  // - https://github.com/denoland/deno/issues/14799
  platform = platform.toLowerCase();
  // NOTE: this iOS check is untested and may not work
  // Node does not work natively on IOS, there is a fork at
  // https://github.com/nodejs-mobile/nodejs-mobile
  // however it is unknown at the time of writing how to detect if it is running
  if (platform.includes('ios')) return 'iOS';
  if (platform === 'android') return 'Android';
  if (platform === 'darwin') return 'MacOS';
  if (platform === 'win32') return 'Windows';
  if (platform === 'freebsd') return 'FreeBSD';
  if (platform === 'openbsd') return 'OpenBSD';
  if (platform === 'linux') return 'Linux';
  if (platform) return `Other:${platform}`;
  return 'Unknown';
};
let $80331b378f26e884$var$_platformHeaders;
const $80331b378f26e884$var$getPlatformHeaders = () => {
  return (
    $80331b378f26e884$var$_platformHeaders ??
    ($80331b378f26e884$var$_platformHeaders = $80331b378f26e884$var$getPlatformProperties())
  );
};
const $80331b378f26e884$export$7c9c6fb6298d9204 = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return undefined;
  }
};
// https://stackoverflow.com/a/19709846
const $80331b378f26e884$var$startsWithSchemeRegexp = new RegExp('^(?:[a-z]+:)?//', 'i');
const $80331b378f26e884$var$isAbsoluteURL = (url) => {
  return $80331b378f26e884$var$startsWithSchemeRegexp.test(url);
};
const $80331b378f26e884$export$e772c8ff12451969 = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
const $80331b378f26e884$var$validatePositiveInteger = (name, n) => {
  if (typeof n !== 'number' || !Number.isInteger(n))
    throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(`${name} must be an integer`);
  if (n < 0)
    throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(`${name} must be a positive integer`);
  return n;
};
const $80331b378f26e884$export$b2c0dd4e7376122b = (err) => {
  if (err instanceof Error) return err;
  if (typeof err === 'object' && err !== null)
    try {
      return new Error(JSON.stringify(err));
    } catch {}
  return new Error(err);
};
const $80331b378f26e884$export$af4c7db3845bb1c2 = (value) => {
  if (value == null)
    throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
      `Expected a value to be given but received ${value} instead.`,
    );
  return value;
};
const $80331b378f26e884$export$ccbbfd667734d5ac = (env) => {
  if (typeof process !== 'undefined') return process.env?.[env]?.trim() ?? undefined;
  if (typeof Deno !== 'undefined') return Deno.env?.get?.(env)?.trim();
  return undefined;
};
const $80331b378f26e884$export$4ecf346c64b3eb34 = (value) => {
  if (typeof value === 'number') return Math.round(value);
  if (typeof value === 'string') return parseInt(value, 10);
  throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
    `Could not coerce ${value} (type: ${typeof value}) into a number`,
  );
};
const $80331b378f26e884$export$1b14e584613ce4b7 = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return parseFloat(value);
  throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
    `Could not coerce ${value} (type: ${typeof value}) into a number`,
  );
};
const $80331b378f26e884$export$b69d37584141bf44 = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return Boolean(value);
};
const $80331b378f26e884$export$ffe3c99a2918ca65 = (value) => {
  if (value === undefined) return undefined;
  return $80331b378f26e884$export$4ecf346c64b3eb34(value);
};
const $80331b378f26e884$export$5747ea88f091c953 = (value) => {
  if (value === undefined) return undefined;
  return $80331b378f26e884$export$1b14e584613ce4b7(value);
};
const $80331b378f26e884$export$8f9b66bb1b32b85b = (value) => {
  if (value === undefined) return undefined;
  return $80331b378f26e884$export$b69d37584141bf44(value);
};
function $80331b378f26e884$export$4a2fbc025e4a4a37(obj) {
  if (!obj) return true;
  for (const _k in obj) return false;
  return true;
}
function $80331b378f26e884$export$b5a638e9b3fff9f3(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
/**
 * Copies headers from "newHeaders" onto "targetHeaders",
 * using lower-case for all properties,
 * ignoring any keys with undefined values,
 * and deleting any keys with null values.
 */ function $80331b378f26e884$var$applyHeadersMut(targetHeaders, newHeaders) {
  for (const k in newHeaders) {
    if (!$80331b378f26e884$export$b5a638e9b3fff9f3(newHeaders, k)) continue;
    const lowerKey = k.toLowerCase();
    if (!lowerKey) continue;
    const val = newHeaders[k];
    if (val === null) delete targetHeaders[lowerKey];
    else if (val !== undefined) targetHeaders[lowerKey] = val;
  }
}
function $80331b378f26e884$export$1c9f709888824e05(action, ...args) {
  if (typeof process !== 'undefined' && process?.env?.['DEBUG'] === 'true')
    console.log(`OpenAI:DEBUG:${action}`, ...args);
}
/**
 * https://stackoverflow.com/a/2117523
 */ const $80331b378f26e884$var$uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const $80331b378f26e884$export$d4d7320082b94e3c = () => {
  return (
    // @ts-ignore
    typeof window !== 'undefined' && // @ts-ignore
    typeof window.document !== 'undefined' && // @ts-ignore
    typeof navigator !== 'undefined'
  );
};
const $80331b378f26e884$export$612d5d4e00056e45 = (headers) => {
  return typeof headers?.get === 'function';
};
const $80331b378f26e884$export$3a1f8923f8f0cd57 = (headers, header) => {
  const foundHeader = $80331b378f26e884$export$47ed31abc613cf55(headers, header);
  if (foundHeader === undefined) throw new Error(`Could not find ${header} header`);
  return foundHeader;
};
const $80331b378f26e884$export$47ed31abc613cf55 = (headers, header) => {
  const lowerCasedHeader = header.toLowerCase();
  if ($80331b378f26e884$export$612d5d4e00056e45(headers)) {
    // to deal with the case where the header looks like Stainless-Event-Id
    const intercapsHeader =
      header[0]?.toUpperCase() +
      header.substring(1).replace(/([^\w])(\w)/g, (_m, g1, g2) => g1 + g2.toUpperCase());
    for (const key of [header, lowerCasedHeader, header.toUpperCase(), intercapsHeader]) {
      const value = headers.get(key);
      if (value) return value;
    }
  }
  for (const [key, value] of Object.entries(headers))
    if (key.toLowerCase() === lowerCasedHeader) {
      if (Array.isArray(value)) {
        if (value.length <= 1) return value[0];
        console.warn(
          `Received ${value.length} entries for the ${header} header, using the first entry.`,
        );
        return value[0];
      }
      return value;
    }
  return undefined;
};
const $80331b378f26e884$export$37cc283d8fbd3462 = (str) => {
  if (!str) return '';
  if (typeof Buffer !== 'undefined') return Buffer.from(str).toString('base64');
  if (typeof btoa !== 'undefined') return btoa(str);
  throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
    'Cannot generate b64 string; Expected `Buffer` or `btoa` to be defined',
  );
};
function $80331b378f26e884$export$b22ca96a1a22bfba(obj) {
  return obj != null && typeof obj === 'object' && !Array.isArray(obj);
}

class $35a995371031c9b0$export$7668a15b8d9a0caa extends Error {}
class $35a995371031c9b0$export$3e5b797e39668f84 extends $35a995371031c9b0$export$7668a15b8d9a0caa {
  constructor(status, error, message, headers) {
    super(`${$35a995371031c9b0$export$3e5b797e39668f84.makeMessage(status, error, message)}`);
    this.status = status;
    this.headers = headers;
    this.request_id = headers?.['x-request-id'];
    const data = error;
    this.error = data;
    this.code = data?.['code'];
    this.param = data?.['param'];
    this.type = data?.['type'];
  }
  static makeMessage(status, error, message) {
    const msg = error?.message
      ? typeof error.message === 'string'
        ? error.message
        : JSON.stringify(error.message)
      : error
        ? JSON.stringify(error)
        : message;
    if (status && msg) return `${status} ${msg}`;
    if (status) return `${status} status code (no body)`;
    if (msg) return msg;
    return '(no status code or body)';
  }
  static generate(status, errorResponse, message, headers) {
    if (!status)
      return new $35a995371031c9b0$export$74b830ad1c700a9b({
        message: message,
        cause: (0, $80331b378f26e884$export$b2c0dd4e7376122b)(errorResponse),
      });
    const error = errorResponse?.['error'];
    if (status === 400)
      return new $35a995371031c9b0$export$6bfa95453d427b2b(status, error, message, headers);
    if (status === 401)
      return new $35a995371031c9b0$export$cf0c46b07324e9c5(status, error, message, headers);
    if (status === 403)
      return new $35a995371031c9b0$export$9c81d48c1e1840ac(status, error, message, headers);
    if (status === 404)
      return new $35a995371031c9b0$export$78c95b58762d2106(status, error, message, headers);
    if (status === 409)
      return new $35a995371031c9b0$export$a1d6430d09a06aee(status, error, message, headers);
    if (status === 422)
      return new $35a995371031c9b0$export$d191fb0a9d005daf(status, error, message, headers);
    if (status === 429)
      return new $35a995371031c9b0$export$5db8ebadb53b7f77(status, error, message, headers);
    if (status >= 500)
      return new $35a995371031c9b0$export$2004b0625b599107(status, error, message, headers);
    return new $35a995371031c9b0$export$3e5b797e39668f84(status, error, message, headers);
  }
}
class $35a995371031c9b0$export$2a26fd236aba7348 extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor({ message: message } = {}) {
    super(undefined, undefined, message || 'Request was aborted.', undefined);
    this.status = undefined;
  }
}
class $35a995371031c9b0$export$74b830ad1c700a9b extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor({ message: message, cause: cause }) {
    super(undefined, undefined, message || 'Connection error.', undefined);
    this.status = undefined;
    // in some environments the 'cause' property is already declared
    // @ts-ignore
    if (cause) this.cause = cause;
  }
}
class $35a995371031c9b0$export$51181302f6f4bef3 extends $35a995371031c9b0$export$74b830ad1c700a9b {
  constructor({ message: message } = {}) {
    super({
      message: message ?? 'Request timed out.',
    });
  }
}
class $35a995371031c9b0$export$6bfa95453d427b2b extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor() {
    super(...arguments);
    this.status = 400;
  }
}
class $35a995371031c9b0$export$cf0c46b07324e9c5 extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor() {
    super(...arguments);
    this.status = 401;
  }
}
class $35a995371031c9b0$export$9c81d48c1e1840ac extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor() {
    super(...arguments);
    this.status = 403;
  }
}
class $35a995371031c9b0$export$78c95b58762d2106 extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor() {
    super(...arguments);
    this.status = 404;
  }
}
class $35a995371031c9b0$export$a1d6430d09a06aee extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor() {
    super(...arguments);
    this.status = 409;
  }
}
class $35a995371031c9b0$export$d191fb0a9d005daf extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor() {
    super(...arguments);
    this.status = 422;
  }
}
class $35a995371031c9b0$export$5db8ebadb53b7f77 extends $35a995371031c9b0$export$3e5b797e39668f84 {
  constructor() {
    super(...arguments);
    this.status = 429;
  }
}
class $35a995371031c9b0$export$2004b0625b599107 extends $35a995371031c9b0$export$3e5b797e39668f84 {}
class $35a995371031c9b0$export$64d0ec7d4e7a2858 extends $35a995371031c9b0$export$7668a15b8d9a0caa {
  constructor() {
    super(`Could not parse response content as the length limit was reached`);
  }
}
class $35a995371031c9b0$export$56f1bc7271a4e3c3 extends $35a995371031c9b0$export$7668a15b8d9a0caa {
  constructor() {
    super(`Could not parse response content as the request was rejected by the content filter`);
  }
}

function $2288bd4f606a2ce7$export$8571f96912acf365(response_format, parser) {
  const obj = {
    ...response_format,
  };
  Object.defineProperties(obj, {
    $brand: {
      value: 'auto-parseable-response-format',
      enumerable: false,
    },
    $parseRaw: {
      value: parser,
      enumerable: false,
    },
  });
  return obj;
}
function $2288bd4f606a2ce7$export$b223966abcefe91c(response_format) {
  return response_format?.['$brand'] === 'auto-parseable-response-format';
}
function $2288bd4f606a2ce7$export$8c880bd1baec2c2d(tool, { parser: parser, callback: callback }) {
  const obj = {
    ...tool,
  };
  Object.defineProperties(obj, {
    $brand: {
      value: 'auto-parseable-tool',
      enumerable: false,
    },
    $parseRaw: {
      value: parser,
      enumerable: false,
    },
    $callback: {
      value: callback,
      enumerable: false,
    },
  });
  return obj;
}
function $2288bd4f606a2ce7$export$cd66731d9ec8496d(tool) {
  return tool?.['$brand'] === 'auto-parseable-tool';
}
function $2288bd4f606a2ce7$export$cd39a28c3b357ba1(completion, params) {
  if (!params || !$2288bd4f606a2ce7$export$eeede6984aa92019(params))
    return {
      ...completion,
      choices: completion.choices.map((choice) => ({
        ...choice,
        message: {
          ...choice.message,
          parsed: null,
          tool_calls: choice.message.tool_calls ?? [],
        },
      })),
    };
  return $2288bd4f606a2ce7$export$bea40bc252349f06(completion, params);
}
function $2288bd4f606a2ce7$export$bea40bc252349f06(completion, params) {
  const choices = completion.choices.map((choice) => {
    if (choice.finish_reason === 'length')
      throw new (0, $35a995371031c9b0$export$64d0ec7d4e7a2858)();
    if (choice.finish_reason === 'content_filter')
      throw new (0, $35a995371031c9b0$export$56f1bc7271a4e3c3)();
    return {
      ...choice,
      message: {
        ...choice.message,
        tool_calls:
          choice.message.tool_calls?.map((toolCall) =>
            $2288bd4f606a2ce7$var$parseToolCall(params, toolCall),
          ) ?? [],
        parsed:
          choice.message.content && !choice.message.refusal
            ? $2288bd4f606a2ce7$var$parseResponseFormat(params, choice.message.content)
            : null,
      },
    };
  });
  return {
    ...completion,
    choices: choices,
  };
}
function $2288bd4f606a2ce7$var$parseResponseFormat(params, content) {
  if (params.response_format?.type !== 'json_schema') return null;
  if (params.response_format?.type === 'json_schema') {
    if ('$parseRaw' in params.response_format) {
      const response_format = params.response_format;
      return response_format.$parseRaw(content);
    }
    return JSON.parse(content);
  }
  return null;
}
function $2288bd4f606a2ce7$var$parseToolCall(params, toolCall) {
  const inputTool = params.tools?.find(
    (inputTool) => inputTool.function?.name === toolCall.function.name,
  );
  return {
    ...toolCall,
    function: {
      ...toolCall.function,
      parsed_arguments: $2288bd4f606a2ce7$export$cd66731d9ec8496d(inputTool)
        ? inputTool.$parseRaw(toolCall.function.arguments)
        : inputTool?.function.strict
          ? JSON.parse(toolCall.function.arguments)
          : null,
    },
  };
}
function $2288bd4f606a2ce7$export$4fe91242709b72e2(params, toolCall) {
  if (!params) return false;
  const inputTool = params.tools?.find(
    (inputTool) => inputTool.function?.name === toolCall.function.name,
  );
  return (
    $2288bd4f606a2ce7$export$cd66731d9ec8496d(inputTool) || inputTool?.function.strict || false
  );
}
function $2288bd4f606a2ce7$export$eeede6984aa92019(params) {
  if ($2288bd4f606a2ce7$export$b223966abcefe91c(params.response_format)) return true;
  return (
    params.tools?.some(
      (t) =>
        $2288bd4f606a2ce7$export$cd66731d9ec8496d(t) ||
        (t.type === 'function' && t.function.strict === true),
    ) ?? false
  );
}
function $2288bd4f606a2ce7$export$3ac73b33c2141c0d(tools) {
  for (const tool of tools ?? []) {
    if (tool.type !== 'function')
      throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
        `Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``,
      );
    if (tool.function.strict !== true)
      throw new (0, $35a995371031c9b0$export$7668a15b8d9a0caa)(
        `The \`${tool.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`,
      );
  }
}

var $294e9db24f29f2d7$export$7debb50ef11d5e0b;
(function (util) {
  util.assertEqual = (val) => val;
  function assertIs(_arg) {}
  util.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util.assertNever = assertNever;
  util.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) obj[item] = item;
    return obj;
  };
  util.getValidEnumValues = (obj) => {
    const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== 'number');
    const filtered = {};
    for (const k of validKeys) filtered[k] = obj[k];
    return util.objectValues(filtered);
  };
  util.objectValues = (obj) => {
    return util.objectKeys(obj).map(function (e) {
      return obj[e];
    });
  };
  util.objectKeys =
    typeof Object.keys === 'function' // eslint-disable-line ban/ban
      ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
      : (object) => {
          const keys = [];
          for (const key in object)
            if (Object.prototype.hasOwnProperty.call(object, key)) keys.push(key);
          return keys;
        };
  util.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item)) return item;
    }
    return undefined;
  };
  util.isInteger =
    typeof Number.isInteger === 'function'
      ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
      : (val) => typeof val === 'number' && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = ' | ') {
    return array.map((val) => (typeof val === 'string' ? `'${val}'` : val)).join(separator);
  }
  util.joinValues = joinValues;
  util.jsonStringifyReplacer = (_, value) => {
    if (typeof value === 'bigint') return value.toString();
    return value;
  };
})($294e9db24f29f2d7$export$7debb50ef11d5e0b || ($294e9db24f29f2d7$export$7debb50ef11d5e0b = {}));
var $294e9db24f29f2d7$export$4aa2142c225fd5c7;
(function (objectUtil) {
  objectUtil.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second,
    };
  };
})($294e9db24f29f2d7$export$4aa2142c225fd5c7 || ($294e9db24f29f2d7$export$4aa2142c225fd5c7 = {}));
const $294e9db24f29f2d7$export$5716da67bfaa244d =
  $294e9db24f29f2d7$export$7debb50ef11d5e0b.arrayToEnum([
    'string',
    'nan',
    'number',
    'integer',
    'float',
    'boolean',
    'date',
    'bigint',
    'symbol',
    'function',
    'undefined',
    'null',
    'array',
    'object',
    'unknown',
    'promise',
    'void',
    'never',
    'map',
    'set',
  ]);
const $294e9db24f29f2d7$export$3e9057828ebd5c7a = (data) => {
  const t = typeof data;
  switch (t) {
    case 'undefined':
      return $294e9db24f29f2d7$export$5716da67bfaa244d.undefined;
    case 'string':
      return $294e9db24f29f2d7$export$5716da67bfaa244d.string;
    case 'number':
      return isNaN(data)
        ? $294e9db24f29f2d7$export$5716da67bfaa244d.nan
        : $294e9db24f29f2d7$export$5716da67bfaa244d.number;
    case 'boolean':
      return $294e9db24f29f2d7$export$5716da67bfaa244d.boolean;
    case 'function':
      return $294e9db24f29f2d7$export$5716da67bfaa244d.function;
    case 'bigint':
      return $294e9db24f29f2d7$export$5716da67bfaa244d.bigint;
    case 'symbol':
      return $294e9db24f29f2d7$export$5716da67bfaa244d.symbol;
    case 'object':
      if (Array.isArray(data)) return $294e9db24f29f2d7$export$5716da67bfaa244d.array;
      if (data === null) return $294e9db24f29f2d7$export$5716da67bfaa244d.null;
      if (
        data.then &&
        typeof data.then === 'function' &&
        data.catch &&
        typeof data.catch === 'function'
      )
        return $294e9db24f29f2d7$export$5716da67bfaa244d.promise;
      if (typeof Map !== 'undefined' && data instanceof Map)
        return $294e9db24f29f2d7$export$5716da67bfaa244d.map;
      if (typeof Set !== 'undefined' && data instanceof Set)
        return $294e9db24f29f2d7$export$5716da67bfaa244d.set;
      if (typeof Date !== 'undefined' && data instanceof Date)
        return $294e9db24f29f2d7$export$5716da67bfaa244d.date;
      return $294e9db24f29f2d7$export$5716da67bfaa244d.object;
    default:
      return $294e9db24f29f2d7$export$5716da67bfaa244d.unknown;
  }
};
const $294e9db24f29f2d7$export$5ba560653e4a1035 =
  $294e9db24f29f2d7$export$7debb50ef11d5e0b.arrayToEnum([
    'invalid_type',
    'invalid_literal',
    'custom',
    'invalid_union',
    'invalid_union_discriminator',
    'invalid_enum_value',
    'unrecognized_keys',
    'invalid_arguments',
    'invalid_return_type',
    'invalid_date',
    'invalid_string',
    'too_small',
    'too_big',
    'invalid_intersection_types',
    'not_multiple_of',
    'not_finite',
  ]);
const $294e9db24f29f2d7$export$913eddeaf297cfea = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, '$1:');
};
class $294e9db24f29f2d7$export$f98dac4b251ab333 extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf)
      // eslint-disable-next-line ban/ban
      Object.setPrototypeOf(this, actualProto);
    else this.__proto__ = actualProto;
    this.name = 'ZodError';
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper =
      _mapper ||
      function (issue) {
        return issue.message;
      };
    const fieldErrors = {
      _errors: [],
    };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === 'invalid_union') issue.unionErrors.map(processError);
        else if (issue.code === 'invalid_return_type') processError(issue.returnTypeError);
        else if (issue.code === 'invalid_arguments') processError(issue.argumentsError);
        else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
        else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal)
              curr[el] = curr[el] || {
                _errors: [],
              };
            else {
              curr[el] = curr[el] || {
                _errors: [],
              };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof $294e9db24f29f2d7$export$f98dac4b251ab333))
      throw new Error(`Not a ZodError: ${value}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(
      this.issues,
      $294e9db24f29f2d7$export$7debb50ef11d5e0b.jsonStringifyReplacer,
      2,
    );
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues)
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else formErrors.push(mapper(sub));
    return {
      formErrors: formErrors,
      fieldErrors: fieldErrors,
    };
  }
  get formErrors() {
    return this.flatten();
  }
}
$294e9db24f29f2d7$export$f98dac4b251ab333.create = (issues) => {
  const error = new $294e9db24f29f2d7$export$f98dac4b251ab333(issues);
  return error;
};
const $294e9db24f29f2d7$export$341b0b6e0a6f5099 = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type:
      if (issue.received === $294e9db24f29f2d7$export$5716da67bfaa244d.undefined)
        message = 'Required';
      else message = `Expected ${issue.expected}, received ${issue.received}`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, $294e9db24f29f2d7$export$7debb50ef11d5e0b.jsonStringifyReplacer)}`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${$294e9db24f29f2d7$export$7debb50ef11d5e0b.joinValues(issue.keys, ', ')}`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_union:
      message = `Invalid input`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${$294e9db24f29f2d7$export$7debb50ef11d5e0b.joinValues(issue.options)}`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_enum_value:
      message = `Invalid enum value. Expected ${$294e9db24f29f2d7$export$7debb50ef11d5e0b.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_date:
      message = `Invalid date`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('includes' in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === 'number')
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
        } else if ('startsWith' in issue.validation)
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        else if ('endsWith' in issue.validation)
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        else $294e9db24f29f2d7$export$7debb50ef11d5e0b.assertNever(issue.validation);
      } else if (issue.validation !== 'regex') message = `Invalid ${issue.validation}`;
      else message = 'Invalid';
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.too_small:
      if (issue.type === 'array')
        message = `Array must contain ${issue.exact ? 'exactly' : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === 'string')
        message = `String must contain ${issue.exact ? 'exactly' : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === 'number')
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === 'date')
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else message = 'Invalid input';
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.too_big:
      if (issue.type === 'array')
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === 'string')
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === 'number')
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === 'bigint')
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === 'date')
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else message = 'Invalid input';
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.custom:
      message = `Invalid input`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case $294e9db24f29f2d7$export$5ba560653e4a1035.not_finite:
      message = 'Number must be finite';
      break;
    default:
      message = _ctx.defaultError;
      $294e9db24f29f2d7$export$7debb50ef11d5e0b.assertNever(issue);
  }
  return {
    message: message,
  };
};
let $294e9db24f29f2d7$var$overrideErrorMap = $294e9db24f29f2d7$export$341b0b6e0a6f5099;
function $294e9db24f29f2d7$export$1097a8289cfd22d7(map) {
  $294e9db24f29f2d7$var$overrideErrorMap = map;
}
function $294e9db24f29f2d7$export$32f27c719778d4c4() {
  return $294e9db24f29f2d7$var$overrideErrorMap;
}
const $294e9db24f29f2d7$export$244a85fde9c419ed = (params) => {
  const { data: data, path: path, errorMaps: errorMaps, issueData: issueData } = params;
  const fullPath = [...path, ...(issueData.path || [])];
  const fullIssue = {
    ...issueData,
    path: fullPath,
  };
  if (issueData.message !== undefined)
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message,
    };
  let errorMessage = '';
  const maps = errorMaps
    .filter((m) => !!m)
    .slice()
    .reverse();
  for (const map of maps)
    errorMessage = map(fullIssue, {
      data: data,
      defaultError: errorMessage,
    }).message;
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage,
  };
};
const $294e9db24f29f2d7$export$1526d2e05f74572 = [];
function $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, issueData) {
  const overrideMap = $294e9db24f29f2d7$export$32f27c719778d4c4();
  const issue = $294e9db24f29f2d7$export$244a85fde9c419ed({
    issueData: issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === $294e9db24f29f2d7$export$341b0b6e0a6f5099
        ? undefined
        : $294e9db24f29f2d7$export$341b0b6e0a6f5099,
    ].filter((x) => !!x),
  });
  ctx.common.issues.push(issue);
}
class $294e9db24f29f2d7$export$5b20a5c3d05c1f6f {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    if (this.value === 'valid') this.value = 'dirty';
  }
  abort() {
    if (this.value !== 'aborted') this.value = 'aborted';
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
      if (s.status === 'dirty') status.dirty();
      arrayValue.push(s.value);
    }
    return {
      status: status.value,
      value: arrayValue,
    };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key: key,
        value: value,
      });
    }
    return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key: key, value: value } = pair;
      if (key.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
      if (value.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
      if (key.status === 'dirty') status.dirty();
      if (value.status === 'dirty') status.dirty();
      if (key.value !== '__proto__' && (typeof value.value !== 'undefined' || pair.alwaysSet))
        finalObject[key.value] = value.value;
    }
    return {
      status: status.value,
      value: finalObject,
    };
  }
}
const $294e9db24f29f2d7$export$9a105a556e65c2c0 = Object.freeze({
  status: 'aborted',
});
const $294e9db24f29f2d7$export$325a211da9693fcf = (value) => ({
  status: 'dirty',
  value: value,
});
const $294e9db24f29f2d7$export$c6813a8d51f77eaf = (value) => ({
  status: 'valid',
  value: value,
});
const $294e9db24f29f2d7$export$afa861e3c5730743 = (x) => x.status === 'aborted';
const $294e9db24f29f2d7$export$910b6cdd390341b3 = (x) => x.status === 'dirty';
const $294e9db24f29f2d7$export$1ea939691cdc45b8 = (x) => x.status === 'valid';
const $294e9db24f29f2d7$export$aefee5ebe1dcfd9e = (x) =>
  typeof Promise !== 'undefined' && x instanceof Promise;
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function $294e9db24f29f2d7$var$__classPrivateFieldGet(
  receiver,
  state,
  kind,
  f,
) {
  if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
  if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError('Cannot read private member from an object whose class did not declare it');
  return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function $294e9db24f29f2d7$var$__classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === 'm') throw new TypeError('Private method is not writable');
  if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
  if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError('Cannot write private member to an object whose class did not declare it');
  return (
    kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
    value
  );
}
typeof SuppressedError === 'function' && SuppressedError;
var $294e9db24f29f2d7$var$errorUtil;
(function (errorUtil) {
  errorUtil.errToObj = (message) =>
    typeof message === 'string'
      ? {
          message: message,
        }
      : message || {};
  errorUtil.toString = (message) =>
    typeof message === 'string'
      ? message
      : message === null || message === void 0
        ? void 0
        : message.message;
})($294e9db24f29f2d7$var$errorUtil || ($294e9db24f29f2d7$var$errorUtil = {}));
var $294e9db24f29f2d7$var$_ZodEnum_cache, $294e9db24f29f2d7$var$_ZodNativeEnum_cache;
class $294e9db24f29f2d7$var$ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) this._cachedPath.push(...this._path, ...this._key);
      else this._cachedPath.push(...this._path, this._key);
    }
    return this._cachedPath;
  }
}
const $294e9db24f29f2d7$var$handleResult = (ctx, result) => {
  if ($294e9db24f29f2d7$export$1ea939691cdc45b8(result))
    return {
      success: true,
      data: result.value,
    };
  else {
    if (!ctx.common.issues.length) throw new Error('Validation failed but no issues detected.');
    return {
      success: false,
      get error() {
        if (this._error) return this._error;
        const error = new $294e9db24f29f2d7$export$f98dac4b251ab333(ctx.common.issues);
        this._error = error;
        return this._error;
      },
    };
  }
};
function $294e9db24f29f2d7$var$processCreateParams(params) {
  if (!params) return {};
  const {
    errorMap: errorMap,
    invalid_type_error: invalid_type_error,
    required_error: required_error,
    description: description,
  } = params;
  if (errorMap && (invalid_type_error || required_error))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  if (errorMap)
    return {
      errorMap: errorMap,
      description: description,
    };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message: message } = params;
    if (iss.code === 'invalid_enum_value')
      return {
        message: message !== null && message !== void 0 ? message : ctx.defaultError,
      };
    if (typeof ctx.data === 'undefined')
      return {
        message:
          (_a = message !== null && message !== void 0 ? message : required_error) !== null &&
          _a !== void 0
            ? _a
            : ctx.defaultError,
      };
    if (iss.code !== 'invalid_type')
      return {
        message: ctx.defaultError,
      };
    return {
      message:
        (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null &&
        _b !== void 0
          ? _b
          : ctx.defaultError,
    };
  };
  return {
    errorMap: customMap,
    description: description,
  };
}
class $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor(def) {
    /** Alias of safeParseAsync */ this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return $294e9db24f29f2d7$export$3e9057828ebd5c7a(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return (
      ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: $294e9db24f29f2d7$export$3e9057828ebd5c7a(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent,
      }
    );
  }
  _processInputParams(input) {
    return {
      status: new $294e9db24f29f2d7$export$5b20a5c3d05c1f6f(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: $294e9db24f29f2d7$export$3e9057828ebd5c7a(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent,
      },
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if ($294e9db24f29f2d7$export$aefee5ebe1dcfd9e(result))
      throw new Error('Synchronous parse encountered promise.');
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success) return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async:
          (_a = params === null || params === void 0 ? void 0 : params.async) !== null &&
          _a !== void 0
            ? _a
            : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: data,
      parsedType: $294e9db24f29f2d7$export$3e9057828ebd5c7a(data),
    };
    const result = this._parseSync({
      data: data,
      path: ctx.path,
      parent: ctx,
    });
    return $294e9db24f29f2d7$var$handleResult(ctx, result);
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success) return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true,
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: data,
      parsedType: $294e9db24f29f2d7$export$3e9057828ebd5c7a(data),
    };
    const maybeAsyncResult = this._parse({
      data: data,
      path: ctx.path,
      parent: ctx,
    });
    const result = await ($294e9db24f29f2d7$export$aefee5ebe1dcfd9e(maybeAsyncResult)
      ? maybeAsyncResult
      : Promise.resolve(maybeAsyncResult));
    return $294e9db24f29f2d7$var$handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === 'string' || typeof message === 'undefined')
        return {
          message: message,
        };
      else if (typeof message === 'function') return message(val);
      else return message;
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () =>
        ctx.addIssue({
          code: $294e9db24f29f2d7$export$5ba560653e4a1035.custom,
          ...getIssueProperties(val),
        });
      if (typeof Promise !== 'undefined' && result instanceof Promise)
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else return true;
        });
      if (!result) {
        setError();
        return false;
      } else return true;
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(
          typeof refinementData === 'function' ? refinementData(val, ctx) : refinementData,
        );
        return false;
      } else return true;
    });
  }
  _refinement(refinement) {
    return new $294e9db24f29f2d7$export$a60af00cc0ce2582({
      schema: this,
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodEffects,
      effect: {
        type: 'refinement',
        refinement: refinement,
      },
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return $294e9db24f29f2d7$export$aa56fec1e9d629b8.create(this, this._def);
  }
  nullable() {
    return $294e9db24f29f2d7$export$aaac0b8b429cef5.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return $294e9db24f29f2d7$export$7acfc3e64785411.create(this, this._def);
  }
  promise() {
    return $294e9db24f29f2d7$export$3f196b0127d6e50a.create(this, this._def);
  }
  or(option) {
    return $294e9db24f29f2d7$export$a8b236cb5070a311.create([this, option], this._def);
  }
  and(incoming) {
    return $294e9db24f29f2d7$export$c02deaf0bb5203d4.create(this, incoming, this._def);
  }
  transform(transform) {
    return new $294e9db24f29f2d7$export$a60af00cc0ce2582({
      ...$294e9db24f29f2d7$var$processCreateParams(this._def),
      schema: this,
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodEffects,
      effect: {
        type: 'transform',
        transform: transform,
      },
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === 'function' ? def : () => def;
    return new $294e9db24f29f2d7$export$bb19b37874861e7e({
      ...$294e9db24f29f2d7$var$processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodDefault,
    });
  }
  brand() {
    return new $294e9db24f29f2d7$export$66b0c798a395271f({
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodBranded,
      type: this,
      ...$294e9db24f29f2d7$var$processCreateParams(this._def),
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === 'function' ? def : () => def;
    return new $294e9db24f29f2d7$export$75a44ec6249ac76b({
      ...$294e9db24f29f2d7$var$processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodCatch,
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description: description,
    });
  }
  pipe(target) {
    return $294e9db24f29f2d7$export$a3c3ef8a0e95c6da.create(this, target);
  }
  readonly() {
    return $294e9db24f29f2d7$export$5d1f7ef05c4e493a.create(this);
  }
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const $294e9db24f29f2d7$var$cuidRegex = /^c[^\s-]{8,}$/i;
const $294e9db24f29f2d7$var$cuid2Regex = /^[0-9a-z]+$/;
const $294e9db24f29f2d7$var$ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const $294e9db24f29f2d7$var$uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const $294e9db24f29f2d7$var$nanoidRegex = /^[a-z0-9_-]{21}$/i;
const $294e9db24f29f2d7$var$durationRegex =
  /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const $294e9db24f29f2d7$var$emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const $294e9db24f29f2d7$var$_emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let $294e9db24f29f2d7$var$emojiRegex;
// faster, simpler, safer
const $294e9db24f29f2d7$var$ipv4Regex =
  /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const $294e9db24f29f2d7$var$ipv6Regex =
  /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const $294e9db24f29f2d7$var$base64Regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const $294e9db24f29f2d7$var$dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const $294e9db24f29f2d7$var$dateRegex = new RegExp(`^${$294e9db24f29f2d7$var$dateRegexSource}$`);
function $294e9db24f29f2d7$var$timeRegexSource(args) {
  // let regex = `\\d{2}:\\d{2}:\\d{2}`;
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args.precision) regex = `${regex}\\.\\d{${args.precision}}`;
  else if (args.precision == null) regex = `${regex}(\\.\\d+)?`;
  return regex;
}
function $294e9db24f29f2d7$var$timeRegex(args) {
  return new RegExp(`^${$294e9db24f29f2d7$var$timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function $294e9db24f29f2d7$export$a4b563879add27a(args) {
  let regex = `${$294e9db24f29f2d7$var$dateRegexSource}T${$294e9db24f29f2d7$var$timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join('|')})`;
  return new RegExp(`^${regex}$`);
}
function $294e9db24f29f2d7$var$isValidIP(ip, version) {
  if ((version === 'v4' || !version) && $294e9db24f29f2d7$var$ipv4Regex.test(ip)) return true;
  if ((version === 'v6' || !version) && $294e9db24f29f2d7$var$ipv6Regex.test(ip)) return true;
  return false;
}
class $294e9db24f29f2d7$export$1230eb29b8d3b502 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    if (this._def.coerce) input.data = String(input.data);
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.string) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.string,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const status = new $294e9db24f29f2d7$export$5b20a5c3d05c1f6f();
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
            minimum: check.value,
            type: 'string',
            inclusive: true,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_big,
            maximum: check.value,
            type: 'string',
            inclusive: true,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'length') {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig)
            $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
              code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_big,
              maximum: check.value,
              type: 'string',
              inclusive: true,
              exact: true,
              message: check.message,
            });
          else if (tooSmall)
            $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
              code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
              minimum: check.value,
              type: 'string',
              inclusive: true,
              exact: true,
              message: check.message,
            });
          status.dirty();
        }
      } else if (check.kind === 'email') {
        if (!$294e9db24f29f2d7$var$emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'email',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'emoji') {
        if (!$294e9db24f29f2d7$var$emojiRegex)
          $294e9db24f29f2d7$var$emojiRegex = new RegExp($294e9db24f29f2d7$var$_emojiRegex, 'u');
        if (!$294e9db24f29f2d7$var$emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'emoji',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'uuid') {
        if (!$294e9db24f29f2d7$var$uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'uuid',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'nanoid') {
        if (!$294e9db24f29f2d7$var$nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'nanoid',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'cuid') {
        if (!$294e9db24f29f2d7$var$cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'cuid',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'cuid2') {
        if (!$294e9db24f29f2d7$var$cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'cuid2',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'ulid') {
        if (!$294e9db24f29f2d7$var$ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'ulid',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'url')
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'url',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      else if (check.kind === 'regex') {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'regex',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'trim') input.data = input.data.trim();
      else if (check.kind === 'includes') {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            validation: {
              includes: check.value,
              position: check.position,
            },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'toLowerCase') input.data = input.data.toLowerCase();
      else if (check.kind === 'toUpperCase') input.data = input.data.toUpperCase();
      else if (check.kind === 'startsWith') {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            validation: {
              startsWith: check.value,
            },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'endsWith') {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            validation: {
              endsWith: check.value,
            },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'datetime') {
        const regex = $294e9db24f29f2d7$export$a4b563879add27a(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            validation: 'datetime',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'date') {
        const regex = $294e9db24f29f2d7$var$dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            validation: 'date',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'time') {
        const regex = $294e9db24f29f2d7$var$timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            validation: 'time',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'duration') {
        if (!$294e9db24f29f2d7$var$durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'duration',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'ip') {
        if (!$294e9db24f29f2d7$var$isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'ip',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'base64') {
        if (!$294e9db24f29f2d7$var$base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            validation: 'base64',
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else $294e9db24f29f2d7$export$7debb50ef11d5e0b.assertNever(check);
    }
    return {
      status: status.value,
      value: input.data,
    };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation: validation,
      code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_string,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  _addCheck(check) {
    return new $294e9db24f29f2d7$export$1230eb29b8d3b502({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  email(message) {
    return this._addCheck({
      kind: 'email',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  url(message) {
    return this._addCheck({
      kind: 'url',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  emoji(message) {
    return this._addCheck({
      kind: 'emoji',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  uuid(message) {
    return this._addCheck({
      kind: 'uuid',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  nanoid(message) {
    return this._addCheck({
      kind: 'nanoid',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  cuid(message) {
    return this._addCheck({
      kind: 'cuid',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  cuid2(message) {
    return this._addCheck({
      kind: 'cuid2',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  ulid(message) {
    return this._addCheck({
      kind: 'ulid',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  base64(message) {
    return this._addCheck({
      kind: 'base64',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  ip(options) {
    return this._addCheck({
      kind: 'ip',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(options),
    });
  }
  datetime(options) {
    var _a, _b;
    if (typeof options === 'string')
      return this._addCheck({
        kind: 'datetime',
        precision: null,
        offset: false,
        local: false,
        message: options,
      });
    return this._addCheck({
      kind: 'datetime',
      precision:
        typeof (options === null || options === void 0 ? void 0 : options.precision) === 'undefined'
          ? null
          : options === null || options === void 0
            ? void 0
            : options.precision,
      offset:
        (_a = options === null || options === void 0 ? void 0 : options.offset) !== null &&
        _a !== void 0
          ? _a
          : false,
      local:
        (_b = options === null || options === void 0 ? void 0 : options.local) !== null &&
        _b !== void 0
          ? _b
          : false,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(
        options === null || options === void 0 ? void 0 : options.message,
      ),
    });
  }
  date(message) {
    return this._addCheck({
      kind: 'date',
      message: message,
    });
  }
  time(options) {
    if (typeof options === 'string')
      return this._addCheck({
        kind: 'time',
        precision: null,
        message: options,
      });
    return this._addCheck({
      kind: 'time',
      precision:
        typeof (options === null || options === void 0 ? void 0 : options.precision) === 'undefined'
          ? null
          : options === null || options === void 0
            ? void 0
            : options.precision,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(
        options === null || options === void 0 ? void 0 : options.message,
      ),
    });
  }
  duration(message) {
    return this._addCheck({
      kind: 'duration',
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: 'regex',
      regex: regex,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: 'includes',
      value: value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(
        options === null || options === void 0 ? void 0 : options.message,
      ),
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: 'startsWith',
      value: value,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: 'endsWith',
      value: value,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: 'min',
      value: minLength,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: 'max',
      value: maxLength,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: 'length',
      value: len,
      ...$294e9db24f29f2d7$var$errorUtil.errToObj(message),
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */ nonempty(message) {
    return this.min(1, $294e9db24f29f2d7$var$errorUtil.errToObj(message));
  }
  trim() {
    return new $294e9db24f29f2d7$export$1230eb29b8d3b502({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: 'trim',
        },
      ],
    });
  }
  toLowerCase() {
    return new $294e9db24f29f2d7$export$1230eb29b8d3b502({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: 'toLowerCase',
        },
      ],
    });
  }
  toUpperCase() {
    return new $294e9db24f29f2d7$export$1230eb29b8d3b502({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: 'toUpperCase',
        },
      ],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === 'ip');
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === 'base64');
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
}
$294e9db24f29f2d7$export$1230eb29b8d3b502.create = (params) => {
  var _a;
  return new $294e9db24f29f2d7$export$1230eb29b8d3b502({
    checks: [],
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodString,
    coerce:
      (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0
        ? _a
        : false,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function $294e9db24f29f2d7$var$floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split('.')[1] || '').length;
  const stepDecCount = (step.toString().split('.')[1] || '').length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace('.', ''));
  const stepInt = parseInt(step.toFixed(decCount).replace('.', ''));
  return (valInt % stepInt) / Math.pow(10, decCount);
}
class $294e9db24f29f2d7$export$5b070a55c0c43e09 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) input.data = Number(input.data);
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.number) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.number,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    let ctx = undefined;
    const status = new $294e9db24f29f2d7$export$5b20a5c3d05c1f6f();
    for (const check of this._def.checks) {
      if (check.kind === 'int') {
        if (!$294e9db24f29f2d7$export$7debb50ef11d5e0b.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
            expected: 'integer',
            received: 'float',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'min') {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
            minimum: check.value,
            type: 'number',
            inclusive: check.inclusive,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_big,
            maximum: check.value,
            type: 'number',
            inclusive: check.inclusive,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'multipleOf') {
        if ($294e9db24f29f2d7$var$floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.not_multiple_of,
            multipleOf: check.value,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'finite') {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.not_finite,
            message: check.message,
          });
          status.dirty();
        }
      } else $294e9db24f29f2d7$export$7debb50ef11d5e0b.assertNever(check);
    }
    return {
      status: status.value,
      value: input.data,
    };
  }
  gte(value, message) {
    return this.setLimit('min', value, true, $294e9db24f29f2d7$var$errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit('min', value, false, $294e9db24f29f2d7$var$errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit('max', value, true, $294e9db24f29f2d7$var$errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit('max', value, false, $294e9db24f29f2d7$var$errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new $294e9db24f29f2d7$export$5b070a55c0c43e09({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: kind,
          value: value,
          inclusive: inclusive,
          message: $294e9db24f29f2d7$var$errorUtil.toString(message),
        },
      ],
    });
  }
  _addCheck(check) {
    return new $294e9db24f29f2d7$export$5b070a55c0c43e09({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  int(message) {
    return this._addCheck({
      kind: 'int',
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  positive(message) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: false,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  negative(message) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: false,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: true,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: true,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: 'multipleOf',
      value: value,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  finite(message) {
    return this._addCheck({
      kind: 'finite',
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  safe(message) {
    return this._addCheck({
      kind: 'min',
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    })._addCheck({
      kind: 'max',
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find(
      (ch) =>
        ch.kind === 'int' ||
        (ch.kind === 'multipleOf' && $294e9db24f29f2d7$export$7debb50ef11d5e0b.isInteger(ch.value)),
    );
  }
  get isFinite() {
    let max = null,
      min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'finite' || ch.kind === 'int' || ch.kind === 'multipleOf') return true;
      else if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      } else if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
$294e9db24f29f2d7$export$5b070a55c0c43e09.create = (params) => {
  return new $294e9db24f29f2d7$export$5b070a55c0c43e09({
    checks: [],
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$67d741fd70ff98f4 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) input.data = BigInt(input.data);
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.bigint) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.bigint,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    let ctx = undefined;
    const status = new $294e9db24f29f2d7$export$5b20a5c3d05c1f6f();
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
            type: 'bigint',
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_big,
            type: 'bigint',
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'multipleOf') {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.not_multiple_of,
            multipleOf: check.value,
            message: check.message,
          });
          status.dirty();
        }
      } else $294e9db24f29f2d7$export$7debb50ef11d5e0b.assertNever(check);
    }
    return {
      status: status.value,
      value: input.data,
    };
  }
  gte(value, message) {
    return this.setLimit('min', value, true, $294e9db24f29f2d7$var$errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit('min', value, false, $294e9db24f29f2d7$var$errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit('max', value, true, $294e9db24f29f2d7$var$errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit('max', value, false, $294e9db24f29f2d7$var$errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new $294e9db24f29f2d7$export$67d741fd70ff98f4({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: kind,
          value: value,
          inclusive: inclusive,
          message: $294e9db24f29f2d7$var$errorUtil.toString(message),
        },
      ],
    });
  }
  _addCheck(check) {
    return new $294e9db24f29f2d7$export$67d741fd70ff98f4({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  positive(message) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: false,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  negative(message) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: false,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: true,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: true,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: 'multipleOf',
      value: value,
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
}
$294e9db24f29f2d7$export$67d741fd70ff98f4.create = (params) => {
  var _a;
  return new $294e9db24f29f2d7$export$67d741fd70ff98f4({
    checks: [],
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodBigInt,
    coerce:
      (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0
        ? _a
        : false,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$723d146f80596191 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    if (this._def.coerce) input.data = Boolean(input.data);
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.boolean) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.boolean,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
}
$294e9db24f29f2d7$export$723d146f80596191.create = (params) => {
  return new $294e9db24f29f2d7$export$723d146f80596191({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$e974be33bdc55521 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    if (this._def.coerce) input.data = new Date(input.data);
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.date) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.date,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    if (isNaN(input.data.getTime())) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_date,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const status = new $294e9db24f29f2d7$export$5b20a5c3d05c1f6f();
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: 'date',
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: 'date',
          });
          status.dirty();
        }
      } else $294e9db24f29f2d7$export$7debb50ef11d5e0b.assertNever(check);
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime()),
    };
  }
  _addCheck(check) {
    return new $294e9db24f29f2d7$export$e974be33bdc55521({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: 'min',
      value: minDate.getTime(),
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: 'max',
      value: maxDate.getTime(),
      message: $294e9db24f29f2d7$var$errorUtil.toString(message),
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
$294e9db24f29f2d7$export$e974be33bdc55521.create = (params) => {
  return new $294e9db24f29f2d7$export$e974be33bdc55521({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodDate,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$bcc3b40f6b638044 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.symbol) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.symbol,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
}
$294e9db24f29f2d7$export$bcc3b40f6b638044.create = (params) => {
  return new $294e9db24f29f2d7$export$bcc3b40f6b638044({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodSymbol,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$4e780e961c30340d extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.undefined) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.undefined,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
}
$294e9db24f29f2d7$export$4e780e961c30340d.create = (params) => {
  return new $294e9db24f29f2d7$export$4e780e961c30340d({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodUndefined,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$a96281f914484f2d extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.null) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.null,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
}
$294e9db24f29f2d7$export$a96281f914484f2d.create = (params) => {
  return new $294e9db24f29f2d7$export$a96281f914484f2d({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodNull,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$b9d1edb536b4e4eb extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor() {
    super(...arguments);
    // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
    this._any = true;
  }
  _parse(input) {
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
}
$294e9db24f29f2d7$export$b9d1edb536b4e4eb.create = (params) => {
  return new $294e9db24f29f2d7$export$b9d1edb536b4e4eb({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodAny,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$ef3b1bb1630977ae extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor() {
    super(...arguments);
    // required
    this._unknown = true;
  }
  _parse(input) {
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
}
$294e9db24f29f2d7$export$ef3b1bb1630977ae.create = (params) => {
  return new $294e9db24f29f2d7$export$ef3b1bb1630977ae({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodUnknown,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$1e576a20c3ce9fb5 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
      code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
      expected: $294e9db24f29f2d7$export$5716da67bfaa244d.never,
      received: ctx.parsedType,
    });
    return $294e9db24f29f2d7$export$9a105a556e65c2c0;
  }
}
$294e9db24f29f2d7$export$1e576a20c3ce9fb5.create = (params) => {
  return new $294e9db24f29f2d7$export$1e576a20c3ce9fb5({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodNever,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$7d39f5df85f21031 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.undefined) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.void,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
}
$294e9db24f29f2d7$export$7d39f5df85f21031.create = (params) => {
  return new $294e9db24f29f2d7$export$7d39f5df85f21031({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodVoid,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$7acfc3e64785411 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { ctx: ctx, status: status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.array) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.array,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
          code: tooBig
            ? $294e9db24f29f2d7$export$5ba560653e4a1035.too_big
            : $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
          minimum: tooSmall ? def.exactLength.value : undefined,
          maximum: tooBig ? def.exactLength.value : undefined,
          type: 'array',
          inclusive: true,
          exact: true,
          message: def.exactLength.message,
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
          code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
          minimum: def.minLength.value,
          type: 'array',
          inclusive: true,
          exact: false,
          message: def.minLength.message,
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
          code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_big,
          maximum: def.maxLength.value,
          type: 'array',
          inclusive: true,
          exact: false,
          message: def.maxLength.message,
        });
        status.dirty();
      }
    }
    if (ctx.common.async)
      return Promise.all(
        [...ctx.data].map((item, i) => {
          return def.type._parseAsync(
            new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, item, ctx.path, i),
          );
        }),
      ).then((result) => {
        return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeArray(status, result);
      });
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(
        new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, item, ctx.path, i),
      );
    });
    return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new $294e9db24f29f2d7$export$7acfc3e64785411({
      ...this._def,
      minLength: {
        value: minLength,
        message: $294e9db24f29f2d7$var$errorUtil.toString(message),
      },
    });
  }
  max(maxLength, message) {
    return new $294e9db24f29f2d7$export$7acfc3e64785411({
      ...this._def,
      maxLength: {
        value: maxLength,
        message: $294e9db24f29f2d7$var$errorUtil.toString(message),
      },
    });
  }
  length(len, message) {
    return new $294e9db24f29f2d7$export$7acfc3e64785411({
      ...this._def,
      exactLength: {
        value: len,
        message: $294e9db24f29f2d7$var$errorUtil.toString(message),
      },
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
$294e9db24f29f2d7$export$7acfc3e64785411.create = (schema, params) => {
  return new $294e9db24f29f2d7$export$7acfc3e64785411({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodArray,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
function $294e9db24f29f2d7$var$deepPartialify(schema) {
  if (schema instanceof $294e9db24f29f2d7$export$736315c5b55efbad) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = $294e9db24f29f2d7$export$aa56fec1e9d629b8.create(
        $294e9db24f29f2d7$var$deepPartialify(fieldSchema),
      );
    }
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...schema._def,
      shape: () => newShape,
    });
  } else if (schema instanceof $294e9db24f29f2d7$export$7acfc3e64785411)
    return new $294e9db24f29f2d7$export$7acfc3e64785411({
      ...schema._def,
      type: $294e9db24f29f2d7$var$deepPartialify(schema.element),
    });
  else if (schema instanceof $294e9db24f29f2d7$export$aa56fec1e9d629b8)
    return $294e9db24f29f2d7$export$aa56fec1e9d629b8.create(
      $294e9db24f29f2d7$var$deepPartialify(schema.unwrap()),
    );
  else if (schema instanceof $294e9db24f29f2d7$export$aaac0b8b429cef5)
    return $294e9db24f29f2d7$export$aaac0b8b429cef5.create(
      $294e9db24f29f2d7$var$deepPartialify(schema.unwrap()),
    );
  else if (schema instanceof $294e9db24f29f2d7$export$e2a18bb771d8e6a3)
    return $294e9db24f29f2d7$export$e2a18bb771d8e6a3.create(
      schema.items.map((item) => $294e9db24f29f2d7$var$deepPartialify(item)),
    );
  else return schema;
}
class $294e9db24f29f2d7$export$736315c5b55efbad extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor() {
    super(...arguments);
    this._cached = null;
    /**
     * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
     * If you want to pass through unknown properties, use `.passthrough()` instead.
     */ this.nonstrict = this.passthrough;
    // extend<
    //   Augmentation extends ZodRawShape,
    //   NewOutput extends util.flatten<{
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   }>,
    //   NewInput extends util.flatten<{
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }>
    // >(
    //   augmentation: Augmentation
    // ): ZodObject<
    //   extendShape<T, Augmentation>,
    //   UnknownKeys,
    //   Catchall,
    //   NewOutput,
    //   NewInput
    // > {
    //   return new ZodObject({
    //     ...this._def,
    //     shape: () => ({
    //       ...this._def.shape(),
    //       ...augmentation,
    //     }),
    //   }) as any;
    // }
    /**
     * @deprecated Use `.extend` instead
     *  */ this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const shape = this._def.shape();
    const keys = $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectKeys(shape);
    return (this._cached = {
      shape: shape,
      keys: keys,
    });
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.object) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.object,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const { status: status, ctx: ctx } = this._processInputParams(input);
    const { shape: shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (
      !(
        this._def.catchall instanceof $294e9db24f29f2d7$export$1e576a20c3ce9fb5 &&
        this._def.unknownKeys === 'strip'
      )
    ) {
      for (const key in ctx.data) if (!shapeKeys.includes(key)) extraKeys.push(key);
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: {
          status: 'valid',
          value: key,
        },
        value: keyValidator._parse(
          new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, value, ctx.path, key),
        ),
        alwaysSet: key in ctx.data,
      });
    }
    if (this._def.catchall instanceof $294e9db24f29f2d7$export$1e576a20c3ce9fb5) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === 'passthrough')
        for (const key of extraKeys)
          pairs.push({
            key: {
              status: 'valid',
              value: key,
            },
            value: {
              status: 'valid',
              value: ctx.data[key],
            },
          });
      else if (unknownKeys === 'strict') {
        if (extraKeys.length > 0) {
          $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
            code: $294e9db24f29f2d7$export$5ba560653e4a1035.unrecognized_keys,
            keys: extraKeys,
          });
          status.dirty();
        }
      } else if (unknownKeys === 'strip');
      else throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
    } else {
      // run catchall validation
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: {
            status: 'valid',
            value: key,
          },
          value: catchall._parse(
            new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, value, ctx.path, key), //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data,
        });
      }
    }
    if (ctx.common.async)
      return Promise.resolve()
        .then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
              key: key,
              value: value,
              alwaysSet: pair.alwaysSet,
            });
          }
          return syncPairs;
        })
        .then((syncPairs) => {
          return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeObjectSync(status, syncPairs);
        });
    else return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeObjectSync(status, pairs);
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    $294e9db24f29f2d7$var$errorUtil.errToObj;
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      unknownKeys: 'strict',
      ...(message !== undefined
        ? {
            errorMap: (issue, ctx) => {
              var _a, _b, _c, _d;
              const defaultError =
                (_c =
                  (_b = (_a = this._def).errorMap) === null || _b === void 0
                    ? void 0
                    : _b.call(_a, issue, ctx).message) !== null && _c !== void 0
                  ? _c
                  : ctx.defaultError;
              if (issue.code === 'unrecognized_keys')
                return {
                  message:
                    (_d = $294e9db24f29f2d7$var$errorUtil.errToObj(message).message) !== null &&
                    _d !== void 0
                      ? _d
                      : defaultError,
                };
              return {
                message: defaultError,
              };
            },
          }
        : {}),
    });
  }
  strip() {
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      unknownKeys: 'strip',
    });
  }
  passthrough() {
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      unknownKeys: 'passthrough',
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation,
      }),
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */ merge(merging) {
    const merged = new $294e9db24f29f2d7$export$736315c5b55efbad({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape(),
      }),
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodObject,
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({
      [key]: schema,
    });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      catchall: index,
    });
  }
  pick(mask) {
    const shape = {};
    $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) shape[key] = this.shape[key];
    });
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      shape: () => shape,
    });
  }
  omit(mask) {
    const shape = {};
    $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) shape[key] = this.shape[key];
    });
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      shape: () => shape,
    });
  }
  /**
   * @deprecated
   */ deepPartial() {
    return $294e9db24f29f2d7$var$deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) newShape[key] = fieldSchema;
      else newShape[key] = fieldSchema.optional();
    });
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      shape: () => newShape,
    });
  }
  required(mask) {
    const newShape = {};
    $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) newShape[key] = this.shape[key];
      else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof $294e9db24f29f2d7$export$aa56fec1e9d629b8)
          newField = newField._def.innerType;
        newShape[key] = newField;
      }
    });
    return new $294e9db24f29f2d7$export$736315c5b55efbad({
      ...this._def,
      shape: () => newShape,
    });
  }
  keyof() {
    return $294e9db24f29f2d7$var$createZodEnum(
      $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectKeys(this.shape),
    );
  }
}
$294e9db24f29f2d7$export$736315c5b55efbad.create = (shape, params) => {
  return new $294e9db24f29f2d7$export$736315c5b55efbad({
    shape: () => shape,
    unknownKeys: 'strip',
    catchall: $294e9db24f29f2d7$export$1e576a20c3ce9fb5.create(),
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodObject,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
$294e9db24f29f2d7$export$736315c5b55efbad.strictCreate = (shape, params) => {
  return new $294e9db24f29f2d7$export$736315c5b55efbad({
    shape: () => shape,
    unknownKeys: 'strict',
    catchall: $294e9db24f29f2d7$export$1e576a20c3ce9fb5.create(),
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodObject,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
$294e9db24f29f2d7$export$736315c5b55efbad.lazycreate = (shape, params) => {
  return new $294e9db24f29f2d7$export$736315c5b55efbad({
    shape: shape,
    unknownKeys: 'strip',
    catchall: $294e9db24f29f2d7$export$1e576a20c3ce9fb5.create(),
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodObject,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$a8b236cb5070a311 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { ctx: ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      // return first issue-free validation if it exists
      for (const result of results) {
        if (result.result.status === 'valid') return result.result;
      }
      for (const result of results)
        if (result.result.status === 'dirty') {
          // add issues from dirty option
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      // return invalid
      const unionErrors = results.map(
        (result) => new $294e9db24f29f2d7$export$f98dac4b251ab333(result.ctx.common.issues),
      );
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_union,
        unionErrors: unionErrors,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    if (ctx.common.async)
      return Promise.all(
        options.map(async (option) => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: [],
            },
            parent: null,
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx,
            }),
            ctx: childCtx,
          };
        }),
      ).then(handleResults);
    else {
      let dirty = undefined;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: [],
          },
          parent: null,
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx,
        });
        if (result.status === 'valid') return result;
        else if (result.status === 'dirty' && !dirty)
          dirty = {
            result: result,
            ctx: childCtx,
          };
        if (childCtx.common.issues.length) issues.push(childCtx.common.issues);
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map(
        (issues) => new $294e9db24f29f2d7$export$f98dac4b251ab333(issues),
      );
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_union,
        unionErrors: unionErrors,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
  }
  get options() {
    return this._def.options;
  }
}
$294e9db24f29f2d7$export$a8b236cb5070a311.create = (types, params) => {
  return new $294e9db24f29f2d7$export$a8b236cb5070a311({
    options: types,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodUnion,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const $294e9db24f29f2d7$var$getDiscriminator = (type) => {
  if (type instanceof $294e9db24f29f2d7$export$378d0cfce37406e6)
    return $294e9db24f29f2d7$var$getDiscriminator(type.schema);
  else if (type instanceof $294e9db24f29f2d7$export$a60af00cc0ce2582)
    return $294e9db24f29f2d7$var$getDiscriminator(type.innerType());
  else if (type instanceof $294e9db24f29f2d7$export$7e44096782a165d3) return [type.value];
  else if (type instanceof $294e9db24f29f2d7$export$d325d1f0e1c20179) return type.options;
  else if (type instanceof $294e9db24f29f2d7$export$370b2e8d6d6f5c56)
    // eslint-disable-next-line ban/ban
    return $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectValues(type.enum);
  else if (type instanceof $294e9db24f29f2d7$export$bb19b37874861e7e)
    return $294e9db24f29f2d7$var$getDiscriminator(type._def.innerType);
  else if (type instanceof $294e9db24f29f2d7$export$4e780e961c30340d) return [undefined];
  else if (type instanceof $294e9db24f29f2d7$export$a96281f914484f2d) return [null];
  else if (type instanceof $294e9db24f29f2d7$export$aa56fec1e9d629b8)
    return [undefined, ...$294e9db24f29f2d7$var$getDiscriminator(type.unwrap())];
  else if (type instanceof $294e9db24f29f2d7$export$aaac0b8b429cef5)
    return [null, ...$294e9db24f29f2d7$var$getDiscriminator(type.unwrap())];
  else if (type instanceof $294e9db24f29f2d7$export$66b0c798a395271f)
    return $294e9db24f29f2d7$var$getDiscriminator(type.unwrap());
  else if (type instanceof $294e9db24f29f2d7$export$5d1f7ef05c4e493a)
    return $294e9db24f29f2d7$var$getDiscriminator(type.unwrap());
  else if (type instanceof $294e9db24f29f2d7$export$75a44ec6249ac76b)
    return $294e9db24f29f2d7$var$getDiscriminator(type._def.innerType);
  else return [];
};
class $294e9db24f29f2d7$export$5ef2424805ac76a3 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { ctx: ctx } = this._processInputParams(input);
    if (ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.object) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.object,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator],
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    if (ctx.common.async)
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx,
      });
    else
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx,
      });
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */ static create(discriminator, options, params) {
    // Get all the valid discriminator values
    const optionsMap = new Map();
    // try {
    for (const type of options) {
      const discriminatorValues = $294e9db24f29f2d7$var$getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length)
        throw new Error(
          `A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`,
        );
      for (const value of discriminatorValues) {
        if (optionsMap.has(value))
          throw new Error(
            `Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`,
          );
        optionsMap.set(value, type);
      }
    }
    return new $294e9db24f29f2d7$export$5ef2424805ac76a3({
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodDiscriminatedUnion,
      discriminator: discriminator,
      options: options,
      optionsMap: optionsMap,
      ...$294e9db24f29f2d7$var$processCreateParams(params),
    });
  }
}
function $294e9db24f29f2d7$var$mergeValues(a, b) {
  const aType = $294e9db24f29f2d7$export$3e9057828ebd5c7a(a);
  const bType = $294e9db24f29f2d7$export$3e9057828ebd5c7a(b);
  if (a === b)
    return {
      valid: true,
      data: a,
    };
  else if (
    aType === $294e9db24f29f2d7$export$5716da67bfaa244d.object &&
    bType === $294e9db24f29f2d7$export$5716da67bfaa244d.object
  ) {
    const bKeys = $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectKeys(b);
    const sharedKeys = $294e9db24f29f2d7$export$7debb50ef11d5e0b
      .objectKeys(a)
      .filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = {
      ...a,
      ...b,
    };
    for (const key of sharedKeys) {
      const sharedValue = $294e9db24f29f2d7$var$mergeValues(a[key], b[key]);
      if (!sharedValue.valid)
        return {
          valid: false,
        };
      newObj[key] = sharedValue.data;
    }
    return {
      valid: true,
      data: newObj,
    };
  } else if (
    aType === $294e9db24f29f2d7$export$5716da67bfaa244d.array &&
    bType === $294e9db24f29f2d7$export$5716da67bfaa244d.array
  ) {
    if (a.length !== b.length)
      return {
        valid: false,
      };
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = $294e9db24f29f2d7$var$mergeValues(itemA, itemB);
      if (!sharedValue.valid)
        return {
          valid: false,
        };
      newArray.push(sharedValue.data);
    }
    return {
      valid: true,
      data: newArray,
    };
  } else if (
    aType === $294e9db24f29f2d7$export$5716da67bfaa244d.date &&
    bType === $294e9db24f29f2d7$export$5716da67bfaa244d.date &&
    +a === +b
  )
    return {
      valid: true,
      data: a,
    };
  else
    return {
      valid: false,
    };
}
class $294e9db24f29f2d7$export$c02deaf0bb5203d4 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { status: status, ctx: ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (
        $294e9db24f29f2d7$export$afa861e3c5730743(parsedLeft) ||
        $294e9db24f29f2d7$export$afa861e3c5730743(parsedRight)
      )
        return $294e9db24f29f2d7$export$9a105a556e65c2c0;
      const merged = $294e9db24f29f2d7$var$mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
          code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_intersection_types,
        });
        return $294e9db24f29f2d7$export$9a105a556e65c2c0;
      }
      if (
        $294e9db24f29f2d7$export$910b6cdd390341b3(parsedLeft) ||
        $294e9db24f29f2d7$export$910b6cdd390341b3(parsedRight)
      )
        status.dirty();
      return {
        status: status.value,
        value: merged.data,
      };
    };
    if (ctx.common.async)
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
      ]).then(([left, right]) => handleParsed(left, right));
    else
      return handleParsed(
        this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
        this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
      );
  }
}
$294e9db24f29f2d7$export$c02deaf0bb5203d4.create = (left, right, params) => {
  return new $294e9db24f29f2d7$export$c02deaf0bb5203d4({
    left: left,
    right: right,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodIntersection,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$e2a18bb771d8e6a3 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { status: status, ctx: ctx } = this._processInputParams(input);
    if (ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.array) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.array,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    if (ctx.data.length < this._def.items.length) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: 'array',
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: 'array',
      });
      status.dirty();
    }
    const items = [...ctx.data]
      .map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema) return null;
        return schema._parse(
          new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, item, ctx.path, itemIndex),
        );
      })
      .filter((x) => !!x); // filter nulls
    if (ctx.common.async)
      return Promise.all(items).then((results) => {
        return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeArray(status, results);
      });
    else return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeArray(status, items);
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new $294e9db24f29f2d7$export$e2a18bb771d8e6a3({
      ...this._def,
      rest: rest,
    });
  }
}
$294e9db24f29f2d7$export$e2a18bb771d8e6a3.create = (schemas, params) => {
  if (!Array.isArray(schemas))
    throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  return new $294e9db24f29f2d7$export$e2a18bb771d8e6a3({
    items: schemas,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodTuple,
    rest: null,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$a2acc09968cb4b7f extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status: status, ctx: ctx } = this._processInputParams(input);
    if (ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.object) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.object,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data)
      pairs.push({
        key: keyType._parse(new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(
          new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key),
        ),
        alwaysSet: key in ctx.data,
      });
    if (ctx.common.async)
      return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeObjectAsync(status, pairs);
    else return $294e9db24f29f2d7$export$5b20a5c3d05c1f6f.mergeObjectSync(status, pairs);
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof $294e9db24f29f2d7$export$19342e026b58ebb7)
      return new $294e9db24f29f2d7$export$a2acc09968cb4b7f({
        keyType: first,
        valueType: second,
        typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodRecord,
        ...$294e9db24f29f2d7$var$processCreateParams(third),
      });
    return new $294e9db24f29f2d7$export$a2acc09968cb4b7f({
      keyType: $294e9db24f29f2d7$export$1230eb29b8d3b502.create(),
      valueType: first,
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodRecord,
      ...$294e9db24f29f2d7$var$processCreateParams(second),
    });
  }
}
class $294e9db24f29f2d7$export$163b6a2b712d9542 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status: status, ctx: ctx } = this._processInputParams(input);
    if (ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.map) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.map,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(
          new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, key, ctx.path, [index, 'key']),
        ),
        value: valueType._parse(
          new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, value, ctx.path, [index, 'value']),
        ),
      };
    });
    if (ctx.common.async) {
      const finalMap = new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === 'aborted' || value.status === 'aborted')
            return $294e9db24f29f2d7$export$9a105a556e65c2c0;
          if (key.status === 'dirty' || value.status === 'dirty') status.dirty();
          finalMap.set(key.value, value.value);
        }
        return {
          status: status.value,
          value: finalMap,
        };
      });
    } else {
      const finalMap = new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === 'aborted' || value.status === 'aborted')
          return $294e9db24f29f2d7$export$9a105a556e65c2c0;
        if (key.status === 'dirty' || value.status === 'dirty') status.dirty();
        finalMap.set(key.value, value.value);
      }
      return {
        status: status.value,
        value: finalMap,
      };
    }
  }
}
$294e9db24f29f2d7$export$163b6a2b712d9542.create = (keyType, valueType, params) => {
  return new $294e9db24f29f2d7$export$163b6a2b712d9542({
    valueType: valueType,
    keyType: keyType,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodMap,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$977057706f816712 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { status: status, ctx: ctx } = this._processInputParams(input);
    if (ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.set) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.set,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
          code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_small,
          minimum: def.minSize.value,
          type: 'set',
          inclusive: true,
          exact: false,
          message: def.minSize.message,
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
          code: $294e9db24f29f2d7$export$5ba560653e4a1035.too_big,
          maximum: def.maxSize.value,
          type: 'set',
          inclusive: true,
          exact: false,
          message: def.maxSize.message,
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements) {
      const parsedSet = new Set();
      for (const element of elements) {
        if (element.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
        if (element.status === 'dirty') status.dirty();
        parsedSet.add(element.value);
      }
      return {
        status: status.value,
        value: parsedSet,
      };
    }
    const elements = [...ctx.data.values()].map((item, i) =>
      valueType._parse(new $294e9db24f29f2d7$var$ParseInputLazyPath(ctx, item, ctx.path, i)),
    );
    if (ctx.common.async) return Promise.all(elements).then((elements) => finalizeSet(elements));
    else return finalizeSet(elements);
  }
  min(minSize, message) {
    return new $294e9db24f29f2d7$export$977057706f816712({
      ...this._def,
      minSize: {
        value: minSize,
        message: $294e9db24f29f2d7$var$errorUtil.toString(message),
      },
    });
  }
  max(maxSize, message) {
    return new $294e9db24f29f2d7$export$977057706f816712({
      ...this._def,
      maxSize: {
        value: maxSize,
        message: $294e9db24f29f2d7$var$errorUtil.toString(message),
      },
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
$294e9db24f29f2d7$export$977057706f816712.create = (valueType, params) => {
  return new $294e9db24f29f2d7$export$977057706f816712({
    valueType: valueType,
    minSize: null,
    maxSize: null,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodSet,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$d4602ba55673f53c extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx: ctx } = this._processInputParams(input);
    if (ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.function) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.function,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    function makeArgsIssue(args, error) {
      return $294e9db24f29f2d7$export$244a85fde9c419ed({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          $294e9db24f29f2d7$export$32f27c719778d4c4(),
          $294e9db24f29f2d7$export$341b0b6e0a6f5099,
        ].filter((x) => !!x),
        issueData: {
          code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_arguments,
          argumentsError: error,
        },
      });
    }
    function makeReturnsIssue(returns, error) {
      return $294e9db24f29f2d7$export$244a85fde9c419ed({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          $294e9db24f29f2d7$export$32f27c719778d4c4(),
          $294e9db24f29f2d7$export$341b0b6e0a6f5099,
        ].filter((x) => !!x),
        issueData: {
          code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_return_type,
          returnTypeError: error,
        },
      });
    }
    const params = {
      errorMap: ctx.common.contextualErrorMap,
    };
    const fn = ctx.data;
    if (this._def.returns instanceof $294e9db24f29f2d7$export$3f196b0127d6e50a) {
      // Would love a way to avoid disabling this rule, but we need
      // an alias (using an arrow function was what caused 2651).
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const me = this;
      return $294e9db24f29f2d7$export$c6813a8d51f77eaf(async function (...args) {
        const error = new $294e9db24f29f2d7$export$f98dac4b251ab333([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type
          .parseAsync(result, params)
          .catch((e) => {
            error.addIssue(makeReturnsIssue(result, e));
            throw error;
          });
        return parsedReturns;
      });
    } else {
      // Would love a way to avoid disabling this rule, but we need
      // an alias (using an arrow function was what caused 2651).
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const me = this;
      return $294e9db24f29f2d7$export$c6813a8d51f77eaf(function (...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success)
          throw new $294e9db24f29f2d7$export$f98dac4b251ab333([
            makeArgsIssue(args, parsedArgs.error),
          ]);
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success)
          throw new $294e9db24f29f2d7$export$f98dac4b251ab333([
            makeReturnsIssue(result, parsedReturns.error),
          ]);
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new $294e9db24f29f2d7$export$d4602ba55673f53c({
      ...this._def,
      args: $294e9db24f29f2d7$export$e2a18bb771d8e6a3
        .create(items)
        .rest($294e9db24f29f2d7$export$ef3b1bb1630977ae.create()),
    });
  }
  returns(returnType) {
    return new $294e9db24f29f2d7$export$d4602ba55673f53c({
      ...this._def,
      returns: returnType,
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new $294e9db24f29f2d7$export$d4602ba55673f53c({
      args: args
        ? args
        : $294e9db24f29f2d7$export$e2a18bb771d8e6a3
            .create([])
            .rest($294e9db24f29f2d7$export$ef3b1bb1630977ae.create()),
      returns: returns || $294e9db24f29f2d7$export$ef3b1bb1630977ae.create(),
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodFunction,
      ...$294e9db24f29f2d7$var$processCreateParams(params),
    });
  }
}
class $294e9db24f29f2d7$export$378d0cfce37406e6 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx: ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({
      data: ctx.data,
      path: ctx.path,
      parent: ctx,
    });
  }
}
$294e9db24f29f2d7$export$378d0cfce37406e6.create = (getter, params) => {
  return new $294e9db24f29f2d7$export$378d0cfce37406e6({
    getter: getter,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodLazy,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$7e44096782a165d3 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        received: ctx.data,
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_literal,
        expected: this._def.value,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return {
      status: 'valid',
      value: input.data,
    };
  }
  get value() {
    return this._def.value;
  }
}
$294e9db24f29f2d7$export$7e44096782a165d3.create = (value, params) => {
  return new $294e9db24f29f2d7$export$7e44096782a165d3({
    value: value,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodLiteral,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
function $294e9db24f29f2d7$var$createZodEnum(values, params) {
  return new $294e9db24f29f2d7$export$d325d1f0e1c20179({
    values: values,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodEnum,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
}
class $294e9db24f29f2d7$export$d325d1f0e1c20179 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor() {
    super(...arguments);
    $294e9db24f29f2d7$var$_ZodEnum_cache.set(this, void 0);
  }
  _parse(input) {
    if (typeof input.data !== 'string') {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        expected: $294e9db24f29f2d7$export$7debb50ef11d5e0b.joinValues(expectedValues),
        received: ctx.parsedType,
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    if (
      !$294e9db24f29f2d7$var$__classPrivateFieldGet(this, $294e9db24f29f2d7$var$_ZodEnum_cache, 'f')
    )
      $294e9db24f29f2d7$var$__classPrivateFieldSet(
        this,
        $294e9db24f29f2d7$var$_ZodEnum_cache,
        new Set(this._def.values),
        'f',
      );
    if (
      !$294e9db24f29f2d7$var$__classPrivateFieldGet(
        this,
        $294e9db24f29f2d7$var$_ZodEnum_cache,
        'f',
      ).has(input.data)
    ) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        received: ctx.data,
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_enum_value,
        options: expectedValues,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) enumValues[val] = val;
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) enumValues[val] = val;
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) enumValues[val] = val;
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return $294e9db24f29f2d7$export$d325d1f0e1c20179.create(values, {
      ...this._def,
      ...newDef,
    });
  }
  exclude(values, newDef = this._def) {
    return $294e9db24f29f2d7$export$d325d1f0e1c20179.create(
      this.options.filter((opt) => !values.includes(opt)),
      {
        ...this._def,
        ...newDef,
      },
    );
  }
}
$294e9db24f29f2d7$var$_ZodEnum_cache = new WeakMap();
$294e9db24f29f2d7$export$d325d1f0e1c20179.create = $294e9db24f29f2d7$var$createZodEnum;
class $294e9db24f29f2d7$export$370b2e8d6d6f5c56 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  constructor() {
    super(...arguments);
    $294e9db24f29f2d7$var$_ZodNativeEnum_cache.set(this, void 0);
  }
  _parse(input) {
    const nativeEnumValues = $294e9db24f29f2d7$export$7debb50ef11d5e0b.getValidEnumValues(
      this._def.values,
    );
    const ctx = this._getOrReturnCtx(input);
    if (
      ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.string &&
      ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.number
    ) {
      const expectedValues =
        $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectValues(nativeEnumValues);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        expected: $294e9db24f29f2d7$export$7debb50ef11d5e0b.joinValues(expectedValues),
        received: ctx.parsedType,
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    if (
      !$294e9db24f29f2d7$var$__classPrivateFieldGet(
        this,
        $294e9db24f29f2d7$var$_ZodNativeEnum_cache,
        'f',
      )
    )
      $294e9db24f29f2d7$var$__classPrivateFieldSet(
        this,
        $294e9db24f29f2d7$var$_ZodNativeEnum_cache,
        new Set($294e9db24f29f2d7$export$7debb50ef11d5e0b.getValidEnumValues(this._def.values)),
        'f',
      );
    if (
      !$294e9db24f29f2d7$var$__classPrivateFieldGet(
        this,
        $294e9db24f29f2d7$var$_ZodNativeEnum_cache,
        'f',
      ).has(input.data)
    ) {
      const expectedValues =
        $294e9db24f29f2d7$export$7debb50ef11d5e0b.objectValues(nativeEnumValues);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        received: ctx.data,
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_enum_value,
        options: expectedValues,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
$294e9db24f29f2d7$var$_ZodNativeEnum_cache = new WeakMap();
$294e9db24f29f2d7$export$370b2e8d6d6f5c56.create = (values, params) => {
  return new $294e9db24f29f2d7$export$370b2e8d6d6f5c56({
    values: values,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodNativeEnum,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$3f196b0127d6e50a extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx: ctx } = this._processInputParams(input);
    if (
      ctx.parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.promise &&
      ctx.common.async === false
    ) {
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.promise,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    const promisified =
      ctx.parsedType === $294e9db24f29f2d7$export$5716da67bfaa244d.promise
        ? ctx.data
        : Promise.resolve(ctx.data);
    return $294e9db24f29f2d7$export$c6813a8d51f77eaf(
      promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap,
        });
      }),
    );
  }
}
$294e9db24f29f2d7$export$3f196b0127d6e50a.create = (schema, params) => {
  return new $294e9db24f29f2d7$export$3f196b0127d6e50a({
    type: schema,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodPromise,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$a60af00cc0ce2582 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === $294e9db24f29f2d7$export$558106ce543bd011.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(input) {
    const { status: status, ctx: ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, arg);
        if (arg.fatal) status.abort();
        else status.dirty();
      },
      get path() {
        return ctx.path;
      },
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === 'preprocess') {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async)
        return Promise.resolve(processed).then(async (processed) => {
          if (status.value === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
          const result = await this._def.schema._parseAsync({
            data: processed,
            path: ctx.path,
            parent: ctx,
          });
          if (result.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
          if (result.status === 'dirty')
            return $294e9db24f29f2d7$export$325a211da9693fcf(result.value);
          if (status.value === 'dirty')
            return $294e9db24f29f2d7$export$325a211da9693fcf(result.value);
          return result;
        });
      else {
        if (status.value === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx,
        });
        if (result.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
        if (result.status === 'dirty')
          return $294e9db24f29f2d7$export$325a211da9693fcf(result.value);
        if (status.value === 'dirty')
          return $294e9db24f29f2d7$export$325a211da9693fcf(result.value);
        return result;
      }
    }
    if (effect.type === 'refinement') {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) return Promise.resolve(result);
        if (result instanceof Promise)
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.',
          );
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (inner.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
        if (inner.status === 'dirty') status.dirty();
        // return value is ignored
        executeRefinement(inner.value);
        return {
          status: status.value,
          value: inner.value,
        };
      } else
        return this._def.schema
          ._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx,
          })
          .then((inner) => {
            if (inner.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
            if (inner.status === 'dirty') status.dirty();
            return executeRefinement(inner.value).then(() => {
              return {
                status: status.value,
                value: inner.value,
              };
            });
          });
    }
    if (effect.type === 'transform') {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (!$294e9db24f29f2d7$export$1ea939691cdc45b8(base)) return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise)
          throw new Error(
            `Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`,
          );
        return {
          status: status.value,
          value: result,
        };
      } else
        return this._def.schema
          ._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx,
          })
          .then((base) => {
            if (!$294e9db24f29f2d7$export$1ea939691cdc45b8(base)) return base;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
              status: status.value,
              value: result,
            }));
          });
    }
    $294e9db24f29f2d7$export$7debb50ef11d5e0b.assertNever(effect);
  }
}
$294e9db24f29f2d7$export$a60af00cc0ce2582.create = (schema, effect, params) => {
  return new $294e9db24f29f2d7$export$a60af00cc0ce2582({
    schema: schema,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodEffects,
    effect: effect,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
$294e9db24f29f2d7$export$a60af00cc0ce2582.createWithPreprocess = (preprocess, schema, params) => {
  return new $294e9db24f29f2d7$export$a60af00cc0ce2582({
    schema: schema,
    effect: {
      type: 'preprocess',
      transform: preprocess,
    },
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodEffects,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$aa56fec1e9d629b8 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === $294e9db24f29f2d7$export$5716da67bfaa244d.undefined)
      return $294e9db24f29f2d7$export$c6813a8d51f77eaf(undefined);
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
$294e9db24f29f2d7$export$aa56fec1e9d629b8.create = (type, params) => {
  return new $294e9db24f29f2d7$export$aa56fec1e9d629b8({
    innerType: type,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodOptional,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$aaac0b8b429cef5 extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === $294e9db24f29f2d7$export$5716da67bfaa244d.null)
      return $294e9db24f29f2d7$export$c6813a8d51f77eaf(null);
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
$294e9db24f29f2d7$export$aaac0b8b429cef5.create = (type, params) => {
  return new $294e9db24f29f2d7$export$aaac0b8b429cef5({
    innerType: type,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodNullable,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$bb19b37874861e7e extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { ctx: ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === $294e9db24f29f2d7$export$5716da67bfaa244d.undefined)
      data = this._def.defaultValue();
    return this._def.innerType._parse({
      data: data,
      path: ctx.path,
      parent: ctx,
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
$294e9db24f29f2d7$export$bb19b37874861e7e.create = (type, params) => {
  return new $294e9db24f29f2d7$export$bb19b37874861e7e({
    innerType: type,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodDefault,
    defaultValue: typeof params.default === 'function' ? params.default : () => params.default,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$75a44ec6249ac76b extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { ctx: ctx } = this._processInputParams(input);
    // newCtx is used to not collect issues from inner types in ctx
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: [],
      },
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx,
      },
    });
    if ($294e9db24f29f2d7$export$aefee5ebe1dcfd9e(result))
      return result.then((result) => {
        return {
          status: 'valid',
          value:
            result.status === 'valid'
              ? result.value
              : this._def.catchValue({
                  get error() {
                    return new $294e9db24f29f2d7$export$f98dac4b251ab333(newCtx.common.issues);
                  },
                  input: newCtx.data,
                }),
        };
      });
    else
      return {
        status: 'valid',
        value:
          result.status === 'valid'
            ? result.value
            : this._def.catchValue({
                get error() {
                  return new $294e9db24f29f2d7$export$f98dac4b251ab333(newCtx.common.issues);
                },
                input: newCtx.data,
              }),
      };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
$294e9db24f29f2d7$export$75a44ec6249ac76b.create = (type, params) => {
  return new $294e9db24f29f2d7$export$75a44ec6249ac76b({
    innerType: type,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodCatch,
    catchValue: typeof params.catch === 'function' ? params.catch : () => params.catch,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
class $294e9db24f29f2d7$export$26ccfa0145e8511f extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== $294e9db24f29f2d7$export$5716da67bfaa244d.nan) {
      const ctx = this._getOrReturnCtx(input);
      $294e9db24f29f2d7$export$db7caee60e5d514d(ctx, {
        code: $294e9db24f29f2d7$export$5ba560653e4a1035.invalid_type,
        expected: $294e9db24f29f2d7$export$5716da67bfaa244d.nan,
        received: ctx.parsedType,
      });
      return $294e9db24f29f2d7$export$9a105a556e65c2c0;
    }
    return {
      status: 'valid',
      value: input.data,
    };
  }
}
$294e9db24f29f2d7$export$26ccfa0145e8511f.create = (params) => {
  return new $294e9db24f29f2d7$export$26ccfa0145e8511f({
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodNaN,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
const $294e9db24f29f2d7$export$cf2deea74cde46b4 = Symbol('zod_brand');
class $294e9db24f29f2d7$export$66b0c798a395271f extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { ctx: ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data: data,
      path: ctx.path,
      parent: ctx,
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class $294e9db24f29f2d7$export$a3c3ef8a0e95c6da extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const { status: status, ctx: ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (inResult.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
        if (inResult.status === 'dirty') {
          status.dirty();
          return $294e9db24f29f2d7$export$325a211da9693fcf(inResult.value);
        } else
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx,
          });
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx,
      });
      if (inResult.status === 'aborted') return $294e9db24f29f2d7$export$9a105a556e65c2c0;
      if (inResult.status === 'dirty') {
        status.dirty();
        return {
          status: 'dirty',
          value: inResult.value,
        };
      } else
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx,
        });
    }
  }
  static create(a, b) {
    return new $294e9db24f29f2d7$export$a3c3ef8a0e95c6da({
      in: a,
      out: b,
      typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodPipeline,
    });
  }
}
class $294e9db24f29f2d7$export$5d1f7ef05c4e493a extends $294e9db24f29f2d7$export$19342e026b58ebb7 {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if ($294e9db24f29f2d7$export$1ea939691cdc45b8(data)) data.value = Object.freeze(data.value);
      return data;
    };
    return $294e9db24f29f2d7$export$aefee5ebe1dcfd9e(result)
      ? result.then((data) => freeze(data))
      : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
$294e9db24f29f2d7$export$5d1f7ef05c4e493a.create = (type, params) => {
  return new $294e9db24f29f2d7$export$5d1f7ef05c4e493a({
    innerType: type,
    typeName: $294e9db24f29f2d7$export$558106ce543bd011.ZodReadonly,
    ...$294e9db24f29f2d7$var$processCreateParams(params),
  });
};
function $294e9db24f29f2d7$export$4c00f665f0d4b443(
  check,
  params = {},
  /**
   * @deprecated
   *
   * Pass `fatal` into the params object instead:
   *
   * ```ts
   * z.string().custom((val) => val.length > 5, { fatal: false })
   * ```
   *
   */ fatal,
) {
  if (check)
    return $294e9db24f29f2d7$export$b9d1edb536b4e4eb.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p =
          typeof params === 'function'
            ? params(data)
            : typeof params === 'string'
              ? {
                  message: params,
                }
              : params;
        const _fatal =
          (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0
            ? _b
            : true;
        const p2 =
          typeof p === 'string'
            ? {
                message: p,
              }
            : p;
        ctx.addIssue({
          code: 'custom',
          ...p2,
          fatal: _fatal,
        });
      }
    });
  return $294e9db24f29f2d7$export$b9d1edb536b4e4eb.create();
}
const $294e9db24f29f2d7$export$1ee8ee30835eab8b = {
  object: $294e9db24f29f2d7$export$736315c5b55efbad.lazycreate,
};
var $294e9db24f29f2d7$export$558106ce543bd011;
(function (ZodFirstPartyTypeKind) {
  ZodFirstPartyTypeKind['ZodString'] = 'ZodString';
  ZodFirstPartyTypeKind['ZodNumber'] = 'ZodNumber';
  ZodFirstPartyTypeKind['ZodNaN'] = 'ZodNaN';
  ZodFirstPartyTypeKind['ZodBigInt'] = 'ZodBigInt';
  ZodFirstPartyTypeKind['ZodBoolean'] = 'ZodBoolean';
  ZodFirstPartyTypeKind['ZodDate'] = 'ZodDate';
  ZodFirstPartyTypeKind['ZodSymbol'] = 'ZodSymbol';
  ZodFirstPartyTypeKind['ZodUndefined'] = 'ZodUndefined';
  ZodFirstPartyTypeKind['ZodNull'] = 'ZodNull';
  ZodFirstPartyTypeKind['ZodAny'] = 'ZodAny';
  ZodFirstPartyTypeKind['ZodUnknown'] = 'ZodUnknown';
  ZodFirstPartyTypeKind['ZodNever'] = 'ZodNever';
  ZodFirstPartyTypeKind['ZodVoid'] = 'ZodVoid';
  ZodFirstPartyTypeKind['ZodArray'] = 'ZodArray';
  ZodFirstPartyTypeKind['ZodObject'] = 'ZodObject';
  ZodFirstPartyTypeKind['ZodUnion'] = 'ZodUnion';
  ZodFirstPartyTypeKind['ZodDiscriminatedUnion'] = 'ZodDiscriminatedUnion';
  ZodFirstPartyTypeKind['ZodIntersection'] = 'ZodIntersection';
  ZodFirstPartyTypeKind['ZodTuple'] = 'ZodTuple';
  ZodFirstPartyTypeKind['ZodRecord'] = 'ZodRecord';
  ZodFirstPartyTypeKind['ZodMap'] = 'ZodMap';
  ZodFirstPartyTypeKind['ZodSet'] = 'ZodSet';
  ZodFirstPartyTypeKind['ZodFunction'] = 'ZodFunction';
  ZodFirstPartyTypeKind['ZodLazy'] = 'ZodLazy';
  ZodFirstPartyTypeKind['ZodLiteral'] = 'ZodLiteral';
  ZodFirstPartyTypeKind['ZodEnum'] = 'ZodEnum';
  ZodFirstPartyTypeKind['ZodEffects'] = 'ZodEffects';
  ZodFirstPartyTypeKind['ZodNativeEnum'] = 'ZodNativeEnum';
  ZodFirstPartyTypeKind['ZodOptional'] = 'ZodOptional';
  ZodFirstPartyTypeKind['ZodNullable'] = 'ZodNullable';
  ZodFirstPartyTypeKind['ZodDefault'] = 'ZodDefault';
  ZodFirstPartyTypeKind['ZodCatch'] = 'ZodCatch';
  ZodFirstPartyTypeKind['ZodPromise'] = 'ZodPromise';
  ZodFirstPartyTypeKind['ZodBranded'] = 'ZodBranded';
  ZodFirstPartyTypeKind['ZodPipeline'] = 'ZodPipeline';
  ZodFirstPartyTypeKind['ZodReadonly'] = 'ZodReadonly';
})($294e9db24f29f2d7$export$558106ce543bd011 || ($294e9db24f29f2d7$export$558106ce543bd011 = {}));
const $294e9db24f29f2d7$export$3d916e7c22dbd8b5 = (
  // const instanceOfType = <T extends new (...args: any[]) => any>(
  cls,
  params = {
    message: `Input not instance of ${cls.name}`,
  },
) => $294e9db24f29f2d7$export$4c00f665f0d4b443((data) => data instanceof cls, params);
const $294e9db24f29f2d7$export$22b082955e083ec3 = $294e9db24f29f2d7$export$1230eb29b8d3b502.create;
const $294e9db24f29f2d7$export$98e628dec113755e = $294e9db24f29f2d7$export$5b070a55c0c43e09.create;
const $294e9db24f29f2d7$export$9e06de0973666692 = $294e9db24f29f2d7$export$26ccfa0145e8511f.create;
const $294e9db24f29f2d7$export$a0f65b52274bcc00 = $294e9db24f29f2d7$export$67d741fd70ff98f4.create;
const $294e9db24f29f2d7$export$4a21f16c33752377 = $294e9db24f29f2d7$export$723d146f80596191.create;
const $294e9db24f29f2d7$export$324d90190a8b822a = $294e9db24f29f2d7$export$e974be33bdc55521.create;
const $294e9db24f29f2d7$export$8f701197936bc2a6 = $294e9db24f29f2d7$export$bcc3b40f6b638044.create;
const $294e9db24f29f2d7$export$1db45310990710a5 = $294e9db24f29f2d7$export$4e780e961c30340d.create;
const $294e9db24f29f2d7$export$7b1b591b262c240 = $294e9db24f29f2d7$export$a96281f914484f2d.create;
const $294e9db24f29f2d7$export$4154a199d7d90455 = $294e9db24f29f2d7$export$b9d1edb536b4e4eb.create;
const $294e9db24f29f2d7$export$19282c40b967aec6 = $294e9db24f29f2d7$export$ef3b1bb1630977ae.create;
const $294e9db24f29f2d7$export$b3e22bcfd64c1022 = $294e9db24f29f2d7$export$1e576a20c3ce9fb5.create;
const $294e9db24f29f2d7$export$490e536ee7389aeb = $294e9db24f29f2d7$export$7d39f5df85f21031.create;
const $294e9db24f29f2d7$export$2f23118c22fb2630 = $294e9db24f29f2d7$export$7acfc3e64785411.create;
const $294e9db24f29f2d7$export$be5493f9613cbbe = $294e9db24f29f2d7$export$736315c5b55efbad.create;
const $294e9db24f29f2d7$export$8fb0df5f40d0b477 =
  $294e9db24f29f2d7$export$736315c5b55efbad.strictCreate;
const $294e9db24f29f2d7$export$971dd5b0dfd021b6 = $294e9db24f29f2d7$export$a8b236cb5070a311.create;
const $294e9db24f29f2d7$export$4b888e40c4ee26dd = $294e9db24f29f2d7$export$5ef2424805ac76a3.create;
const $294e9db24f29f2d7$export$bc86dfbf7795668c = $294e9db24f29f2d7$export$c02deaf0bb5203d4.create;
const $294e9db24f29f2d7$export$65e3907585753458 = $294e9db24f29f2d7$export$e2a18bb771d8e6a3.create;
const $294e9db24f29f2d7$export$e5185e241753e543 = $294e9db24f29f2d7$export$a2acc09968cb4b7f.create;
const $294e9db24f29f2d7$export$871de8747c9eaa88 = $294e9db24f29f2d7$export$163b6a2b712d9542.create;
const $294e9db24f29f2d7$export$adaa4cf7ef1b65be = $294e9db24f29f2d7$export$977057706f816712.create;
const $294e9db24f29f2d7$export$44e51c8aac7c2deb = $294e9db24f29f2d7$export$d4602ba55673f53c.create;
const $294e9db24f29f2d7$export$488013bae63b21da = $294e9db24f29f2d7$export$378d0cfce37406e6.create;
const $294e9db24f29f2d7$export$c8ec6e1ec9fefcb0 = $294e9db24f29f2d7$export$7e44096782a165d3.create;
const $294e9db24f29f2d7$export$78a99c8d44d72635 = $294e9db24f29f2d7$export$d325d1f0e1c20179.create;
const $294e9db24f29f2d7$export$6fe7eca19ebe5199 = $294e9db24f29f2d7$export$370b2e8d6d6f5c56.create;
const $294e9db24f29f2d7$export$c957ef27a0ebfd4 = $294e9db24f29f2d7$export$3f196b0127d6e50a.create;
const $294e9db24f29f2d7$export$dc573d8a6576cdb3 = $294e9db24f29f2d7$export$a60af00cc0ce2582.create;
const $294e9db24f29f2d7$export$516e28dec6a4b6d4 = $294e9db24f29f2d7$export$aa56fec1e9d629b8.create;
const $294e9db24f29f2d7$export$133fc36489ac9add = $294e9db24f29f2d7$export$aaac0b8b429cef5.create;
const $294e9db24f29f2d7$export$fc37fe19dfda43ee =
  $294e9db24f29f2d7$export$a60af00cc0ce2582.createWithPreprocess;
const $294e9db24f29f2d7$export$43f28b24e1eb8181 = $294e9db24f29f2d7$export$a3c3ef8a0e95c6da.create;
const $294e9db24f29f2d7$export$3b3d07727c5b702c = () =>
  $294e9db24f29f2d7$export$22b082955e083ec3().optional();
const $294e9db24f29f2d7$export$eb150471a61fced6 = () =>
  $294e9db24f29f2d7$export$98e628dec113755e().optional();
const $294e9db24f29f2d7$export$269251733cdcbbf1 = () =>
  $294e9db24f29f2d7$export$4a21f16c33752377().optional();
const $294e9db24f29f2d7$export$8c14e57e778d3873 = {
  string: (arg) =>
    $294e9db24f29f2d7$export$1230eb29b8d3b502.create({
      ...arg,
      coerce: true,
    }),
  number: (arg) =>
    $294e9db24f29f2d7$export$5b070a55c0c43e09.create({
      ...arg,
      coerce: true,
    }),
  boolean: (arg) =>
    $294e9db24f29f2d7$export$723d146f80596191.create({
      ...arg,
      coerce: true,
    }),
  bigint: (arg) =>
    $294e9db24f29f2d7$export$67d741fd70ff98f4.create({
      ...arg,
      coerce: true,
    }),
  date: (arg) =>
    $294e9db24f29f2d7$export$e974be33bdc55521.create({
      ...arg,
      coerce: true,
    }),
};
const $294e9db24f29f2d7$export$96c94437c95d7862 = $294e9db24f29f2d7$export$9a105a556e65c2c0;
var $294e9db24f29f2d7$export$2e2bcd8739ae039 = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  defaultErrorMap: $294e9db24f29f2d7$export$341b0b6e0a6f5099,
  setErrorMap: $294e9db24f29f2d7$export$1097a8289cfd22d7,
  getErrorMap: $294e9db24f29f2d7$export$32f27c719778d4c4,
  makeIssue: $294e9db24f29f2d7$export$244a85fde9c419ed,
  EMPTY_PATH: $294e9db24f29f2d7$export$1526d2e05f74572,
  addIssueToContext: $294e9db24f29f2d7$export$db7caee60e5d514d,
  ParseStatus: $294e9db24f29f2d7$export$5b20a5c3d05c1f6f,
  INVALID: $294e9db24f29f2d7$export$9a105a556e65c2c0,
  DIRTY: $294e9db24f29f2d7$export$325a211da9693fcf,
  OK: $294e9db24f29f2d7$export$c6813a8d51f77eaf,
  isAborted: $294e9db24f29f2d7$export$afa861e3c5730743,
  isDirty: $294e9db24f29f2d7$export$910b6cdd390341b3,
  isValid: $294e9db24f29f2d7$export$1ea939691cdc45b8,
  isAsync: $294e9db24f29f2d7$export$aefee5ebe1dcfd9e,
  get util() {
    return $294e9db24f29f2d7$export$7debb50ef11d5e0b;
  },
  get objectUtil() {
    return $294e9db24f29f2d7$export$4aa2142c225fd5c7;
  },
  ZodParsedType: $294e9db24f29f2d7$export$5716da67bfaa244d,
  getParsedType: $294e9db24f29f2d7$export$3e9057828ebd5c7a,
  ZodType: $294e9db24f29f2d7$export$19342e026b58ebb7,
  datetimeRegex: $294e9db24f29f2d7$export$a4b563879add27a,
  ZodString: $294e9db24f29f2d7$export$1230eb29b8d3b502,
  ZodNumber: $294e9db24f29f2d7$export$5b070a55c0c43e09,
  ZodBigInt: $294e9db24f29f2d7$export$67d741fd70ff98f4,
  ZodBoolean: $294e9db24f29f2d7$export$723d146f80596191,
  ZodDate: $294e9db24f29f2d7$export$e974be33bdc55521,
  ZodSymbol: $294e9db24f29f2d7$export$bcc3b40f6b638044,
  ZodUndefined: $294e9db24f29f2d7$export$4e780e961c30340d,
  ZodNull: $294e9db24f29f2d7$export$a96281f914484f2d,
  ZodAny: $294e9db24f29f2d7$export$b9d1edb536b4e4eb,
  ZodUnknown: $294e9db24f29f2d7$export$ef3b1bb1630977ae,
  ZodNever: $294e9db24f29f2d7$export$1e576a20c3ce9fb5,
  ZodVoid: $294e9db24f29f2d7$export$7d39f5df85f21031,
  ZodArray: $294e9db24f29f2d7$export$7acfc3e64785411,
  ZodObject: $294e9db24f29f2d7$export$736315c5b55efbad,
  ZodUnion: $294e9db24f29f2d7$export$a8b236cb5070a311,
  ZodDiscriminatedUnion: $294e9db24f29f2d7$export$5ef2424805ac76a3,
  ZodIntersection: $294e9db24f29f2d7$export$c02deaf0bb5203d4,
  ZodTuple: $294e9db24f29f2d7$export$e2a18bb771d8e6a3,
  ZodRecord: $294e9db24f29f2d7$export$a2acc09968cb4b7f,
  ZodMap: $294e9db24f29f2d7$export$163b6a2b712d9542,
  ZodSet: $294e9db24f29f2d7$export$977057706f816712,
  ZodFunction: $294e9db24f29f2d7$export$d4602ba55673f53c,
  ZodLazy: $294e9db24f29f2d7$export$378d0cfce37406e6,
  ZodLiteral: $294e9db24f29f2d7$export$7e44096782a165d3,
  ZodEnum: $294e9db24f29f2d7$export$d325d1f0e1c20179,
  ZodNativeEnum: $294e9db24f29f2d7$export$370b2e8d6d6f5c56,
  ZodPromise: $294e9db24f29f2d7$export$3f196b0127d6e50a,
  ZodEffects: $294e9db24f29f2d7$export$a60af00cc0ce2582,
  ZodTransformer: $294e9db24f29f2d7$export$a60af00cc0ce2582,
  ZodOptional: $294e9db24f29f2d7$export$aa56fec1e9d629b8,
  ZodNullable: $294e9db24f29f2d7$export$aaac0b8b429cef5,
  ZodDefault: $294e9db24f29f2d7$export$bb19b37874861e7e,
  ZodCatch: $294e9db24f29f2d7$export$75a44ec6249ac76b,
  ZodNaN: $294e9db24f29f2d7$export$26ccfa0145e8511f,
  BRAND: $294e9db24f29f2d7$export$cf2deea74cde46b4,
  ZodBranded: $294e9db24f29f2d7$export$66b0c798a395271f,
  ZodPipeline: $294e9db24f29f2d7$export$a3c3ef8a0e95c6da,
  ZodReadonly: $294e9db24f29f2d7$export$5d1f7ef05c4e493a,
  custom: $294e9db24f29f2d7$export$4c00f665f0d4b443,
  Schema: $294e9db24f29f2d7$export$19342e026b58ebb7,
  ZodSchema: $294e9db24f29f2d7$export$19342e026b58ebb7,
  late: $294e9db24f29f2d7$export$1ee8ee30835eab8b,
  get ZodFirstPartyTypeKind() {
    return $294e9db24f29f2d7$export$558106ce543bd011;
  },
  coerce: $294e9db24f29f2d7$export$8c14e57e778d3873,
  any: $294e9db24f29f2d7$export$4154a199d7d90455,
  array: $294e9db24f29f2d7$export$2f23118c22fb2630,
  bigint: $294e9db24f29f2d7$export$a0f65b52274bcc00,
  boolean: $294e9db24f29f2d7$export$4a21f16c33752377,
  date: $294e9db24f29f2d7$export$324d90190a8b822a,
  discriminatedUnion: $294e9db24f29f2d7$export$4b888e40c4ee26dd,
  effect: $294e9db24f29f2d7$export$dc573d8a6576cdb3,
  enum: $294e9db24f29f2d7$export$78a99c8d44d72635,
  function: $294e9db24f29f2d7$export$44e51c8aac7c2deb,
  instanceof: $294e9db24f29f2d7$export$3d916e7c22dbd8b5,
  intersection: $294e9db24f29f2d7$export$bc86dfbf7795668c,
  lazy: $294e9db24f29f2d7$export$488013bae63b21da,
  literal: $294e9db24f29f2d7$export$c8ec6e1ec9fefcb0,
  map: $294e9db24f29f2d7$export$871de8747c9eaa88,
  nan: $294e9db24f29f2d7$export$9e06de0973666692,
  nativeEnum: $294e9db24f29f2d7$export$6fe7eca19ebe5199,
  never: $294e9db24f29f2d7$export$b3e22bcfd64c1022,
  null: $294e9db24f29f2d7$export$7b1b591b262c240,
  nullable: $294e9db24f29f2d7$export$133fc36489ac9add,
  number: $294e9db24f29f2d7$export$98e628dec113755e,
  object: $294e9db24f29f2d7$export$be5493f9613cbbe,
  oboolean: $294e9db24f29f2d7$export$269251733cdcbbf1,
  onumber: $294e9db24f29f2d7$export$eb150471a61fced6,
  optional: $294e9db24f29f2d7$export$516e28dec6a4b6d4,
  ostring: $294e9db24f29f2d7$export$3b3d07727c5b702c,
  pipeline: $294e9db24f29f2d7$export$43f28b24e1eb8181,
  preprocess: $294e9db24f29f2d7$export$fc37fe19dfda43ee,
  promise: $294e9db24f29f2d7$export$c957ef27a0ebfd4,
  record: $294e9db24f29f2d7$export$e5185e241753e543,
  set: $294e9db24f29f2d7$export$adaa4cf7ef1b65be,
  strictObject: $294e9db24f29f2d7$export$8fb0df5f40d0b477,
  string: $294e9db24f29f2d7$export$22b082955e083ec3,
  symbol: $294e9db24f29f2d7$export$8f701197936bc2a6,
  transformer: $294e9db24f29f2d7$export$dc573d8a6576cdb3,
  tuple: $294e9db24f29f2d7$export$65e3907585753458,
  undefined: $294e9db24f29f2d7$export$1db45310990710a5,
  union: $294e9db24f29f2d7$export$971dd5b0dfd021b6,
  unknown: $294e9db24f29f2d7$export$19282c40b967aec6,
  void: $294e9db24f29f2d7$export$490e536ee7389aeb,
  NEVER: $294e9db24f29f2d7$export$96c94437c95d7862,
  ZodIssueCode: $294e9db24f29f2d7$export$5ba560653e4a1035,
  quotelessJson: $294e9db24f29f2d7$export$913eddeaf297cfea,
  ZodError: $294e9db24f29f2d7$export$f98dac4b251ab333,
});

function $6ab521333bfe39cd$export$3e2bb967172656aa() {
  return {};
}

function $018f6204717062ca$export$1824e64235e4b973(res, key, errorMessage, refs) {
  if (!refs?.errorMessages) return;
  if (errorMessage)
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage,
    };
}
function $018f6204717062ca$export$f7d2bce693b08d40(res, key, value, errorMessage, refs) {
  res[key] = value;
  $018f6204717062ca$export$1824e64235e4b973(res, key, errorMessage, refs);
}

function $4d4d71f7d5249f02$export$9c1a0c7a7667fa87(def, refs) {
  const res = {
    type: 'array',
  };
  if (def.type?._def?.typeName !== (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodAny)
    res.items = (0, $fbd16001e3410077$export$1063952312e3541c)(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, 'items'],
    });
  if (def.minLength)
    (0, $018f6204717062ca$export$f7d2bce693b08d40)(
      res,
      'minItems',
      def.minLength.value,
      def.minLength.message,
      refs,
    );
  if (def.maxLength)
    (0, $018f6204717062ca$export$f7d2bce693b08d40)(
      res,
      'maxItems',
      def.maxLength.value,
      def.maxLength.message,
      refs,
    );
  if (def.exactLength) {
    (0, $018f6204717062ca$export$f7d2bce693b08d40)(
      res,
      'minItems',
      def.exactLength.value,
      def.exactLength.message,
      refs,
    );
    (0, $018f6204717062ca$export$f7d2bce693b08d40)(
      res,
      'maxItems',
      def.exactLength.value,
      def.exactLength.message,
      refs,
    );
  }
  return res;
}

function $d3c3f1f2814145d1$export$43aac7d536884cad(def, refs) {
  const res = {
    type: 'integer',
    format: 'int64',
  };
  if (!def.checks) return res;
  for (const check of def.checks)
    switch (check.kind) {
      case 'min':
        if (refs.target === 'jsonSchema7') {
          if (check.inclusive)
            (0, $018f6204717062ca$export$f7d2bce693b08d40)(
              res,
              'minimum',
              check.value,
              check.message,
              refs,
            );
          else
            (0, $018f6204717062ca$export$f7d2bce693b08d40)(
              res,
              'exclusiveMinimum',
              check.value,
              check.message,
              refs,
            );
        } else {
          if (!check.inclusive) res.exclusiveMinimum = true;
          (0, $018f6204717062ca$export$f7d2bce693b08d40)(
            res,
            'minimum',
            check.value,
            check.message,
            refs,
          );
        }
        break;
      case 'max':
        if (refs.target === 'jsonSchema7') {
          if (check.inclusive)
            (0, $018f6204717062ca$export$f7d2bce693b08d40)(
              res,
              'maximum',
              check.value,
              check.message,
              refs,
            );
          else
            (0, $018f6204717062ca$export$f7d2bce693b08d40)(
              res,
              'exclusiveMaximum',
              check.value,
              check.message,
              refs,
            );
        } else {
          if (!check.inclusive) res.exclusiveMaximum = true;
          (0, $018f6204717062ca$export$f7d2bce693b08d40)(
            res,
            'maximum',
            check.value,
            check.message,
            refs,
          );
        }
        break;
      case 'multipleOf':
        (0, $018f6204717062ca$export$f7d2bce693b08d40)(
          res,
          'multipleOf',
          check.value,
          check.message,
          refs,
        );
        break;
    }
  return res;
}

function $c8070956bc430965$export$953fb8456e1b3de0() {
  return {
    type: 'boolean',
  };
}

function $6dbf8c560422f740$export$487a80cbcbb64a8d(_def, refs) {
  return (0, $fbd16001e3410077$export$1063952312e3541c)(_def.type._def, refs);
}

const $3e2800ca16d6d671$export$540346d1622aa551 = (def, refs) => {
  return (0, $fbd16001e3410077$export$1063952312e3541c)(def.innerType._def, refs);
};

function $4bf830a9d5dab480$export$7ff09a50352abb2f(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy))
    return {
      anyOf: strategy.map((item, i) => $4bf830a9d5dab480$export$7ff09a50352abb2f(def, refs, item)),
    };
  switch (strategy) {
    case 'string':
    case 'format:date-time':
      return {
        type: 'string',
        format: 'date-time',
      };
    case 'format:date':
      return {
        type: 'string',
        format: 'date',
      };
    case 'integer':
      return $4bf830a9d5dab480$var$integerDateParser(def, refs);
  }
}
const $4bf830a9d5dab480$var$integerDateParser = (def, refs) => {
  const res = {
    type: 'integer',
    format: 'unix-time',
  };
  if (refs.target === 'openApi3') return res;
  for (const check of def.checks)
    switch (check.kind) {
      case 'min':
        (0, $018f6204717062ca$export$f7d2bce693b08d40)(
          res,
          'minimum',
          check.value,
          check.message,
          refs,
        );
        break;
      case 'max':
        (0, $018f6204717062ca$export$f7d2bce693b08d40)(
          res,
          'maximum',
          check.value,
          check.message,
          refs,
        );
        break;
    }
  return res;
};

function $b2666c90391776d9$export$e46de3de93f6b4e7(_def, refs) {
  return {
    ...(0, $fbd16001e3410077$export$1063952312e3541c)(_def.innerType._def, refs),
    default: _def.defaultValue(),
  };
}

function $7b40b3d7c271f24f$export$8edd16d8c2901277(_def, refs, forceResolution) {
  return refs.effectStrategy === 'input'
    ? (0, $fbd16001e3410077$export$1063952312e3541c)(_def.schema._def, refs, forceResolution)
    : {};
}

function $6d83baefb52cc8f0$export$73516460e65887be(def) {
  return {
    type: 'string',
    enum: [...def.values],
  };
}

const $dc1671da6b93547a$var$isJsonSchema7AllOfType = (type) => {
  if ('type' in type && type.type === 'string') return false;
  return 'allOf' in type;
};
function $dc1671da6b93547a$export$c12a2394fc457627(def, refs) {
  const allOf = [
    (0, $fbd16001e3410077$export$1063952312e3541c)(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, 'allOf', '0'],
    }),
    (0, $fbd16001e3410077$export$1063952312e3541c)(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, 'allOf', '1'],
    }),
  ].filter((x) => !!x);
  let unevaluatedProperties =
    refs.target === 'jsonSchema2019-09'
      ? {
          unevaluatedProperties: false,
        }
      : undefined;
  const mergedAllOf = [];
  // If either of the schemas is an allOf, merge them into a single allOf
  allOf.forEach((schema) => {
    if ($dc1671da6b93547a$var$isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === undefined)
        // If one of the schemas has no unevaluatedProperties set,
        // the merged schema should also have no unevaluatedProperties set
        unevaluatedProperties = undefined;
    } else {
      let nestedSchema = schema;
      if ('additionalProperties' in schema && schema.additionalProperties === false) {
        const { additionalProperties: additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } // As soon as one of the schemas has additionalProperties set not to false, we allow unevaluatedProperties
      else unevaluatedProperties = undefined;
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length
    ? {
        allOf: mergedAllOf,
        ...unevaluatedProperties,
      }
    : undefined;
}

function $d9fd33476fd3d1fa$export$81a695a005c19352(def, refs) {
  const parsedType = typeof def.value;
  if (
    parsedType !== 'bigint' &&
    parsedType !== 'number' &&
    parsedType !== 'boolean' &&
    parsedType !== 'string'
  )
    return {
      type: Array.isArray(def.value) ? 'array' : 'object',
    };
  if (refs.target === 'openApi3')
    return {
      type: parsedType === 'bigint' ? 'integer' : parsedType,
      enum: [def.value],
    };
  return {
    type: parsedType === 'bigint' ? 'integer' : parsedType,
    const: def.value,
  };
}

let $84db91251c86581b$var$emojiRegex;
const $84db91251c86581b$export$999ee5d51ef74217 = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */ cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */ email:
    /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */ emoji: () => {
    if ($84db91251c86581b$var$emojiRegex === undefined)
      $84db91251c86581b$var$emojiRegex = RegExp(
        '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$',
        'u',
      );
    return $84db91251c86581b$var$emojiRegex;
  },
  /**
   * Unused
   */ uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */ ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  /**
   * Unused
   */ ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
};
function $84db91251c86581b$export$c6dca604104d35ca(def, refs) {
  const res = {
    type: 'string',
  };
  function processPattern(value) {
    return refs.patternStrategy === 'escape'
      ? $84db91251c86581b$var$escapeNonAlphaNumeric(value)
      : value;
  }
  if (def.checks)
    for (const check of def.checks)
      switch (check.kind) {
        case 'min':
          (0, $018f6204717062ca$export$f7d2bce693b08d40)(
            res,
            'minLength',
            typeof res.minLength === 'number' ? Math.max(res.minLength, check.value) : check.value,
            check.message,
            refs,
          );
          break;
        case 'max':
          (0, $018f6204717062ca$export$f7d2bce693b08d40)(
            res,
            'maxLength',
            typeof res.maxLength === 'number' ? Math.min(res.maxLength, check.value) : check.value,
            check.message,
            refs,
          );
          break;
        case 'email':
          switch (refs.emailStrategy) {
            case 'format:email':
              $84db91251c86581b$var$addFormat(res, 'email', check.message, refs);
              break;
            case 'format:idn-email':
              $84db91251c86581b$var$addFormat(res, 'idn-email', check.message, refs);
              break;
            case 'pattern:zod':
              $84db91251c86581b$var$addPattern(
                res,
                $84db91251c86581b$export$999ee5d51ef74217.email,
                check.message,
                refs,
              );
              break;
          }
          break;
        case 'url':
          $84db91251c86581b$var$addFormat(res, 'uri', check.message, refs);
          break;
        case 'uuid':
          $84db91251c86581b$var$addFormat(res, 'uuid', check.message, refs);
          break;
        case 'regex':
          $84db91251c86581b$var$addPattern(res, check.regex, check.message, refs);
          break;
        case 'cuid':
          $84db91251c86581b$var$addPattern(
            res,
            $84db91251c86581b$export$999ee5d51ef74217.cuid,
            check.message,
            refs,
          );
          break;
        case 'cuid2':
          $84db91251c86581b$var$addPattern(
            res,
            $84db91251c86581b$export$999ee5d51ef74217.cuid2,
            check.message,
            refs,
          );
          break;
        case 'startsWith':
          $84db91251c86581b$var$addPattern(
            res,
            RegExp(`^${processPattern(check.value)}`),
            check.message,
            refs,
          );
          break;
        case 'endsWith':
          $84db91251c86581b$var$addPattern(
            res,
            RegExp(`${processPattern(check.value)}$`),
            check.message,
            refs,
          );
          break;
        case 'datetime':
          $84db91251c86581b$var$addFormat(res, 'date-time', check.message, refs);
          break;
        case 'date':
          $84db91251c86581b$var$addFormat(res, 'date', check.message, refs);
          break;
        case 'time':
          $84db91251c86581b$var$addFormat(res, 'time', check.message, refs);
          break;
        case 'duration':
          $84db91251c86581b$var$addFormat(res, 'duration', check.message, refs);
          break;
        case 'length':
          (0, $018f6204717062ca$export$f7d2bce693b08d40)(
            res,
            'minLength',
            typeof res.minLength === 'number' ? Math.max(res.minLength, check.value) : check.value,
            check.message,
            refs,
          );
          (0, $018f6204717062ca$export$f7d2bce693b08d40)(
            res,
            'maxLength',
            typeof res.maxLength === 'number' ? Math.min(res.maxLength, check.value) : check.value,
            check.message,
            refs,
          );
          break;
        case 'includes':
          $84db91251c86581b$var$addPattern(
            res,
            RegExp(processPattern(check.value)),
            check.message,
            refs,
          );
          break;
        case 'ip':
          if (check.version !== 'v6')
            $84db91251c86581b$var$addFormat(res, 'ipv4', check.message, refs);
          if (check.version !== 'v4')
            $84db91251c86581b$var$addFormat(res, 'ipv6', check.message, refs);
          break;
        case 'emoji':
          $84db91251c86581b$var$addPattern(
            res,
            $84db91251c86581b$export$999ee5d51ef74217.emoji,
            check.message,
            refs,
          );
          break;
        case 'ulid':
          $84db91251c86581b$var$addPattern(
            res,
            $84db91251c86581b$export$999ee5d51ef74217.ulid,
            check.message,
            refs,
          );
          break;
        case 'base64':
          switch (refs.base64Strategy) {
            case 'format:binary':
              $84db91251c86581b$var$addFormat(res, 'binary', check.message, refs);
              break;
            case 'contentEncoding:base64':
              (0, $018f6204717062ca$export$f7d2bce693b08d40)(
                res,
                'contentEncoding',
                'base64',
                check.message,
                refs,
              );
              break;
            case 'pattern:zod':
              $84db91251c86581b$var$addPattern(
                res,
                $84db91251c86581b$export$999ee5d51ef74217.base64,
                check.message,
                refs,
              );
              break;
          }
          break;
        case 'nanoid':
          $84db91251c86581b$var$addPattern(
            res,
            $84db91251c86581b$export$999ee5d51ef74217.nanoid,
            check.message,
            refs,
          );
        case 'toLowerCase':
        case 'toUpperCase':
        case 'trim':
          break;
        default:
          ((_) => {})(check);
      }
  return res;
}
const $84db91251c86581b$var$escapeNonAlphaNumeric = (value) =>
  Array.from(value)
    .map((c) => (/[a-zA-Z0-9]/.test(c) ? c : `\\${c}`))
    .join('');
const $84db91251c86581b$var$addFormat = (schema, value, message, refs) => {
  if (schema.format || schema.anyOf?.some((x) => x.format)) {
    if (!schema.anyOf) schema.anyOf = [];
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...(schema.errorMessage &&
          refs.errorMessages && {
            errorMessage: {
              format: schema.errorMessage.format,
            },
          }),
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) delete schema.errorMessage;
      }
    }
    schema.anyOf.push({
      format: value,
      ...(message &&
        refs.errorMessages && {
          errorMessage: {
            format: message,
          },
        }),
    });
  } else (0, $018f6204717062ca$export$f7d2bce693b08d40)(schema, 'format', value, message, refs);
};
const $84db91251c86581b$var$addPattern = (schema, regex, message, refs) => {
  if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
    if (!schema.allOf) schema.allOf = [];
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...(schema.errorMessage &&
          refs.errorMessages && {
            errorMessage: {
              pattern: schema.errorMessage.pattern,
            },
          }),
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) delete schema.errorMessage;
      }
    }
    schema.allOf.push({
      pattern: $84db91251c86581b$var$processRegExp(regex, refs),
      ...(message &&
        refs.errorMessages && {
          errorMessage: {
            pattern: message,
          },
        }),
    });
  } else
    (0, $018f6204717062ca$export$f7d2bce693b08d40)(
      schema,
      'pattern',
      $84db91251c86581b$var$processRegExp(regex, refs),
      message,
      refs,
    );
};
// Mutate z.string.regex() in a best attempt to accommodate for regex flags when applyRegexFlags is true
const $84db91251c86581b$var$processRegExp = (regexOrFunction, refs) => {
  const regex = typeof regexOrFunction === 'function' ? regexOrFunction() : regexOrFunction;
  if (!refs.applyRegexFlags || !regex.flags) return regex.source;
  // Currently handled flags
  const flags = {
    i: regex.flags.includes('i'),
    m: regex.flags.includes('m'),
    s: regex.flags.includes('s'),
  };
  // The general principle here is to step through each character, one at a time, applying mutations as flags require. We keep track when the current character is escaped, and when it's inside a group /like [this]/ or (also) a range like /[a-z]/. The following is fairly brittle imperative code; edit at your peril!
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = '';
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === '-' && source[i + 2]?.match(/[a-z]/)) {
            pattern += source[i];
            inCharRange = true;
          } else pattern += `${source[i]}${source[i].toUpperCase()}`;
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === '^') {
        pattern += `(^|(?<=[\r\n]))`;
        continue;
      } else if (source[i] === '$') {
        pattern += `($|(?=[\r\n]))`;
        continue;
      }
    }
    if (flags.s && source[i] === '.') {
      pattern += inCharGroup ? `${source[i]}\r\n` : `[${source[i]}\r\n]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === '\\') isEscaped = true;
    else if (inCharGroup && source[i] === ']') inCharGroup = false;
    else if (!inCharGroup && source[i] === '[') inCharGroup = true;
  }
  try {
    const regexTest = new RegExp(pattern);
  } catch {
    console.warn(
      `Could not convert regex pattern at ${refs.currentPath.join('/')} to a flag-independent form! Falling back to the flag-ignorant source`,
    );
    return regex.source;
  }
  return pattern;
};

function $2377d57d2a0bc2b5$export$bab91a30f81817bc(def, refs) {
  if (
    refs.target === 'openApi3' &&
    def.keyType?._def.typeName === (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodEnum
  )
    return {
      type: 'object',
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            (0, $fbd16001e3410077$export$1063952312e3541c)(def.valueType._def, {
              ...refs,
              currentPath: [...refs.currentPath, 'properties', key],
            }) ?? {},
        }),
        {},
      ),
      additionalProperties: false,
    };
  const schema = {
    type: 'object',
    additionalProperties:
      (0, $fbd16001e3410077$export$1063952312e3541c)(def.valueType._def, {
        ...refs,
        currentPath: [...refs.currentPath, 'additionalProperties'],
      }) ?? {},
  };
  if (refs.target === 'openApi3') return schema;
  if (
    def.keyType?._def.typeName === (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodString &&
    def.keyType._def.checks?.length
  ) {
    const keyType = Object.entries(
      (0, $84db91251c86581b$export$c6dca604104d35ca)(def.keyType._def, refs),
    ).reduce(
      (acc, [key, value]) =>
        key === 'type'
          ? acc
          : {
              ...acc,
              [key]: value,
            },
      {},
    );
    return {
      ...schema,
      propertyNames: keyType,
    };
  } else if (def.keyType?._def.typeName === (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodEnum)
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values,
      },
    };
  return schema;
}

function $9009062089b1ff0d$export$cb8e42ab369177cd(def, refs) {
  if (refs.mapStrategy === 'record')
    return (0, $2377d57d2a0bc2b5$export$bab91a30f81817bc)(def, refs);
  const keys =
    (0, $fbd16001e3410077$export$1063952312e3541c)(def.keyType._def, {
      ...refs,
      currentPath: [...refs.currentPath, 'items', 'items', '0'],
    }) || {};
  const values =
    (0, $fbd16001e3410077$export$1063952312e3541c)(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, 'items', 'items', '1'],
    }) || {};
  return {
    type: 'array',
    maxItems: 125,
    items: {
      type: 'array',
      items: [keys, values],
      minItems: 2,
      maxItems: 2,
    },
  };
}

function $925d8b6344048e5c$export$6631cffa548a42cf(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== 'number';
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type:
      parsedTypes.length === 1
        ? parsedTypes[0] === 'string'
          ? 'string'
          : 'number'
        : ['string', 'number'],
    enum: actualValues,
  };
}

function $aed7bbb9e5f5dc25$export$3490b811136dce94() {
  return {
    not: {},
  };
}

function $98f5a41f30781204$export$9dab39b894fea7b(refs) {
  return refs.target === 'openApi3'
    ? {
        enum: ['null'],
        nullable: true,
      }
    : {
        type: 'null',
      };
}

const $aa2ed10a7ffdbca6$export$53d0c9700414d70b = {
  ZodString: 'string',
  ZodNumber: 'number',
  ZodBigInt: 'integer',
  ZodBoolean: 'boolean',
  ZodNull: 'null',
};
function $aa2ed10a7ffdbca6$export$4fd6ebd75521f86f(def, refs) {
  if (refs.target === 'openApi3') return $aa2ed10a7ffdbca6$var$asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  // This blocks tries to look ahead a bit to produce nicer looking schemas with type array instead of anyOf.
  if (
    options.every(
      (x) =>
        x._def.typeName in $aa2ed10a7ffdbca6$export$53d0c9700414d70b &&
        (!x._def.checks || !x._def.checks.length),
    )
  ) {
    // all types in union are primitive and lack checks, so might as well squash into {type: [...]}
    const types = options.reduce((types, x) => {
      const type = $aa2ed10a7ffdbca6$export$53d0c9700414d70b[x._def.typeName]; //Can be safely casted due to row 43
      return type && !types.includes(type) ? [...types, type] : types;
    }, []);
    return {
      type: types.length > 1 ? types : types[0],
    };
  } else if (options.every((x) => x._def.typeName === 'ZodLiteral' && !x.description)) {
    // all options literals
    const types = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case 'string':
        case 'number':
        case 'boolean':
          return [...acc, type];
        case 'bigint':
          return [...acc, 'integer'];
        case 'object':
          if (x._def.value === null) return [...acc, 'null'];
        case 'symbol':
        case 'undefined':
        case 'function':
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      // all the literals are primitive, as far as null can be considered primitive
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, []),
      };
    }
  } else if (options.every((x) => x._def.typeName === 'ZodEnum'))
    return {
      type: 'string',
      enum: options.reduce(
        (acc, x) => [...acc, ...x._def.values.filter((x) => !acc.includes(x))],
        [],
      ),
    };
  return $aa2ed10a7ffdbca6$var$asAnyOf(def, refs);
}
const $aa2ed10a7ffdbca6$var$asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options)
    .map((x, i) =>
      (0, $fbd16001e3410077$export$1063952312e3541c)(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, 'anyOf', `${i}`],
      }),
    )
    .filter(
      (x) => !!x && (!refs.strictUnions || (typeof x === 'object' && Object.keys(x).length > 0)),
    );
  return anyOf.length
    ? {
        anyOf: anyOf,
      }
    : undefined;
};

function $59743c9f8262b370$export$5b998cd3cbcce402(def, refs) {
  if (
    ['ZodString', 'ZodNumber', 'ZodBigInt', 'ZodBoolean', 'ZodNull'].includes(
      def.innerType._def.typeName,
    ) &&
    (!def.innerType._def.checks || !def.innerType._def.checks.length)
  ) {
    if (refs.target === 'openApi3' || refs.nullableStrategy === 'property')
      return {
        type: (0, $aa2ed10a7ffdbca6$export$53d0c9700414d70b)[def.innerType._def.typeName],
        nullable: true,
      };
    return {
      type: [(0, $aa2ed10a7ffdbca6$export$53d0c9700414d70b)[def.innerType._def.typeName], 'null'],
    };
  }
  if (refs.target === 'openApi3') {
    const base = (0, $fbd16001e3410077$export$1063952312e3541c)(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath],
    });
    if (base && '$ref' in base)
      return {
        allOf: [base],
        nullable: true,
      };
    return (
      base && {
        ...base,
        nullable: true,
      }
    );
  }
  const base = (0, $fbd16001e3410077$export$1063952312e3541c)(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, 'anyOf', '0'],
  });
  return (
    base && {
      anyOf: [
        base,
        {
          type: 'null',
        },
      ],
    }
  );
}

function $787d3239d3d6206d$export$1c2f9bc71877e9a2(def, refs) {
  const res = {
    type: 'number',
  };
  if (!def.checks) return res;
  for (const check of def.checks)
    switch (check.kind) {
      case 'int':
        res.type = 'integer';
        (0, $018f6204717062ca$export$1824e64235e4b973)(res, 'type', check.message, refs);
        break;
      case 'min':
        if (refs.target === 'jsonSchema7') {
          if (check.inclusive)
            (0, $018f6204717062ca$export$f7d2bce693b08d40)(
              res,
              'minimum',
              check.value,
              check.message,
              refs,
            );
          else
            (0, $018f6204717062ca$export$f7d2bce693b08d40)(
              res,
              'exclusiveMinimum',
              check.value,
              check.message,
              refs,
            );
        } else {
          if (!check.inclusive) res.exclusiveMinimum = true;
          (0, $018f6204717062ca$export$f7d2bce693b08d40)(
            res,
            'minimum',
            check.value,
            check.message,
            refs,
          );
        }
        break;
      case 'max':
        if (refs.target === 'jsonSchema7') {
          if (check.inclusive)
            (0, $018f6204717062ca$export$f7d2bce693b08d40)(
              res,
              'maximum',
              check.value,
              check.message,
              refs,
            );
          else
            (0, $018f6204717062ca$export$f7d2bce693b08d40)(
              res,
              'exclusiveMaximum',
              check.value,
              check.message,
              refs,
            );
        } else {
          if (!check.inclusive) res.exclusiveMaximum = true;
          (0, $018f6204717062ca$export$f7d2bce693b08d40)(
            res,
            'maximum',
            check.value,
            check.message,
            refs,
          );
        }
        break;
      case 'multipleOf':
        (0, $018f6204717062ca$export$f7d2bce693b08d40)(
          res,
          'multipleOf',
          check.value,
          check.message,
          refs,
        );
        break;
    }
  return res;
}

function $23e8ff4b993666e1$var$decideAdditionalProperties(def, refs) {
  if (refs.removeAdditionalStrategy === 'strict')
    return def.catchall._def.typeName === 'ZodNever'
      ? def.unknownKeys !== 'strict'
      : ((0, $fbd16001e3410077$export$1063952312e3541c)(def.catchall._def, {
          ...refs,
          currentPath: [...refs.currentPath, 'additionalProperties'],
        }) ?? true);
  else
    return def.catchall._def.typeName === 'ZodNever'
      ? def.unknownKeys === 'passthrough'
      : ((0, $fbd16001e3410077$export$1063952312e3541c)(def.catchall._def, {
          ...refs,
          currentPath: [...refs.currentPath, 'additionalProperties'],
        }) ?? true);
}
function $23e8ff4b993666e1$export$f530ed7e1f9e38cd(def, refs) {
  const result = {
    type: 'object',
    ...Object.entries(def.shape()).reduce(
      (acc, [propName, propDef]) => {
        if (propDef === undefined || propDef._def === undefined) return acc;
        const parsedDef = (0, $fbd16001e3410077$export$1063952312e3541c)(propDef._def, {
          ...refs,
          currentPath: [...refs.currentPath, 'properties', propName],
          propertyPath: [...refs.currentPath, 'properties', propName],
        });
        if (parsedDef === undefined) return acc;
        return {
          properties: {
            ...acc.properties,
            [propName]: parsedDef,
          },
          required:
            propDef.isOptional() && !refs.openaiStrictMode
              ? acc.required
              : [...acc.required, propName],
        };
      },
      {
        properties: {},
        required: [],
      },
    ),
    additionalProperties: $23e8ff4b993666e1$var$decideAdditionalProperties(def, refs),
  };
  if (!result.required.length) delete result.required;
  return result;
}

const $5e7f249f5124e5c9$export$9ebda48a78f86524 = (def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString())
    return (0, $fbd16001e3410077$export$1063952312e3541c)(def.innerType._def, refs);
  const innerSchema = (0, $fbd16001e3410077$export$1063952312e3541c)(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, 'anyOf', '1'],
  });
  return innerSchema
    ? {
        anyOf: [
          {
            not: {},
          },
          innerSchema,
        ],
      }
    : {};
};

const $245c841504273f27$export$c5b6cc918b779721 = (def, refs) => {
  if (refs.pipeStrategy === 'input')
    return (0, $fbd16001e3410077$export$1063952312e3541c)(def.in._def, refs);
  else if (refs.pipeStrategy === 'output')
    return (0, $fbd16001e3410077$export$1063952312e3541c)(def.out._def, refs);
  const a = (0, $fbd16001e3410077$export$1063952312e3541c)(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, 'allOf', '0'],
  });
  const b = (0, $fbd16001e3410077$export$1063952312e3541c)(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, 'allOf', a ? '1' : '0'],
  });
  return {
    allOf: [a, b].filter((x) => x !== undefined),
  };
};

function $7ad30e54fd276d1a$export$25adf76733a2a51e(def, refs) {
  return (0, $fbd16001e3410077$export$1063952312e3541c)(def.type._def, refs);
}

function $f0a06d2d6c843c21$export$9bf814691104eb22(def, refs) {
  const items = (0, $fbd16001e3410077$export$1063952312e3541c)(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, 'items'],
  });
  const schema = {
    type: 'array',
    uniqueItems: true,
    items: items,
  };
  if (def.minSize)
    (0, $018f6204717062ca$export$f7d2bce693b08d40)(
      schema,
      'minItems',
      def.minSize.value,
      def.minSize.message,
      refs,
    );
  if (def.maxSize)
    (0, $018f6204717062ca$export$f7d2bce693b08d40)(
      schema,
      'maxItems',
      def.maxSize.value,
      def.maxSize.message,
      refs,
    );
  return schema;
}

function $58fdc5cd924dfb4a$export$49b44f845e795a29(def, refs) {
  if (def.rest)
    return {
      type: 'array',
      minItems: def.items.length,
      items: def.items
        .map((x, i) =>
          (0, $fbd16001e3410077$export$1063952312e3541c)(x._def, {
            ...refs,
            currentPath: [...refs.currentPath, 'items', `${i}`],
          }),
        )
        .reduce((acc, x) => (x === undefined ? acc : [...acc, x]), []),
      additionalItems: (0, $fbd16001e3410077$export$1063952312e3541c)(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, 'additionalItems'],
      }),
    };
  else
    return {
      type: 'array',
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items
        .map((x, i) =>
          (0, $fbd16001e3410077$export$1063952312e3541c)(x._def, {
            ...refs,
            currentPath: [...refs.currentPath, 'items', `${i}`],
          }),
        )
        .reduce((acc, x) => (x === undefined ? acc : [...acc, x]), []),
    };
}

function $382d2916e7f9e226$export$1f635862c66c5983() {
  return {
    not: {},
  };
}

function $80ac5ce6c0306616$export$23cbe91c3e1aee01() {
  return {};
}

const $0b5f01e9eac86c80$export$6e7a3d506d6dcac2 = (def, refs) => {
  return (0, $fbd16001e3410077$export$1063952312e3541c)(def.innerType._def, refs);
};

const $de802e4b2e6f3e6c$export$c23321d057eaf8c4 = Symbol(
  'Let zodToJsonSchema decide on which parser to use',
);
const $de802e4b2e6f3e6c$var$defaultOptions = {
  name: undefined,
  $refStrategy: 'root',
  effectStrategy: 'input',
  pipeStrategy: 'all',
  dateStrategy: 'format:date-time',
  mapStrategy: 'entries',
  nullableStrategy: 'from-target',
  removeAdditionalStrategy: 'passthrough',
  definitionPath: 'definitions',
  target: 'jsonSchema7',
  strictUnions: false,
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: 'escape',
  applyRegexFlags: false,
  emailStrategy: 'format:email',
  base64Strategy: 'contentEncoding:base64',
  nameStrategy: 'ref',
};
const $de802e4b2e6f3e6c$export$430a3269e24b912e = (options) => {
  // We need to add `definitions` here as we may mutate it
  return typeof options === 'string'
    ? {
        ...$de802e4b2e6f3e6c$var$defaultOptions,
        basePath: ['#'],
        definitions: {},
        name: options,
      }
    : {
        ...$de802e4b2e6f3e6c$var$defaultOptions,
        basePath: ['#'],
        definitions: {},
        ...options,
      };
};

function $fbd16001e3410077$export$1063952312e3541c(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== (0, $de802e4b2e6f3e6c$export$c23321d057eaf8c4)) return overrideResult;
  }
  if (seenItem && !forceResolution) {
    const seenSchema = $fbd16001e3410077$var$get$ref(seenItem, refs);
    if (seenSchema !== undefined) {
      if ('$ref' in seenSchema) refs.seenRefs.add(seenSchema.$ref);
      return seenSchema;
    }
  }
  const newItem = {
    def: def,
    path: refs.currentPath,
    jsonSchema: undefined,
  };
  refs.seen.set(def, newItem);
  const jsonSchema = $fbd16001e3410077$var$selectParser(def, def.typeName, refs, forceResolution);
  if (jsonSchema) $fbd16001e3410077$var$addMeta(def, refs, jsonSchema);
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
const $fbd16001e3410077$var$get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case 'root':
      return {
        $ref: item.path.join('/'),
      };
    // this case is needed as OpenAI strict mode doesn't support top-level `$ref`s, i.e.
    // the top-level schema *must* be `{"type": "object", "properties": {...}}` but if we ever
    // need to define a `$ref`, relative `$ref`s aren't supported, so we need to extract
    // the schema to `#/definitions/` and reference that.
    //
    // e.g. if we need to reference a schema at
    // `["#","definitions","contactPerson","properties","person1","properties","name"]`
    // then we'll extract it out to `contactPerson_properties_person1_properties_name`
    case 'extract-to-root':
      const name = item.path.slice(refs.basePath.length + 1).join('_');
      // we don't need to extract the root schema in this case, as it's already
      // been added to the definitions
      if (name !== refs.name && refs.nameStrategy === 'duplicate-ref')
        refs.definitions[name] = item.def;
      return {
        $ref: [...refs.basePath, refs.definitionPath, name].join('/'),
      };
    case 'relative':
      return {
        $ref: $fbd16001e3410077$var$getRelativePath(refs.currentPath, item.path),
      };
    case 'none':
    case 'seen':
      if (
        item.path.length < refs.currentPath.length &&
        item.path.every((value, index) => refs.currentPath[index] === value)
      ) {
        console.warn(
          `Recursive reference detected at ${refs.currentPath.join('/')}! Defaulting to any`,
        );
        return {};
      }
      return refs.$refStrategy === 'seen' ? {} : undefined;
  }
};
const $fbd16001e3410077$var$getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i]) break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join('/');
};
const $fbd16001e3410077$var$selectParser = (def, typeName, refs, forceResolution) => {
  switch (typeName) {
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodString:
      return (0, $84db91251c86581b$export$c6dca604104d35ca)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodNumber:
      return (0, $787d3239d3d6206d$export$1c2f9bc71877e9a2)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodObject:
      return (0, $23e8ff4b993666e1$export$f530ed7e1f9e38cd)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodBigInt:
      return (0, $d3c3f1f2814145d1$export$43aac7d536884cad)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodBoolean:
      return (0, $c8070956bc430965$export$953fb8456e1b3de0)();
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodDate:
      return (0, $4bf830a9d5dab480$export$7ff09a50352abb2f)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodUndefined:
      return (0, $382d2916e7f9e226$export$1f635862c66c5983)();
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodNull:
      return (0, $98f5a41f30781204$export$9dab39b894fea7b)(refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodArray:
      return (0, $4d4d71f7d5249f02$export$9c1a0c7a7667fa87)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodUnion:
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodDiscriminatedUnion:
      return (0, $aa2ed10a7ffdbca6$export$4fd6ebd75521f86f)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodIntersection:
      return (0, $dc1671da6b93547a$export$c12a2394fc457627)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodTuple:
      return (0, $58fdc5cd924dfb4a$export$49b44f845e795a29)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodRecord:
      return (0, $2377d57d2a0bc2b5$export$bab91a30f81817bc)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodLiteral:
      return (0, $d9fd33476fd3d1fa$export$81a695a005c19352)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodEnum:
      return (0, $6d83baefb52cc8f0$export$73516460e65887be)(def);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodNativeEnum:
      return (0, $925d8b6344048e5c$export$6631cffa548a42cf)(def);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodNullable:
      return (0, $59743c9f8262b370$export$5b998cd3cbcce402)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodOptional:
      return (0, $5e7f249f5124e5c9$export$9ebda48a78f86524)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodMap:
      return (0, $9009062089b1ff0d$export$cb8e42ab369177cd)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodSet:
      return (0, $f0a06d2d6c843c21$export$9bf814691104eb22)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodLazy:
      return $fbd16001e3410077$export$1063952312e3541c(def.getter()._def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodPromise:
      return (0, $7ad30e54fd276d1a$export$25adf76733a2a51e)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodNaN:
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodNever:
      return (0, $aed7bbb9e5f5dc25$export$3490b811136dce94)();
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodEffects:
      return (0, $7b40b3d7c271f24f$export$8edd16d8c2901277)(def, refs, forceResolution);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodAny:
      return (0, $6ab521333bfe39cd$export$3e2bb967172656aa)();
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodUnknown:
      return (0, $80ac5ce6c0306616$export$23cbe91c3e1aee01)();
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodDefault:
      return (0, $b2666c90391776d9$export$e46de3de93f6b4e7)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodBranded:
      return (0, $6dbf8c560422f740$export$487a80cbcbb64a8d)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodReadonly:
      return (0, $0b5f01e9eac86c80$export$6e7a3d506d6dcac2)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodCatch:
      return (0, $3e2800ca16d6d671$export$540346d1622aa551)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodPipeline:
      return (0, $245c841504273f27$export$c5b6cc918b779721)(def, refs);
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodFunction:
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodVoid:
    case (0, $294e9db24f29f2d7$export$558106ce543bd011).ZodSymbol:
      return undefined;
    default:
      return ((_) => undefined)(typeName);
  }
};
const $fbd16001e3410077$var$addMeta = (def, refs, jsonSchema) => {
  if (def.description) {
    jsonSchema.description = def.description;
    if (refs.markdownDescription) jsonSchema.markdownDescription = def.description;
  }
  return jsonSchema;
};

const $fa9fa96edd434825$export$57f91ba833ce5030 = (zodSchema) => {
  return '_def' in zodSchema ? zodSchema._def : zodSchema;
};
function $fa9fa96edd434825$export$4a2fbc025e4a4a37(obj) {
  if (!obj) return true;
  for (const _k in obj) return false;
  return true;
}

const $47147dfb71a4c238$export$298f5b3210f877af = (options) => {
  const _options = (0, $de802e4b2e6f3e6c$export$430a3269e24b912e)(options);
  const currentPath =
    _options.name !== undefined
      ? [..._options.basePath, _options.definitionPath, _options.name]
      : _options.basePath;
  return {
    ..._options,
    currentPath: currentPath,
    propertyPath: undefined,
    seenRefs: new Set(),
    seen: new Map(
      Object.entries(_options.definitions).map(([name, def]) => [
        (0, $fa9fa96edd434825$export$57f91ba833ce5030)(def),
        {
          def: (0, $fa9fa96edd434825$export$57f91ba833ce5030)(def),
          path: [..._options.basePath, _options.definitionPath, name],
          // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
          jsonSchema: undefined,
        },
      ]),
    ),
  };
};

const $b268a68eb3327929$export$c365928c26d2ef43 = (schema, options) => {
  const refs = (0, $47147dfb71a4c238$export$298f5b3210f877af)(options);
  const name =
    typeof options === 'string'
      ? options
      : options?.nameStrategy === 'title'
        ? undefined
        : options?.name;
  const main =
    (0, $fbd16001e3410077$export$1063952312e3541c)(
      schema._def,
      name === undefined
        ? refs
        : {
            ...refs,
            currentPath: [...refs.basePath, refs.definitionPath, name],
          },
      false,
    ) ?? {};
  const title =
    typeof options === 'object' && options.name !== undefined && options.nameStrategy === 'title'
      ? options.name
      : undefined;
  if (title !== undefined) main.title = title;
  const definitions = (() => {
    if ((0, $fa9fa96edd434825$export$4a2fbc025e4a4a37)(refs.definitions)) return undefined;
    const definitions = {};
    const processedDefinitions = new Set();
    // the call to `parseDef()` here might itself add more entries to `.definitions`
    // so we need to continually evaluate definitions until we've resolved all of them
    //
    // we have a generous iteration limit here to avoid blowing up the stack if there
    // are any bugs that would otherwise result in us iterating indefinitely
    for (let i = 0; i < 500; i++) {
      const newDefinitions = Object.entries(refs.definitions).filter(
        ([key]) => !processedDefinitions.has(key),
      );
      if (newDefinitions.length === 0) break;
      for (const [key, schema] of newDefinitions) {
        definitions[key] =
          (0, $fbd16001e3410077$export$1063952312e3541c)(
            (0, $fa9fa96edd434825$export$57f91ba833ce5030)(schema),
            {
              ...refs,
              currentPath: [...refs.basePath, refs.definitionPath, key],
            },
            true,
          ) ?? {};
        processedDefinitions.add(key);
      }
    }
    return definitions;
  })();
  const combined =
    name === undefined
      ? definitions
        ? {
            ...main,
            [refs.definitionPath]: definitions,
          }
        : main
      : refs.nameStrategy === 'duplicate-ref'
        ? {
            ...main,
            ...(definitions || refs.seenRefs.size
              ? {
                  [refs.definitionPath]: {
                    ...definitions,
                    // only actually duplicate the schema definition if it was ever referenced
                    // otherwise the duplication is completely pointless
                    ...(refs.seenRefs.size
                      ? {
                          [name]: main,
                        }
                      : undefined),
                  },
                }
              : undefined),
          }
        : {
            $ref: [
              ...(refs.$refStrategy === 'relative' ? [] : refs.basePath),
              refs.definitionPath,
              name,
            ].join('/'),
            [refs.definitionPath]: {
              ...definitions,
              [name]: main,
            },
          };
  if (refs.target === 'jsonSchema7') combined.$schema = 'http://json-schema.org/draft-07/schema#';
  else if (refs.target === 'jsonSchema2019-09')
    combined.$schema = 'https://json-schema.org/draft/2019-09/schema#';
  return combined;
};

function $270574008f92c4d9$var$zodToJsonSchema(schema, options) {
  return (0, $b268a68eb3327929$export$c365928c26d2ef43)(schema, {
    openaiStrictMode: true,
    name: options.name,
    nameStrategy: 'duplicate-ref',
    $refStrategy: 'extract-to-root',
    nullableStrategy: 'property',
  });
}
function $270574008f92c4d9$export$5a36c27dc294dc58(zodObject, name, props) {
  return (0, $2288bd4f606a2ce7$export$8571f96912acf365)(
    {
      type: 'json_schema',
      json_schema: {
        ...props,
        name: name,
        strict: true,
        schema: $270574008f92c4d9$var$zodToJsonSchema(zodObject, {
          name: name,
        }),
      },
    },
    (content) => zodObject.parse(JSON.parse(content)),
  );
}
function $270574008f92c4d9$export$1d2f7ec849832747(options) {
  // @ts-expect-error TODO
  return (0, $2288bd4f606a2ce7$export$8c880bd1baec2c2d)(
    {
      type: 'function',
      function: {
        name: options.name,
        parameters: $270574008f92c4d9$var$zodToJsonSchema(options.parameters, {
          name: options.name,
        }),
        strict: true,
        ...(options.description
          ? {
              description: options.description,
            }
          : undefined),
      },
    },
    {
      callback: options.function,
      parser: (args) => options.parameters.parse(JSON.parse(args)),
    },
  );
}

var $6wSqq = parcelRequire('6wSqq');

class $c3ee996f8adac281$export$eb017f9453374fe1 {
  outStream;
  /** The AI model to use */ model;
  /** OpenAI client to interact with */ openAI;
  /** Used to strongly typed parse user answer for getting their name and age */ PatientDataResponse =
    (0, $294e9db24f29f2d7$export$2e2bcd8739ae039).object({
      assistant_response: (0, $294e9db24f29f2d7$export$2e2bcd8739ae039).string(),
      is_patient_give_info: (0, $294e9db24f29f2d7$export$2e2bcd8739ae039).boolean(),
      patient_name: (0, $294e9db24f29f2d7$export$2e2bcd8739ae039).string(),
      patient_age: (0, $294e9db24f29f2d7$export$2e2bcd8739ae039).number(),
    });
  constructor(outStream, apiKey, model = 'gpt-4o-mini') {
    this.outStream = outStream;
    this.model = model;
    this.openAI = new (0, /*@__PURE__*/ $parcel$interopDefault($6wSqq))({
      apiKey: apiKey,
    });
  }
  /**
   * Use structured outputs to understand if user responded with required
   * name/age info. and to extract it.
   * No proper error handling for now.
   */ async getPatientData(messages) {
    const params = {
      model: this.model,
      messages: this.convertMessagesToParams(messages),
      response_format: (0, $270574008f92c4d9$export$5a36c27dc294dc58)(
        this.PatientDataResponse,
        'data',
      ),
    };
    const completion = await this.openAI.beta.chat.completions.parse(params);
    const response = completion.choices[0]?.message;
    if (response?.parsed) {
      let patientData;
      if (response.parsed.is_patient_give_info)
        patientData = {
          name: response.parsed.patient_name,
          age: response.parsed.patient_age,
        };
      return [
        {
          actor: (0, $f1166f8071591982$export$f59d481d71dc7795).Assistant,
          content: response.parsed.assistant_response,
        },
        patientData,
      ];
    } else if (response?.content)
      return [
        {
          actor: (0, $f1166f8071591982$export$f59d481d71dc7795).Assistant,
          content: response.content,
        },
        undefined,
      ];
    else return [undefined, undefined];
  }
  /**
   * Simple question-answer loop using stream for the "typing" experience.
   * No proper error handling for now.
   */ async respondToQueryStream(messages) {
    const params = {
      model: this.model,
      messages: this.convertMessagesToParams(messages),
    };
    const stream = this.openAI.beta.chat.completions.stream(params);
    // stream the output
    for await (const chunk of stream) this.outStream.write(chunk.choices[0]?.delta?.content ?? '');
    const content = await stream.finalContent();
    return content
      ? {
          actor: (0, $f1166f8071591982$export$f59d481d71dc7795).Assistant,
          content: content,
        }
      : undefined;
  }
  convertMessagesToParams(messages) {
    return messages.map((message) => ({
      role: message.actor,
      content: [
        {
          type: 'text',
          text: message.content,
        },
      ],
    }));
  }
}

class $d753f1e8c86047db$export$a095075ba026c8e5 {
  /** OpenAI client to interact with */ client;
  /** All previous messages in the thread */ messages = [];
  /** Use name and age as collected from interaction */ patientData;
  constructor() {
    const apiKey = process.env['OPENAI_API_KEY'];
    if (!apiKey)
      throw new Error(`Please set OPENAI_API_KEY environment variable.
export OPENAI_API_KEY="your_api_key_here"`);
    this.client = new (0, $c3ee996f8adac281$export$eb017f9453374fe1)(process.stdout, apiKey);
  }
  async run() {
    // Clear and init messages in the thread for conversation
    this.init();
    // step 1: get patient data
    await this.getPatientAgeStep();
    if (!this.patientData) return;
    // step 2: question-answer loop
    await this.questionAnswersStep();
    // step 3: goodbye message
    console.log('\n\nThis is all the questions I can answer at this time. Thank you.\n');
  }
  /**
   * Ask the user for name and age.
   * Allow 3 iterations to get the info from the user.
   * If the user provides the info it is set on the thread state.
   */ async getPatientAgeStep() {
    const question =
      "Hello, I'm here for you at this hard time. May I have your name and age to assist you better please?";
    console.log(`${question}\n`);
    this.messages.push({
      actor: (0, $f1166f8071591982$export$f59d481d71dc7795).Assistant,
      content: question,
    });
    let attempts = 3;
    while (!this.patientData && attempts-- > 0) {
      await this.getInputFromUser();
      const [message, data] = await this.client.getPatientData(this.messages);
      if (message) {
        this.messages.push(message);
        console.log(`\n${message.content}\n`);
      }
      if (data) this.setPatientData(data);
    }
  }
  /**
   * Get user question and provide an answer simple loop limited to 3.
   * TODO: check user sentiment to break early on "goodbye" user input.
   */ async questionAnswersStep() {
    for (let i = 0; i < 3; i++) {
      await this.getInputFromUser();
      const message = await this.client.respondToQueryStream(this.messages);
      if (message) this.messages.push(message);
    }
  }
  async getInputFromUser() {
    const rl = $33tH0$createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    try {
      let answer;
      while (!answer) answer = (await rl.question('> ')).trim();
      this.messages.push({
        actor: (0, $f1166f8071591982$export$f59d481d71dc7795).User,
        content: answer,
      });
      console.log();
    } finally {
      rl.close();
    }
  }
  setPatientData(data) {
    this.patientData = data;
    let content = `Patient is ${data.age} years old.`;
    if (data.name) content += ` Patient's name is ${data.name}.`;
    this.messages.push({
      actor: (0, $f1166f8071591982$export$f59d481d71dc7795).System,
      content: content,
    });
  }
  /**
   * Clear the state of the thread and initialize with base system messages.
   * System messages define the behavior and knowledge of the bot.
   */ init() {
    this.patientData = undefined;
    this.messages = [
      {
        actor: (0, $f1166f8071591982$export$f59d481d71dc7795).System,
        content: `You are a healthcare assistant. 
          You art providing information to a breast cancer patient.
          You need to know the patient's name and age to assist them better.
          You can work with only the age if the patient prefers to remain anonymous.
          You absolutely must have the age and will not answer any questions without know it.`,
      },
      {
        actor: (0, $f1166f8071591982$export$f59d481d71dc7795).System,
        content: `You know the following on breast cancer and use only this information to respond to patient questions: 
        In 2022, there were 2.3 million women diagnosed with breast cancer and 670000 deaths globally. Breast cancer occurs 
        in every country of the world in women at any age after puberty but with increasing rates in later life. Global 
        estimates reveal striking inequities in the breast cancer burden according to human development. For instance, 
        in countries with a very high Human Development Index (HDI), 1 in 12 women will be diagnosed with breast cancer 
        in their lifetime and 1 in 71 women die of it. In contrast, in countries with a low HDI; while only 1 in 27 women 
        is diagnosed with breast cancer in their lifetime, 1 in 48 women will die from it.`,
      },
    ];
  }
}

async function $3e1a6827f74f1809$var$main() {
  const thread = new (0, $d753f1e8c86047db$export$a095075ba026c8e5)();
  console.log('\n---\n');
  await thread.run();
  console.log('\n\n---\n');
}
await $3e1a6827f74f1809$var$main();

//# sourceMappingURL=main.js.map
