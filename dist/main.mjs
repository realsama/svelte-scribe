import Markdoc from '@markdoc/markdoc';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { spawn } from 'child_process';

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
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

var DEFAULT_SCHEMA_PATH$1 = './markdoc';
var normalizePath = function (absolute_path) {
    return absolute_path.split(path.sep).join(path.posix.sep);
};
var readModule = function (modulePath) { return __awaiter(void 0, void 0, void 0, function () {
    var resolvedPath, moduleFile, moduleSection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                resolvedPath = normalizePath(path.posix.resolve(modulePath));
                moduleFile = fs.existsSync("".concat(resolvedPath, ".js")) || fs.existsSync("".concat(resolvedPath, ".ts"))
                    ? resolvedPath
                    : "".concat(resolvedPath, "/index");
                return [4 /*yield*/, import("".concat(moduleFile, ".js"))];
            case 1:
                moduleSection = (_a.sent()).default;
                return [2 /*return*/, moduleSection];
            case 2:
                _a.sent();
                return [2 /*return*/, {}];
            case 3: return [2 /*return*/];
        }
    });
}); };
var loadSchema = function (schemaPath) { return __awaiter(void 0, void 0, void 0, function () {
    var schemaDirectory, schemaDirectoryExists, config, tags, nodes, functions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schemaDirectory = path.posix.resolve(schemaPath);
                schemaDirectoryExists = fs.existsSync(schemaDirectory);
                if (!schemaDirectoryExists && schemaPath !== DEFAULT_SCHEMA_PATH$1) {
                    throw new Error("Can't find the schema at '".concat(schemaDirectory, "' from the passed option 'schema: ").concat(schemaPath));
                }
                return [4 /*yield*/, readModule("".concat(schemaDirectory, "/config"))];
            case 1:
                config = _a.sent();
                return [4 /*yield*/, readModule("".concat(schemaDirectory, "/tags"))];
            case 2:
                tags = _a.sent();
                return [4 /*yield*/, readModule("".concat(schemaDirectory, "/nodes"))];
            case 3:
                nodes = _a.sent();
                return [4 /*yield*/, readModule("".concat(schemaDirectory, "/functions"))];
            case 4:
                functions = _a.sent();
                return [2 /*return*/, { config: config, tags: tags, nodes: nodes, functions: functions }];
        }
    });
}); };

var getComponentMap = function (components) {
    var e_1, _a;
    var componentMap = '';
    try {
        for (var components_1 = __values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
            var _b = __read(components_1_1.value, 1), name = _b[0];
            componentMap += "[".concat(JSON.stringify(name), ", ").concat(name, "],\n");
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return componentMap;
};
var addFrontmatter = function (ast, config) {
    var _a;
    var frontmatter = ast.attributes.frontmatter
        ? yaml.load(ast.attributes.frontmatter)
        : {};
    var markdoc = Object.assign(((_a = config === null || config === void 0 ? void 0 : config.variables) === null || _a === void 0 ? void 0 : _a.markdoc) || {}, { frontmatter: frontmatter });
    var variables = Object.assign((config === null || config === void 0 ? void 0 : config.variables) || {}, { markdoc: markdoc });
    return Object.assign(config, { variables: variables });
};
var getComponents = function (componentsDir) {
    var componentsMap = new Map();
    var getComponentName = function (fileName, isNested, filePath) {
        if (isNested) {
            var _a = __read(filePath.split('/').slice(-2, -1), 1), folderName = _a[0];
            if (folderName === 'index') {
                return 'Index';
            }
            else if (fileName === "".concat(folderName, ".svelte")) {
                return "".concat(folderName[0].toUpperCase()).concat(folderName.slice(1));
            }
            else {
                return null;
            }
        }
        var componentName = fileName.split('.svelte')[0];
        return "".concat(componentName[0].toUpperCase()).concat(componentName.slice(1));
    };
    var traverseDir = function (dir, isNested) {
        if (isNested === void 0) { isNested = false; }
        if (!fs.existsSync(dir))
            return;
        fs.readdirSync(dir).forEach(function (file) {
            var filePath = path.join(dir, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                traverseDir(filePath, true);
            }
            else if (file.endsWith('.svelte')) {
                var componentName = getComponentName(file, isNested, filePath);
                if (componentName) {
                    componentsMap.set(componentName, filePath);
                }
            }
        });
    };
    traverseDir(componentsDir);
    return componentsMap;
};

var __dirname = path.resolve();
var DEFAULT_SCHEMA_PATH = './markdoc';
// const DEFAULT_COMPONENTS_PATH = './src/markdoc/components';
var DEFAULT_COMPONENTS_PATH = path.join(__dirname, 'src', 'markdoc', 'components');
var markdoc = function (options) {
    if (options === void 0) { options = {}; }
    options.layout;
    var schemaPath = options.schema || DEFAULT_SCHEMA_PATH;
    var supportedExtensions = options.extensions || ['.md'];
    var componentsPath = options.components || DEFAULT_COMPONENTS_PATH;
    var getImportStatements = function (components) {
        var e_1, _a;
        var importStatements = '';
        try {
            for (var components_1 = __values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                var _b = __read(components_1_1.value, 2), name = _b[0], path_1 = _b[1];
                importStatements += "import ".concat(name, " from '").concat(path_1, "';\n");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return importStatements;
    };
    var markup = function (_a) {
        var _b = _a.content, content = _b === void 0 ? '' : _b, _c = _a.filename, filename = _c === void 0 ? '' : _c;
        return __awaiter(void 0, void 0, void 0, function () {
            var schema, ast, astWithFrontmatter, transformedAst, components, importStatements, componentMap, children, code;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!supportedExtensions.some(function (extension) { return filename.endsWith(extension); })) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, loadSchema(schemaPath)];
                    case 1:
                        schema = _d.sent();
                        ast = Markdoc.parse(content);
                        astWithFrontmatter = addFrontmatter(ast, schema);
                        transformedAst = Markdoc.transform(ast, astWithFrontmatter);
                        components = getComponents(componentsPath);
                        importStatements = getImportStatements(components);
                        componentMap = getComponentMap(components);
                        children = transformedAst.children;
                        code = "\n\t\t\t<script>\n\t\t\t\t".concat(importStatements, "\n\t\t\t\timport Layout from \"svelte-scribe/RenderLayout.svelte\";\n\t\t\t\t\n\t\t\t\tconst components = new Map([").concat(componentMap, "]);\n\n\t\t\t\tconst children = ").concat(JSON.stringify(children), ";\n\t\t\t</script>\n\n\t\t\t<Layout {children} {components} />\n    \t\t");
                        return [2 /*return*/, {
                                code: code,
                                data: {},
                            }];
                }
            });
        });
    };
    return { markup: markup };
};

path.resolve();
function tscPlugin(dir) {
    var tsc;
    return {
        name: 'tsc',
        apply: 'serve',
        buildStart: function () {
            tsc = spawnTsc("npx tsc ".concat(dir, "/*.ts --module esnext"), '--watch');
            tsc.once('exit', function (tscExitCode) {
                if (tscExitCode === null || tscExitCode === 0)
                    return;
                process.exit(tscExitCode);
            });
        },
        buildEnd: function () {
            if (!tsc)
                return;
            tsc.kill();
        },
    };
}
function spawnTsc(command, args) {
    if (args === void 0) { args = ''; }
    return spawn("".concat(command, " --pretty ").concat(args), [], {
        stdio: 'inherit',
        shell: true,
    });
}

export { markdoc as default, tscPlugin };
//# sourceMappingURL=main.mjs.map
